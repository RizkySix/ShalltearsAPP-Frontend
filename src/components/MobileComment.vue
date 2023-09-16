<template>
    <div v-if="isFetched === true">
        <div class="custom-scrollbar relative bg-white rounded-lg h-[550px] px-2 box-border">
        <div id="navbar-album" class="sticky top-0 h-auto z-10 border-b-2">
            <div class="flex mb-1 pt-2">
              <img v-if="foto_profile" class="w-10 h-10 rounded-full me-4" :src="foto_profile" alt="user photo">
              <img v-else class="w-10 h-10 rounded-full me-4" src="@/assets/clown.jpg" alt="user photo">
              <div class="w-4/5">
                <span class=" font-semibold text-sm">{{ username }}</span> <br>
                <span class="text-xs font-light">Post on {{ props.detailPost.created_at }}</span>
              </div>
            </div>
         </div>
         

        <div  id="caption-and-comment" class="custom-scrollbar mt-2 h-[400px] overflow-scroll overflow-x-hidden ">
          <div v-if="props.detailPost.caption"  class="flex mb-4 pt-2">
              <img v-if="foto_profile" class="w-10 h-10 rounded-full me-4" :src="foto_profile" alt="user photo">
              <img v-else class="w-10 h-10 rounded-full me-4" src="@/assets/clown.jpg" alt="user photo">
              <div>
                <span class=" font-semibold text-sm me-2">{{ username }}</span>
                <pre class="capt text-sm ">{{ props.detailPost.caption }}</pre>
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
                <div v-if="route.name !== 'archive.album'" class="flex mt-1">
                  <span class="text-xs font-extralight me-4">{{ comment.created_at }}</span>
                  <span class="text-xs font-light cursor-pointer me-4" @click="subCommentToggle(comment.commentator_username , comment.id)">Balas</span>
                  <span v-if="comment.commentator_username ==  userAuth.username" @click="deleteComment(comment.id)" class="text-xs font-light cursor-pointer">
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
                        <span v-if="route.name !== 'archive.profile'" class="text-xs font-light cursor-pointer me-4" @click="subCommentToggle(comment.commentator_username , comment.id)">Balas</span>
                        <span v-if="subComment.commentator_username == userAuth.username && route.name !== 'archive.profile'" @click="deleteSubComment(subComment.id)" class="text-xs font-light cursor-pointer">
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
              
            </div>
          
            
        </div>
       
        <div id="footer-album" class="sticky bottom-0 bg-white z-20 border-t-2 h-[50px]">
            <form action="" @submit.prevent="handleComment">
            <label for="chat" class="sr-only">Your message</label>
            <div class="flex items-center px-1 py-2 mt-4 rounded-lg">
                <textarea v-on:input="limitCharacterCount" v-if="route.name !== 'archive.album'" id="chat" rows="1" v-model="commentText.comment" name="comment" class="comment-box block me-1 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Silahkan komentar..."></textarea>

                <textarea v-if="route.name === 'archive.album'" disabled id="chat" rows="1" class="block me-1 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Tidak dapat membuat komentar pada arsip..."></textarea>
              
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
</template>

<script setup>
import LoadedV2 from "@/components/LoadedV2.vue";
 
const props = defineProps({
    detailPost: Object,
    foto_profile: String,
    username: String
})

import { ref , reactive , onMounted  } from "vue"
import axios from "axios";
import { useRoute } from "vue-router";
import { useCommentStore } from "@/stores/comment";
import { useUserAuthStore } from '@/stores/authUser'
import { limitCharacterCount } from '@/assets/js/limit-char-comment.js'
import http from "../helper/http";

const route = useRoute()

const userAuth = useUserAuthStore()

/* Handle Comment action */
const allComment = ref([])
const isFetched = ref(false)

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
    isFetched.value = true
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

const commentState = useCommentStore()

const handleComment = () => {
    
    let endpoint = '/api/v1/comment'
    let params = commentText

    //logic apakah kirim comentar atu balas comentar
    if(subCommentText.comment_id == null){
      commentText.post_id = props.detailPost.post_id

      //batasi agar maksimal karakter comment 65
      params.comment = params.comment.substring(0, 65);
    }else{
      endpoint = '/api/v1/sub-comment'
      subCommentText.sub_comment = commentText.comment
      params = subCommentText

      //batasi agar maksimal karakter comment 65
      params.sub_comment = params.sub_comment.substring(0, 65);
    }
     
      http().post(endpoint , params , 
      {
      headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
      getComment(props.detailPost.post_id)
      commentText.comment = ''
      subCommentText.comment_id = null
      const commentBox =  document.querySelector('#chat')
      commentBox.placeholder = 'Silahkan komentar...'
      
      props.detailPost.total_comment = response.data.data.total_comment

       //kondisi focus untuk comment
       if(response.data.data.sub_comment_id){
        showBalasan.value.indexOf(response.data.data.comment_id) === -1 ? 
        showBalasan.value.push(response.data.data.comment_id) :
        null


        }

        //tidak akan dijalankan pada personal album
        if(route.name !== 'profile'){
          commentState.newComment = true
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
  commentText.comment = ''
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
        getComment(props.detailPost.post_id)
        props.detailPost.total_comment = response.data.current_comment

        //tidak akan dijalankan pada personal album
        if(route.name !== 'profile'){
          commentState.newComment = true
        }
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
      getComment(props.detailPost.post_id)
      props.detailPost.total_comment = response.data.current_comment

      //tidak akan dijalankan pada personal album
      if(!props.detailPost.caption){
          commentState.newComment = true
        }
    })
    .catch((error) => {
      console.error(error)
    })
}


onMounted(() => {
    getComment(props.detailPost.post_id)
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