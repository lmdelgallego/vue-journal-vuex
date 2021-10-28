<template>
  <Navbar />
  <div class="d-flex">
    <div class="col-4">
      <Entrylist />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import {mapActions} from 'vuex';
export default {
  components: {
    Navbar: defineAsyncComponent(() => import("../components/Navbar")),
    Entrylist: defineAsyncComponent(() => import("../components/Entrylist")),
  },
  methods:{
    ...mapActions('journal', ['loadEntries']),
  },
  created(){
    this.loadEntries();
  }
};
</script>

<style>
</style>
