<template>
<Navbar/>

<div v-if="route.query.keyword" class="mt-6 px-4 md:flex md:justify-around md:gap-4">
  <div class="hidden md:block md:w-1/4">
    <!-- Masih kosong bagian kiri -->
  </div>

  <div id="users_list" class=" w-full md:w-2/5">
      <div class="rounded-lg shadow h-auto p-4">
        <div id="query" class="mb-4">
            <h3 class="font-semibold text-base md:text-lg mb-2">Hasil pencarian untuk "{{ route.query.keyword }}"</h3>
            <hr>
        </div>

       <div v-if="fetchProccess == true" class="list-scrollbar h-[500px] overflow-scroll overflow-x-hidden">
            <div class="h-auto">
                <div v-if="matchUsers.length > 0" v-for="(user , index) in matchUsers" :key="index" id="lists" class="flex mb-3">
                <img class="w-14 h-14 md:w-16 md:h-16 rounded-full" v-if="user.foto_profile" :src="user.foto_profile" alt="Broken">
                <img class="w-14 h-14 md:w-16 md:h-16 rounded-full" v-else src="@/assets/clown.jpg" alt="Broken">
                <div class="ml-4">
                        <RouterLink :to="'/profile/' + user.username" class="text-base font-semibold">{{ user.username }}</RouterLink >
                        <p class="text-sm font-light">{{ user.first_name }} {{ user.last_name }}</p>
                    </div>
            </div>

            <div v-else>
                <div class="mx-auto text-center">
                    <h1 class="font-semibold text-gray-500 text-base md:text-lg">Tidak ada hasil saat ini</h1>
                </div>
            </div>
            </div>
       </div>
       <div v-else>
        <Loaded/>
       </div>

      </div>

     

  </div>

  <div id="right" class="hidden md:block md:w-1/4">
   
  </div>
</div>

<div v-else>
<NotFoundView/>
</div>

</template>


<script setup>
import Navbar from "@/components/Navbar.vue";
import Loaded from "@/components/Loaded.vue";
import NotFoundView from "@/components/NotFoundView.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()

const matchUsers = ref([])
const fetchProccess = ref(false)

const fetchMatchUser = (keyword) => {
    matchUsers.value = []
    fetchProccess.value = false
    axios.get('http://shalltears-app.test/api/v1/find-user?fetch_all=true&user_keyword=' + keyword , {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
        matchUsers.value = response.data.match_users
        fetchProccess.value = true
    })
    .catch((error) => {
        console.error(error)
    })
}

onMounted(() => {
    fetchMatchUser(route.query.keyword)
})

watch(() => route.query.keyword , keyword => {
    fetchMatchUser(keyword)
})

</script>


<style scoped>
/* CSS untuk mengatur gaya scrollbar */
.list-scrollbar::-webkit-scrollbar {
  width: 3px; /* Lebar scrollbar */
}

/* Warna latar belakang scrollbar */
.list-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Warna thumb scrollbar */
.list-scrollbar::-webkit-scrollbar-thumb {
  background: #e1cccc;
  border-radius: 4px; /* Membuat sudut bulat */
}

/* Hover state untuk thumb scrollbar */
.list-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>