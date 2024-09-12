import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home/index.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/my',
      component: () => import('@/views/My/index.vue')
    },
    {
      path: '/find',
      component: () => import('@/views/Find/index.vue')
    },
    {
      path: '/roam',
      component: () => import('@/views/Roam/index.vue')
    },
    {
      path: '/dynamic',
      component: () => import('@/views/Dynamic/index.vue')
    }
  ]
})

// 路由前置守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  // console.log(to, from)
  if (to.path === '/login') {
    userStore.showTabbar = false
    return true
  } else {
    return true
  }
})

export default router
