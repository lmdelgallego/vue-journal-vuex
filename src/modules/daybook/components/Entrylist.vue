<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Buscar" v-model="term" />
    </div>

    <div class="mt-2 d-flex flex-column">
      <button type="button" class="btn btn-primary mx-3 mb-2"
              @click="$router.push({ name:'daybook-entry', params:{ id: 'new'}})"
      >
        <i class="fa fa-plus-circle"></i>
        Nueva Entrada
      </button>
    </div>

    <div class="entry-scrollarea">
      <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import {mapGetters} from 'vuex';

export default {
  components: { Entry: defineAsyncComponent(() => import("./Entry.vue")) },
  computed: {
    ...mapGetters('journal',['getEntryByTerm']),
    entriesByTerm() {
      return this.getEntryByTerm(this.term);
    }
  },
  data() {
    return {
      term: '',
    }
  }
};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}
.entry-scrollarea {
  height: calc(100vh - 115px);
  overflow: scroll;
}
</style>
