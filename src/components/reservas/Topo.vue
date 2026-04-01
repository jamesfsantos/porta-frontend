<script setup lang="ts">
import { useReservaStore } from '@/stores/reserva';
import { ref } from 'vue';

type TopoProps = {
  nomeHospede: string,
  apartamento:string
}
const props = defineProps<TopoProps>()


</script>

<template>
   <div class="card">
    <div class="user">

      <div>
        <div>👤 <strong>{{ props.nomeHospede}}</strong></div>
        <div class="info">{{ props.apartamento }}</div>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
