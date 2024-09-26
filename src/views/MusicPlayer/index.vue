<script setup>
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { usePlayMusicStore } from '@/stores/playMusic'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { throttle } from '@/utils/throttle'
const router = useRouter()

const userStore = useUserStore()
const playMusicStore = usePlayMusicStore()

userStore.setShowTabbar(false)

const audio = ref([{ ...playMusicStore.musicInfo, theme: 'rgb(61, 162, 230)' }])
// 监听 播放歌曲变化, 重新 赋值
watch(
  () => playMusicStore.musicInfo,
  (newValue) => {
    audio.value = [{ ...newValue, theme: 'rgb(61, 162, 230)' }]
  },
  {
    immediate: true
  }
)
const currentTrack = computed(() => audio.value[0])

const info = ref({
  fixed: false,
  listFolded: true,
  autoplay: true,
  preload: 'auto',
  loop: 'all',
  order: 'list',
  lrcType: 1
})

let aplayerInstance = null
const isPlaying = ref(false)

const initAudio = () => {
  aplayerInstance = new APlayer({
    container: document.getElementById('aplayer'),
    audio: audio.value,
    productionTip: false, // 关闭控制台的版本提示
    ...info.value
  })

  aplayerInstance.on('play', () => {
    isPlaying.value = true

    // 播放时 播放到sotre中存储的指定时间
    aplayerInstance.audio.currentTime = playMusicStore.currTimer
    albumArtEl.value.style.animationPlayState = 'running'
  })

  aplayerInstance.on('pause', () => {
    albumArtEl.value.style.animationPlayState = 'paused'
    isPlaying.value = false
  })
  // 记录 当前播放时间 记录到 store
  aplayerInstance.on(
    'timeupdate',
    throttle(() => {
      if (!aplayerInstance) return
      const currentTime = aplayerInstance?.audio?.currentTime
      playMusicStore.setCurrTimer(currentTime)
    })
  )
  aplayerInstance.on('ended', () => {
    nextTrack()
    playMusicStore.setCurrTimer(0)
  })
}
// 销毁实例
const destroyAudio = () => {
  if (aplayerInstance) {
    aplayerInstance.destroy()
  }
}
const albumArtEl = ref(null)
//   播放 && 暂停
const togglePlay = () => {
  if (aplayerInstance) {
    if (isPlaying.value) {
      aplayerInstance.pause()
      // 暂停动画
      albumArtEl.value.style.animationPlayState = 'paused'

      // 恢复动画
    } else {
      aplayerInstance.play()
      albumArtEl.value.style.animationPlayState = 'running'
    }
  }
}

// 下一曲
const nextTrack = async () => {
  if (aplayerInstance) {
    await playMusicStore.nextMusic(currentTrack.value.id)
    router.go(0)
    playMusicStore.setCurrTimer(0)
  }
}
// 上一曲
const prevTrack = async () => {
  if (aplayerInstance) {
    await playMusicStore.preMusic(currentTrack.value.id)
    router.go(0)
    playMusicStore.setCurrTimer(0)
  }
}
// 初始化实例
onMounted(() => {
  initAudio()
})

onUnmounted(() => {
  destroyAudio()
})
</script>

<template>
  <div class="music-player-page">
    <div class="background-overlay"></div>
    <div class="content">
      <div class="icon text-left w-[90vw] mb-[1vw]">
        <Icon
          icon="material-symbols:arrow-back-ios"
          class="text-[6vw] text-[white]"
          @click="router.back()"
        />
      </div>
      <div class="album-art" ref="albumArtEl">
        <img :src="currentTrack.cover" :alt="currentTrack.name" />
      </div>
      <div class="track-info">
        <h2 class="track-title">{{ currentTrack.name }}</h2>
        <p class="track-artist">{{ currentTrack.artist }}</p>
      </div>
      <div class="controls">
        <button @click="prevTrack" class="control-btn">
          <Icon icon="mdi:skip-previous" />
        </button>
        <button @click="togglePlay" class="control-btn play-btn">
          <Icon :icon="isPlaying ? 'mdi:pause' : 'mdi:play'" />
        </button>
        <button @click="nextTrack" class="control-btn">
          <Icon icon="mdi:skip-next" />
        </button>
      </div>
      <div id="aplayer"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.music-player-page {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2cqw;
  overflow: hidden;
}
@property --direc {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.background-overlay {
  --direc: 0deg;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(var(--direc), #1b91f1, #702af3 43%, #0652f6);
  filter: blur(10px);
  z-index: -1;
  animation: spin 3s linear infinite;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    border-radius: inherit;
    z-index: -1;
    filter: blur(20px);
  }
}
@keyframes spin {
  to {
    --direc: 360deg;
  }
}

.content {
  overflow: hidden;
  width: 95vw;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4vw;
  padding: 5vw;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.album-art {
  width: 80vw;
  height: 80vw;
  max-width: 300px;
  max-height: 300px;
  margin: 0 auto 5vw;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  animation: rotate 8s linear infinite;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.track-info {
  text-align: center;
  margin-bottom: 5vw;

  .track-title {
    font-size: 6vw;
    font-weight: bold;
    margin-bottom: 2vw;
  }

  .track-artist {
    font-size: 4vw;
    color: #666;
  }
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5vw;

  .control-btn {
    background: none;
    border: none;
    font-size: 8vw;
    color: #333;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #3498db;
    }

    &.play-btn {
      font-size: 12vw;
      margin: 0 5vw;
    }
  }
}

::v-deep .aplayer {
  background: transparent;
  box-shadow: none;
  margin: 0;
  overflow: visible;
  height: 200px !important;
}

::v-deep .aplayer-body {
  height: 100% !important;
}

::v-deep .aplayer-lrc {
  padding-top: 10vw !important;
  height: 100% !important;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.4) !important;
  border-radius: 5px;
  &::before,
  &::after {
    display: none;
  }
  .aplayer-lrc-contents {
    padding-bottom: 10px !important;
  }

  p {
    color: #000000;
    font-size: 3vw;
  }
}

::v-deep .aplayer-lrc-current {
  color: #3498db !important;
  font-size: 4vw !important;
  font-weight: bold;
}

::v-deep .aplayer-info {
  padding: 0;
  height: 100% !important;
}

::v-deep .aplayer-music {
  display: none;
}

::v-deep .aplayer-controller {
  width: 80vw;
  top: -255px !important;
  right: 100px !important;
}

@media (min-width: 768px) {
  .album-art {
    width: 40vw;
    height: 40vw;
  }

  .track-info {
    .track-title {
      font-size: 3vw;
    }

    .track-artist {
      font-size: 2vw;
    }
  }

  .controls {
    .control-btn {
      font-size: 4vw;
      &.play-btn {
        font-size: 6vw;
      }
    }
  }
}
</style>
