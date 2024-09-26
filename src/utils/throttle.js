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
