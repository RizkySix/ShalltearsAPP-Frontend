import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAlbumStore =  defineStore('albumActivity' , () => {
    const refresh = ref(false);
    const confirmBoxAct = ref(null)

    return { refresh , confirmBoxAct}
})