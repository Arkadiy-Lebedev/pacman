import { createRouter, createWebHistory } from 'vue-router'

import Stage1 from '../views/Stage1.vue'
import Stage2 from '../views/Stage2.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'stage-1',
      component: Stage1
    },
    {
      path: '/stage-2',
      name: 'stage-2',
      component: Stage2
    },
  
  ]
})

export default router
