import axios from 'axios'
import { showFailToast, showLoadingToast, showNotify } from 'vant'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import 'vant/lib/loading/style'
// const baseURL = 'https://wangyi.vercel.app'
const baseURL = 'http://localhost:5173/api'

const request = axios.create({
  baseURL,
  timeout: 20000
})

// 请求拦截器
let toast = null
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.userInfo?.token
    if (token) {
      config.headers.Authorization = token
    }
    // 轮询二维码不显示加载状态
    if (!config.url.includes('/login/qr/check'))
      toast = showLoadingToast({ message: '加载中...' })
    return config
  },
  (err) => {
    toast?.close()
    showFailToast({
      message: '操作失败',
      forbidClick: true,
      duration: 2000
    })
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    toast?.close() // 关闭 loading
    // 忽略掉 二维码 登录 请求
    if (res.config.url.includes('/login/qr')) return res.data
    if (res.data.code < 200 || res.data.code >= 300) {
      showNotify({
        type: 'danger',
        color: '#fff',
        background: 'red',
        message: res.data.message || '操作失败'
      })

      return Promise.reject(new Error(res.data.message))
    }
    return res.data
  },
  (err) => {
    toast.close() // 关闭 loading
    console.log(err)

    if (err.code === 'ECONNABORTED') {
      showFailToast({
        message: '请求超时，请稍后再试',
        forbidClick: true,
        duration: 2000
      })
    } else if (err.response) {
      if (err.response.status === 403) {
        showFailToast({
          message: '登录状态过期，请重新登录',
          forbidClick: true,
          duration: 2000
        })
        const userStore = useUserStore()
        userStore.resetUser() // 清除用户登录状态
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        showNotify({
          type: 'danger',
          color: '#fff',
          background: 'red',
          message: err.response.data.message
        })
      }
    } else {
      // showFailToast({
      //   message: '网络异常，请稍后再试',
      //   forbidClick: true,
      //   duration: 2000
      // })
      showNotify({
        type: 'danger',
        color: '#fff',
        background: 'red',
        message: err.response.data.message
      })
    }
    return Promise.reject(err)
  }
)

export { request }
