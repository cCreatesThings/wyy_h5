import axios from 'axios'
import { showFailToast, showLoadingToast } from 'vant'

// const baseURL = 'https://wangyi.vercel.app/'
const baseURL = 'http://localhost:5173/api'

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
request.interceptors.response.use(
  (res) => {
    // 统一错误响应处理
    if (res.data.code < 200 || res.data.code >= 300) {
      return showFailToast({
        message: res.data.msg,
        forbidClick: true,
        duration: 2000
      })
    }
    return res.data
  },
  (err) => {
    showFailToast({
      message: err.response.data.msg || '网络异常',
      forbidClick: true,
      duration: 2000
    })
    return Promise.reject(err)
  }
)
export { request }
