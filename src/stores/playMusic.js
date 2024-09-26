import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMusicUrlAPI, getMusicDetailAPI, getLyricAPI } from '@/api/music'
import { showToast } from 'vant'

export const usePlayMusicStore = defineStore(
  'palyMusic',
  () => {
    // 当前播放进度
    const currTimer = ref(0)
    // 设置当前播放进度
    const setCurrTimer = (val) => {
      currTimer.value = val
    }
    // 控制底部音乐播放组件的显示与隐藏
    const showMusic = ref(true)
    const showLoading = ref(false)
    //控制tabbar的显示与隐藏
    const showTabbar = ref(true)
    const showTabbarFun = (val) => {
      showTabbar.value = val
    }
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
      name: '听你想听',
      cover: '',
      artist: '',
      url: '',
      id: ''
    })
    const rescouceIdList = ref([])
    // 当前播放的歌曲的id 索引
    const curMusicId = ref(0)
    const setMusicInfo = async (id, IdList) => {
      if (id instanceof Object) {
        return (musicInfo.value = id)
      }
      IdList instanceof Array && (rescouceIdList.value = IdList)

      // 调用获取音乐详情的接口
      const curMuDetail = await getMusicDetailAPI(id)
      if (curMuDetail.songs.length === 0) {
        curMusicId.value = curMusicId.value + 1
        setTimeout(() => showToast({ message: '暂无音源' }), 1000)
        nextMusic(curMusicId.value)
        return
      }

      musicInfo.value = {
        name: curMuDetail.songs[0]?.name,
        cover: curMuDetail.songs[0]?.al.picUrl,
        artist: curMuDetail.songs[0]?.ar[0].name,
        id: curMuDetail.songs[0]?.id
      }
      showLoading.value = true
      // 获取音乐url
      const res = await getMusicUrlAPI(id)
      musicInfo.value.url = res.data[0].url
      // 获取歌词
      const lyricResult = await getLyricAPI(id)
      musicInfo.value.lrc = lyricResult.lrc.lyric
      showLoading.value = false
      showIcon.value = true
    }
    // 当前歌曲播放完毕之后, 切换下一首, 注意索引越界
    const nextMusic = async (id) => {
      // id 类型统一转为字符串
      rescouceIdList.value = rescouceIdList.value.map((item) => item.toString())
      curMusicId.value = rescouceIdList.value.indexOf(id.toString())
      if (
        curMusicId.value === rescouceIdList.value.length - 1 ||
        curMusicId.value === -1
      ) {
        // 播放完毕, 重新播放第一首
        await setMusicInfo(rescouceIdList.value[0])
      } else {
        await setMusicInfo(rescouceIdList.value[curMusicId.value + 1])
      }
    }
    // 调用之后,播放上一首, 注意索引越界
    const preMusic = async (id) => {
      // id 类型统一转为字符串
      rescouceIdList.value = rescouceIdList.value.map((item) => item.toString())
      curMusicId.value = rescouceIdList.value.indexOf(id.toString())
      if (curMusicId.value === -1) return setMusicInfo(rescouceIdList.value[0])
      if (curMusicId.value === 0) {
        // 跳转最后一首
        await setMusicInfo(
          rescouceIdList.value[rescouceIdList.value.length - 1]
        )
      } else {
        await setMusicInfo(rescouceIdList.value[curMusicId.value - 1])
      }
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
      rescouceIdList,
      showTabbar,
      currTimer,
      setCurrTimer,
      showMusicFun,
      setMusicInfo,
      setShowIcon,
      addSearchHistory,
      delSearchHistory,
      nextMusic,
      preMusic,
      showTabbarFun
    }
  },
  {
    persist: true
  }
)
