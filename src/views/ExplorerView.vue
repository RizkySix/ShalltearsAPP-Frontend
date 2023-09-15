<template>
  <Navbar/>
  
<BaseModal :modalActive="modalActive" :width="modalWidth" @close-modal="toggleModal">
<CreateThread />
</BaseModal>

<BaseModal :modalActive="modalLikeActive" :overflow="'overflow-hidden'" :width="modalLikeWidth" @close-modal="popupLike">
  <LikeList :postId="postId" />
</BaseModal>

<BaseModal :modalActive="modalSmallCommentActive" :overflow="'overflow-hidden'" :width="modalSmallCommentWidth" @close-modal="popupComment">
  <MobileComment :detailPost="detailPost" :foto_profile="detailPost.foto_profile" :username="detailPost.username" />
</BaseModal>

<BaseModal :modalActive="modalEmergencyActive"  @close-modal="emergencyToggle">
<EmergencyCall  />
</BaseModal>

<div @click="emergencyToggle" class="fixed w-20 md:w-16 bottom-0 right-0 mb-10 md:mb-0 md:left-0 p-4 z-50 cursor-crosshair">
    <a id="emergency-call" class="text-white py-2 px-4 rounded-full">
      <svg class="h-12 w-12 md:h-16 md:w-16 " version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 508 508" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style="fill:#324A5E;" cx="254" cy="254" r="254"></circle> <g> <path style="fill:#2B3B4E;" d="M465.2,218.4v52.8c0,3.6-3.2,6.8-7.2,6c-2.8-0.4-4.8-2.8-5.2-5.6l-5.2-54c0-1.6-1.6-3.2-3.6-3.2 s-3.6,1.6-3.6,3.6v159.2c0,4.4-3.2,8.4-7.6,9.2c-4.8,0.4-9.2-2.8-9.6-7.6l-8.4-83.6c0-2-2-3.6-4-3.6s-3.6,1.6-3.6,3.6l-6.4,82.8 c-0.4,4.4-4,8-8.8,8h-1.6c-4.8,0-8.8-4-8.8-8.8V218c0-2-1.6-3.6-3.6-3.6c-1.6,0-2.8,0.8-3.2,2.4c0-2,2-4,4-4s4,1.6,4,4l6.4,65.2 c0.4,3.6,2.8,6.4,6.4,6.8c4.8,0.8,8.8-2.8,8.8-7.2V218c0-18-7.2-34.4-19.2-46.4c7.2-4.4,15.6-6.8,24.8-7.2 C440,163.6,465.2,188,465.2,218.4z"></path> <circle style="fill:#2B3B4E;" cx="411.2" cy="131.2" r="25.2"></circle> <path style="fill:#2B3B4E;" d="M126.4,216.8c0-0.8,0.4-1.2,0.4-1.6C126.4,215.6,126.4,216,126.4,216.8l0.4,158.8 c0,4.4-3.2,8.4-7.6,9.2c-4.8,0.4-9.2-2.8-9.6-7.6l-8.4-83.6c0-2-2-3.6-4-3.6s-3.6,1.6-3.6,3.6l-6.8,83.2c-0.4,4.4-4,8-8.8,8h-1.6 c-4.8,0-8.8-4-8.8-8.8V216.4c0-2-1.6-3.6-3.6-3.6c-1.6,0-3.2,1.2-3.6,3.2l-5.2,54c-0.4,3.2-2.8,5.6-6,5.6c-3.6,0-6-2.8-6-6V218 c0-29.6,23.2-54.4,52.4-55.2c11.2-0.4,21.2,2.8,30,8c-12.4,12.4-20,29.6-20,48v62.4c0,4,3.2,7.6,7.6,7.6l0,0c4,0,7.2-2.8,7.2-6.8 L126.4,216.8z"></path> <path style="fill:#2B3B4E;" d="M134.4,217.2v11.6l-1.2-12.4c0-1.6-1.2-2.8-2.8-3.2C132.8,213.2,134.4,214.8,134.4,217.2z"></path> <circle style="fill:#2B3B4E;" cx="96.8" cy="130" r="25.2"></circle> </g> <g> <path style="fill:#FF7058;" d="M298,212.8c0.8,0,1.6,0.4,2.4,0.8c-0.4,0-1.2-0.4-1.6-0.4c-2,0-4,1.6-4,4l-1.2,12.8v-12.8 C293.6,214.8,295.6,212.8,298,212.8z"></path> <path style="fill:#FF7058;" d="M404,218v63.6c0,4.4-4,8-8.8,7.2c-3.6-0.4-6-3.6-6.4-6.8l-6-65.2c0-2-2-4-4-4c-2.4,0-4.4,2-4.4,4.4 v192c0,5.2-4,10.4-9.2,10.8c-6,0.8-10.8-3.6-11.6-9.2l-10-100.8c-0.4-2.4-2-4-4.4-4s-4.4,2-4.4,4.4L326,410.8 c-0.4,5.2-5.2,9.6-10.4,9.6h-2c-5.6,0-10.4-4.8-10.4-10.4V222l6,65.2c0.4,3.6,3.2,6.8,6.8,7.6c5.2,0.8,9.2-3.2,9.2-8V218 c0-21.2-9.2-40-24-53.2c10-7.2,22.4-11.6,35.6-12C374,151.6,404,181.2,404,218z"></path> <circle style="fill:#FF7058;" cx="338.8" cy="112.4" r="30.4"></circle> </g> <g> <path style="fill:#84DBFF;" d="M184,219.2v67.6c0,4.4,3.6,8,8,8l0,0c4,0,7.6-3.2,8-7.2l6-66v187.6c0,5.2-4,10.4-9.2,10.8 c-5.6,0.8-10.8-3.6-11.6-9.2L174.8,310c-0.4-2.4-2.4-4-4.4-4c-2.4,0-4.4,1.6-4.4,4l-8.4,100.8c-0.4,5.2-5.2,9.6-10.4,9.6h-2 c-5.6,0-10.4-4.8-10.4-10.4V217.2c0-2.4-2-4.4-4.4-4.4c-2,0-4,1.6-4,4L120,282c-0.4,4-3.6,6.8-7.2,6.8l0,0c-4,0-7.6-3.2-7.6-7.6 v-62c0-35.6,28-65.6,63.2-66.4c14.8-0.4,28.4,4,39.6,12C193.2,178,184,197.6,184,219.2z"></path> <path style="fill:#84DBFF;" d="M130.4,213.2c-1.6,0-2.8,0.8-3.6,2C127.2,214,128.4,212.8,130.4,213.2 C130,212.8,130,212.8,130.4,213.2z"></path> <path style="fill:#84DBFF;" d="M215.6,217.2V230l-1.2-13.2c0-2-2-4-4-4c-0.4,0-1.2,0-1.6,0.4c0.8-0.4,1.6-0.8,2.4-0.8 C213.6,212.8,215.6,214.8,215.6,217.2z"></path> <circle style="fill:#84DBFF;" cx="170.4" cy="112.4" r="30.4"></circle> </g> <g> <path style="fill:#FFFFFF;" d="M252.8,147.2c-38.4,1.2-68.8,33.6-68.8,72.4v67.6c0,4.4,3.6,8,8,8l0,0c4,0,7.6-3.2,8-7.2l6.8-70.8 c0.4-2.4,2-4,4.4-4s4.4,2,4.4,4.4v209.2c0,6.4,5.2,11.2,11.2,11.2h2.4c6,0,10.8-4.4,11.2-10.4l9.2-109.6c0.4-2.4,2.4-4.4,4.8-4.4 s4.8,2,4.8,4.4l11.2,110c0.8,6,6.4,10.8,12.4,10s10-6,10-12V217.2c0-2.4,2-4.4,4.4-4.4s4.4,1.6,4.4,4l6.8,70.8 c0.4,3.6,3.2,6.8,6.8,7.6c5.2,0.8,9.2-3.2,9.2-8V218C325.6,178,292.8,146,252.8,147.2z"></path> <path style="fill:#FFFFFF;" d="M208.8,213.2c-1.2,0.8-2,2-2,3.6l-0.8,4.8v-4.4C206,215.6,207.2,214,208.8,213.2z"></path> <circle style="fill:#FFFFFF;" cx="254.8" cy="103.6" r="33.2"></circle> </g> </g></svg>
    </a>
</div>

  <div class="mt-6 px-4 md:flex md:justify-around md:gap-4">
  <div class="hidden md:block md:w-1/4">
    <!-- Masih kosong bagian kiri -->

  </div>

  <div id="contents" class=" w-ful mb-20 md:mb-0 md:w-2/5">
      <div class="rounded-lg shadow h-auto p-4 flex">
        <div class="me-4">
          <img class=" w-20 h-16 rounded-full" v-if="userAuth.foto_profile" :src="userAuth.foto_profile" alt="Broken">
          <img class=" w-20 h-16 rounded-full" v-else src="@/assets/clown.jpg" alt="Broken">
        </div>
         <button @click="toggleModal" type="button" class=" h-12 my-auto rounded-full w-full bg-slate-200 text-gray-400">Tulis sesuatu hari ini...</button>
      </div>

      <div v-if="contents.length > 0" v-for="(content , index) in contents" :key="index" class="mt-6">
        <!-- ALbum -->
        <div v-if="content.album" class="rounded-lg shadow h-auto">
            <div id="header-album" class="flex mb-4 p-4">
              <img class=" w-12 h-12 rounded-full" v-if="content.user.foto_profile" :src="content.user.foto_profile" alt="Broken">
              <img class=" w-12 h-12 rounded-full" v-else src="@/assets/clown.jpg" alt="Broken">
              
              <div class="w-4/5 ml-4">
                <RouterLink :to="'/profile/' + content.user.username" class="font-semibold">{{ content.user.username }}</RouterLink> <br>
                <span class="text-xs font-light">Post on {{ content.created_at }}</span>
              </div>
            </div>
          
            <div class="w-full mb-2">
              <Swipper :images="content.album.contents" :explorer="true" v-on:dblclick="likeCounterTap += 1 , likePost(content.uuid)"  />
            </div>

            <div class="flex pt-4 px-4">
              <div class="me-4"> 
                <i v-if="content.liker.includes(userAuth.username) && !latestLikes[content.uuid] || latestLikes[content.uuid] && latestLikes[content.uuid].isLiked === 'Liked'" @click="likePost(content.uuid)" class="fa-solid fa-heart fa-xl me-1 text-red-700"></i>  
                <i v-else @click="likePost(content.uuid)" class="fa-regular fa-heart fa-xl me-1"></i> 
                <span class="text-sm cursor-pointer" @click="popupLike(content.album.post_id)">{{ latestLikes[content.uuid] ? latestLikes[content.uuid].total_like : content.total_like }} Suka</span>
              </div>
              <div @click="popupComment(content)">
                <i class="fa-regular fa-comments fa-xl me-1"></i> 
                <span class="text-sm cursor-pointer">{{ latestComments[content.album.post_id] ? latestComments[content.album.post_id] : content.total_comment }} Comment</span>
              </div>
          </div>

          <div id="caption" class="p-4">
            <pre class="capt"><span class="font-semibold">{{ content.user.username }}</span> {{ content.album.caption }}</pre>
          </div>
        </div>

        <!-- Thread -->
        <div v-if="content.thread" class="rounded-lg shadow h-auto p-4">
            <div class="flex mb-1 pt-2">
              <img class=" w-12 h-12 rounded-full" v-if="content.user.foto_profile" :src="content.user.foto_profile" alt="Broken">
              <img class=" w-12 h-12 rounded-full" v-else src="@/assets/clown.jpg" alt="Broken">
                <div class="w-4/5 ml-4">
                  <RouterLink :to="'/profile/' + content.user.username" class=" font-semibold">{{ content.user.username }}</RouterLink> <br>
                  <span class="text-xs font-light">Post on {{ content.created_at }}</span>
                </div>
          </div>
          <pre class="mt-3 w-full md:w-3/4 mb-4">{{ content.thread.text }}</pre>
          <hr>
          <div class="flex pt-4">
              <div class="me-4"> 
                <i v-if="content.liker.includes(userAuth.username) && !latestLikes[content.uuid] || latestLikes[content.uuid] && latestLikes[content.uuid].isLiked === 'Liked'" @click="likePost(content.uuid)" class="fa-solid fa-heart fa-xl me-1 text-red-700"></i>  
                <i v-else @click="likePost(content.uuid)" class="fa-regular fa-heart fa-xl me-1"></i> 
                <span class="text-sm cursor-pointer" @click="popupLike(content.thread.post_id)">{{ latestLikes[content.uuid] ? latestLikes[content.uuid].total_like : content.total_like }} Suka</span>
              </div>
              <div @click="popupComment(content)">
                <i class="fa-regular fa-comments fa-xl me-1"></i> 
                <span class="text-sm cursor-pointer">{{ latestComments[content.thread.post_id] ? latestComments[content.thread.post_id] : content.total_comment }} Comment</span>
              </div>
          </div>
        </div>

      </div>

      <div v-if="contents.length > 0" class="w-full mt-3 mb-3">
        <button @click="expandContents" class="w-full text-white bg-blue-700 py-2 px-4 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tampilkan lebih banyak</button>
      </div>

  </div>

  <div id="user-login" class="hidden md:block md:w-1/4">
    <div class="custom-scrollbar fixed h-[700px] overflow-y-scroll">
                <div class="w-full h-auto p-5 sticky top-0 z-20 bg-white">
                    <span class="text-lg text-black font-semibold">Pengguna login saat ini</span>
                </div>
                <hr class="w-[300px] fixed">
                <div class="" v-if="loginUser.length != 0 && waitingResponse == false">
                    <div v-for="(user, index) in loginUser" :key="index" class="mt-4 mb-2 flex">
                    <div class="relative">
                        <img v-if="user.foto_profile" class="w-12 h-12 rounded-full" :src="user.foto_profile" :alt="user.username">
                        <img class="w-12 h-12 rounded-full" v-else src="@/assets/clown.jpg" alt="clown">
                        <span class="top-0 left-10 absolute  w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    </div>
                    <div class="ms-4">
                        <RouterLink :to="'/profile/' + user.username" class="">
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
  </div>
</div>


<BottomNavbar/>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import CreateThread from "@/components/CreateThread.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
import BaseModal from "@/components/BaseModal.vue";
import Loaded from "@/components/Loaded.vue";
import Swipper from "@/components/Swipper.vue";
import LikeList from "@/components/LikeList.vue";
import MobileComment from "@/components/MobileComment.vue";
import EmergencyCall from "@/components/EmergencyCall.vue";

import { useUserAuthStore } from "@/stores/authUser";
import { useCommentStore } from '@/stores/comment';
import { useAlbumStore } from '@/stores/album';

import { onMounted, reactive, ref, watch } from "vue";
import axios from "axios";

const userAuth = useUserAuthStore();


const modalActive = ref(null)
const modalWidth = ref('max-w-2xl')

const toggleModal = () => {
    modalActive.value = !modalActive.value

    modalActive.value == true ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
  }


//like popup
const modalLikeActive = ref(null)
const modalLikeWidth = ref('max-w-sm')
const postId = ref(null)
const popupLike = (id) => {
  postId.value = id
  modalLikeActive.value = !modalLikeActive.value
}


//small comment popup
const modalSmallCommentActive = ref(null)
const modalSmallCommentWidth = ref('max-w-sm')
const detailPost = reactive({
    foto_profile: null,
    username: '',
    post_id: null,
    total_comment: null,
    created_at: '',
    caption: null
})

const latestComments = ref([])
const popupComment = (post = null) => {
    detailPost.caption = null
    
    if(post !== null){
        post.album ? (detailPost.post_id = post.album.post_id , detailPost.caption = post.album.caption) 
                   : detailPost.post_id = post.thread.post_id
        detailPost.total_comment = post.total_comment
        detailPost.created_at = post.created_at
        detailPost.foto_profile = post.user.foto_profile
        detailPost.username = post.user.username
    }
        

   modalSmallCommentActive.value = !modalSmallCommentActive.value
}


const commentState = useCommentStore()
const latestLikes = ref([])
//like action
const likePost = (uuid) => {

axios.put('http://shalltears-app.test/api/v1/like/' + uuid , {} , {
    headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  })
  .then((response) => {
    latestLikes.value[uuid] = {
        total_like: response.data.total_like,
        isLiked: response.data.like
    }

  })
  .catch((error) => {
    console.error(error)
  })
}

const loginUser = ref([])
const waitingResponse = ref(true)
 
const getLoginUser = () => {
     axios.get('http://shalltears-app.test/api/v1/login-user' , {
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

const contents = ref([])
const lastPostId = ref(null)
const fetchAllContents = () => {
  axios.get('http://shalltears-app.test/api/v1/post' , {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
        const posts = response.data.posts
        contents.value = posts
        
        posts[posts.length - 1].album ? lastPostId.value = posts[posts.length - 1].album.post_id 
                                      : lastPostId.value = posts[posts.length - 1].thread.post_id
       
    })
    .catch((error) => {
        console.error(error)
    })
}


//expand content
const expandContents = () => {
  axios.get('http://shalltears-app.test/api/v1/post/expand?post_filter=' + lastPostId.value , {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
      const posts = response.data.posts
      contents.value = contents.value.concat(posts)
        
      posts[posts.length - 1].album ? lastPostId.value = posts[posts.length - 1].album.post_id 
                                      : lastPostId.value = posts[posts.length - 1].thread.post_id
       
    })
    .catch((error) => {
        console.error(error)
    })
}


//emergency call show modal
const modalEmergencyActive = ref(null)
const emergencyToggle = () => {
  modalEmergencyActive.value = !modalEmergencyActive.value
}

onMounted(() => {
  getLoginUser()
  fetchAllContents()
})

const albumActivity = useAlbumStore()
watch([() => commentState.newComment , () => albumActivity.refresh , () => userAuth.emergencySent] , ([newComment , refresh , emergencySent] , [prevComment ,  prevRefresh , prevEmergencySent]) => {
    newComment == true ? (
        latestComments.value[detailPost.post_id] = detailPost.total_comment,
        commentState.newComment = false
    ) : null

    refresh == true ? (fetchAllContents(),  toggleModal() , albumActivity.refresh = false) : null

    emergencySent == true ? (emergencyToggle() , userAuth.emergencySent = false) : null

})

</script>



<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 0.5em;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
}


pre {
  overflow-x: auto;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}


</style>