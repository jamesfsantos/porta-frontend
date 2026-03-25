<script setup lang="ts">
// import type { ReservaType } from '@/models/types/reserva.type';
import { getDistanceFromLatLonInKm } from '../../utils/coordenadasUtils'
import Button from 'primevue/button'
import { ref, onMounted } from 'vue'
import { useReservaStore } from '@/stores/reserva'
import type DispositivoModel from '@/models/dispositivoModel';
import type CoordenadaModel from '@/models/coordenadaModel';
import acionamentoService from '@/services/acionamentoService';
import utils from '@/utils/index'


//ter uma rotina para se comunicar com o dispositivo e verificar o real estado dele. (aberto ou fechado)
//ter que ser feito via websocket
const store = useReservaStore();
const modoDebug= false;

const reservaId = ref(store.reserva?.id?? '');


const error = (err: any) => {
  console.log(err)
}


const options = {
  maximumAge: 1000,
  enableHighAccuracy: false,
  timeout: 15000,
}

// const coordenadaReferencia = ref({ latitude: -23.499897, longitude: -46.724204 })
const coordenadaHospede = ref<CoordenadaModel>()
const botaoHabilitado = ref(false)


function handlePosicaoHospede(posicao: any) {
  coordenadaHospede.value = posicao.coords as CoordenadaModel;
  console.log('coordenadaHospede=>', coordenadaHospede.value)

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function estaProximoDispositivo(dispositivo: DispositivoModel) {

  const { coordenadas } = dispositivo;
  if (coordenadas != null && coordenadaHospede.value != null) {
    const distancia = getDistanceFromLatLonInKm(coordenadas, coordenadaHospede?.value)
    dispositivo.distanciaCalculada = distancia;
    return  (distancia <= 100) // pegar o valor do 100 do dispositivo
  }

  return false;

}

async function handleClickBtnDispositivo(dispositivo: DispositivoModel) {
  const {condominioId, id:dispositivoId, token:tokenDispositivo} = dispositivo;
  const resul = await acionamentoService.acionarDispositivo({
    condominioId,
    dispositivoId,
    reservaId: store.reserva!.id,
    tokenDispositivo,


  })
  console.log('Dispo=>', dispositivo);
}

onMounted(() => {
  navigator.geolocation.watchPosition(handlePosicaoHospede, error, options);
  console.log('reserva do store', store.reserva)

})
</script>

<template>

  <div v-if="!store.achouReserva">
    <h5 class="text-center alert alert-info alert-block">Buscando informações da reserva...</h5>
  </div>

  <div class="reserva-localizada" v-if="store.achouReserva">
    <div class="centro">


      <div class="data-horario">
        <div class="data">
          <span class="t-data">Período de: </span>
          <span class="dias">{{ utils.dateTimeUtils.toDatePtBR(store.reserva?.dataEntrada) }} até {{ utils.dateTimeUtils.toDatePtBR(store.reserva?.dataSaida) }}</span>
          <div class="row">
        <div class="col">
          <span class="t-data">Senha de acesso:</span>
            <span class="t-data badge text-bg-success p-1">&nbsp;{{ store.reserva && store.reserva.codigo }}</span>

        </div>
      </div>
        </div>
        <div class="horario">
          <span class="horario">Entrada: após 13:00</span><br />
          <span class="horario">Saida: até 11:00</span>
        </div>
      </div>

      <div class="botoes">
        <div class="portao mb-5" v-for="dispositivo in store.reserva?.dispositivos" :key="dispositivo.id">

          <div v-if="modoDebug">
            <h4>Modo debug ativo</h4>
            <pre class="alert alert-block alert-warning">
               {{ dispositivo }} <br />
            </pre>
            <h5>Store</h5>
             <pre class="alert alert-block alert-warning">
            {{ store.reserva }}
             </pre>
          </div>

          <Button v-if="dispositivo.permiteAcionamentoRemoto"
            @click="() => handleClickBtnDispositivo(dispositivo)"
            :label="dispositivo.nome" class="b-botao"
            :disabled="!estaProximoDispositivo(dispositivo)" />

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.data-horario {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
  border: 2px solid gray;
  border-radius: 20px;
  align-items: center;
}

.botoes {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.portao {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.t-botao {
  font-size: 25px;
}

.b-botao {
  width: 300px;
  height: 70px;
  font-size: 25px;
  color: black;
}

.t-data,
.horario {
  font-size: 20px;
}
</style>
