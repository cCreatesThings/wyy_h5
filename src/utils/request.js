import axios from 'axios'
import { closeToast, showLoadingToast } from 'vant'

const baseURL = 'https://wangyi.vercel.app/'
// const baseURL = 'http://192.168.137.1:5173/api'

const request = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 开启 loading
    showLoadingToast({ message: '加载中...' })
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
let toast
request.interceptors.response.use(
  (res) => {
    // 显示加载提示
    toast = showLoadingToast({
      forbidClick: true,
      message: '加载中...'
    })
    return res.data
  },
  (err) => {
    closeToast(toast)
    return Promise.reject(err)
  }
)
export { request }
