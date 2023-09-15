import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCommentStore = defineStore('commentState' , () => {
    const newComment = ref(false)
    const newLike = ref(false)
    return { newComment , newLike }
})