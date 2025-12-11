<script setup lang="ts">
import Topo from './components/Topo.vue'
</script>

<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-1 "></div>
      <div class="col-md-10">
        <Topo />
      </div>
      <div class="col-md-1"></div>
    </div>


    <div class="row">
      <div class="col-10 col-offset-1">
         <router-view/>
      </div>


    </div>
  </div>
</template>

<style scoped>
* {
  font-size: 16px;
}
</style>
