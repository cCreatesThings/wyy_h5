<script setup>
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { usePlayMusicStore } from '@/stores/playMusic'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
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
    ...info.value
  })

  aplayerInstance.on('play', () => {
    isPlaying.value = true
  })

  aplayerInstance.on('pause', () => {
    isPlaying.value = false
  })
  aplayerInstance.on('ended', () => {
    nextTrack()
  })
}
// 销毁实例
const destroyAudio = () => {
  if (aplayerInstance) {
    aplayerInstance.pause()
    aplayerInstance.destroy()
    aplayerInstance.destroy()
  }
}
//   播放 && 暂停
const togglePlay = () => {
  if (aplayerInstance) {
    if (isPlaying.value) {
      aplayerInstance.pause()
    } else {
      aplayerInstance.play()
    }
  }
}

// 下一曲
const nextTrack = async () => {
  if (aplayerInstance) {
    await playMusicStore.nextMusic(currentTrack.value.id)
    router.go(0)
  }
}
// 上一曲
const prevTrack = async () => {
  if (aplayerInstance) {
    await playMusicStore.preMusic(currentTrack.value.id)
    router.go(0)
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
    <div class="icon text-left w-[90vw] mb-[2vw]">
      <Icon
        icon="material-symbols:arrow-back-ios"
        class="text-[8vw] text-[white]"
        @click="router.back()"
      />
    </div>
    <div class="background-overlay"></div>
    <div class="content">
      <div class="album-art">
        <img :src="currentTrack.cover" :alt="currentTrack.title" />
      </div>
      <div class="track-info">
        <h2 class="track-title">{{ currentTrack.title }}</h2>
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
  padding: 5vw;
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #d5f147, #ff80ea);

  filter: blur(10px);
  z-index: -1;
}

.content {
  width: 90vw;
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
  border-radius: 2vw;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
}

::v-deep .aplayer-body {
  height: auto !important;
}

::v-deep .aplayer-lrc {
  padding-top: 1vw !important;
  height: 38vw !important;

  p {
    color: #333;
  }
}

::v-deep .aplayer-lrc-current {
  color: #3498db !important;
  font-size: 4.5vw !important;
  font-weight: bold;
}

::v-deep .aplayer-info {
  padding: 0;
  height: 34vw !important;
}

::v-deep .aplayer-music {
  display: none;
}

::v-deep .aplayer-controller {
  width: 80vw;
  top: -168px !important;
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

  ::v-deep .aplayer-lrc {
    // height: 100% !important;
    .aplayer-lrc-contents {
      padding-bottom: 10px !important;
    }
    p {
      font-size: 2vw;
    }
  }

  // ::v-deep .aplayer-lrc-current {
  //   font-size: 2.25vw !important;
  // }
}
</style>
