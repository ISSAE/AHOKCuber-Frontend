import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import RegisterDriver from './views/RegisterDriver.vue'
import RegisterClient from './views/RegisterClient.vue'
import Main from './views/Main.vue'
import ClientMyProfile from './views/ClientMyProfile.vue'
import DriverMyProfile from './views/DriverMyProfile.vue'
import WhereTo from './views/WhereTo.vue'
import TripSearch from './views/TripSearch.vue'
import ConfirmTrip from './views/ConfirmTrip.vue'
import ChooseDriver from './views/ChooseDriver.vue'
import DriverComing from './views/DriverComing.vue'
import TripRequest from './views/TripRequest.vue'
import Idle from './views/Idle.vue'
import Directions from './views/Directions.vue'

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
      path: '/where-to',
      name: 'where-to',
      component: WhereTo
    },
    {
      path: '/trip-search',
      name: 'trip-search',
      component: TripSearch
    },
    {
      path: '/confirm-trip',
      name: 'confirm-trip',
      component: ConfirmTrip
    },
    {
      path: '/choose-driver',
      name: 'choose-driver',
      component: ChooseDriver
    },
    {
      path: '/driver-coming',
      name: 'driver-coming',
      component: DriverComing
    },
    {
      path: '/trip-request',
      name: 'trip-request',
      component: TripRequest
    },
    {
      path: '/idle',
      name: 'idle',
      component: Idle
    },     
    {
      path: '/directions',
      name: 'directions',
      component: Directions
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
