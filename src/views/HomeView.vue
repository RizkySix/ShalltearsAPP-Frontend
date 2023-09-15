<template>
  <div class="min-h-screen flex flex-col">
    <!-- Section 1: Slogan dan Tombol Login -->
    <section class="bg-slate-400 text-white flex-1 flex flex-col justify-center items-center p-4">
        <img src="@/assets/logo.png" alt="Logo Aplikasi" class=" w-60 h-auto mb-4">
        <h1 class="text-4xl font-semibold text-center mb-4">Shalltears Penuh Kasih</h1>
        <p class="text-gray-100 text-center mb-8">Small sosial media untuk para Shalltears</p>
        <RouterLink :to="'/auth/login'" class="bg-white text-blue-500 hover:bg-blue-600 hover:text-white font-semibold py-2 px-6 rounded-full transition duration-300">Sign In</RouterLink>
    </section>

    <!-- Section 2: Footer -->
    <footer class="bg-gray-800 text-white py-8">
        <div class="container mx-auto flex flex-col justify-center md:justify-between items-center text-center">
            <div class="mb-4 md:mb-0">
                <p class="text-xl font-semibold">Kunjungi sosial media saya</p>
               
                <div class="mt-4">
                    <a href="#" class="text-white hover:text-gray-300 mr-4"><i class="text-2xl fa-brands fa-whatsapp"></i></a>
                    <a href="https://www.linkedin.com/in/rizkysix/" class="text-white hover:text-gray-300 mr-4"><i class="text-2xl fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/RizkySix" class="text-white hover:text-gray-300 mr-4"><i class="text-2xl fa-brands fa-github"></i></a>
                    <a href="https://www.instagram.com/rizky___666/" class="text-white hover:text-gray-300"><i class="text-2xl fab fa-instagram"></i></a>
                </div>
            </div>
            <div class="mt-3 md:mt-8">
                <p>&copy; 2023 Shalltears. Hak Cipta Dilindungi Undang-Undang.</p>
            </div>
        </div>
    </footer>
</div>
</template>

<script setup>

</script>

