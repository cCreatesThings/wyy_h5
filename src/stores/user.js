import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // login页面控制tabbar 显示
  const showTabbar = ref(true)

  return {
    showTabbar
  }
})
