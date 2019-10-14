import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import RegisterDriver from './views/RegisterDriver.vue'
import RegisterClient from './views/RegisterClient.vue'
import Main from './views/Main.vue'
import ClientMyProfile from './views/ClientMyProfile.vue'
import DriverMyProfile from './views/DriverMyProfile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register-driver',
      name: 'register-driver',
      component: RegisterDriver
    },
    {
      path: '/register-client',
      name: 'register-client',
      component: RegisterClient
    },    
    {
      path: '/client-my-profile',
      name: 'client-my-profile',
      component: ClientMyProfile
    },
    {
      path: '/driver-my-profile',
      name: 'driver-my-profile',
      component: DriverMyProfile
    },    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
