<template>
  <div class=" p-5 mx-auto bg-white">
        <form @submit.prevent="handleEmergency" action="">
            <div v-if="limit" >
                <span class="text-xs text-red-600">⌛Limit harian digunakan, kirim lagi dalam {{ limit }} jam</span> <br>
            </div>
            <label for="emergency-call" class="font-bold text-base">Pesan untuk para Shalltears</label>
            <textarea v-model="emergencyData.message" id="emergency-call" rows="4" class="block mt-3 mb-3 me-1 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mai warung..." required></textarea>

            <label for="place" class="font-bold text-base">Lokasi pertemuan</label>
            <GMapAutocomplete @place_changed="setPlace" type="text" name="place" id="place" class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chaos war gaming house" required></GMapAutocomplete>

            <div id="awig-awig" class="mt-4">
                <span class="text-sm">📩 Seluruh pengguna aktif akan menerima pesan anda!!!</span>
                <p class="text-sm">⌚ Anda hanya dapat mengirim pesan ini 1x24 jam</p>
            </div>

            <div class="w-full flex justify-end">
                <button v-if="!limit" @submit.prevent="handleEmergency" type="submit" class="mb-1 w-24 mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>

                <button v-else type="button" disabled class="mb-1 w-24 mt-4 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-not-allowed">Send</button>
            </div>
        </form>

    </div>

</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useUserAuthStore } from "@/stores/authUser";
import http from '../helper/http';
import toastShow from '../helper/toastShow';

const emergencyData = reactive({
    message: '',
    place: '',
    map: ''
})
const limit = ref(null)

const setPlace = (event) => {
    emergencyData.place = event.name
    emergencyData.map = event.url
}

const userAuth = useUserAuthStore()

const handleEmergency = () => {

    if(emergencyData.place == '' || emergencyData.url == ''){
        document.querySelector('#place').classList.remove('border-gray-300')
        document.querySelector('#place').classList.add('border-red-700')
        return false
    }

    http().post('/api/v1/emergency-mail' , emergencyData , {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        })
        .then((response) => {
            userAuth.emergencySent = true
            toastShow('Pesan terkirim est 2 min' , true)
        })
        .catch((error) => {
           toastShow('Gagal terkirim' , false)
        })
}

//cek access emergency call
const checkLimit = () => {
    http().get('/api/v1/emergency-mail/limit' ,{
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        })
        .then((response) => {

        })
        .catch((error) => {
            limit.value = error.response.data.message
        })
}

onMounted(() => {
    checkLimit()
})

</script>