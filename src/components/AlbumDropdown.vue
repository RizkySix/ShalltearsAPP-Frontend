<template>
  <div v-if="albumDropdown" id="dropdownList" class="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li v-if="route.name !== 'archive.album'" >
        <RouterLink :to="'/album/' + slug + '/edit'" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</RouterLink>
        </li>
        <li>
        <a v-if="route.name !== 'archive.album'" @click="archivePost(postUuid)"  class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Archive</a>
        <a v-if="route.name === 'archive.album'" @click="restorePost(postUuid)"  class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Tampilkan ke album</a>
        </li>
        <li>
        <a @click="deletePost(postUuid)" class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
        </li>
    </ul>
</div>

<button class="hidden" type="button" id="successInfo" @click="this.$toast.success('Aksi berhasil')">hidden</button>
<button class="hidden" type="button" id="failedInfo" @click="this.$toast.error('Aksi gagal')">hidden</button>
</template>

<script setup>
import axios from 'axios';
import { useAlbumStore } from '@/stores/album.js'
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import http from '../helper/http';

defineProps({
    albumDropdown: Boolean,
    slug: String,
    postUuid: String,
})

const route = useRoute()
const albumActivity = useAlbumStore()


const archivePost = (uuid) => {

    http().delete('/api/v1/album/' + uuid , {
    headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  })
  .then((response) => {
   albumActivity.refresh = true
   const successInfo = document.getElementById('successInfo')
   successInfo.click()

  })
  .catch((error) => {
    //console.error(error)
    const failedInfo = document.getElementById('failedInfo')
    failedInfo.click()
  })
}


const deletePost = (uuid) => {
    const confirmed = window.confirm("Album akan terhapus permanen, lanjut?");
    if(confirmed){
      http().post('/api/v1/album/' + uuid + '/force-delete' , {} , {
        headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          albumActivity.refresh = true
          const successInfo = document.getElementById('successInfo')
          successInfo.click()
        })
        .catch((error) => {
          //console.error(error)
          const failedInfo = document.getElementById('failedInfo')
          failedInfo.click()
        })
    }
}


const restorePost = (uuid) => {
  http().post('/api/v1/album/' + uuid + '/restore' , {} , {
    headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  })
  .then((response) => {
    albumActivity.refresh = true
    const successInfo = document.getElementById('successInfo')
    successInfo.click()
  })
  .catch((error) => {
    //console.error(error)
    const failedInfo = document.getElementById('failedInfo')
    failedInfo.click()
  })
}

</script>