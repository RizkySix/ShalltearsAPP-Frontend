<template>
    <Navbar/>
    
    <section v-if="isExist == 'fetched' && route.params.username === authUser.username">
        <div class=" dark:bg-gray-900 ">
      <div class="flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0 mb-5 md:mb-0 sm:mb-5">
          <div class="w-full lg:max-w-3xl bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Edit Profile
                  </h1>
             
                    <div class="relative cursor-pointer inline-block transition-opacity duration-300 hover:opacity-75 lg:w-32 lg:h-32 w-24 h-24 rounded-full shadow-lg"  
                    @mouseenter="showCameraIcon = true"
                     @mouseleave="showCameraIcon = false"
                     @click="toggleModal">
                      <img
                        v-if="dataUser.foto_profile"
                        class="block max-w-full rounded-full"
                        :src="dataUser.foto_profile"
                        alt="Profile"
                      />
                      <img
                        v-else
                        class="block max-w-full rounded-full"
                        src="@/assets/clown.jpg"
                        alt="Profile"
                      />
                      <!-- saya ingin ketika gambar dihover icon camera ini muncul ditengah-tengah gambar -->
                      <div
                        v-if="showCameraIcon"
                        class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                      >
                        <i class="fa-solid fa-camera-retro text-3xl"></i>
                      </div>
                    </div>
                  
                  <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
                    <ImageCropper />
                  </BaseModal>


                  <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="handleUpdateProfile">
                    <div class="flex items-center justify-between">
                      <div class="items-start">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Depan</label>
                          <input v-model="dataUser.first_name" type="text" name="first_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block lg:w-full md:w-full w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Andika" required="">
                          <div v-if="errorMsg.first_name != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.first_name }}
                            </span>
                        </div>
                      </div>

                      <div class="items-start">
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Belakang</label>
                          <input v-model="dataUser.last_name" type="text" name="last_name" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block lg:w-full md:w-full w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Machupicu" required="">
                          <div v-if="errorMsg.last_name != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.last_name }}
                            </span>
                        </div>
                      </div>
                  
                  </div>
                      <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                          <input v-model="dataUser.username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="andika666" @input="validCharacter" required="">
                          <div v-if="errorMsg.username != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.username }}
                            </span>
                        </div>
                      </div>


                      <div>
                        <label for="bio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                          <input v-model="dataUser.bio" type="text" name="bio" id="bio" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Aku suka nyokde" required="">
                          <div v-if="errorMsg.bio != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.bio }}
                            </span>
                        </div>
                      </div>
                    
                      <div>
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat anda</label>
                          <GMapAutocomplete :value="dataUser.address" type="text" name="address" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jalan pakerisan jawa timur" required=""></GMapAutocomplete>
                          <div v-if="errorMsg.address != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.address }}
                            </span>
                        </div>
                      </div>

                      <div>
                        <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Handphone</label>
                          <input v-model="dataUser.phone_number" type="text" name="phone_number" id="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="087762582xxx" required="">
                          <div v-if="errorMsg.phone_number != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.phone_number }}
                            </span>
                        </div>
                      </div>
                      <button @submit.prevent="handleUpdateProfile" type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Profile</button>
                   
                  </form>
              </div>
          </div>
      </div>
    </div>
        
    </section>
  
   <section v-if="isExist == 'failed' || route.params.username !== authUser.username && isExist == 'fetched'">
     <NotFoundView/>
   </section>
  
  
   <section v-if="isExist == ''">
     <Loaded/>
   </section>

  <BottomNavbar/>
  </template>
  
  <script setup>
  import Navbar from "@/components/Navbar.vue";
  import BottomNavbar from "@/components/BottomNavbar.vue";
  import NotFoundView from "@/components/NotFoundView.vue";
  import Loaded from "@/components/Loaded.vue";
  import BaseModal from "@/components/BaseModal.vue";
  import ImageCropper from '@/components/UpdateAvatar.vue';
  
  import { ref , onMounted , reactive } from "vue"
  import { useRoute, useRouter } from "vue-router";
  import { useUserAuthStore } from '@/stores/authUser'
  import axios from "axios";
import http from "../helper/http";

  const route = useRoute()
  const router = useRouter()
  const authUser = useUserAuthStore()
  
  const dataUser = reactive({
      first_name: '',
      last_name: '',
      username: '',
      address: '',
      bio: '',
      phone_number: '',
      foto_profile: ''
  
  })

  const errorMsg = reactive({
     first_name: '',
      last_name: '',
      username: '',
      address: '',
      bio: '',
      phone_number: '',
  })
  
  const isExist = ref('')
  const modalActive = ref(null)
  const showCameraIcon = ref(false)

  const toggleModal = () => {
    modalActive.value = !modalActive.value
  }

  const validCharacter = (event) => {
      const inputValue = event.target.value;
      // Hanya karakter huruf, angka, _ (underscore), dan @ yang diizinkan. Tidak ada spasi yang diizinkan.
      const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9_@]/g, "");
      dataUser.username = sanitizedValue;
  }
  
  /* Personal profile */
    const toProfile = async () => {
        await http().get('/api/v1/user/profile/' + route.params.username , {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
           dataUser.first_name = response.data.data.first_name,
           dataUser.last_name = response.data.data.last_name,
           dataUser.username = response.data.data.username,
           dataUser.address = response.data.data.address
           dataUser.foto_profile = response.data.data.foto_profile
           dataUser.bio = response.data.data.bio
           dataUser.phone_number = response.data.data.phone_number
  
           isExist.value = 'fetched'
        })
        .catch((error) => {
          console.error(error)
          isExist.value = 'failed'
        })
    }
  
    onMounted(() => {
      toProfile()
    })


    const handleUpdateProfile = () => {
      dataUser.address = document.getElementById('address').value
        http().put('/api/v1/profile' , dataUser , {
            headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
            router.push({
              path: '/profile/' + dataUser.username
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }
  
  
  
  </script>