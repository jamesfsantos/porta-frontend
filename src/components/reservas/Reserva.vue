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
const promptGpsHabilitado = ref(false);
const gpsHabilitado = ref(false);
const dispositivoEstaProximo = ref(false);

const error = (errorGps: any) => {

  if (errorGps) {
    gpsHabilitado.value = true;
    console.log("Erro de gps", errorGps);
  } else {
    gpsHabilitado.value = false;
  }

}


const options = {
  maximumAge: 1000,
  enableHighAccuracy: false,
  timeout: 15000,
}


const coordenadaHospede = ref<CoordenadaModel>()

function mostrarPromptGps() {
  console.log('verificar prompt gps')
  if (!promptGpsHabilitado.value) return;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);
    },
    (error) => {
      console.error("Error Code: " + error.code + " - " + error.message);
    }
  );
}

function handlePosicaoHospede(posicao: any) {
  gpsHabilitado.value = true;
  //verificar coordenadas habilitadas
  coordenadaHospede.value = posicao.coords as CoordenadaModel;
  //coordenadaHospede.value = {latitude: -20.780711541231902, longitude:-51.7030286916198} as CoordenadaModel
  console.log('coords -> hospede', posicao.coords);


}

function verificarPermissaoLocalizacao() {
  let _gpsHabilitado = false;
  let timerInterval = setInterval(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {

      _gpsHabilitado = result.state === 'granted';

      if (!_gpsHabilitado) {
        setTimeout(() => {
          gpsHabilitado.value = _gpsHabilitado;
        }, 1000);
      }
      promptGpsHabilitado.value = result.state === 'prompt';

      if (_gpsHabilitado) {
        clearInterval(timerInterval);
      }
    });
  }, 1000);
}

onMounted(() => {
  navigator.geolocation.watchPosition(handlePosicaoHospede, error, options);
  verificarPermissaoLocalizacao();

})
function handleAtualizarProximidade(estaProximo: boolean) {
  console.log('atualizar proximidade', estaProximo);
  dispositivoEstaProximo.value = estaProximo;
}
async function handleDispositivoEstaProximo(acionamento: AcionamentoType) {
  await acionamentoService.acionarDispositivo(acionamento);
}
</script>

<template>


  <div v-if="!gpsHabilitado">
    <div class="btn2">
      Você precisa habilitar a Geolocalização para acessar as funcionalidades.
      {{ mostrarPromptGps() }}
    </div>

  </div>

  <!-- Acesso -->
  <div class="card">
    <div class='status' v-if="store.reserva?.statusReserva == EStatusReserva.VIGENTE">● ACESSO ATIVO</div>
    <div class="status-expirado" v-if="store.reserva?.statusReserva == EStatusReserva.EXPIRADA">● ACESSO EXPIRADO</div>
    <div class="status-futuro" v-if="store.reserva?.statusReserva == EStatusReserva.FUTURA">● ACESSO FUTURO</div>

    <div class="info">📅 {{ utils.dateTimeUtils.toDatePtBR(store.reserva?.dataEntrada) }} → {{
      utils.dateTimeUtils.toDatePtBR(store.reserva?.dataSaida) }}</div>
    <div class="info">⏰ Check-in: Após às 13h MS</div>
    <div class="info">⏰ Check-out: Até às 11h MS</div>


    <div class="senha">
      🔐 SENHA
      <span v-if="store.reserva?.statusReserva == EStatusReserva.VIGENTE">{{ store.reserva && store.reserva.codigo
      }}</span>
      <span v-else>*****</span>
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

      <BotoaComando :key="dispositivo.id" :dispositivo="dispositivo" :reserva-id="store.reserva?.id!"
        :coordenada-hospede="coordenadaHospede!" @on-atualizacao-proximidade="handleAtualizarProximidade"
        @on-dispositivo-proximo="handleDispositivoEstaProximo" />
    </div>

  </div>
</template>

<style scoped></style>
