<script setup>
import { useUserStore } from './stores/user'

const userStore = useUserStore()

import TabBar from './views/components/TabBar.vue'
// const showTabbar = ref(true)
// // login页面不显示底部导航栏
// router.afterEach(() => {
//   console.log(router.currentRoute.value.path)
//   showTabbar.value = router.currentRoute.value.path === '/login' ? false : true
// })
</script>
<template>
  <RouterView />
  <TabBar v-show="userStore.showTabbar" />
</template>
