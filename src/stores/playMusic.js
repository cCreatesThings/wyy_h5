import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMusicUrlAPI } from '@/api/music'

export const usePlayMusicStore = defineStore(
  'palyMusic',
  () => {
    // 控制底部音乐播放组件的显示与隐藏
    const showMusic = ref(true)
    const showLoading = ref(false)
    const showMusicFun = (val) => {
      showMusic.value = val
    }

    // 控制显示播放按钮
    const showIcon = ref(true)
    const setShowIcon = (val) => {
      showIcon.value = val
    }
    // 音乐信息详情
    const musicInfo = ref({
      song: '听你想听'
    })
    const setMusicInfo = async (val) => {
      // 调用获取音乐url 的接口
      musicInfo.value = val
      showLoading.value = true
      const res = await getMusicUrlAPI(val.id)
      showLoading.value = false
      musicInfo.value.url = res.data[0].url
      //   musicInfo.value = val
    }

    return {
      showMusic,
      musicInfo,
      showLoading,
      showIcon,
      showMusicFun,
      setMusicInfo,
      setShowIcon
    }
  },
  {
    persist: true
  }
)
