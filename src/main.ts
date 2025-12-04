import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons'

import { createBootstrap } from 'bootstrap-vue-next'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

library.add(faBell, faBars)

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      colorScheme: 'light',
      primaryColor: 'blue',
    },
  },
})

app.use(createBootstrap())

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
