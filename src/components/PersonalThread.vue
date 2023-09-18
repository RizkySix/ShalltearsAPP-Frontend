<template>
<BaseModal :modalActive="modalActive" :width="modalWidth" @close-modal="toggleModal">
<CreateThread />
</BaseModal>

<BaseModal :modalActive="modalLikeActive" :overflow="'overflow-hidden'" :width="modalLikeWidth" @close-modal="popupLike">
  <LikeList :postId="threadId" />
</BaseModal>

<BaseModal :modalActive="modalSmallCommentActive" :overflow="'overflow-hidden'" :width="modalSmallCommentWidth" @close-modal="popupComment">
  <MobileComment :detailPost="detailPost" :foto_profile="foto_profile" :username="username" />
</BaseModal>

<div class="w-full max-w-3xl m-auto bg-white mt-3 md:p-0">
  <div v-if="userAuth.username ===  route.params.username" class="">
    <button class="mx-auto block py-2 px-4" @click="toggleModal">
        <span class="hover:text-blue-500">
          <i class="fa-solid fa-square-plus text-2xl w-3 h-3 mr-2.5"></i>
          Buat Thread
        </span>
    </button>
  </div>
  <hr>
  <div v-if="threads.length !== 0" class="mt-6 px-1 md:px-0">
  
  <div v-for="(post, index) in threads" :key="index" >
    <div class="rounded-lg shadow p-4 mb-4">
        <div class="flex mb-1 pt-2">
            <img v-if="foto_profile" class="w-16 h-16 rounded-full me-4" :src="foto_profile" alt="user photo">
            <img v-else class="w-16 h-16 rounded-full me-4" src="@/assets/clown.jpg" alt="user photo">
              <div class="w-3/5 break-words me-auto">
                <span class=" font-semibold text-base md:text-lg">{{ username }}</span> <br>
                <span class="text-xs md:text-sm font-light">Post on {{ post.created_at }}</span>
              </div>
              <div class="relative">
                <span v-if="userAuth.username == route.params.username" @click="dropdownThread(post.uuid)" class="cursor-pointer font-bold text-2xl">&#8230</span>
                <ThreadDropdown v-if="activeDropdown == post.uuid" :threadDropdown="threadDropdown" :slug="post.thread.slug" :postUuid="post.uuid" :thread="post.thread.text" />
              </div>
        </div>
        <pre class="mt-3 w-full md:w-3/4 mb-4">{{ post.thread.text }}</pre>
        <hr>
        <div class="flex pt-4">
              <div class="me-4">
                <i v-if="post.liker.includes(userAuth.username) && !latestLikes[post.uuid] || latestLikes[post.uuid] && latestLikes[post.uuid].isLiked === 'Liked'" @click="likePost(post.uuid)" class="fa-solid fa-heart fa-xl me-1 text-red-700"></i>  
                <i v-else @click="likePost(post.uuid)" class="fa-regular fa-heart fa-xl me-1"></i> 
                <span class="text-sm cursor-pointer" @click="popupLike(post.thread.post_id)">{{ latestLikes[post.uuid] ? latestLikes[post.uuid].total_like : post.total_like }} Suka</span>
              </div>
              <div @click="popupComment(post)">
                <i :id="'totComment' + post.thread.post_id" class="fa-regular fa-comments fa-xl me-1"></i> 
                <span class="text-sm cursor-pointer">{{ latestComments[post.thread.post_id] ? latestComments[post.thread.post_id] : post.total_comment }} Comment</span>
              </div>
          </div>
    </div>
  </div>


</div>
</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useUserAuthStore } from '@/stores/authUser'
import { onMounted, reactive, ref, watch } from 'vue';

import BaseModal from "@/components/BaseModal.vue";
import CreateThread from "@/components/CreateThread.vue";
import LikeList from "@/components/LikeList.vue";
import MobileComment from "@/components/MobileComment.vue";
import ThreadDropdown from "@/components/ThreadDropdown.vue";

import axios from 'axios';
import { useCommentStore } from '@/stores/comment';
import { useAlbumStore } from '@/stores/album.js'
import http from '../helper/http';


const props = defineProps({
  foto_profile: String,
  username: String
})

const route = useRoute()

const userAuth = useUserAuthStore()

const modalActive = ref(null)
const modalWidth = ref('max-w-2xl')

const toggleModal = () => {
    modalActive.value = !modalActive.value
  }


const threads = ref([])
const getThread = (username) => {
    http().get('/api/v1/user/threads/' + username , {
        headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    })
    .then((response) => {
         threads.value = response.data.posts
    })
    .catch((error) => {
        console.error(error)
    })
}


const commentState = useCommentStore()
const latestLikes = ref([])
//like action
const likePost = (uuid) => {

http().put('/api/v1/like/' + uuid , {} , {
    headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  })
  .then((response) => {
    console.log(response.data)
    latestLikes.value[uuid] = {
        total_like: response.data.total_like,
        isLiked: response.data.like
    }

    console.log(latestLikes.value[uuid].isLiked)
  })
  .catch((error) => {
    console.error(error)
  })
}


//like popup
const modalLikeActive = ref(null)
const modalLikeWidth = ref('max-w-sm')
const threadId = ref(null)
const popupLike = (id) => {
  threadId.value = id
  modalLikeActive.value = !modalLikeActive.value
}

//small comment popup
const modalSmallCommentActive = ref(null)
const modalSmallCommentWidth = ref('max-w-sm')
const detailPost = reactive({
    post_id: null,
    total_comment: null,
    created_at: ''
})

const latestComments = ref([])
const popupComment = (post = null) => {
    
    if(post !== null){
        detailPost.post_id = post.thread.post_id
        detailPost.total_comment = post.total_comment
        detailPost.created_at = post.created_at
        
    }

   modalSmallCommentActive.value = !modalSmallCommentActive.value
}


const threadDropdown = ref(false)
const activeDropdown = ref('')
const dropdownThread = (uuid) => {
  threadDropdown.value = !threadDropdown.value
  threadDropdown.value === true ? localStorage.setItem('edit_dropdown' , uuid) : localStorage.removeItem('edit_dropdown')
  activeDropdown.value = localStorage.getItem('edit_dropdown')
}

onMounted(() => {
    getThread(route.params.username)
})

const albumActivity = useAlbumStore()
watch([() => commentState.newComment , () => albumActivity.refresh] , ([newComment , refresh] , [prevComment , prevRefresh]) => {
    newComment == true ? (
        latestComments.value[detailPost.post_id] = detailPost.total_comment,
        commentState.newComment = false
    ) : null

    refresh == true ? (getThread(route.params.username) , activeDropdown.value = '' , document.body.style.overflow = 'visible' , albumActivity.refresh = false) : null
})
</script>


<style scoped>

pre {
  overflow-x: auto;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

</style>