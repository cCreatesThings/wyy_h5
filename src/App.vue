<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import TabBar from './views/components/TabBar.vue'
const showTabbar = ref(true)
// login页面不显示底部导航栏
router.afterEach(() => {
  console.log(router.currentRoute.value.path)
  showTabbar.value = router.currentRoute.value.path === 'login' ? true : false
})
</script>
<template>
  <RouterView />
  <TabBar v-show="showTabbar" />
</template>
