<script setup lang="ts">
import Button from 'primevue/button';


</script>

<template>


  <div class="centro">
    <div class="data-horario ">
      <div class="data">
        <span class="t-data">Data:</span><br>
        <span class="dias">15/11/2025 a 15/12/2025</span>
      </div>
      <div class="horario">
        <span class="horario">Entrada: após 13:00</span><br>
        <span class="horario">Saida: até 11:00</span>
      </div>
    </div>
    <div class="botoes">
      <div class="portao mb-5">
        <h1 class="t-botao">Portão de Veiculo: </h1>
        <Button label="Aberto" class="b-botao" />
      </div>
      <div class="portao mb-5">
        <h1 class="t-botao">Portão de Pedestre: </h1>
        <Button label="Aberto" class="b-botao" />
      </div>
      <div class="portao mb-5">
        <h1 class="t-botao">Portão do Apartamento: </h1>
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
