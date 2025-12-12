<script setup lang="ts">
// import type { ReservaType } from '@/models/types/reserva.type';
import type ReservaModel from '@/models/reservaModel';
import { getDistanceFromLatLonInKm } from '../../utils/coordenadasUtils'
import Button from 'primevue/button'
import { ref, onMounted } from 'vue'
import reservaService from '@/services/reservaService';

const props = defineProps(['reservaId']);


const achouReserva = ref(false);

const error = (err: any) => {
  console.log(err)
}


const options = {
  maximumAge: 1000,
  enableHighAccuracy: false,
  timeout: 15000,
}

const coordenadaReferencia = ref({ latitude: -23.499897, longitude: -46.724204 })
const botaoHabilitado = ref(false)
const reserva = ref<ReservaModel>()


async function buscarReservaAsync(reservaId:string){
    reserva.value = await reservaService.obterReserva(reservaId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verificarProximidade(posicao: any) {
  console.log('pos', posicao)
  const distancia = getDistanceFromLatLonInKm(posicao.coords, coordenadaReferencia.value)
  console.log('Distancia: ', distancia) // Exemplo de saída: "14567"
  botaoHabilitado.value = distancia <= 50
}

onMounted(async () => {
  if(props.reservaId)
    await buscarReservaAsync(props.reservaId);

  navigator.geolocation.watchPosition(verificarProximidade, error, options)
})
</script>

<template>

  <div v-if="!achouReserva">
    <h1 class="text-center alert alert-info alert-block">Buscando informações da reserva...</h1>
  </div>

  <div class="reserva-localizada" v-if="achouReserva">
    <div class="centro">


      <div class="data-horario">
        <div class="data">
          <span class="t-data">Data:</span><br />
          <span class="dias">15/11/2025 a 15/12/2025</span>
        </div>
        <div class="horario">
          <span class="horario">Entrada: após 13:00</span><br />
          <span class="horario">Saida: até 11:00</span>
        </div>
      </div>
      <div class="botoes">
        <div class="portao mb-5">
          <h1 class="t-botao">Portão de Veiculo:</h1>
          <Button label="Aberto" class="b-botao" :disabled="!botaoHabilitado" />
        </div>
        <div class="portao mb-5">
          <h1 class="t-botao">Portão de Pedestre:</h1>
          <Button label="Aberto" class="b-botao" />
        </div>
        <div class="portao mb-5">
          <h1 class="t-botao">Portão do Apartamento:</h1>
          <Button label="Aberto" class="b-botao" />
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
