<template>
  <file-pond
            id="file"
            name="album_content"
            ref="pond"
            :label-idle=labelStyle
            allow-multiple="true"
            maxFiles="5"
            maxParallelUploads="1"
            accepted-file-types="image/jpeg, image/png , image/jpg, image/gif"
            imagePreviewHeight="300"
            allowImageResize="true"
            allowImageTransform="true"
            imageCropAspectRatio="1:1"
            imageResizeTargetWidth="1080"
            imageResizeTargetHeight="1080"
            imageResizeMode="force"
            imageResizeUpscale="false"
            itemInsertLocation="after"
            allowReorder="true"
            itemInsertInterval="1500"
            v-on:reorderfiles="reorder"
            v-on:processfile="onUploadAction"
            v-on:processfiles="allUploaded"
            :server="{
                url: '',
                process: {
                    url: 'http://shalltears-app.test/api/v1/temp/album',
                    method: 'POST',
                    onload: handleFilePondOnLoad,
                },
                revert: handleFilePondRevert,
                headers: {
                        Authorization: 'Bearer ' + token,
                        Accept: 'application/json'
                    },
            }"
    />

<div class="w-full px-4 mx-auto">
 <form action="#" @submit.prevent="handleCreateAlbum">
           
<label for="caption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tulis Caption</label>
<textarea v-model="caption" :disabled="captDisabled" name="caption" id="caption" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="I need more bullets..."></textarea>

<div class="w-full flex justify-end">
    <button @submit.prevent="handleCreateAlbum" type="submit" class="mb-1 w-24 mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Posting</button>
</div>
 </form>
</div>

<button class="hidden" type="button" id="successCreateAlbum" @click="this.$toast.success(`Album berhasil ditambah`)">hidden</button>
</template>

<script setup>
import { ref  } from 'vue';
import axios from 'axios';

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageCrop from "filepond-plugin-image-crop";


import { useRoute, useRouter } from 'vue-router';

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageCrop,
);

const myFiles = ref([]);
const caption = ref('');

const token = ref(localStorage.getItem('token'))
const router = useRouter()
const route = useRoute()

const labelStyle = ref('Upload max 5 gambar 😎 <span class="filepond--label-action text-blue-400  cursor-pointer">Browse</span> <br> <span class="font-bold"> Drag & Drop untuk urut gambar </span> ')

const captDisabled = ref(true);


const handleFilePondOnLoad = (response) => {
    myFiles.value.push(response)
    myFiles.value.length == 0 ? captDisabled.value = true : captDisabled.value = false
    return response
}

const handleFilePondRevert = (uniqueID , load) => {
    myFiles.value = myFiles.value.filter((image) => image !== uniqueID)
    myFiles.value.length == 0 ? captDisabled.value = true : captDisabled.value = false
    axios.delete('http://shalltears-app.test/api/v1/temp/album' , {
        headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token')
    },
        data: {path: uniqueID}
    })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
        load()
}

const onUpload = ref([])

const onUploadAction = (error , file) => {
    onUpload.value.push(file.serverId)
}


const allUploaded = () => {
    axios.put('http://shalltears-app.test/api/v1/temp/album' , {album_contents: onUpload.value} , {
        headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    })
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.error(error)
    })
}

const urlCreateAlbum = ref('http://shalltears-app.test/api/v1/album')

const reorder = (files, origin , target) => {
  
    myFiles.value = []
    files.forEach((obj , index) => {
        myFiles.value.push(
           obj.serverId,
        )
    });

   if(urlCreateAlbum.value != 'http://shalltears-app.test/api/v1/album?reorder=true'){
        urlCreateAlbum.value = urlCreateAlbum.value + '?reorder=true'
   }

}

  
const handleCreateAlbum = () => {
  axios.post(urlCreateAlbum.value , {caption: caption.value , content: myFiles.value} , {
    headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token')
    },
  })
  .then((response) => {
        const successNotif = document.querySelector('#successCreateAlbum')

        router.push({
            path: '/explorer'
        })
        successNotif.click()
    })
    .catch((error) => {
        console.error(error)
    })
  
}
</script>

<style scoped>

</style>