<template>
    <div class="relative h-[400px] px-2 box-border">
        <div id="like-header" class="p-4 sticky top-0 bg-white rounded-t-lg text-center h-auto border-b-2">
            <h3 class="font-semibold">Menyukai</h3>
        </div>

        <div id="liker" class="custom-scrollbar overflow-x-hidden overflow-scroll h-[300px]">
           <div v-if="likeList.length !== 0">
            <div v-for="(like , index) in likeList" :key="index" class="flex mb-1 pt-2">
              <img v-if="like.foto_profile != null" class="w-10 h-10 rounded-full me-4" :src="like.foto_profile" alt="user photo">
              <img v-else class="w-10 h-10 rounded-full me-4" src="@/assets/clown.jpg" alt="user photo">
              <div class="w-4/5">
                <a v-if="route.name === 'archive.album' && like.username === route.params.username" :href="'/profile/' + like.username" class=" font-semibold text-sm me-2">{{ like.username }}</a>
                <RouterLink v-else :to="'/profile/' + like.username" class=" font-semibold text-sm me-2">{{ like.username }}</RouterLink>
                <p class="text-xs font-light">{{ like.first_name }}</p>
              </div>
            </div>
           </div>
    
        </div>
    </div>


</template>

<script setup>
import { ref , onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import http from '../helper/http';

const props = defineProps({
    postId: Number
})

const route = useRoute()
const likeList = ref([])
const getLikes = (postId) => {

    http().get('/api/v1/post/likes/' + postId , {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
       response.data.people_likes.forEach((obj , index) => {
            likeList.value.push(obj)
       });
    })
    .catch((error) => {
        console.error(error)
    })
}

onMounted(() => {
    getLikes(props.postId)
})

</script>


<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 0.5em;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
}


</style>