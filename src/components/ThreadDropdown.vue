<template>
  <ConfirmBox :confirmActive="confirmActive" @close-confirm="showConfirmBox">
    <div class="p-4 text-center">
       <span class="font-semibold text-lg">
          Lanjut Hapus Thread?
       </span>
    </div>
  </ConfirmBox>


<BaseModal :modalActive="modalActive" :width="modalWidth" @close-modal="toggleModal">
<EditThread :slug="slug" :thread="thread" />
</BaseModal>

    <div v-if="threadDropdown" id="dropdownList" class="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li >
          <a @click="toggleModal" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
          </li>
    
          <li>
          <a @click="showConfirmBox()" class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
          </li>
      </ul>
  </div>
 
  </template>

<script setup>
import BaseModal from "@/components/BaseModal.vue";
import EditThread from "@/components/EditThread.vue";
import ConfirmBox from "@/components/ConfirmBox.vue";

import axios from "axios";
import { useAlbumStore } from '@/stores/album.js'
import { ref, watch } from "vue";
import http from "../helper/http";
import toastShow from "../helper/toastShow";

const props = defineProps({
    threadDropdown: Boolean,
    slug: String,
    postUuid: String,
    thread: String
})

const modalActive = ref(null)
const modalWidth = ref('max-w-2xl')

const toggleModal = () => {
    modalActive.value = !modalActive.value
    modalActive.value == true ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
}

const confirmActive = ref(null)
const showConfirmBox = () => {
  confirmActive.value = !confirmActive.value
  document.body.style.overflow = 'hidden'
}


const albumActivity = useAlbumStore()
const deletePost = (uuid) => {
  http().post('/api/v1/thread/' + uuid + '/force-delete' , {} , {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    })
    .then((response) => {
        albumActivity.refresh = true 
        toastShow('Thread terhapus' , true)
    })
    .catch((error) => {
        //console.error(error.response.status)
    })
   
}

watch([() => albumActivity.confirmBoxAct] , ([currentAct] , [prevAct]) => {
    currentAct == true ? (deletePost(props.postUuid) , albumActivity.confirmBoxAct = null) : albumActivity.confirmBoxAct = null
    document.body.style.overflow = 'visible'
} )


</script>