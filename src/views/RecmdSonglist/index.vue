<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSongListDetailAPI, getSongListDetailDynamicAPI } from '@/api/music'
import { usePlayMusicStore } from '@/stores/playMusic'
import { formatLargeNumber } from '@/utils/formatLargeNum'
const playMusicStore = usePlayMusicStore()

const router = useRouter()
const route = useRoute()

const onClickLeft = () => {
  router.back()
}

// 获取推荐歌单详情
const songList = ref([])
const getSongListDetail = async () => {
  const res = await getSongListDetailAPI(route.query.id)
  res.playlist.tracks.forEach((item) => {
    item.showIcon = true
  })
  songList.value = res
}
getSongListDetail()

// 获取歌单动态详情, 如: 评论数 播放数
const songListDynamic = ref({})
const getSongListDynamic = async () => {
  const res = await getSongListDetailDynamicAPI(route.query.id)
  songListDynamic.value = res
}
getSongListDynamic()

// 点击播放音乐
const playMusic = (id) => {
  playMusicStore.setMusicInfo(id)
}

// 点击播放全部
const playAllMusic = () => {
  playMusicStore.setMusicInfo(
    songList.value.playlist.trackIds[0].id,
    songList.value.playlist.trackIds.map((item) => item.id)
  )
}
</script>

<template>
  <div class="music-player">
    <div class="fixed-content">
      <!-- Sticky Header -->
      <div class="sticky-header">
        <van-nav-bar title="歌单" left-arrow @click-left="onClickLeft">
          <template #right>
            <van-icon name="search" size="6vw" class="mr-4vw" />
            <van-icon name="ellipsis" size="6vw" />
          </template>
        </van-nav-bar>
      </div>

      <!-- Playlist Info -->
      <div class="playlist-info">
        <van-image
          width="30vw"
          height="30vw"
          :src="songList.playlist?.coverImgUrl"
          radius="2vw"
        />
        <div class="playlist-details">
          <div class="playlist-title">
            <span class="title">{{ songList.playlist?.name }}:</span>
            <span> {{ songList.playlist?.creator?.signature }}</span>
          </div>
          <div class="creator-info">
            <van-image
              round
              width="5vw"
              height="5vw"
              :src="songList.playlist?.creator?.avatarUrl"
            />
            <span>{{ songList.playlist?.creator.nickname }}</span>
            <van-button size="mini" type="primary" class="follow-btn"
              >+ 关注</van-button
            >
          </div>
          <div class="tags">
            <span class="tag" v-if="songList.playlist?.score">
              {{ songList.playlist.score }}分
            </span>
            <span class="tag" v-for="tag in songList.playlist?.tags" :key="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Engagement Metrics -->
      <div class="engagement-metrics">
        <div class="metric">
          <van-icon name="share" size="5vw" />
          <span>{{ formatLargeNumber(songListDynamic?.shareCount) }}</span>
        </div>
        <div class="metric">
          <van-icon name="chat" size="5vw" />
          <span>{{ formatLargeNumber(songListDynamic?.commentCount) }}</span>
        </div>
        <van-button type="danger" size="small" icon="plus" class="add-btn">
          {{ formatLargeNumber(songListDynamic?.bookedCount) }}
        </van-button>
      </div>

      <!-- VIP Promotion -->
      <!-- <div class="vip-promo">
        <span>VIP5.5折！抢独家护肤礼包</span>
        <span class="promo-link">立即抢购 &gt;</span>
      </div> -->
    </div>

    <!-- Scrollable Playlist -->
    <div class="scrollable-content">
      <div class="playlist mb-[-13vw]">
        <div class="playlist-header">
          <div class="play-all" @click="playAllMusic">
            <van-icon name="play-circle" size="5vw" />
            <span>播放全部 ({{ songList.playlist?.trackCount }})</span>
          </div>
          <div class="playlist-actions">
            <van-icon name="down" size="5vw" class="mr-4vw" />
            <van-icon name="bars" size="5vw" />
          </div>
        </div>
        <van-cell
          @click="playMusic(song.id)"
          v-for="(song, index) in songList.playlist?.tracks"
          :key="index"
          :title="song.title"
          :label="song.ar[0].name"
        >
          <template #icon>
            <span class="song-index">{{ index + 1 }}</span>
          </template>
          <template #title>
            <span class="song-title">
              <!-- <template v-if="song.tag">
                <span :class="['song-tag', song.fee ? 'vip-tag' : 'sq-tag']">{{
                  song.tag
                }}</span>
              </template> -->
              {{ song.name }}
            </span>
          </template>
          <template #right-icon>
            <van-icon
              v-if="song.showIcon"
              name="play"
              class="right-icon"
              size="6vw"
            />
            <van-icon v-else name="pause" class="right-icon" size="6vw" />
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep.right-icon {
  color: gray !important;
}
.music-player {
  background-color: #5d7290;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
}

.fixed-content {
  flex-shrink: 0;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #5d7290;
}

:deep(.van-nav-bar) {
  background-color: transparent;
}

:deep(.van-nav-bar__title) {
  color: white;
}

:deep(.van-icon) {
  color: white;
}

.playlist-info {
  display: flex;
  padding: 4vw;
  gap: 4vw;
}

.playlist-details {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.playlist-title {
  font-size: 3.5vw;
  margin-bottom: 2vw;
  span {
    /* 显示两行,省略号 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.creator-info {
  display: flex;
  align-items: center;
  font-size: 3.5vw;
  color: #e0e0e0;
}

.follow-btn {
  margin-left: 2vw;
  font-size: 3vw;
}

.tags {
  display: flex;
  gap: 2vw;
}

.tag {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1vw 2vw;
  border-radius: 4vw;
  font-size: 3vw;
}

.engagement-metrics {
  display: flex;
  justify-content: space-around;
  padding: 4vw 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.metric {
  display: flex;
  align-items: center;
  gap: 2vw;
}

.add-btn {
  font-size: 3.5vw;
  padding: 2vw 4vw;
}

.vip-promo {
  background-color: rgba(255, 255, 255, 0.1);
  margin: 4vw;
  padding: 3vw;
  border-radius: 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 3.5vw;
}

.promo-link {
  color: #ffd700;
}

.scrollable-content {
  flex-grow: 1;
  overflow-y: auto;
}

/* .playlist {
  padding: 0 4vw;
} */

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vw;
}

.play-all {
  display: flex;
  align-items: center;
  gap: 2vw;
  font-size: 4vw;
  font-weight: 600;
}

.playlist-actions {
  display: flex;
  gap: 4vw;
}

.song-index {
  color: #a0a0a0;
  font-size: 4vw;
  width: 6vw;
  text-align: center;
}

.song-title {
  font-size: 4vw;
  font-weight: 600;
}

.song-tag {
  font-size: 2.5vw;
  padding: 0.5vw 1vw;
  border-radius: 1vw;
  margin-right: 1vw;
}

.sq-tag {
  color: #ff4500;
  border: 1px solid #ff4500;
}

.vip-tag {
  color: #ffd700;
  border: 1px solid #ffd700;
}

.playback-control {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #3a4a61;
  padding: 2vw;
  display: flex;
  align-items: center;
  gap: 4vw;
}

.current-song-info {
  flex: 1;
}

.current-song-info h4 {
  font-size: 3.5vw;
  font-weight: 600;
  margin: 0;
}

.current-song-info p {
  font-size: 3vw;
  color: #a0a0a0;
  margin: 0;
}

.playback-actions {
  display: flex;
  gap: 6vw;
}
</style>
