<script setup lang="ts">
import Button from 'primevue/button'
import { ref, onMounted } from 'vue'

const options = {
  maximumAge: 1000,
  enableHighAccuracy: false,
  timeout: 15000,
}

const error = (err:any) => {
  console.log(err)
}

const coordenadaReferencia = ref({ latitude: -23.499897, longitude: -46.724204 })

function getDistanceFromLatLonInKm(position1:any, position2:any): number {
  const deg2rad = function (deg:number) {
      return deg * (Math.PI / 180)
    },
    R = 6371,
    dLat = deg2rad(position2.latitude - position1.latitude),
    dLng = deg2rad(position2.longitude - position1.longitude),
    a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(position1.latitude)) *
        Math.cos(deg2rad(position1.latitude)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2),
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return parseFloat((R * c * 1000).toFixed())
}

const botaoHabilitado = ref(false)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verificarProximidade(posicao: any) {
  console.log('pos', posicao)
  const distancia = getDistanceFromLatLonInKm(posicao.coords, coordenadaReferencia.value)
  console.log('Distancia: ', distancia) // Exemplo de saída: "14567"
  botaoHabilitado.value = distancia <= 50
}

onMounted(() => {
  navigator.geolocation.watchPosition(verificarProximidade, error, options)
})
</script>

<template>
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
