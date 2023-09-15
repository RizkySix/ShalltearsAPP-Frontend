
<template>
    <div class="header">
        <img class="logo" src="@/assets/logo.png" alt="Logo"> <!-- Gantilah dengan URL atau path ke logo Anda -->
        <h1>Hi Rizky, konfirmasi reset password akun Shalltears anda</h1>
    </div>
    <div class="container">
        <div class="pesan">
            Pesan <!-- Gantilah dengan kode OTP yang sesuai -->
        </div>
        <div class="message">
            Password akan direset setelah anda melakukan verifikasi. Silahkan login dengan password diatas. Link verifikasi kedaluarsa dalam 60 menit. 
        </div>
        <div class="pesan">
            Lokasi Event <!-- Gantilah dengan kode OTP yang sesuai -->
        </div>
        <div class="button-container">
           Atau anda dapat klik tautan ini 🗺️<a style="color:blue" href="http://localhost:5173/test-mail">http://localhost:5173/test-mail</a>
        </div>
    </div>
    <div class="regards">
        Terimakasih atas kepercayaan Anda pada kami. <br>
        Shalltears
    </div>
</template>

<script setup>

</script>


<style scoped>
      body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 0;
            margin: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            padding: 20px;
        }

        .logo {
            max-width: 150px;
            margin: auto;
            margin-bottom: 10px;
        }

        .header h1 {
            color: #007BFF;
        }

        .pesan {
            text-align: center;
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .message {
            text-align: center;
            font-size: 16px;
            margin-bottom: 30px;
            color: #666;
        }

        .button-container {
            text-align: center;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }

        .regards {
            text-align: center;
            margin-top: 20px;
            font-style: italic;
            color: #777;
        }
    </style>