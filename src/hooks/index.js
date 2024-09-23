// 自定义hooks 全屏 && 退出全屏
import { ref } from 'vue'
export function useFullscreen(el) {
  const isFullscreen = ref(false)
  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      isFullscreen.value = false
    } else {
      el.value.requestFullscreen()
      isFullscreen.value = true
    }
  }
  return {
    isFullscreen,
    toggleFullscreen
  }
}

export const useMousePosition = (el = window) => {
  const position = ref({ x: 0, y: 0 })

  el.addEventListener('mousemove', (e) => {
    position.value.x = e.clientX
    position.value.y = e.clientY
  })

  return position
}
