import HomeView from '@/views/HomeView.vue'
import ReservaView from '@/views/reservaView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'Home',
        component: HomeView

    },
    {
        path: '/reserva/:codigoReserva',
        name: 'Reserva',
        component: ReservaView

    }

  ],
})

export default router
