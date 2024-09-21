import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    // login页面控制tabbar 显示
    const showTabbar = ref(true)
    const setShowTabbar = (val) => {
      showTabbar.value = val
    }

    // 个人信息
    const userInfo = ref({})
    const userDetail = ref({})
    const setUserDetail = (val) => {
      userDetail.value = val
    }
    const setUserInfo = (val) => {
      userInfo.value = val
    }

    return {
      showTabbar,
      userInfo,
      userDetail,
      setShowTabbar,
      setUserInfo,
      setUserDetail
    }
  },
  {
    persist: true
  }
)
