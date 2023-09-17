<template>
    <div class=" p-5 mx-auto">
        <form action="" @submit.prevent="handleEditThread(slug)">
            <label for="thread" class="font-bold text-base">Perbarui thread anda</label>
            <textarea v-model="newThread" id="thread" rows="6" class="block mt-3 me-1 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Tuliskan perasaan mu hari ini..." required>{{ newThread }}</textarea>
            
            <div class="w-full flex justify-end">
                <button @submit.prevent="handleEditThread(slug)" type="submit" class="mb-1 w-24 mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Perbarui</button>
            </div>
        </form>

    </div>

</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlbumStore } from '@/stores/album.js'
import http from '../helper/http';
import toastShow from '../helper/toastShow';

const props = defineProps({
    slug: String,
    thread: String
})

const newThread = ref(props.thread)
const router = useRouter()
const albumActivity = useAlbumStore()

const handleEditThread = (slug) => {
    http().put('/api/v1/thread/' + slug , {text: newThread.value} , {
        headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    })
    .then((response) => {
        albumActivity.refresh = true
        toastShow('Thread diperbarui' , true)
    })
    .catch((error) => {
        console.error(error.response.status)
        if(error.response.status == 403){
            document.querySelector('textarea').classList.remove('border-gray-300')
            document.querySelector('textarea').classList.add('border-red-700')
           toastShow('Tidak dapat update lebih dari 1 jam' , false)
        }
    })
}

</script>