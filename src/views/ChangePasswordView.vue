<template>
 <Navbar/>
    
    <section v-if="isFetched">
        <div class=" dark:bg-gray-900 ">
      <div class="flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0 mb-5 md:mb-0 sm:mb-5">
          <div class="w-full lg:max-w-3xl bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Akun Anda
                  </h1>
                  
                  <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="handleChangePassword">
                    <div class="block md:flex md:items-center md:justify-between">
                      <div class="md:items-start mb-4 md:mb-0 md:me-2 w-full md:w-1/2">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email anda</label>
                          <input disabled type="text" name="email" id="email" :value="account.email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your@email">
                          <div >
                            <span class="text-red-400 text-sm">
                                
                            </span>
                        </div>
                      </div>

                      <div class="md:items-start w-full md:w-1/2">
                        <label for="created_at" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal bergabung</label>
                          
                        <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input disabled type="text" :value="account.created_at" id="created_at" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
                        </div>

                      </div>
                  
                  </div>
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Ganti Password
                  </h1>

                      <div>
                        <label for="current_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password saat ini</label>
                          <input v-model="payloadChangePassword.current_password" type="password" name="current_password" id="current_password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="">
                          <div >
                            <span v-if="errorMsg.noMatch" class="text-red-400 text-sm">
                                Password saat ini salah
                            </span>
                        </div>
                      </div>


                      <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Baru</label>
                          <input v-model="payloadChangePassword.password" type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="">
                          <div >
                            <span v-if="errorMsg.password" class="text-red-400 text-sm">
                                {{ errorMsg.password }}
                            </span>
                        </div>
                      </div>

                      <div>
                        <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Konfirmasi password</label>
                          <input v-model="payloadChangePassword.password_confirmation" type="password" name="password_confirmation" id="password_confirmation" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="">
                          <div >
                            <span class="text-red-400 text-sm">
                           
                            </span>
                        </div>
                      </div>
                    
                      <button @submit.prevent="handleChangePassword"  type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Password</button>
                   
                  </form>
              </div>
          </div>
      </div>
    </div>
        
    </section>

    <section v-else>
        <Loaded/>
    </section>

    <BottomNavbar/>
    
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
import Loaded from "@/components/Loaded.vue";

import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserAuthStore } from "@/stores/authUser";
import http from "../helper/http";
import toastShow from "../helper/toastShow";

const router = useRouter()

const userAuth = useUserAuthStore()
const isFetched = ref(false)
const account = reactive({
    email: '',
    created_at: ''
})

const findAccountDetail = () => {
     http().get('/api/v1/user/account'  , {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          account.email = response.data.data.email
          account.created_at = response.data.data.created_at
          isFetched.value = true
        })
        .catch((error) => {
          isFetched.value = true
        })
}


const payloadChangePassword = reactive({
    current_password: '',
    password: '',
    password_confirmation: ''
})

const errorMsg = reactive({
    noMatch: false,
    password: ''
})

const handleChangePassword = () => {
    http().put('/api/v1/reset-password' , payloadChangePassword  , {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
            router.push({
                path: '/profile/' + userAuth.username
            })
            toastShow('Password berhasil dirubah' , true)
        })
        .catch((error) => {
    
          errorMsg.noMatch = false
          errorMsg.password = null

          if(error.response.status == 422){
            errorMsg.noMatch = true
          }else{
            let msg = ''
            error.response.data.validation_errors.password.forEach(error => {
                msg += error + ' , '
            });

            errorMsg.password = msg
          }
         

        })
}

onMounted(() => {
    findAccountDetail()
})

</script>