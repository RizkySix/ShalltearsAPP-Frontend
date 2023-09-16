import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import VerificationView from '@/views/VerificationView.vue'
import VerificationSuccessView from '@/views/VerificationSuccessView.vue'
import ExplorerView from '@/views/ExplorerView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
import AlbumEditView from '@/views/AlbumEditView.vue'
import FindUserView from '@/views/FindUserView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ResetPasswordConfirm from '@/views/ResetPasswordConfirm.vue'
import ChangePasswordView from '@/views/ChangePasswordView.vue'
import TestMailView from '@/views/TestMailView.vue'

import axios from 'axios'
import { useUserAuthStore } from '@/stores/authUser'
import http from '../helper/http'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Shalltears-Landing Page'
      } 
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Shalltears-Login'
      } 
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Shalltears-Register'
      } 
    },
    {
      path: '/auth/forgot-password',
      name: 'forgot.password',
      component: ForgotPasswordView,
      meta: {
        title: 'Shalltears-Forgot Password'
      } 
    },
    {
      path: '/auth/reset-password/:reset_password_token/:email',
      name: 'reset.password.confirm',
      component: ResetPasswordConfirm,
      params: true,
      meta: {
        title: 'Shalltears-Reset Password Confirm'
      } 
    },
    {
      path: '/auth/verification',
      name: 'otp-verification',
      component: VerificationView,
      meta: {
        title: 'Shalltears-Verify Otp'
      } 
    },
    {
      path: '/auth/verification/success',
      name: 'verification-success',
      component: VerificationSuccessView,
      meta: {
        title: 'Shalltears-Verify Otp Confirm'
      } 
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: ExplorerView,
      meta: {
        title: 'Shalltears-Explorer'
      } 
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: ProfileView,
      params: true,
      meta: {
        title: 'Shalltears-Profile'
      } 
    },
    {
      path: '/profile/:username/edit',
      name: 'profile.edit',
      component: EditProfileView,
      params: true,
      meta: {
        title: 'Shalltears-Profile Edit'
      } 
    },
    {
      path: '/album/:slug/edit',
      name: 'album.edit',
      component: AlbumEditView,
      params: true,
      meta: {
        title: 'Shalltears-Album Edit'
      } 
    },
    {
      path: '/profile/:username/archive',
      name: 'archive.album',
      component: ProfileView,
      params: true,
      meta: {
        title: 'Shalltears-Album Archive'
      } 
    },
    {
      path: '/profile/:username/threads',
      name: 'profile.threads',
      component: ProfileView,
      params: true,
      meta: {
        title: 'Shalltears-Threads'
      } 
    },
    {
      path: '/find-user',
      name: 'find.user',
      component: FindUserView,
      meta: {
        title: 'Shalltears-Match User'
      } 
    },
    {
      path: '/account',
      name: 'account',
      component: ChangePasswordView,
      meta: {
        title: 'Shalltears-Account'
      } 
    },
  ]
})


router.beforeEach((to,from) => {
  document.body.style.overflow = 'visible';
  window.document.title = to.meta && to.meta.title ? to.meta.title : 'Shalltears';

  if(to.name === 'home'){
    return true
  }
 

  /* Auth */
  if(localStorage.getItem('token')){
    
    checkTokenAuthentication()
    if(!localStorage.getItem('email_verified_status') && from.name !== 'login'){
      if(
        to.name === 'explorer'
        ||
        to.name === 'profile' 
        ||
        to.name === 'profile.edit'
        ||
        to.name === 'album.edit'
        ||
        to.name === 'archive.album'
        ||
        to.name === 'profile.threads'
        ||
        to.name === 'find.user'
        ||
        to.name === 'account'
        ){
        return {
          name: 'otp-verification'
        }
      }
    }

    if(localStorage.getItem('email_verified_status') && to.name === 'otp-verification'){
      return{
        name: 'explorer'
      }
    }

      if(to.name === 'login' || to.name === 'register' || to.name === 'forgot.password'){
        return {
          name: 'explorer'
        }
      }

     
  }


  /* Guest */
  if(!localStorage.getItem('token')){
    if(
      to.name === 'otp-verification' 
      ||
      to.name === 'explorer' 
      ||
      to.name === 'profile' 
      ||
      to.name === 'profile.edit' 
      ||
      to.name === 'album.edit'
      ||
      to.name === 'archive.album'
      ||
      to.name === 'profile.threads'
      ||
      to.name === 'find.user'
      ||
      to.name === 'account'
    ){
      return {
        name: 'login'
     }
    }

  }


})

const checkTokenAuthentication = async() => {
  const userAuth = useUserAuthStore()
  await http().get('/api/v1/personal-user' , {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
  .then((response) => {

    const responseData = response.data.data
    userAuth.username = responseData.username
    userAuth.foto_profile = responseData.foto_profile

    userAuth.notification.notification_list = responseData.notification_list
    userAuth.notification.readed_notification = responseData.readed_notif
    userAuth.notification.total_notification = responseData.notification_list ? JSON.parse(responseData.notification_list).length - responseData.readed_notif : 0

    if(response.data.data.email_verified_at != null && !localStorage.getItem('email_verified_status')){
      localStorage.setItem('email_verified_status' , true)
    }
  })
  .catch((error) => {
    localStorage.removeItem('token')
    localStorage.removeItem('email_verified_status')
    router.push({
      name: 'login'
    })
  })
}

export default router
