<script setup>
import { useUserStore } from './stores/user'
const userStore = useUserStore()
import TabBar from './views/components/TabBar.vue'
</script>
<template>
  <div class="container pb-[10vw]">
    <RouterView />
    <TabBar v-show="userStore.showTabbar" />
  </div>
</template>
