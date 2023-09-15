<template>
  <Teleport to="body">
   <Transition name="modal-outer">
       <div v-show="modalActive" tabindex="-1" :class="['fixed top-0 left-0 right-0 h-screen' ,  zIndex , overflow, 'bg-black bg-opacity-30 flex justify-center p-4 md:inset-0 h-[calc(100%-1rem)]']">
       <!-- for the modal -->
       <Transition name="modal-inner">
         <div v-if="modalActive" :class="['relative', 'self-start', 'mt-32', 'mb-20' , 'w-full', width, 'lg:max-h-full', 'py']">
       <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
           <button @click="$emit('close-modal')" type="button" class="absolute z-[501] top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
               <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
               </svg>
               <span class="sr-only">Close modal</span>
           </button>
          <slot/>
       </div>
   </div>
   </Transition>
   </div>
  </Transition>
  </Teleport>
</template>

<script setup>
   defineEmits(['close-modal'])
   defineProps({
       modalActive: {
           type: Boolean,
           default: false
       },
       width: {
         type: String,
         default: 'max-w-md'
       },
       zIndex: {
        type: String,
        default: 'z-50'
       },
       overflow: {
        type: String,
        default: 'overflow-x-hidden overflow-y-auto'
       }
       
   })

   
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