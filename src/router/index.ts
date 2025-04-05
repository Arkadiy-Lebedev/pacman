import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Instruction from '../views/Instruction.vue'
import Info from '../views/Info.vue'
import Stage1 from '../views/Stage1.vue'
import Stage2 from '../views/Stage2.vue'
import Stage3 from '../views/Stage3.vue'
import Finish from '../views/Finish.vue'
import Tg from '../views/Tg.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/stage-1',
      name: 'stage-1',
      component: Stage1
    },
    {
      path: '/stage-2',
      name: 'stage-2',
      component: Stage2
    },
      {
      path: '/instruction',
      name: 'instruction',
      component: Instruction
    },
          {
      path: '/stage-3',
      name: 'stage-3',
      component: Stage3
    },
          {
      path: '/info',
      name: 'info',
      component: Info
    },
              {
      path: '/finish',
      name: 'finish',
      component: Finish
    },
    {
      path: '/tg',
      name: 'tg',
      component: Tg
    },
  ]
})

export default router
