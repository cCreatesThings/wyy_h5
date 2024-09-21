<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>抱歉，您访问的页面不存在。</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { onBeforeUnmount } from 'vue'
const userStore = useUserStore()

// 隐藏 TabBar
userStore.setShowTabbar(false)

// 恢复 TabBar 在页面离开时显示
onBeforeUnmount(() => {
  userStore.showTabbar = true
})
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 20vh;
}
</style>
