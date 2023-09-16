<template>
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-32 h-auto" src="@/assets/logo.png" alt="logo"> 
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                  Password baru akan dikirim untuk anda
              </h1>
              <form @submit.prevent="handleResetPassword" class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email terdaftar</label>
                      <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                        
                      </div>
                      <button v-if="resendStatus == false" @submit.prevent="handleResetPassword" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"><i class="fa-solid fa-share" style="color: #81d41c;"></i> Send reset password</button>
                      <button v-else @submit.prevent="handleResetPassword" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"><i class="fa-solid fa-share" style="color: #81d41c;"></i> Resend reset password</button>
                  </div>
              </form>
          </div>
      </div>
  </div>

</section>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import http from '../helper/http';
import toastShow from "../helper/toastShow";

const email = ref('')
const resendStatus = ref(false)

const handleResetPassword = () => {
    http().post('/api/v1/reset-password' , {email: email.value})
        .then((response) => {
           resendStatus.value = true
           toastShow('Password terkirim, check email anda' , true)
        })
        .catch((error) => {
            let msgToast = ''
            error.response.status == 429 ? msgToast = 'SPAM, coba lagi nanti' : msgToast = 'Email tidak ditemukan'
            toastShow(msgToast , false)
        })
}

</script>