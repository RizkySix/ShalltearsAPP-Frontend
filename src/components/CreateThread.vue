<template>
    <div class=" p-5 mx-auto">
        <form action="" @submit.prevent="handleCreateThread">
            <label for="thread" class="font-bold text-base">Tulis thread hari ini</label>
            <textarea v-model="thread" id="thread" rows="4" class="block mt-3 me-1 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan perasaan mu hari ini..." required></textarea>

            <div class="w-full flex justify-end">
                <button @submit.prevent="handleCreateThread" type="submit" class="mb-1 w-24 mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Posting</button>
            </div>
        </form>

    </div>

</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlbumStore } from '@/stores/album';
import http from '../helper/http';
import toastShow from '../helper/toastShow';

const thread = ref('')
const router = useRouter()

const albumActivity = useAlbumStore()
const handleCreateThread = () => {
    http().post('/api/v1/thread' , {text: thread.value} , {
        headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    })
    .then((response) => {
       
        albumActivity.refresh = true
        router.push({
            path: '/explorer'
        })
        toastShow('Thread dibuat' , true)
    })
    .catch((error) => {
        console.error(error)
    })
}

</script>