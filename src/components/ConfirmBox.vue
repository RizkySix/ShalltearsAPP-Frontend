<template>
  <Teleport to="body">
   <Transition name="modal-outer">
       <div v-show="confirmActive" tabindex="-1" :class="['fixed top-0 left-0 right-0 h-screen z-50 overflow-x-hidden overflow-y-auto bg-black bg-opacity-30 flex justify-center p-4 md:inset-0']">
       <!-- for the modal -->
       <Transition name="modal-inner">
         <div v-if="confirmActive" :class="['relative', 'self-start', 'mt-32', 'mb-20' , 'w-full max-w-[15rem] md:max-w-xs lg:max-h-full', 'py']">
       <div class="relative bg-white rounded-lg shadow">
          <slot/>

          <div class="px-4 py-2 flex justify-center">
            <button @click="confirmAct(true)" class="mr-2 px-4 py-2 text-black shadow rounded hover:bg-blue-200">Lanjut</button>
            <button @click="confirmAct(false)" class="px-4 py-2 text-black shadow rounded hover:bg-red-200">Cancel</button>
          </div>
       </div>
   </div>
   </Transition>
   </div>
  </Transition>
  </Teleport>
</template>

<script setup>
import { useAlbumStore } from '@/stores/album';
import { onMounted } from 'vue';

const emit = defineEmits(['close-confirm'])
defineProps({
    confirmActive : {
        type: Boolean,
        default: false
    }
})

const albumActivity = useAlbumStore()
const confirmAct = (status) => {
    status == true ? albumActivity.confirmBoxAct = true : albumActivity.confirmBoxAct = false
    
    emit('close-confirm')
}


</script>


<style scoped>

.modal-outer-enter-active,
.modal-outer-leave-active {
 transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
 opacity: 0;
}

.modal-inner-enter-active {
 transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
 transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
 opacity: 0;
 transform: scale(0.8);
}

.modal-inner-leave-to {
 transform: scale(0.8);
}
</style>