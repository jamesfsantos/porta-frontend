<script setup lang="ts">
import Topo from './components/Topo.vue'
import Centro from './components/Centro.vue'
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


    <div class="row ">
      <div class="col-md-1 "></div>

      <div class="col-md-10">
        <Centro />
      </div>

      <div class="col-md-1 "></div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-size: 16px;
}
</style>
