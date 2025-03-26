import { createRouter, createWebHistory } from 'vue-router'

import Loby from '../views/Loby.vue'
import Analysis from '../views/Analysis.vue'
import Warehouse from '../views/Warehouse.vue'
import Cards from '../views/Cards.vue'
import Banner from '../views/Banner.vue'
import Pacmen from '../views/Pacmen.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loby',
      component: Pacmen
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: Analysis
    },
        {
      path: '/warehouse',
      name: 'warehouse',
      component: Warehouse
    },
            {
      path: '/cards',
      name: 'cards',
      component: Cards
    },    
    {
      path: '/banner',
      name: 'banner',
      component: Banner
    },   
        {
      path: '/pacmen',
      name: 'pacmen',
      component: Pacmen
    },   
  ]
})

export default router
