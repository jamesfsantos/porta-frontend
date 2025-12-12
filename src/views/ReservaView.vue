<script setup lang="ts">
import Reserva from '@/components/reservas/Reserva.vue';
import Topo from "@/components/reservas/Topo.vue"
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import utils from '../utils'
import type ReservaType from "@/models/types/ReservaType"


const route = useRoute();
const reservaEncontrada = ref(false);
const objReserva = ref<ReservaType>(null)

const { base64Util } = utils;
onMounted(() => {

  //base endecode teste: ewoibm9tZSI6Ik1hcmNpbyIsCiJyZXNlcnZhSWQiOiJjMjBkNTBkMC05NGNjLTQ1ZWEtYjhhOS0xNTQyY2JkYjAxYjAiCn0=

  /*
    informacoesReserva: objeto contendo informacoes basica da reserva
    nome do hospede
    codigo da reserva
    vira codificicado em base64
    sera necessario decodificar para extrair os dados
  */
  console.log(utils)
  const { informacoesReserva } = route.params;
  reservaEncontrada.value = (informacoesReserva != null);

  if (informacoesReserva) {
    objReserva.value = base64Util.decodeFromJson<ReservaType>(informacoesReserva as string);
    //Buscar informações da reserva na api
    console.log('Buscando informações da reserva para hospedagem de: ', objReserva.value.nome)
  }

});
</script>

<template>



  <div v-if="!reservaEncontrada">
    <p class="alert alert-block alert-warning">
      Reserva não localizada.
    </p>
  </div>
  <div v-else>
    <div class="row">
      <div class="col-md-1 "></div>
      <div class="col-md-10">
        <Topo :nome-hospede="objReserva.nome" />
      </div>
      <div class="col-md-1"></div>
    </div>
    <Reserva :reserva-id="objReserva.reservaId"/>
  </div>



</template>
