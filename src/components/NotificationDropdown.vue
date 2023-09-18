<template>
<div v-if="notificationDropdown" id="dropdownNotifList" :class="{
    'custom-scrollbar z-20 absolute md:-mt-4 md:top-full md:left-1/2 md:right-1/2 hidden md:block bg-white shadow w-96 max-h-[300px] overflow-x-hidden overflow-scroll': position == 'top',
    'custom-scrollbar z-20 absolute bottom-full sm:block md:hidden bg-white shadow w-[19rem]  max-h-[300px] overflow-x-hidden overflow-scroll' : position == 'bottom'
}">
        <div id="notifications" class="h-auto p-4 ">
            <div v-if="userAuth.notification.notification_list && JSON.parse(userAuth.notification.notification_list).length > 0" v-for="(notif , index) in JSON.parse(userAuth.notification.notification_list).slice().reverse()" :key="index">
            <div @click="redirectProfile(notif.message)" class="flex justify-between items-center mb-1 hover:bg-blue-200 cursor-pointer">
            <div class="flex items-center">
                <img
                v-if="notif.sender_foto_profile"
                :src="notif.sender_foto_profile"
                alt="Foto Profil Pengirim"
                class="w-8 h-8 md:w-10 md:h-10 rounded-full"
                />
                <img
                v-else
                src="@/assets/clown.jpg"
                alt="Foto Profil Default"
                class="w-7 h-7 md:w-8 md:h-8 rounded-full"
                />
                <div class="ml-2 w-48 md:w-64 break-words">
                <span
                    :class="{
                    'font-semibold text-[10px] md:text-xs': index <= userAuth.notification.total_notification - 1,
                    'text-gray-400 text-[10px] md:text-xs': index > userAuth.notification.total_notification - 1
                    }"
                >
                    {{ notif.sender_username }} {{ notif.message }}
                </span>
                </div>
            </div>
            <div v-if="notif.accepter_content">
                <img
                :src="notif.accepter_content"
                class="w-7 h-7 md:w-8 md:h-8"
                alt="Konten Penerima"
                />
            </div>
            </div>

        </div>
        <div v-else class="text-center p-2">
            <span class="font-semibold text-sm md:text-base text-gray-400">Tidak ada notifikasi saat ini...</span>
        </div>

        </div>
        
        <div @click="handleClearNotif" v-if="userAuth.notification.notification_list && JSON.parse(userAuth.notification.notification_list).length > 0" id="clear-notif" class="sticky bottom-0 w-11/12 border-t-2 mx-auto rounded-b-lg cursor-pointer bg-white hover:text-blue-400">
            <i class="fa-solid fa-eraser "></i>
           <span class="p-2 text-sm ">
            Bersihkan
           </span>
        </div>
        <div>
           
        </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserAuthStore } from '@/stores/authUser'
import { useRouter } from 'vue-router';
import axios from 'axios';
import http from '../helper/http';

const props = defineProps({
    notificationDropdown: Boolean,
    position: String
})

const router = useRouter()
const userAuth = useUserAuthStore()

const redirectProfile = (message) => {
    if(message.includes('album')){
        router.push({
            path: '/profile/' + userAuth.username
        })
    }else{
        router.push({
            path: '/profile/' + userAuth.username + '/threads'
        })
    }
}

//clear notif
const handleClearNotif = () => {
    http().put('/api/v1/notification/readed/clear' , {} , {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => {
            userAuth.notification.notification_list = null
            userAuth.notification.total_notification = 0
        })
        .catch((error) => {
            //console.error(error)
        })
}


</script>


<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 0.5em;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
}



</style>