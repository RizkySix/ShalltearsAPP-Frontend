<template>

  <!-- bottom nav -->

  <div class="fixed bottom-0 left-0 z-50 lg:hidden md:hidden w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
    <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <button @click="toExplorer" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            <span class="text-xs md:text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Beranda</span>
        </button>
        <button @click="showNotification"  type="button" class="notif-dropdown-bottom relative inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-7 h-7 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:group-hover:text-blue-500"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M19.3399 14.4899L18.3399 12.8299C18.1299 12.4599 17.9399 11.7599 17.9399 11.3499V8.8199C17.9399 5.5599 15.2899 2.8999 12.0199 2.8999C8.74994 2.8999 6.09994 5.5599 6.09994 8.8199V11.3499C6.09994 11.7599 5.90994 12.4599 5.69994 12.8199L4.68994 14.4899C4.28994 15.1599 4.19994 15.8999 4.44994 16.5799C4.68994 17.2499 5.25994 17.7699 5.99994 18.0199C7.93994 18.6799 9.97994 18.9999 12.0199 18.9999C14.0599 18.9999 16.0999 18.6799 18.0399 18.0299C18.7399 17.7999 19.2799 17.2699 19.5399 16.5799C19.7999 15.8899 19.7299 15.1299 19.3399 14.4899Z" fill="currentColor"></path> <path d="M14.2508 3.32C13.5608 3.05 12.8108 2.9 12.0208 2.9C11.2408 2.9 10.4908 3.04 9.80078 3.32C10.2308 2.51 11.0808 2 12.0208 2C12.9708 2 13.8108 2.51 14.2508 3.32Z" fill="currentColor"></path> <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="currentColor"></path> </g></svg>
            <span class="text-xs md:text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Notifikasi</span>
            <span v-if="userAuth.notification.total_notification > 0" class="absolute bg-red-500 rounded-full top-2 md:top-0 left-1/2 w-4 h-4 text-white font-semibold text-center text-[8px]">
             {{ userAuth.notification.total_notification}}
            </span>
        </button>
        <button  @click="toggleModal"  type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
            </svg>
            <button class="text-xs md:text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">User Login</button>

            <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
              <div class="px-4 py-4 bg-white rounded-lg">
                <div class="w-full h-16">
                    <span class="text-lg text-black">Pengguna login saat ini</span>
                </div>
                <hr>
                <div v-if="loginUser.length != 0 && waitingResponse == false">
                    <div v-for="(user, index) in loginUser" :key="index" class="mt-4 mb-2 flex">
                    <div class="relative">
                        <img class="w-14 h-14 rounded-full" :src="user.foto_profile" :alt="user.username" v-if="user.foto_profile">
                        <img class="w-14 h-14 rounded-full" v-else src="@/assets/clown.jpg" alt="clown">
                        <span class="top-0 left-10 absolute  w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
                    </div>
                    <div class="ms-4">
                        <RouterLink @click="closeModal" :to="'/profile/' + user.username" class="">
                            <span>{{ user.username }}</span>
                            <br>
                            <span class="text-sm text-gray-400">{{ user.first_name + ' ' + user.last_name }}</span>
                        </RouterLink>
                    </div>
                 </div>
                </div>

                <div v-if="loginUser.length == 0 && waitingResponse == false">
                  <div class="text-center mt-4">
                  <h1 class="font-semibold text-gray-400">Tidak ada User login 😟</h1>
                  </div>
                </div>

                <div v-if="waitingResponse == true">
                   <Loaded/>
                </div>
              </div>
            </BaseModal>
        </button>
        <button @click="toProfile" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            <span class="text-xs md:text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Profile</span>
        </button>
    </div>
    <div class="notif-dropdown-bottom sm:block md:hidden">
        <NotificationDropdown :notificationDropdown="notificationDropdown" :position="position" />
    </div>
</div>
</template>

<script setup> 
import BaseModal from "@/components/BaseModal.vue";
import Loaded from "@/components/Loaded.vue";
import NotificationDropdown from "@/components/NotificationDropdown.vue";

import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import axios from 'axios'
import { useUserAuthStore } from '@/stores/authUser'
import { useRouter } from "vue-router";
import http from "../helper/http";

const router = useRouter()

const modalActive = ref(null)

const loginUser = ref([])
const waitingResponse = ref(true)
 
const toggleModal = () => {
    modalActive.value = !modalActive.value

     http().get('/api/v1/login-user' , {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
        loginUser.value = response.data.login_users
        waitingResponse.value = false
    })
    .catch((error) => {
        console.error(error)
    })

}

const closeModal = () => {
    modalActive.value = false
}



  /* user notification */
  const notificationDropdown = ref(false)
  const position = ref('')
  const userAuth = useUserAuthStore()

  const showNotification = () => {
    notificationDropdown.value = true
    position.value = 'bottom'

     if(userAuth.notification.notification_list){
      
        //update readed notif
        http().put('/api/v1/notification/readed' , {readed_notif: JSON.parse(userAuth.notification.notification_list).length} , {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((response) => {
           
          })
          .catch((error) => {
            console.error(error)
          })
     }

  }

  //route to explorer
  const toExplorer = () => {
    router.push({
      name: 'explorer'
    })
  }

  const toProfile = () => {
    router.push({
      path: '/profile/' + userAuth.username
    })
  }


  const handleClickOutside = (event) => {
    if (!document.querySelector('.notif-dropdown-bottom').contains(event.target)) {
      notificationDropdown.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  })

</script>
