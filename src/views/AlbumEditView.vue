<template>
     <div class="block w-3/5 md:w-1/3 mx-auto mt-10 h-auto md:h-[500px]">
    <div class="w-full rounded-lg  bg-white shadow">
        
        <div class="h-auto p-4 text-center">
            <h1 class="font-bold">Edit Album</h1>
        </div>

       <div v-if="images.length != 0" class="max-h-full">
         <Swipper :images="images" :albumEdit="true"  />

         <div class="h-auto p-4">
           <form action="#" @submit.prevent="handleEditAlbum">
            <label for="caption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Caption anda</label>
            <textarea v-model="caption" name="caption" id="caption" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="I need more bullets...">
             <pre>
                {{ caption }}
             </pre>
            </textarea>

            <div class="w-full flex justify-end">
            <button @submit.prevent="handleEditAlbum" type="submit" class="mb-1 w-24 mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Perbarui</button>
        </div>
            </form>
         </div>
       </div>
       <div v-else>
       <LoadedV2/>
       </div>

      
    </div>


  </div>
</template>

<script setup>
import axios from 'axios';
import http from '@/helper/http'
import toastShow from '@/helper/toastShow'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import Swipper from "@/components/Swipper.vue";
import LoadedV2 from "@/components/LoadedV2.vue";
import { useUserAuthStore } from '@/stores/authUser'

const route = useRoute()
const router = useRouter()
const authUser = useUserAuthStore()

const images = ref([])
const caption = ref('')
const getContents = (slug) => {
    images.value = []

    http().get('/api/v1/album/' + slug , {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        })
        .then((response) => {
            caption.value = response.data.caption
            response.data.images.forEach(element => {
                images.value.push({
                    id: element['id'],
                    image: element['content']
                })
            })
        })
        .catch((error) => {
           // console.error(error)
        })
}

const handleEditAlbum = () => {
    http().put('/api/v1/album/' + route.params.slug , {caption: caption.value} , {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        })
        .then((response) => {
           router.push({
                path: '/profile/' + authUser.username
           })
           toastShow('Album diperbarui' , true)
        })
        .catch((error) => {
            toastShow('Album gagal diperbarui' , false)
        })
}

onMounted(() => {
    getContents(route.params.slug)
})
</script>


<style scoped>

pre {
  overflow-x: auto;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>