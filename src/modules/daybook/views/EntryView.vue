<template>
  <template v-if="entry" >
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-3">{{ month }}</span>
      <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
    </div>

    <div>
      <input type="file" @change="onSelectedImage" ref="imageSelector" accept="image/png, image/jpeg, image/gif" v-show="false">
      <button class="btn btn-danger mx-2" v-if="entry.id" @click="deleteEntry">
        Borrar <i class="fa fa-trash-alt"></i>
      </button>

      <button class="btn btn-primary" @click="onSelectImage">
        Subir foto <i class="fa fa-upload"></i>
      </button>
    </div>
  </div>
  <hr />
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="Que sucedio hoy" v-model="entry.text"></textarea>
  </div>

<div class="entry-picture" v-if="entry.picture && !localImage">
<img
    v-if="entry.picture"
    :src="entry.picture"
    alt="entry-picture"
    class="img-thumbnail"
  />
</div>


  <div class="entry-picture" v-if="localImage">
    <div class="btnClose" @click="deleteImage">X</div>
    <img
    :src="localImage"
    alt="entry-picture"
    class="img-thumbnail"
  />
  </div>


  </template>
  <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import {mapActions, mapGetters} from 'vuex';
import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear';
import Swal from 'sweetalert2';
import uploadImage from '@/helpers/imageApi';

export default {
  props:{
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null
    }
  },
  computed: {
    ...mapGetters('journal', ['getEntryById']),
    day(){
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month(){
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay(){
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    }
  },
  methods:{
    ...mapActions('journal', ['updateEntry', 'createEntry', 'removeEntry']),
    loadEntry(){

      let entry;

      if (this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({name: 'daybook-no-entry'});
      }
      this.entry = entry;
    },
    async saveEntry(){

      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false,
      });

      Swal.showLoading();

      const { picture, picture_id } = await uploadImage(this.file);

      this.entry.picture = picture;
      this.entry.picture_id = picture_id;

      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);
        this.$router.push({name: 'daybook-entry', params: {id}});
      }
      Swal.fire('Guardado','Se ha guardado correctamente','success');
      this.deleteImage();
    },
    async deleteEntry(){
      const {isConfirmed} = await Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrarlo!'
      });

      console.log(isConfirmed);
      if(isConfirmed){
        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.removeEntry(this.entry);
        this.$router.push({name: 'daybook-no-entry'});
        Swal.fire('Borrado','Se ha borrado correctamente','success');
      }
    },
    onSelectedImage(event){
      const file = event.target.files[0];
      if (!file) return;
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e) => this.localImage= e.target.result;
      reader.readAsDataURL(file);
    },
    onSelectImage(){
      this.$refs.imageSelector.click();
    },
    deleteImage(){
      this.localImage = null;
      this.file = null;
      this.$refs.imageSelector.value = null;
    }
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id(){
      this.loadEntry();
    }
  }
};
</script>

<style lang="scss" scoped>
  textarea {
    font-size: 1.5rem;
    border: none;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
  .entry-picture {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);
    .btnClose{
      font-weight: bold;
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1rem;
      background: white;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 100%;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);
      transition: all 0.3s ease;
      &:hover {
        background: red;
        color: white;
      }
      &:active {
        transform: scale(0.9);
      }
    }
  }
</style>
