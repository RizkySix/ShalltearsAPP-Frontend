<template>

<BaseModal :modalActive="modalActive" :width="modalWidth" @close-modal="toggleModal">
<EditThread :slug="slug" :thread="thread" />
</BaseModal>

    <div v-if="threadDropdown" id="dropdownList" class="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li >
          <a @click="toggleModal" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
          </li>
    
          <li>
          <a @click="deletePost(postUuid)" class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
          </li>
      </ul>
  </div>
  <button class="hidden" type="button" id="deletedThread" @click="this.$toast.success(`Thread berhasil dihapus`)">hidden</button>
  </template>

<script setup>
import BaseModal from "@/components/BaseModal.vue";
import EditThread from "@/components/EditThread.vue";
import axios from "axios";
import { useAlbumStore } from '@/stores/album.js'
import { ref } from "vue";
import http from "../helper/http";

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

const albumActivity = useAlbumStore()
const deletePost = (uuid) => {
  const confirmation = window.confirm("Lanjut hapus thread permanent?");

  if (confirmation) {
    http().post('/api/v1/thread/' + uuid + '/force-delete' , {} , {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    })
    .then((response) => {
        albumActivity.refresh = true 
        const deleted = document.querySelector('#deletedThread')
        deleted.click()
    })
    .catch((error) => {
        console.error(error.response.status)
    })
  }
}


</script>