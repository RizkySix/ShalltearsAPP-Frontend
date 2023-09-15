<template>
  <div v-show="imageSrc" class="my-4 w-72 h-72 object-fill mx-auto">
    <img class="block max-w-full" ref="img" :src="imageSrc" />
  </div>
  <div v-show="!imageSrc" class="my-4 w-72 h-72 object-fill mx-auto border-dotted border-2 border-gray-400 flex items-center justify-center">
    <p class="text-gray-400">No Photo</p>
  </div>

  <div class="flex justify-center content-end mt-2">
    <button
      v-if="!imageSrc"
      class="bg-blue-500 me-4 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-blue-300"
      @click="imageInput.click()"
    >
     Pilih Gambar
    </button>
    <button
      v-else
      class="bg-blue-500 me-4 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-blue-300"
      @click="handleImageCropped"
    >
      Jadikan Profile
    </button>
    <button
      class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-gray-200"
      @click="fileCleared"
    >
      Hapus
    </button>
    <input
      type="file"
      ref="imageInput"
      accept=".jpg,.jpeg,.png,.gif"
      @change="fileChanged"
      :style="{ display: 'none' }"
    />
  </div>
  <div class="my-2 align-baseline text-center">
    <span>Selected File: </span>
    <span v-if="selectedFile">{{ selectedFile.name }}</span>
  </div>
</template>

  
  <script>
  import {
    defineComponent,
    ref,
    watchEffect,
    onMounted,
    onUnmounted,
    watch,
  } from 'vue';
  import Cropper from 'cropperjs';
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'ImageCropper',
    events: ['imageCropped'],
    setup(_props, { emit }) {
      const imageInput = ref(null); // template ref for file input
      const selectedFile = ref(null);
      const imageSrc = ref(null);
      const img = ref(null);
      const fileReader = new FileReader();
      let cropper = null;
      const router = useRouter()
      const route = useRoute()
  
      fileReader.onload = (event) => {
        imageSrc.value = event.target.result;
      };
  
      const handleImageCropped = () => {
        cropper
          .getCroppedCanvas({
            width: 256,
            height: 256,
          })
          .toBlob((blob) => {
            console.log(blob);
            uploadImage(blob)
            emit('imageCropped', blob);
          }, 'image/jpeg');
      };

      const uploadImage = (blob) => {
        const formData = new FormData();
        formData.append('foto_profile', blob, 'cropped_image.jpg'); 

        axios.post('http://shalltears-app.test/api/v1/profile/avatar', formData , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data' 
              } ,
            params: {
                _method: 'PUT'
            }
          }) 
          .then((response) => {
            console.log('Image uploaded successfully:', response.data);

            router.push({
              path: '/profile/' + route.params.username
            })
            
          })
          .catch((error) => {
            console.error('Image upload failed:', error);
          });
      };
  
      const fileChanged = (e) => {
        const files = e.target.files || e.dataTransfer.files;
        if (files.length) {
          selectedFile.value = files[0];
        }
      };
  
      const fileCleared = (_) => {
        selectedFile.value = null;
      };
  
      onMounted(() => {
        cropper = new Cropper(img.value, {
          aspectRatio: 1,
          minCropBoxWidth: 256,
          minCropBoxHeight: 256,
          viewMode: 3,
          dragMode: 'move',
          background: false,
          cropBoxMovable: false,
          cropBoxResizable: false,
        });
      });
  
      onUnmounted(() => {
        cropper.destroy();
      });
  
      watchEffect(() => {
        if (selectedFile.value) {
          fileReader.readAsDataURL(selectedFile.value);
        } else {
          imageSrc.value = null;
        }
      });
  
      watch(
        imageSrc,
        () => {
          if (imageSrc.value) {
            cropper.replace(imageSrc.value);
          }
        },
        {
          flush: 'post', // watch runs after component updates
        }
      );
  
      return {
        imageInput,
        selectedFile,
        fileChanged,
        fileCleared,
        imageSrc,
        img,
        handleImageCropped,
      };
    },
  });
  </script>