<template>
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-32 h-auto" src="@/assets/logo.png" alt="logo"> 
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login ke akun Shalltears anda
              </h1>
              <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="handleLogin">
                  <div>
                      <label for="user_mail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email / Username</label>
                      <input v-model="credentials.user_mail" type="text" name="user_mail" id="user_mail" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com/rizky666" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input v-model="credentials.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                        
                      </div>
                      <RouterLink :to="'/auth/forgot-password'" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lupa password?</RouterLink>
                  </div>
                  <button @submit.prevent="handleLogin" type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Belum punya akun? <RouterLink :to="'/auth/register'" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</RouterLink>
                  </p>
              </form>
          </div>
      </div>
  </div>

  <button class="hidden" type="button" id="failedLoginBtn" @click="this.$toast.error(`Data tidak valid 😟`)">hidden</button>
  <button class="hidden" type="button" id="spamLogin" @click="this.$toast.error(`Terlalu banyak spam, coba kembali nanti`)">hidden</button>
</section>

</template>

<script setup>
import { reactive, onMounted , ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const credentials = reactive({
    user_mail: '',
    password: ''
})

const router = useRouter()

const handleLogin = () => {
    axios.post('http://shalltears-app.test/api/v1/login' , credentials)
        .then((response) => {
           
            localStorage.setItem('token', response.data.token)
         
            if(response.data.verified == true){
                router.push({
                    name: 'explorer'
                })
            }else{
                router.push({
                    name: 'otp-verification'
                })
            }
        })
        .catch((error) => {
            console.error(error)
            const failedLoginBtn = document.getElementById('failedLoginBtn')
            const spamLogin = document.getElementById('spamLogin')
            error.response.status == 429 ? spamLogin.click() : failedLoginBtn.click()
        })
}


</script>