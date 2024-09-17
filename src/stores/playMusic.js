import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMusicUrlAPI, getMusicDetailAPI } from '@/api/music'

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
      song: '听你想听',
      pic: '',
      author: '',
      url: ''
    })
    const setMusicInfo = async (id) => {
      // 调用获取音乐详情的接口
      const curMuDetail = await getMusicDetailAPI(id)
      console.log(curMuDetail)
      musicInfo.value = {
        song: curMuDetail.songs[0].name,
        pic: curMuDetail.songs[0].al.picUrl,
        author: curMuDetail.songs[0].ar[0].name
      }
      showLoading.value = true
      // 获取音乐url
      const res = await getMusicUrlAPI(id)
      musicInfo.value.url = res.data[0].url
      console.log(musicInfo.value)

      showLoading.value = false
      showIcon.value = true
    }

    // 搜索历史
    const searchHistory = ref([])
    // 添加
    const addSearchHistory = (val) => {
      // 过滤掉重复的
      !searchHistory.value.includes(val) && searchHistory.value.unshift(val)
    }
    // 过滤
    const delSearchHistory = (str) => {
      searchHistory.value = searchHistory.value.filter((item) => item !== str)
    }

    return {
      showMusic,
      musicInfo,
      showLoading,
      showIcon,
      searchHistory,
      showMusicFun,
      setMusicInfo,
      setShowIcon,
      addSearchHistory,
      delSearchHistory
    }
  },
  {
    persist: true
  }
)
