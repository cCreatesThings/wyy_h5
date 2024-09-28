import { usePlayMusicStore } from '@/stores/playMusic'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
console.log(import.meta.env.DEV)

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
    },
    {
      path: '/search',
      component: () => import('@/views/SearchMusic/index.vue')
    },
    {
      path: '/recmdSonglist',
      component: () => import('@/views/RecmdSonglist/index.vue')
    },
    {
      path: '/musicPlayer',
      component: () => import('@/views/MusicPlayer/index.vue'),
      beforeEnter: (to, from) => {
        if (!usePlayMusicStore().musicInfo.url) return from.fullPath
        else return true
      }
    },
    {
      path: '/lrcDetail',
      component: () => import('@/views/MusicPlayer/components/LrcDetail.vue')
    },
    {
      path: '/userInfo',
      component: () => import('@/views/My/components/UserInfo.vue')
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('@/views/NotFound/index.vue')
    } // 捕获所有未匹配的路由
  ]
})

// 路由鉴权
const authorityArr = [
  '/my',
  '/dynamic',
  '/recmdSonglist',
  '/userInfo',
  '/roam',
  '/find'
]
// 路由前置守卫
router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if (authorityArr.includes(to.path) && !userStore.userInfo.cookie) {
    return '/login'
  }
  if (to.path === '/login') {
    if (userStore.userInfo.cookie) return from.fullPath
    userStore.setShowTabbar(false)
    return true
  } else {
    userStore.setShowTabbar(true)
    return true
  }
})

export default router
