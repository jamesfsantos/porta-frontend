import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type ReservaModel from '@/models/reservaModel'

export const useReservaStore = defineStore('reserva', () => {

  const _reserva = ref<ReservaModel>();
  const achouReserva = ref(false);

  function setReserva(reserva: ReservaModel) {
    _reserva.value = reserva;
    achouReserva.value = reserva != null;
  }


  return { reserva: _reserva, achouReserva, setReserva }
})
