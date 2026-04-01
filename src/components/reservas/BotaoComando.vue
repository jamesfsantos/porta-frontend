<script setup lang="ts">
import type DispositivoModel from '@/models/dispositivoModel';
import { getDistanceFromLatLonInKm } from '../../utils/coordenadasUtils'
import { onMounted, ref } from 'vue'
import type CoordenadaModel from '@/models/coordenadaModel';


const distanciaDispositivoHospedagem = ref(0);
const dispositivoEstaProximo = ref(false);
const emit = defineEmits(['onDispositivoProximo'])

const props = defineProps<{
  dispositivo: DispositivoModel,
  coordenadaHospede: CoordenadaModel
  reservaId: string
}>();

onMounted(() => {
  checkTriggerDispositivoProximo(props.dispositivo);
})

function checkTriggerDispositivoProximo(dispositivo:DispositivoModel) {
  const { condominioId, id: dispositivoId, token: tokenDispositivo } = dispositivo;
   const estaProximo = estaProximoDispositivo(dispositivo);

   if(!estaProximo) return;

  emit('onDispositivoProximo', {
    condominioId,
    dispositivoId,
    reservaId: props.reservaId,
    tokenDispositivo,
    estaProximo,
    nomeDispositivo:dispositivo.nome
  })
}
async function handleClickBtnDispositivo(dispositivo: DispositivoModel) {

  const estaProximo = estaProximoDispositivo(dispositivo);
  if (!estaProximo) return;
  checkTriggerDispositivoProximo(dispositivo);

}

function estaProximoDispositivo(dispositivo: DispositivoModel) {

  const { coordenadas } = dispositivo;

  if (coordenadas != null && props.coordenadaHospede != null) {
    const distancia = getDistanceFromLatLonInKm(coordenadas, props.coordenadaHospede)
    dispositivo.distanciaCalculada = distancia;
    distanciaDispositivoHospedagem.value = distancia;
    dispositivoEstaProximo.value = (distancia <= 100) // pegar o valor do 100 do dispositivo
  }
console.log('prox', dispositivoEstaProximo.value);
return dispositivoEstaProximo.value;

}

function obterIconeBotao(nome: string): string {
  if (nome.toLowerCase().includes("veículo") || nome.toLowerCase().includes("veiculo"))
    return '🚗';

  if (nome.toLowerCase().includes("social"))
    return '👤';

  if (nome.toLowerCase().includes("apto"))
    return '🔑';


  return '';
}


</script>
<template>
  <div>
    <button class="btn btn-veiculo"
    type="button"
      v-if="dispositivo.permiteAcionamentoRemoto && dispositivoEstaProximo"
      @click="() => handleClickBtnDispositivo(dispositivo)" :label="dispositivo.nome"
      :disabled="!estaProximoDispositivo(dispositivo)">
      {{ obterIconeBotao(props.dispositivo.nome) }} ABRIR {{ props.dispositivo.nome.toUpperCase() }}
    </button>

  </div>
</template>
