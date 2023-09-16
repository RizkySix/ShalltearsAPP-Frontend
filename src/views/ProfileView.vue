<template>
  <Navbar/>
  
  <div>
  
  <section v-if="isExist == 'fetched'" class="mb-24 lg:mb-12">
    <div class="w-full max-w-3xl m-auto bg-white border border-gray-200 rounded-lg shadow">
   <div class="flex items-center justify-around p-4">
      <img v-if="dataUser.foto_profile !== ''" class=" lg:w-32 lg:h-32 w-24 h-24 rounded-full shadow-lg" :src="dataUser.foto_profile" alt="Rusak"/>
      <img v-else class=" lg:w-32 lg:h-32 w-24 h-24 rounded-full shadow-lg" src="@/assets/clown.jpg" alt="Rusak"/>
      <div class="ms-4 lg:ms-0">
        <h5 class="text-base md:text-lg font-semibold text-gray-900 ">{{ dataUser.full_name }}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">@{{ dataUser.username }}</span>
      </div>
      <div class="flex justify-between">
      <div class="me-4">
        <span class="text-lg font-semibold text-gray-900 ">{{ dataUser.total_threads }}</span> <br>
        <span class=" font-semibold text-gray-900 ">Threads</span>
      </div>
      <div>
        <span class="text-lg  font-semibold text-gray-900 ">{{ dataUser.total_albums }}</span> <br>
        <span class=" font-semibold text-gray-900 ">Albums</span>
      </div>
    </div>
    </div>
  <div class="p-4 w-1/2">
    <p id="bio" class="text-sm text-gray-700 dark:text-gray-400">{{ dataUser.bio }}</p>
  </div>
  <div v-if="route.params.username === authUser.username" class="p-4 border-t border-gray-200 dark:border-gray-700">
    <button @click="toEditProfile" class="w-full text-white bg-blue-700 py-2 px-4 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Profile</button>
  </div>

  
<!-- Breadcrumb -->
<nav class="flex px-5 py-3 text-gray-700 border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
  <ol class="inline-flex items-center mx-auto space-x-1 md:space-x-3">
    <li class="inline-flex items-center">
      <RouterLink v-if="route.name === 'profile'" id="album" :to="'/profile/' + route.params.username" class=" inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <i class="fa-regular fa-images w-3 h-3 mr-2.5"></i>
        Albums
      </RouterLink>
      <RouterLink v-else id="album" :to="'/profile/' + route.params.username" class=" inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <i class="fa-regular fa-images w-3 h-3 mr-2.5"></i>
        Albums
      </RouterLink>
    </li>
    <li>
      <div class="flex items-center">
        <svg class="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <RouterLink v-if="route.name === 'profile.threads'" id="thread" :to="'/profile/' + route.params.username + '/threads'" class="ml-1 text-sm font-medium text-blue-600 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
          <i class="fa-solid fa-comments w-3 h-3 mr-2.5"></i>
          Threads
        </RouterLink>
        <RouterLink v-else id="thread" :to="'/profile/' + route.params.username + '/threads'" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
          <i class="fa-solid fa-comments w-3 h-3 mr-2.5"></i>
          Threads
        </RouterLink>
      </div>
    </li>
    <li v-if="route.params.username == authUser.username" aria-current="page">
      <div class="flex items-center">
        <svg class="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <RouterLink v-if="route.name === 'archive.album'" id="archive" :to="'/profile/' + route.params.username + '/archive'" class="ml-1 text-sm font-medium text-blue-600 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
          <i class="fa-solid fa-inbox w-3 h-3 mr-2.5"></i>
          Archive
        </RouterLink>
        <RouterLink v-else id="archive" :to="'/profile/' + route.params.username + '/archive'" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
          <i class="fa-solid fa-inbox w-3 h-3 mr-2.5"></i>
          Archive
        </RouterLink>
      </div>
    </li>
  </ol>
</nav>
</div>

<PersonalAlbum v-if="route.name === 'profile' || route.name === 'archive.album'" v-model:foto_profile="dataUser.foto_profile" v-model:username="dataUser.username" />

<PersonalThread v-if="route.name === 'profile.threads'" v-model:foto_profile="dataUser.foto_profile" v-model:username="dataUser.username" />

  </section>

 <section v-if="isExist == 'failed'">
   <NotFoundView/>
 </section>


 <section v-if="isExist == ''">
   <Loaded/>
 </section>
</div>



<BottomNavbar/>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
import NotFoundView from "@/components/NotFoundView.vue";
import Loaded from "@/components/Loaded.vue";
import PersonalAlbum from "@/components/PersonalAlbum.vue";
import PersonalThread from "@/components/PersonalThread.vue";

import { ref , onMounted , reactive, watch } from "vue"
import { useRoute, useRouter } from "vue-router";
import { useAlbumStore } from '@/stores/album.js'
import { useUserAuthStore } from '@/stores/authUser.js'
import axios from "axios";
import http from "../helper/http";

const route = useRoute()
const router = useRouter()

const dataUser = reactive({
    total_threads: '',
    total_albums: '',
    full_name: '',
    username: '',
    bio: '',
    foto_profile: ''

})

const isExist = ref('')
const authUser = useUserAuthStore()

/* Personal profile */
  const toProfile = (username) => {
       http().get('/api/v1/user/profile/' + username , {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
         dataUser.total_albums = response.data.total_albums,
         dataUser.total_threads = response.data.total_threads,
         dataUser.full_name = response.data.data.first_name + " " + response.data.data.last_name,
         dataUser.username = response.data.data.username,
         dataUser.bio = response.data.data.bio,
         response.data.data.foto_profile == null ? dataUser.foto_profile = '' : dataUser.foto_profile = response.data.data.foto_profile 

         isExist.value = 'fetched'
      })
      .catch((error) => {
        console.error(error)
        isExist.value = 'failed'
      })
  }


  const toEditProfile = () => {
      router.push({
          path: '/profile/' + authUser.username + '/edit'
      })
  }

  const albumActivity = useAlbumStore()

  watch(
    [
      () => route.params.username , 
      () => albumActivity.refresh
    ] , ([username , refresh] , [prevUsername , prevRefresh]) =>  {
      toProfile(username)
  })

  onMounted(() => {
    toProfile(route.params.username)
  })




</script>