<template>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-32 h-auto" src="@/assets/logo.png" alt="logo"> 
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                     Buat akun Shalltears
                  </h1>
                
                  <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="handleRegister">
                    <div class="flex items-center justify-between">
                      <div class="items-start">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Depan</label>
                          <input v-model="credentials.first_name" type="text" name="first_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block lg:w-full md:w-full w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Andika" required="">
                          <div v-if="errorMsg.first_name != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.first_name }}
                            </span>
                        </div>
                      </div>

                      <div class="items-start">
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Belakang</label>
                          <input v-model="credentials.last_name" type="text" name="last_name" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block lg:w-full md:w-full w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Machupicu" required="">
                          <div v-if="errorMsg.last_name != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.last_name }}
                            </span>
                        </div>
                      </div>
                  
                  </div>
                      <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                          <input v-model="credentials.username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="andika666" @input="validCharacter" required="">
                          <div v-if="errorMsg.username != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.username }}
                            </span>
                        </div>
                      </div>
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Aktif</label>
                          <input v-model="credentials.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com/rizky666" required="">
                          <div v-if="errorMsg.email != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.email }}
                            </span>
                        </div>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input v-model="credentials.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                          <div v-if="errorMsg.password != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.password }}
                            </span>
                        </div>
                      </div>
                      <div>
                          <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Konfirmasi Password</label>
                          <input v-model="credentials.password_confirmation" type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                      </div>
                      <div>
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat anda</label>
                          <GMapAutocomplete type="text" name="address" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jalan pakerisan jawa timur" required=""></GMapAutocomplete>
                          <div v-if="errorMsg.address != '' ">
                            <span class="text-red-400 text-sm">
                            {{ errorMsg.address }}
                            </span>
                        </div>
                      </div>
                      <button @submit.prevent="handleRegister" type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                   
                  </form>
              </div>
          </div>
      </div>
    </section>
    </template>
    
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

    
const router = useRouter()

const credentials = reactive({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    address: ''
})

const errorMsg = reactive({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    address: ''
})

const validCharacter = (event) => {
      const inputValue = event.target.value;
      // Hanya karakter huruf, angka, _ (underscore), dan @ yang diizinkan. Tidak ada spasi yang diizinkan.
      const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9_@]/g, "");
      credentials.username = sanitizedValue;
  }

const handleRegister = () => {
  credentials.address = document.getElementById('address').value
    axios.post('http://shalltears-app.test/api/v1/register' , credentials)
        .then((response) => {

            localStorage.setItem('token' , response.data.token)
            localStorage.setItem('email' , credentials.email)
            router.push({
                name: 'otp-verification'
            })    
        })
        .catch((error) => {
                console.error(error.response)

                errorMsg.first_name = ''
                errorMsg.last_name = ''
                errorMsg.username = ''
                errorMsg.password = ''
                errorMsg.address = ''

                const errorsBag = error.response.data.validation_errors
                for (const field in errorsBag) {
                    errorMsg[field] = errorsBag[field][0];
                }

          
            })
}

</script>