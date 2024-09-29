import { ref } from 'vue'
import { showNotify } from 'vant'
export const throttle = (fn, delay) => {
  let timerId = null
  return function (...args) {
    if (!timerId) {
      timerId = setTimeout(() => {
        fn.apply(this, args) // 使用普通函数确保this指向调用的上下文
        timerId = null
      }, delay)
    }
  }
}

// 节流函数  防止短时间内多次修改
const lastRequestTime = ref(0)
const requestInterval = 3 * 60 * 1000 // 3分钟
export const checkRequestInterval = () => {
  const currentTime = Date.now()
  if (currentTime - lastRequestTime.value < requestInterval) {
    showNotify({
      message: '请不要频繁修改',
      background: '#ff976a',
      type: 'warning'
    })
    return false
  }
  lastRequestTime.value = currentTime
  return true
}
