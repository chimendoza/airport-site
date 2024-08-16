import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/default.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Layout,
      children:[
        {
          path:'',
          component:()=>import('@/views/home.vue')
        }

      ]

    }
  ]
})

export default router
