import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toaster from '@meforma/vue-toaster';

import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toaster)

app.use(VueGoogleMaps , {
    load: {
        key: 'AIzaSyCAqdwRPpTtDGc6lWZKlSO0EPgkAKRo-8o', //ini adalah kunci dari tutorial 
        libraries: "places"
    }
})


app.mount('#app')
