import HomeView from '@/views/HomeView.vue'
import ReservaView from '@/views/ReservaView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'Home',
        component: ReservaView

    },
    {
        path: '/reserva/:informacoesReserva',
        name: 'Reserva',
        component: ReservaView

    }

  ],
})

export default router
