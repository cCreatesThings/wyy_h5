<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { usePlayMusicStore } from '@/stores/playMusic'
import { showFailToast } from 'vant'

const audioRef = ref(null)

const playMusicStore = usePlayMusicStore()

// 网页刷新, 音乐暂停
const loadFn = function () {
  playMusicStore.setShowIcon(false)
  audioRef.value?.pause()
}
window.onload = loadFn

const pauseHandle = () => {
  playMusicStore.setShowIcon(false)
}
const music = async (type) => {
  if (type === 'play') {
    const res = await audioRef.value.play()
    if (res) return showFailToast('播放失败')
    playMusicStore.setShowIcon(true)
  } else {
    audioRef.value.pause()
    playMusicStore.setShowIcon(false)
  }
}

// 播放结束
const endedHandle = async (id) => {
  await playMusicStore.nextMusic(id)
}

const errorHandle = () => {
  showFailToast('播放失败')
  playMusicStore.setShowIcon(false)
}

// 组件销毁时,取消所有事件监听
onBeforeUnmount(() => {
  audioRef.value.removeEventListener('ended', endedHandle)
  audioRef.value.removeEventListener('pause', pauseHandle)
  audioRef.value.removeEventListener('error', errorHandle)
  window.removeEventListener('onload', loadFn)
})
</script>

<template>
  <div class="palyMusic flex items-center border w-[97vw] h-[12vw]">
    <van-image
      v-if="playMusicStore.musicInfo.pic"
      width="11vw"
      height="11.5vw"
      lazy-load
      :src="playMusicStore.musicInfo.pic"
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20" /> </template
    ></van-image>
    <div class="pic" v-else>
      <Icon
        icon="ri:netease-cloud-music-fill"
        class="text-[9.5vw]"
        style="color: #ff0000"
      />
    </div>
    <div
      class="flex flex-col justify-center ml-[4vw]"
      v-if="playMusicStore.musicInfo.song"
    >
      <span class="text-[3.5vw] songName">{{
        playMusicStore.musicInfo?.song
      }}</span>
      <span class="text-[2.5vw]">{{ playMusicStore.musicInfo?.author }}</span>
    </div>
    <div class="loading flex" v-show="playMusicStore.showLoading">
      <span class="text text-[2.456vw]">加载中,请耐心等待...</span
      ><Icon icon="line-md:loading-twotone-loop" />
    </div>
    <audio
      @ended="endedHandle(playMusicStore.musicInfo.id)"
      @pause="pauseHandle"
      @play="playMusicStore.setShowIcon(true)"
      @error="errorHandle"
      ref="audioRef"
      autoplay
      :src="playMusicStore.musicInfo.url"
    />
    <div
      class="playIcon ml-auto mr-[4vw] text-white"
      v-if="playMusicStore.musicInfo.url"
    >
      <Icon
        @click="music('play')"
        v-if="!playMusicStore.showIcon"
        icon="icon-park-outline:play"
        class="text-[7.5vw]"
      />
      <Icon
        @click="music('pause')"
        v-else
        icon="icon-park-outline:pause-one"
        class="text-[7.5vw]"
      />
    </div>
  </div>
</template>

<style scoped>
.palyMusic {
  background: #54d7e6;
  border-radius: 0 50px 50px 0;
  transition: all 0.5s;
}
.songName {
  /* 单行显示省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 40vw;
}
</style>
