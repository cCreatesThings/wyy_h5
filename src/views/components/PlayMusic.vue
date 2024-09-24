<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { usePlayMusicStore } from '@/stores/playMusic'
import { showFailToast } from 'vant'
import router from '@/router'

const audioRef = ref(null)
const playMusicStore = usePlayMusicStore()

// 网页刷新, 音乐暂停
const loadFn = () => {
  playMusicStore.setShowIcon(false)
  audioRef.value?.pause()
}
window.onload = loadFn

const music = async (type) => {
  try {
    if (type === 'play') {
      const res = await audioRef.value.play()
      if (res) throw new Error('播放失败')
      playMusicStore.setShowIcon(true)
    } else {
      audioRef.value.pause()
      playMusicStore.setShowIcon(false)
    }
  } catch {
    showFailToast('播放失败')
    playMusicStore.setShowIcon(false)
  }
}

// 播放结束
const endedHandle = async () => {
  await playMusicStore.nextMusic(playMusicStore.musicInfo.id)
}

const errorHandle = () => {
  showFailToast('播放失败')
  playMusicStore.setShowIcon(false)
}

// 组件销毁时,取消所有事件监听
onBeforeUnmount(() => {
  audioRef.value?.removeEventListener('ended', endedHandle)
  audioRef.value?.removeEventListener('pause', () =>
    playMusicStore.setShowIcon(false)
  )
  audioRef.value?.removeEventListener('error', errorHandle)
  window.removeEventListener('load', loadFn)
})

const gotoSongLrc = () => {
  router.push('/musicPlayer')
}
</script>

<template>
  <div
    class="palyMusic flex items-center border w-[97vw] h-[12vw]"
    @click="gotoSongLrc"
  >
    <van-image
      v-if="playMusicStore.musicInfo.cover"
      width="11vw"
      height="11.5vw"
      lazy-load
      :src="playMusicStore.musicInfo.cover"
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <div class="pic" v-else>
      <Icon
        icon="ri:netease-cloud-music-fill"
        class="text-[9.5vw]"
        style="color: #ff0000"
      />
    </div>
    <div
      class="flex flex-col justify-center ml-[4vw]"
      v-if="playMusicStore.musicInfo.name"
    >
      <span class="text-[3.5vw] nameName">{{
        playMusicStore.musicInfo.name
      }}</span>
      <span class="text-[2.5vw]">{{ playMusicStore.musicInfo.artist }}</span>
    </div>
    <div class="loading flex" v-if="playMusicStore.showLoading">
      <span class="text text-[2.456vw]">加载中,请耐心等待...</span>
      <Icon icon="line-md:loading-twotone-loop" />
    </div>
    <audio
      @ended="endedHandle"
      @pause="() => playMusicStore.setShowIcon(false)"
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
        @click.stop="music('play')"
        v-if="!playMusicStore.showIcon"
        icon="icon-park-outline:play"
        class="text-[7.5vw]"
      />
      <Icon
        @click.stop="music('pause')"
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
.nameName {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 40vw;
}
</style>
