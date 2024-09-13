<script setup>
import { useUserStore } from './stores/user'
const userStore = useUserStore()
import TabBar from './views/components/TabBar.vue'
</script>
<template>
  <RouterView />
  <TabBar v-show="userStore.showTabbar" />
</template>
