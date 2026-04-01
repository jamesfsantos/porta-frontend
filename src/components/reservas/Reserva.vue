<script setup lang="ts">

import { ref, onMounted } from 'vue'
import Message from 'primevue/message';
import { useReservaStore } from '@/stores/reserva'
import type CoordenadaModel from '@/models/coordenadaModel';
import acionamentoService from '@/services/acionamentoService';
import utils from '@/utils/index'

import BotoaComando from "./BotaoComando.vue"
import type { AcionamentoType } from '@/models/types/acionamentoType';
import { EStatusReserva } from '@/models/types/EStatusReserva.enum';

//ter uma rotina para se comunicar com o dispositivo e verificar o real estado dele. (aberto ou fechado)
//ter que ser feito via websocket
const store = useReservaStore();
const modoDebug = false;
const dispositivoEstaProximo = ref(false);

const error = (err: any) => {
  console.log(err)
}


const options = {
  maximumAge: 1000,
  enableHighAccuracy: false,
  timeout: 15000,
}


const coordenadaHospede = ref<CoordenadaModel>()

function handlePosicaoHospede(posicao: any) {
  //verificar coordenadas habilitadas
  coordenadaHospede.value = posicao.coords as CoordenadaModel;
  //coordenadaHospede.value = {latitude: -20.780711541231902, longitude:-51.7030286916198} as CoordenadaModel


}


onMounted(() => {
  navigator.geolocation.watchPosition(handlePosicaoHospede, error, options);
  console.log('reserva:=>', store.reserva)

})

async function handleDispositivoEstaProximo(acionamento: AcionamentoType) {
  dispositivoEstaProximo.value = acionamento.estaProximo;
  console.log('dados', acionamento);
 // await acionamentoService.acionarDispositivo(acionamento);
}
</script>

<template>




  <!-- Acesso -->
  <div class="card">
    <div class='status' v-if="store.reserva?.statusReserva == EStatusReserva.VIGENTE" >● ACESSO ATIVO</div>
    <div class="status-expirado" v-if="store.reserva?.statusReserva == EStatusReserva.EXPIRADA" >● ACESSO EXPIRADO</div>
    <div class="status-futuro" v-if="store.reserva?.statusReserva == EStatusReserva.FUTURA" >● ACESSO FUTURO</div>

    <div class="info">📅 {{ utils.dateTimeUtils.toDatePtBR(store.reserva?.dataEntrada) }} → {{
      utils.dateTimeUtils.toDatePtBR(store.reserva?.dataSaida) }}</div>
    <div class="info">⏰ Check-in: Após às 13h MS</div>
    <div class="info">⏰ Check-out: Até às 11h MS</div>


    <div class="senha">
      🔐 SENHA
      <span v-if="store.reserva?.statusReserva == EStatusReserva.VIGENTE" >{{ store.reserva && store.reserva.codigo }}</span>
      <span v-else >*****</span>
    </div>
  </div>

  <div>
    <div class="btn2" v-if="!dispositivoEstaProximo && store.reserva?.statusReserva == EStatusReserva.VIGENTE">
      Você encontra-se fora do raio de 100 metros da hospedagem, a função de abertura só será ativa dentro deste raio!
    </div>
    <br>
     <div class="btn2" v-if="store.reserva?.statusReserva == EStatusReserva.EXPIRADA">
    Sua hospedagem passou do período, a função de abertura apenas é ativa dentro do tempo da sua estadia!
    </div>
      <div class="btn2" v-if="store.reserva?.statusReserva == EStatusReserva.FUTURA">
        Sua hospedagem não está no período, a função de abertura apenas será ativa dentro do tempo da sua estadia!
    </div>

  </div>


  <div v-if="!store.achouReserva">
    <Message severity="info" class="text-center">Buscando informações da reserva...</Message>
  </div>

  <div v-if="store.achouReserva">
      <div v-for="dispositivo in store.reserva?.dispositivos" :key="dispositivo.id">

        <BotoaComando
          :key="dispositivo.id" :dispositivo="dispositivo" :reserva-id="store.reserva?.id!"
          :coordenada-hospede="coordenadaHospede!"
          @on-dispositivo-proximo="handleDispositivoEstaProximo"
          />
      </div>

  </div>
</template>

<style scoped>
</style>
