import { createRouter, createWebHistory } from 'vue-router'

import Pucman from '../views/Pacmen.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pucman',
      component: Pucman
    },
  
  ]
})

export default router
