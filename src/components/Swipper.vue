<template>
    <ConfirmBox :confirmActive="confirmActive" @close-confirm="deleteImage">
    <div class="p-4 text-center">
       <span class="font-semibold text-lg">
          Lanjut Hapus Foto?
       </span>
    </div>
  </ConfirmBox>
<swiper
    :modules="modules"
    :space-between="20"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    }"
  >
    
  <swiper-slide v-if="albumEdit === true"  v-for="(image , index2) in editImages" :key="index2">
    <div v-if="editImages.length > 1" @click="deleteImage(image.id)" class="relative hover:cursor-pointer">
         <img class="h-auto md:h-[500px] w-full  hover:opacity-50" :src="image.image" loading="lazy" alt="wrong">
         <i class="fa-regular fa-trash-can text-8xl -z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
    </div>
    <div v-else class="relative hover:cursor-pointer">
         <img class="h-auto md:h-[500px] w-full" :src="image.image" loading="lazy" alt="wrong">
    </div>
  </swiper-slide>

  <swiper-slide v-else v-for="(image , index) in images" :key="index">
    <div>
         <img v-if="explorer != true" class="h-auto md:h-[650px] w-full" :src="image" loading="lazy" alt="wrong">
         <img v-else class="h-auto md:h-[600px] w-full" :src="image.content" loading="lazy" alt="wrong">
    </div>
  </swiper-slide>

  </swiper>
</template>

<script>
 import { Swiper, SwiperSlide } from 'swiper/vue'
 import { Autoplay, Pagination } from 'swiper/modules'

 import 'swiper/css';
 import 'swiper/css/pagination'
import axios from 'axios';
import { ref } from 'vue';
import http from '../helper/http';

import ConfirmBox from "@/components/ConfirmBox.vue";
import { useAlbumStore } from '../stores/album';

 export default {
    components: {Swiper, SwiperSlide , ConfirmBox},
    props: ['images' , 'albumEdit' , 'explorer'],
    setup(props) {

      const albumActivity = useAlbumStore()

      const confirmActive = ref(null)
      const editImages = ref(props.images)
      const currentId = ref(null)

      const deleteImage = (id = null) => {
        confirmActive.value = !confirmActive.value
         id != null ? currentId.value = id : null

        if(albumActivity.confirmBoxAct == true && currentId.value){
          http().delete('/api/v1/album-content/' + currentId.value , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            })
            .then((response) => {
                editImages.value = editImages.value.filter(image => image.id !== currentId.value)
                currentId.value = null
            })
            .catch((error) => {
                console.error(error)
                currentId.value = null
            })
        }

        albumActivity.confirmBoxAct = null
      }

     

        return { modules: [Autoplay , Pagination] , deleteImage , editImages , confirmActive }
    }
 }

 
</script>