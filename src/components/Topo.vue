<script setup lang="ts">

</script>

<template>
  <div class="topo mb-5">
    <div class="porta-not">
      <font-awesome-icon icon="bars" class="icon menu" />
      <span class="titulo">Porta</span>
      <font-awesome-icon icon="bell" class="icon" />
    </div>

    <h2 class="status">On-line</h2>

    <span>Hóspede: James</span>
    <br>
    <span>Apartamento: 703</span>

  </div>

</template>

<style scoped>
.topo {
  /* border: 1px solid red; */
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid black;
}

.titulo {
  font-size: 30px;
}

.porta-not {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  font-size: 25px;
}
</style>
