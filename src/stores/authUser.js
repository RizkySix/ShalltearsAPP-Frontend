import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserAuthStore = defineStore('userAuth' , () => {
    const username = ref('')
    const foto_profile = ref(null)
    const notification = reactive({
        notification_list: null,
        readed_notification: null,
        total_notification: 0
    })

    const emergencySent = ref(false)

    return { username , foto_profile , notification  , emergencySent}
})