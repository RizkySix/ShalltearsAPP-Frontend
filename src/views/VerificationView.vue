<template>
    <div class="h-screen px-3 flex items-center justify-center">
    <div class="container mx-auto">
        <div class="max-w-sm mx-auto md:max-w-lg">
            <div class="w-full">
                <a href="#" class="flex justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                    Flowbite    
                </a>
                <div class="bg-white rounded shadow dark:border h-64 py-3 text-center">
                      <h1 class="text-2xl font-bold">Verifikasi OTP</h1>
                      <div class="flex flex-col mt-4">
                          <span>Masukan 6 digit kode otp yang kamu terima pada</span>
                          <span class="font-bold">{{ email }}</span>
                      </div>
                      
                      <form action="#" @submit.prevent="handleVerifyOtp">
                        <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
                        <input  class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" required /> 
                        <input  class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="second" maxlength="1" required /> 
                        <input  class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" required /> 
                        <input  class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" required />
                        <input  class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxlength="1" required /> 
                        <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" required />
                      </div>
                      <button type="submit" class="w-1/2 mt-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @submit.prevent="handleVerifyOtp">Send</button>
                      </form>
                      
                      <form class="flex justify-center text-center mt-5" action="#" @submit.prevent="handleResendOtp">
                         <div>
                            <button @submit.prevent="handleResendOtp" class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Resend OTP</span><i class='bx bx-caret-right ml-1'></i></button>
                         </div>
                      </form>
                </div>
            </div>
        </div>
    </div>
</div>
<button @click="this.$toast.error(failedOtpMsg)" type="button" class="hidden" id="failedOtp" ref="failedOtp">hidden</button>
<button @click="this.$toast.success(`Kode Otp terbaru berhasil terkirim ke ` + email)"  type="button" class="hidden" id="resendOtp" ref="resendOtp">hidden</button>

</template>

<script setup>
import { reactive , onMounted , computed , ref } from 'vue'
import { otpSlider } from '@/assets/js/otp-slider.js'
import axios from 'axios';
import { useRouter } from 'vue-router';
import http from '../helper/http';

const router = useRouter()

const email = ref(localStorage.getItem('email'))

const resendStatus = ref(false);
const failedOtpMsg = ref('');

const handleVerifyOtp = () => {

  const otpCode = document.getElementById('first').value + 
                 document.getElementById('second').value + 
                 document.getElementById('third').value + 
                 document.getElementById('fourth').value + 
                 document.getElementById('fifth').value + 
                 document.getElementById('sixth').value

  http().post('/api/v1/verify-otp' , { otp_code: otpCode } , {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token') 
    }
  })
    .then((response) => {
        localStorage.removeItem('email')
        localStorage.setItem('email_verified_status' , true)
        router.push({
            name: 'explorer'
        })
    })
    .catch((error) => {
        const errorOtp = document.getElementById('failedOtp')
        if(error.response.status == 400){
            failedOtpMsg.value = 'Kode otp tidak valid !'
            errorOtp.click()
        }

        console.error(error)
    })

}

const handleResendOtp = () => {
    http().post('/api/v1/resend-otp' , {} , {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token') 
    }
  })
    .then((response) => {
        const resendOtp = document.getElementById('resendOtp')
        resendOtp.click()
        response.status != 200 ? resendStatus.value = false :  resendStatus.value = true
    })
    .catch((error) => {
        const errorOtp = document.getElementById('failedOtp')
        if(error.response.status == 429){
            failedOtpMsg.value = 'Terlalu banyak spam, tunggu lagi 1 menit 😡 !'
            errorOtp.click()
        }
        console.error(error)
    })
}


onMounted(() => {
    otpSlider()
})


</script>