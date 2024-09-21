export const throttle = (fn, delay) => {
  let timerId = null
  return () => {
    if (!timerId) {
      timerId = setTimeout(() => {
        const res = fn()
        timerId = null
        return res
      }, delay)
    }
  }
}
