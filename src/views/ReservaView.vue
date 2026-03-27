<script setup lang="ts">
import Reserva from '@/components/reservas/Reserva.vue';
import Topo from "@/components/reservas/Topo.vue"
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import utils from '../utils'
import reservaService from '@/services/reservaService';
import { useReservaStore } from '@/stores/reserva'
import type { ReservaType } from '@/models/types/reserva.type';


const store = useReservaStore();
const route = useRoute();
const reservaEncontrada = ref(false);
const reserva = ref<ReservaType>({ nome: "", reservaId: "", apartamento:"" })

const { base64Util } = utils;

async function buscarReservaAsync(reservaId: string) {

  const result = await reservaService.obterReservaAsync(reservaId);

  if (!result.sucesso) {
    alert(result.erros.join('\n'));
    return
  }
  //add no store
  store.setReserva(result.data!);


}

onMounted(async () => {

  //base endecode teste: ewoibm9tZSI6Ik1hcmNpbyIsCiJyZXNlcnZhSWQiOiJjMjBkNTBkMC05NGNjLTQ1ZWEtYjhhOS0xNTQyY2JkYjAxYjAiCn0=

  /*
    informacoesReserva: objeto contendo informacoes basica da reserva
    nome do hospede
    codigo da reserva
    vira codificicado em base64
    sera necessario decodificar para extrair os dados
  */

  const { informacoesReserva } = route.params;

  reservaEncontrada.value = (informacoesReserva != null);
  console.log('init busca por resrevas');

  if (informacoesReserva) {
    const reservaDecoded = base64Util.decodeFromJson<ReservaType>(informacoesReserva as string);
    if (reservaDecoded == null) return;

    reserva.value = base64Util.decodeFromJson<ReservaType>(informacoesReserva as string) as ReservaType;
    //Buscar informações da reserva na api
    console.log('Buscando informações da reserva para hospedagem de: ', )
    const { reservaId } = reserva.value;
    if (reservaId)
      await buscarReservaAsync(reservaId)
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
        <Topo :nome-hospede="reserva.nome" :apartamento="reserva.apartamento" />
      </div>
      <div class="col-md-1"></div>
    </div>
    <Reserva />
  </div>



</template>
