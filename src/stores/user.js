import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserDetailAPI } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // login页面控制tabbar 显示
    const showTabbar = ref(true)
    const setShowTabbar = (val) => {
      showTabbar.value = val
    }
    // 获取用户详情 --> 在获取完token的时候调用
    const getUserDetail = async (id) => {
      const res = await getUserDetailAPI(id)
      setUserDetail(res)
    }
    // 个人信息
    const userInfo = ref({})
    const userDetail = ref({})
    const setUserDetail = (val) => {
      userDetail.value = val
    }
    const setUserInfo = (val) => {
      userInfo.value = val
      getUserDetail(val.account.id)
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
