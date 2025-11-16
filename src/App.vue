<script setup lang="ts">
import Topo from './components/Topo.vue';
import Centro from './components/Centro.vue';
import { ref } from 'vue';

const text = ref('')

</script>

<template>
  <Topo />
  <Centro />
</template>

<style scoped>
* {
  font-size: 16px;
}
</style>
