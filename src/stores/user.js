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
    // 获取用户详情 --> 在获取完cookie的时候调用
    const getUserDetail = async (id) => {
      const res = await getUserDetailAPI(id)
      setUserDetail(res) // 设置 userDetail
    }
    // 个人信息
    const userInfo = ref({})
    const userDetail = ref({})
    const regionStr = ref('')
    const setRegionStr = (val) => {
      regionStr.value = val
    }
    const setUserDetail = (val) => {
      userDetail.value = val
    }
    const setUserInfo = (val) => {
      userInfo.value = val
      getUserDetail(val.account?.id)
    }

    // 退出登录 --> 清除 个人信息
    const resetUser = () => {
      userInfo.value = {}
      userDetail.value = {}
    }

    return {
      showTabbar,
      userInfo,
      userDetail,
      regionStr,
      setShowTabbar,
      setUserInfo,
      setUserDetail,
      resetUser,
      getUserDetail,
      setRegionStr
    }
  },
  {
    persist: true
  }
)
