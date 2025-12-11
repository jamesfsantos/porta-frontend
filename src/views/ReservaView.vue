<script setup lang="ts">
import Reserva from '@/components/reservas/Reserva.vue';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import utils from '../utils'
import type ReservaType from "../models/types/ReservaType"
import reservaService from "../services/reservaService"

const route = useRoute();
const reservaEncontrada = ref(false);

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
  const objReserva = base64Util.decodeFromJson<ReservaType>(informacoesReserva);

  if (objReserva != null) {
    console.log('Buscando informações da reserva para hospedagem de: ', objReserva.nome)
  }

});
</script>

<template>

  <div v-if="!reservaEncontrada">
    <p class="alert alert-block alert-warning">
      Reserva não localizada.
    </p>
  </div>
  <Reserva v-else />
</template>

