<script setup>
import { ref, onMounted } from 'vue'
import { usePlayMusicStore } from '@/stores/playMusic'

const audioRef = ref(null)

const playMusicStore = usePlayMusicStore()
onMounted(() => playMusicStore.setShowIcon(false))
const music = (type) => {
  if (type === 'play') {
    audioRef.value.play()
    playMusicStore.setShowIcon(true)
  } else {
    audioRef.value.pause()
    playMusicStore.setShowIcon(false)
  }
}
</script>

<template>
  <div class="palyMusic flex items-center border mb-[25vw] w-[90vw] h-[12vw]">
    <van-image
      v-if="playMusicStore.musicInfo.pic"
      width="11vw"
      height="11.5vw"
      :src="playMusicStore.musicInfo.pic"
    />
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
    <audio ref="audioRef" autoplay :src="playMusicStore.musicInfo.url" />
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
  position: fixed;
  bottom: -13vw;
  background: #fdbeef;
  border-radius: 0 50px 50px 0;
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
