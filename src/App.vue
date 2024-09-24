<script setup>
import { useUserStore } from './stores/user'
const userStore = useUserStore()
import TabBar from './views/components/TabBar.vue'
</script>
<template>
  <div class="container">
    <RouterView />
    <div class="pb-[10vw]" v-if="userStore.showTabbar"></div>
    <TabBar v-if="userStore.showTabbar" />
  </div>
</template>
