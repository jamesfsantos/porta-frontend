<script setup lang="ts">
import Cabecalho from "./components/Cabecalho.vue"
</script>

<template>


  <div class="container">

    <Cabecalho />
    <router-view />
    <div class="footer"><a target="_blank" href="https://www.autoopen.com.br">autoopen.com.br</a></div>
  </div>

</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0f1115;
  color: #fff;
}


.container {
  max-width: 420px;
  margin: auto;
  padding: 20px;
}


.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}


.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}


.subtitle {
  text-align: center;
  color: #3ddc97;
  margin-bottom: 20px;
}


.card {
  background: #1a1d24;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}


.user {
  display: flex;
  align-items: center;
  gap: 10px;
}


.status {
  color: #3ddc97;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center
}

.status-expirado {
  color: #dd3d3d;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center
}

.status-futuro {
  color: #e6641e;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center
}

.info {
  margin: 5px 0;
  color: #ccc;
}


.senha {
  background: #2a2f3a;
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  margin-top: 15px;
}


.senha span {
  display: block;
  font-size: 32px;
  font-weight: bold;
  color: #3ddc97;
  margin-top: 5px;
}


.btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: bold;
}


.btn2 {
  background: #db0505;
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  margin-top: 15px;

  color: rgb(248, 246, 246);
}

.btn-veiculo {
  background: #3ddc97;
  color: black;
}


.btn-social {
  background: #3ddc97;
  color: black;
}


.btn-apto {
  background: #3ddc97;
  color: black;
}

.btn-info {
  background: #3ddc97;
  color: black;
}

.footer {
  text-align: center;
  color: #888;
  margin-top: 15px;
}
</style>
