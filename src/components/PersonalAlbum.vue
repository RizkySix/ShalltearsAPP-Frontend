<template>

<!-- konten -->

<!-- Modal -->
<BaseModal :modalActive="modalActive" :width="modalWidth" @close-modal="toggleModal">
  <CreateAlbum/>
</BaseModal>

<BaseModal :modalActive="modalSmallCommentActive" :overflow="'overflow-hidden'" :zIndex="zIndex" :width="modalSmallCommentWidth" @close-modal="popupComment">
  <MobileComment :detailPost="detailPost" :foto_profile="foto_profile" :username="username" />
</BaseModal>

<BaseModal :modalActive="modalLikeActive" :overflow="'overflow-hidden'" :zIndex="zIndex" :width="modalLikeWidth" @close-modal="popupLike">
  <LikeList :postId="detailPost.post_id" />
</BaseModal>

<AlbumModal :modalActive="modalAlbumActive" :width="modalAlbumWidth" @close-modal="popupAlbum">
  <div class="block h-auto md:flex md:h-[650px]">
    <div class="w-full md:w-7/12 md:me-4">
      <!-- Navbar mobile -->
      <div v-if="images.length != 0" id="mobile-header" class="md:hidden">
        <div id="navbar-mobile" class="sticky top-0 p-4 rounded-lg bg-white h-auto z-10 border-b-2">
            <div class="flex mb-1 pt-2">
              <img class="w-10 h-10 rounded-full me-4" :src="foto_profile" alt="user photo">
              <div class="w-4/5">
                <span class=" font-semibold text-sm">{{ username }}</span> <br>
                <span class="text-xs font-light">Post on {{ detailPost.created_at }}</span>
              </div>
              <div v-if="userAuth.username == route.params.username" class="">
               <span @click="dropdownAlbum" class="cursor-pointer font-bold text-2xl">&#8230</span>
               <AlbumDropdown :albumDropdown="albumDropdown" :slug="detailPost.slug" :postUuid="detailPost.uuid"  />
              </div>
            </div>
         </div>
      </div>

       <div v-if="images.length != 0" class="max-h-full">
         <Swipper :images="images" v-on:dblclick="likeCounterTap += 1 , likePost()"  />

         <div id="footer-mobile" class="md:hidden">
          <div class="sticky bottom-0 bg-white h-auto rounded-b-lg p-4 z-10 border-t-2">
          <div class="flex">
              <div class="me-4"> 
                <i @click="likePost" v-if="detailPost.isLiked === false" class="fa-regular fa-heart fa-xl me-1"></i> 
                <i @click="likePost" v-else class="fa-solid fa-heart fa-xl me-1 text-red-700"></i> 
                <span class="text-sm cursor-pointer" @click="popupLike">{{ detailPost.total_like }} Suka</span>
             
              </div>
              <div @click="popupComment">
                <i class="fa-regular fa-comments fa-xl me-1"></i> <span class="text-sm cursor-pointer">{{ detailPost.total_comment }} Comment</span>
              </div>
          </div>
        </div>
         </div>

       </div>

       <div v-else>
       <LoadedV2/>
       </div>
    </div>

    <div class="w-1/2 hidden md:block">
        <div v-if="images.length != 0" class="custom-scrollbar relative max-h-full overflow-scroll overflow-x-hidden px-2 box-border">
         <div id="navbar-album" class="sticky top-0 bg-white h-auto z-10 border-b-2">
            <div class="flex mb-1 pt-2">
              <img v-if="foto_profile" class="w-10 h-10 rounded-full me-4" :src="foto_profile" alt="user photo">
              <img v-else class="w-10 h-10 rounded-full me-4" src="@/assets/clown.jpg" alt="user photo">
              <div class="w-4/5">
                <span class=" font-semibold text-sm">{{ username }}</span> <br>
                <span class="text-xs font-light">Post on {{ detailPost.created_at }}</span>
              </div>
              <div v-if="userAuth.username == route.params.username" class="">
               <span @click="dropdownAlbum"  class="cursor-pointer font-bold text-2xl">&#8230</span>
                  <AlbumDropdown :albumDropdown="albumDropdown" :slug="detailPost.slug" :postUuid="detailPost.uuid"  />
              </div>
            </div>
         </div>

        <div id="caption-and-comment" class="mt-2 h-[500px] custom-scrollbar overflow-scroll overflow-x-hidden">
          <div class="flex mb-4 pt-2">
              <img v-if="foto_profile" class="w-10 h-10 rounded-full me-4" :src="foto_profile" alt="user photo">
              <img v-else class="w-10 h-10 rounded-full me-4" src="@/assets/clown.jpg" alt="user photo">
              <div>
                <span class=" font-semibold text-sm me-2">{{ username }}</span>
                <pre class="capt text-sm ">{{ detailPost.caption }}</pre>
              </div>
            </div>
            
            <!-- Comments -->
            <div v-if="allComment.length != 0"> 
              <div v-for="(comment , index) in allComment" :key="index" class="flex mb-4 pt-2">
              <img v-if="comment.commentator_profile != null" class="w-10 h-10 rounded-full me-4" :src="comment.commentator_profile" alt="user photo">
              <img v-else class="w-10 h-10 rounded-full me-4" src="@/assets/clown.jpg" alt="user photo">
             
              <div :id="'commentId-' + comment.id" tabindex="0">
                
                <a v-if="route.name === 'archive.album' && comment.commentator_username === route.params.username" :href="'/profile/' + comment.commentator_username" class=" font-semibold text-sm me-2">{{ comment.commentator_username }}</a>
                <RouterLink v-else :to="'/profile/' + comment.commentator_username" class=" font-semibold text-sm me-2">{{ comment.commentator_username }}</RouterLink>
                <pre class="comment text-sm">{{ comment.comment_text }}</pre>
                <div class="flex mt-1">
                  <span class="text-xs font-extralight me-4">{{ comment.created_at }}</span>
                  <span v-if="route.name !== 'archive.album'" class="text-xs font-light cursor-pointer me-4" @click="subCommentToggle(comment.commentator_username , comment.id)">Balas</span>
                  <span v-if="comment.commentator_username == userAuth.username && route.name !== 'archive.album'" @click="deleteComment(comment.id)" class="text-xs font-light cursor-pointer">
                    Delete
                  </span>
                </div>

                <!-- Sub Comments -->
                <div v-if="comment.total_sub_comments != 0" class="mt-2">
                  <span class="text-xs cursor-pointer ml-2 mb-2" @click="toggleBalasan(comment.id)">
                  <span v-if="showBalasan.indexOf(comment.id) !== -1">
                    Sembunyikan balasan
                  </span>

                  <span v-else>
                    Lihat balasan ({{ comment.total_sub_comments }})
                  </span>
                    
                  </span>

                  <div v-if="showBalasan.indexOf(comment.id) !== -1" v-for="(subComment , index) in comment.sub_comments_list" :key="index" class="flex mb-4 pt-2">
                    <img v-if="subComment.commentator_profile != null" class="w-10 h-10 rounded-full me-4" :src="subComment.commentator_profile" alt="user photo">
                    <img v-else class="w-10 h-10 rounded-full me-4" src="@/assets/clown.jpg" alt="user photo">

                    <div :id="'subCommentId-' + subComment.id" tabindex="0">
                      <a v-if="route.name === 'archive.album' && subComment.commentator_username === route.params.username" :href="'/profile/' + subComment.commentator_username" class=" font-semibold text-sm me-2">{{ subComment.commentator_username }}</a>
                       <RouterLink v-else :to="'/profile/' + subComment.commentator_username" class=" font-semibold text-sm me-2">{{ subComment.commentator_username }}</RouterLink>

                      <pre class="comment text-sm">{{ subComment.sub_comment_text }}</pre>
                      <div class="flex mt-1">
                        <span class="text-xs font-extralight me-4">{{ subComment.created_at }}</span>
                        <span v-if="route.name !== 'archive.album'" class="text-xs font-light cursor-pointer me-4" @click="subCommentToggle(comment.commentator_username , comment.id)">Balas</span>
                        <span v-if="subComment.commentator_username == userAuth.username && route.name !== 'archive.album'" @click="deleteSubComment(subComment.id)" class="text-xs font-light cursor-pointer">
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
              
            </div>
            <div class="mx-auto" v-else>
           
            </div>
            
        </div>
       
        <div id="footer-album" class="sticky bottom-0 bg-white h-32 z-20 border-t-2">
          <div class="flex pt-2">
              <div class="me-4"> 
                <i @click="likePost" v-if="detailPost.isLiked === false" class="fa-regular fa-heart fa-xl me-1"></i> 
                <i @click="likePost" v-else class="fa-solid fa-heart fa-xl me-1 text-red-700"></i> 
                <span class="text-sm cursor-pointer" @click="popupLike">{{ detailPost.total_like }} Suka</span>
             
              </div>
              <div>
                <i class="fa-regular fa-comments fa-xl me-1"></i> <span class="text-sm cursor-pointer">{{ detailPost.total_comment }} Comment</span>
              </div>
          </div>

          <div>
            
        <form action="" @submit.prevent="handleComment">
            <label for="chat" class="sr-only">Your message</label>
            <div class="flex items-center px-1 py-2 mt-4 rounded-lg dark:bg-gray-700">
                <textarea v-on:input="limitCharacterCount" v-if="route.name !== 'archive.album'" id="chat" rows="1" v-model="commentText.comment" name="comment" class="comment-box block me-1 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Silahkan komentar..." required></textarea>

                <textarea v-if="route.name === 'archive.album'" disabled id="chat" rows="1" class="block me-1 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tidak dapat membuat komentar pada arsip..."></textarea>
              
                <span id="xMark" v-if="subCommentText.comment_id != null" @click="closeSubCommentStatus" class="absolute me-16 hover:text-blue-400 right-0 font-bold text-black z-50 cursor-pointer">&#10005;</span>    
                <button @submit.prevent="handleComment" type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                    <svg class="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                    </svg>
                    <span class="sr-only">Send message</span>
                </button>
            </div>
        </form>

          </div>
        </div>

       </div>

       <div v-else>
       <LoadedV2/>
       </div>
    </div>
  </div>
</AlbumModal>

<div class="w-full max-w-3xl m-auto bg-white mt-3">
  <div v-if="userAuth.username ===  route.params.username && route.name === 'profile'" class="">
    <button class="mx-auto block py-2 px-4" @click="toggleModal">
        <span class="hover:text-blue-500">
          <i class="fa-solid fa-square-plus text-2xl w-3 h-3 mr-2.5"></i>
          Buat Album
        </span>
    </button>
  </div>
  <hr>

  <div v-if="fetched == true" class="mt-6 grid grid-cols-3 md:grid-cols-3 gap-4 px-1 md:px-0">
  
      <div v-for="(post, index) in albums" :key="index" >
        <div>
        <img @click="popupAlbum(post.uuid)" loading="lazy" class=" h-36 md:h-56 w-64 rounded-lg object-cover object-center cursor-grabbing" :src="post.album.contents[0].content" alt="rusak kali ye">
    </div>
      </div>

   
</div>

</div>
</template>


<script setup>
import BaseModal from "@/components/BaseModal.vue";
import AlbumModal from "@/components/AlbumModal.vue";
import CreateAlbum from "@/components/CreateAlbum.vue";
import LoadedV2 from "@/components/LoadedV2.vue";
import Swipper from "@/components/Swipper.vue";
import MobileComment from "@/components/MobileComment.vue";
import LikeList from "@/components/LikeList.vue";
import AlbumDropdown from "@/components/AlbumDropdown.vue";

import { useUserAuthStore } from '@/stores/authUser'
import { ref , onMounted, reactive, onBeforeUnmount , watch  } from "vue"
import { useRoute } from "vue-router";
import { useAlbumStore } from '@/stores/album.js'
import { limitCharacterCount } from '@/assets/js/limit-char-comment.js'

import axios from "axios";
import http from "../helper/http";

const props = defineProps({
  foto_profile: String,
  username: String
})

const userAuth = useUserAuthStore()

const route = useRoute()
const modalActive = ref(null)
const modalWidth = ref('max-w-2xl')

const toggleModal = () => {
    modalActive.value = !modalActive.value
  }


 /* Get album */
 const albums = ref([])
 const getAlbumEndpoint = ref('')
 const singlePostEndpoint = ref('')


const checkRoute = () => {
  if(route.name === 'profile'){
    getAlbumEndpoint.value = '/api/v1/user/albums/'
    singlePostEndpoint.value = '/api/v1/post/'
  }else if(route.name === 'archive.album'){
    getAlbumEndpoint.value = '/api/v1/user/albums/archived/'
    singlePostEndpoint.value = '/api/v1/post/archived/'
  }
}

const fetched = ref(false)
const getAlbum = (username) => {
    console.log(getAlbumEndpoint.value);
     http().get(getAlbumEndpoint.value + username , {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      albums.value = response.data.posts
      fetched.value = true
    })
    .catch((error) => {
      albums.value = []
      console.error(error)
    })
}

const modalAlbumActive = ref(null)
const modalAlbumWidth = ref('max-w-sm md:max-w-6xl')
const detailPost = reactive({
    id: '',
    uuid: '',
    total_like: null,
    total_comment: null,
    created_at: '',
    slug: '',
    caption: '',
    post_id: null,
    isLiked: false
})

const images = ref([])
const showPopup = ref(true)

const popupAlbum = (uuid) => {
    modalAlbumActive.value = !modalAlbumActive.value
    images.value = []
    allComment.value = []

    /* hide scrollbar */
    if(modalAlbumActive.value == true){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'visible';
      subCommentText.comment_id = null
      showBalasan.value = []
      albumDropdown.value = false
      commentText.comment = ''
    }

    uuid ? showPopup.value = true : showPopup.value = false

    if(showPopup.value === true){
       
         http().get(singlePostEndpoint.value + uuid , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            })
            .then((response) => {
               
                const responseValue = response.data.single_post.album.contents
                
                detailPost.uuid = response.data.single_post.uuid
                detailPost.total_like = response.data.single_post.total_like
                detailPost.total_comment = response.data.single_post.total_comment
                detailPost.created_at = response.data.single_post.created_at
                detailPost.slug = response.data.single_post.album.slug
                detailPost.caption = response.data.single_post.album.caption
                detailPost.post_id = response.data.single_post.album.post_id
                response.data.like == 'Liked' ? detailPost.isLiked = true : detailPost.isLiked = false
                
               //panggil get comment
               getComment(detailPost.post_id)

                responseValue.forEach(element => {
                   images.value.push(element['content'])
                });

            })
            .catch((error) => {
            console.error(error)
        })

    }
}

/* Handle Comment action */
const allComment = ref([])

const getComment = (postId) => {
  http().get('/api/v1/post/comments/' + postId , {
    headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  })
  .then((response) => {
    const commentList = response.data.comments_list
    allComment.value = []
    commentList.forEach((array , index) => {
      allComment.value.push(array)
    })

  })
  .catch((error) => {
    console.error(error)
  })
}


/* Send comment */
const commentText = reactive({
    comment: '',
    post_id: null
})

const subCommentText = reactive({
    sub_comment: '',
    comment_id: null
})


const handleComment = () => {

    let endpoint = '/api/v1/comment'
    let params = commentText

    //logic apakah kirim comentar atu balas comentar
    if(subCommentText.comment_id == null){
      commentText.post_id = detailPost.post_id

      //membatasi agar maksimal karakter comment adalah 65
      params.comment = params.comment.substring(0 , 65)
    }else{
      endpoint = '/api/v1/sub-comment'
      subCommentText.sub_comment = commentText.comment
      params = subCommentText

      //membatasi agar maksimal karakter comment adalah 65
      params.sub_comment = params.sub_comment.substring(0 , 65)
    }
  
      http().post(endpoint , params , 
      {
      headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
      getComment(detailPost.post_id)
      commentText.comment = ''
      subCommentText.comment_id = null
      const commentBox =  document.querySelector('#chat')
      commentBox.placeholder = 'Silahkan komentar...'
      
      detailPost.total_comment = response.data.data.total_comment

       //kondisi focus untuk comment
       if(response.data.data.sub_comment_id){
          showBalasan.value.indexOf(response.data.data.comment_id) === -1 ? 
          showBalasan.value.push(response.data.data.comment_id) :
          null
        }

    })
    .catch((error) => {
      console.error(error)
    })
}


const subCommentToggle = (username , comment_id) => {
  subCommentText.comment_id = comment_id
  const commentBox =  document.querySelector('#chat')

  commentBox.placeholder = 'Anda membalas komentar ' + username
  commentBox.focus()

  let findIndex = showBalasan.value.indexOf(comment_id)
  if(findIndex === -1){
    showBalasan.value.push(comment_id)
  }
 
}

const closeSubCommentStatus = () => {
  subCommentText.comment_id = null
  const commentBox =  document.querySelector('#chat')

  commentBox.placeholder = 'Silahkan komentar...'
  commentBox.focus()
  
}


const showBalasan = ref([])
const toggleBalasan = (comment_id) => {

  let findIndex = showBalasan.value.indexOf(comment_id)
  if(findIndex !== -1){
   showBalasan.value.splice(findIndex , 1);
  }else{
    showBalasan.value.push(comment_id)
  }
}

const deleteComment = (comment_id) => {
    http().delete('/api/v1/comment/' + comment_id , {
      headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
        getComment(detailPost.post_id)
        detailPost.total_comment = response.data.current_comment
    })
    .catch((error) => {
      console.error(error)
    })
}

const deleteSubComment = (sub_comment_id) => {
    http().delete('/api/v1/sub-comment/' + sub_comment_id , {
      headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
      getComment(detailPost.post_id)
      detailPost.total_comment = response.data.current_comment
    })
    .catch((error) => {
      console.error(error)
    })
}


//like post logic
const likeCounterTap = ref(0);

const likePost = () => {

  if(route.name === 'archive.album'){
    return false
  }

  http().put('/api/v1/like/' + detailPost.uuid , {} , {
      headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
      detailPost.total_like = response.data.total_like
      response.data.like == 'Liked' ? detailPost.isLiked = true : detailPost.isLiked = false
    })
    .catch((error) => {
      console.error(error)
    })
}

//small comment popup
const modalSmallCommentActive = ref(null)
const modalSmallCommentWidth = ref('max-w-sm')
const zIndex = ref('z-[100]')
const popupComment = () => {
  modalSmallCommentActive.value = !modalSmallCommentActive.value
}

//like popup
const modalLikeActive = ref(null)
const modalLikeWidth = ref('max-w-sm')
const popupLike = () => {
  modalLikeActive.value = !modalLikeActive.value
}

const checkScreen = () => {
    if(window.innerWidth >= 768){
        modalSmallCommentActive.value = false
    }
}


const albumDropdown = ref(false)
const dropdownAlbum = () => {
  albumDropdown.value = !albumDropdown.value
}
 const albumActivity = useAlbumStore()

//watch membaca setiap perubahan pada view agar tidak perlu load component ulang
watch(
  [() => albumActivity.refresh , () => route.params.username , () => route.name],
  ([refresh, username , currentRoute], [prevRefresh, prevUsername, prevRoute]) => {
  
     if(username !== prevUsername || refresh == true){
      modalActive.value = false
      modalAlbumActive.value = false
      modalLikeActive.value = false
      modalSmallCommentActive.value = false
      albumDropdown.value = false
      getAlbum(username)

      albumActivity.refresh = false
      document.body.style.overflow = 'visible';
     }

     if(currentRoute !== prevRoute){
        fetched.value = false
        checkRoute()
        getAlbum(username)
        document.body.style.overflow = 'visible';
     }
  })

onMounted(() => {
  checkRoute()
  getAlbum(route.params.username)
  checkScreen()
  window.addEventListener('resize', checkScreen);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen);
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