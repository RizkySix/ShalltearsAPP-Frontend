<template>
  <ConfirmBox :confirmActive="confirmActive" @close-confirm="showConfirmBox">
    <div class="p-4 text-center">
       <span class="font-semibold text-lg">
          Lanjut Delete?
       </span>
    </div>
  </ConfirmBox>

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
        <a @click="showConfirmBox()" class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
        </li>
    </ul>
</div>

</template>

<script setup>
import axios from 'axios';
import { useAlbumStore } from '@/stores/album.js'
import { useRoute } from 'vue-router';
import http from '../helper/http';
import toastShow from '../helper/toastShow';

import ConfirmBox from "@/components/ConfirmBox.vue";
import { ref, watch } from 'vue';

const props = defineProps({
    albumDropdown: Boolean,
    slug: String,
    postUuid: String,
})

const route = useRoute()
const albumActivity = useAlbumStore()

const confirmActive = ref(null)
const showConfirmBox = () => {
  confirmActive.value = !confirmActive.value
  document.body.style.overflow = 'hidden'
}


const archivePost = (uuid) => {

    http().delete('/api/v1/album/' + uuid , {
    headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  })
  .then((response) => {
   albumActivity.refresh = true
   toastShow('Album diarsipkan' , true)

  })
  .catch((error) => {
    //console.error(error)
   toastShow('Aksi gagal', false)
  })
}


const deletePost = (uuid) => {
    http().post('/api/v1/album/' + uuid + '/force-delete' , {} , {
        headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          albumActivity.refresh = true
          toastShow('Album dihapus' , true)
        })
        .catch((error) => {
          console.error(error)
          toastShow('Aksi gagal' , false)
        })
}


const restorePost = (uuid) => {
  http().post('/api/v1/album/' + uuid + '/restore' , {} , {
    headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  })
  .then((response) => {
    albumActivity.refresh = true
    toastShow('Album ditampilkan' , true)
  })
  .catch((error) => {
    //console.error(error)
    toastShow('Aksi gagal' , false)
  })
}

watch([() => albumActivity.confirmBoxAct] , ([currentAct] , [prevAct]) => {
    currentAct == true ? (deletePost(props.postUuid) , albumActivity.confirmBoxAct = null) : albumActivity.confirmBoxAct = null

    document.body.style.overflow = 'visible'
} )

</script>