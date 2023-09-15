<template>

  <nav class="sticky top-0 bg-white border-b-2 border-gray-200 shadow dark:bg-gray-900 z-50">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div id="search-container" class="relative mt-3 ">
      <div class="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>

      <!-- Search -->
      <input @click="searchDropdownToggle"  v-model="searchKeyword" v-on:keyup="findUser(searchKeyword)" autocomplete="off" type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari pengguna...">
      
      <div v-if="searchDropdown" id="dropdownList" class="z-10 absolute w-full left-0 bg-white shadow dark:bg-gray-700">
        <div v-if="isFound == true">
         <div v-if="matchUser.length > 0 && searchKeyword != ''" @click="findAllMatchUser(searchKeyword)" class="px-4 mt-2 py-2 mb-2 cursor-zoom-in hover:bg-blue-200 hover:text-gray-500">
          <i class="fa-brands fa-searchengin fa-xl border"></i>
          <span class="font-semibold ml-6 text-sm">Tampilkan semua...</span>
         </div>
          <div v-if="matchUser.length > 0 " v-for="(user , index) in matchUser" :key="index">
            <div class="flex p-2">
                <img v-if="user.foto_profile" :src="user.foto_profile" class="w-10 h-10 rounded-full" alt="Broken">
                <img v-else src="@/assets/clown.jpg" class="w-10 h-10 rounded-full" alt="Broken">
                <div class="ml-4">
                    <RouterLink :to="'/profile/' + user.username" class="text-sm font-semibold">{{ user.username }}</RouterLink >
                    <p class="text-xs font-light">{{ user.first_name }} {{ user.last_name }}</p>
                </div>
            </div>
        </div>
        <div v-else class="mx-auto my-4 text-center">
          <span class="font-semibold text-gray-400 text-sm">Tidak ada hasil</span>
        </div>
        </div>
        <div v-else>
          <LoadedV2/>
        </div>
  </div>
  <!-- End of search -->

    </div>
    <div class="flex relative items-center md:order-2">
        <button @click="navigasiDropdownToggle" type="button" id="navigasi-dropdown"  class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
          <span class="sr-only">Open user menu</span>
          <img v-if="currentUser.foto_profile !== ''" class="w-11 h-11 rounded-full" :src="currentUser.foto_profile" alt="user photo">
          <img v-else class="w-11 h-11 rounded-full" src="@/assets/clown.jpg" alt="user photo">
        </button>
  
        <!-- Dropdown menu -->
        <div v-if="navigasiDropdown" class="z-50 absolute top-full right-0 md:-left-10 w-40 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">{{ currentUser.full_name }}</span>
            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">@{{ currentUser.username }}</span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <RouterLink :to="'/profile/' + userAuth.username" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</RouterLink>
            </li>
            <li>
              <RouterLink :to="'/account'" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Akun</RouterLink>
            </li>
            <li>
             <form action="#" @click="handleLogout">
              <button @click="handleLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
            </form>
            </li>
          </ul>
        </div>
      
    </div>
    <div class="items-center lg:me-40 justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
      <ul class="flex flex-col justify-between font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
       <button @click="toExplorer"  type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Beranda</span>
        </button>
        <button @click="showNotification"  type="button" class="notif-dropdown relative inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-7 h-7 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:group-hover:text-blue-500"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M19.3399 14.4899L18.3399 12.8299C18.1299 12.4599 17.9399 11.7599 17.9399 11.3499V8.8199C17.9399 5.5599 15.2899 2.8999 12.0199 2.8999C8.74994 2.8999 6.09994 5.5599 6.09994 8.8199V11.3499C6.09994 11.7599 5.90994 12.4599 5.69994 12.8199L4.68994 14.4899C4.28994 15.1599 4.19994 15.8999 4.44994 16.5799C4.68994 17.2499 5.25994 17.7699 5.99994 18.0199C7.93994 18.6799 9.97994 18.9999 12.0199 18.9999C14.0599 18.9999 16.0999 18.6799 18.0399 18.0299C18.7399 17.7999 19.2799 17.2699 19.5399 16.5799C19.7999 15.8899 19.7299 15.1299 19.3399 14.4899Z" fill="#292D32"></path> <path d="M14.2508 3.32C13.5608 3.05 12.8108 2.9 12.0208 2.9C11.2408 2.9 10.4908 3.04 9.80078 3.32C10.2308 2.51 11.0808 2 12.0208 2C12.9708 2 13.8108 2.51 14.2508 3.32Z" fill="#292D32"></path> <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#292D32"></path> </g></svg>
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Notifikasi</span>
            <span v-if="userAuth.notification.total_notification > 0" class="absolute bg-red-500 rounded-full top-0 left-1/2 w-4 h-4 text-white font-semibold text-center text-[8px]">
             {{ userAuth.notification.total_notification}}
            </span>
        </button>
      </ul>
    </div>
    </div>
    <div class="notif-dropdown sm:hidden md:block">
      <NotificationDropdown :notificationDropdown="notificationDropdown" :position="position" />
    </div>
  </nav>


  </template>
  
  <script setup>
  import { reactive, onMounted, ref, onBeforeUnmount } from "vue";
  import axios from 'axios';
  import { useRouter } from "vue-router";
  import { useUserAuthStore } from '@/stores/authUser'
  import { useAlbumStore } from '@/stores/album'

  import LoadedV2 from "@/components/LoadedV2.vue";
  import NotificationDropdown from "@/components/NotificationDropdown.vue";
  
  const userAuth = useUserAuthStore()
  const currentUser = reactive({
      foto_profile: '',
      full_name: '',
      username: ''
  })


  /* user notification */
  const notificationDropdown = ref(false)
  const position = ref('')
 
  const showNotification = () => {
    notificationDropdown.value = true
    position.value = 'top'

     if(userAuth.notification.notification_list){

        //update readed notif
        axios.put('http://shalltears-app.test/api/v1/notification/readed' , {readed_notif: JSON.parse(userAuth.notification.notification_list).length} , {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((response) => {
           
          })
          .catch((error) => {
            console.error(error)
          })
     }

  }


  /* fetch user */
  const fetchUser = () => {
    
    axios.get('http://shalltears-app.test/api/v1/personal-user' , {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then((response) => {
        response.data.data.foto_profile == null ? currentUser.foto_profile = '' : currentUser.foto_profile = response.data.data.foto_profile,
        currentUser.full_name = response.data.data.first_name + " " + response.data.data.last_name,
        currentUser.username = response.data.data.username
    })
    .catch((error) => {
      console.error(error)
    })
  }


  /* to route all match user */
  const findAllMatchUser = (keyword) => {
      router.push({
          name: 'find.user',
          query: {keyword : keyword}
      })
  }


/* search dropdown */
const searchDropdown = ref(null)
const searchDropdownToggle = () => {
  searchDropdown.value = true
}

/* navigasi dropdown */
const navigasiDropdown = ref(null)
const navigasiDropdownToggle = () => {
    navigasiDropdown.value = true
}

const handleClickOutside = (event) => {
    if (!document.getElementById('search-container').contains(event.target)) {
      searchDropdown.value = false;
    }

    if (!document.querySelector('.notif-dropdown').contains(event.target)) {
      notificationDropdown.value = false;
    }

    if (!document.getElementById('navigasi-dropdown').contains(event.target)) {
      navigasiDropdown.value = false;
    }
    
  };


  /* find user */
  const searchKeyword = ref('')
  const matchUser = ref([])
  const isFound = ref(true)

  let timeoutId = null;

  const findUser = (keyword) => {
    matchUser.value = []
    isFound.value = false

    if(keyword == ''){
       isFound.value = true
       matchUser.value = []
       return false
    }
    clearTimeout(timeoutId); // Menghapus timeout sebelumnya (jika ada)
 
    // Membuat timeout baru yang akan menjalankan permintaan setelah pengguna berhenti mengetik selama 300ms
    timeoutId = setTimeout(async () => {
     await axios.get('http://shalltears-app.test/api/v1/find-user?user_keyword=' + keyword, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
       matchUser.value = response.data.match_users
       isFound.value = true
      })
      .catch((error) => {
        console.error(error);
      });
    }, 300); // Ubah angka ini sesuai dengan waktu yang dinginkan (misalnya 300ms)
  };

  const albumActivity = useAlbumStore()

  const router = useRouter();

  /* Logout */
  const handleLogout = () => {
    axios.post('http://shalltears-app.test/api/v1/logout' , {} , {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then((response) => {
        localStorage.clear()
        userAuth.username  = ''
        userAuth.notification.notification_list  = null
        userAuth.notification.readed_notification  = null
        userAuth.notification.total_notification  = 0
        router.push({
          name: 'login'
        })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  //route to explorer
  const toExplorer = () => {
    router.push({
      name: 'explorer'
    })
  }

  onMounted(() => {
    fetchUser()
    document.addEventListener('click', handleClickOutside);
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  })

 

  </script>
  
  
  <style>
  
  </style>