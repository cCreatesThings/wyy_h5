<script setup>
import { searchMusicAPI } from '@/api/music'
import { showToast } from 'vant'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchMusicList from './components/SearchMusicList.vue'
import { usePlayMusicStore } from '@/stores/playMusic'
const palyMusicStore = usePlayMusicStore()
// 隐藏tabbar
palyMusicStore.showTabbarFun(false)
const searchValue = ref('')
const activeTab = ref(0)
const windowWidth = ref(0)
const deleteMode = ref(false)

const hotSearchList = ref([
  '罗生门',
  '青花',
  '东北爱情故事',
  '如果爱忘了',
  '与我无关',
  '爱你',
  '我爱你中国',
  '壁上观',
  '布瑞吉Bridge',
  '如果可以',
  '暮色回响'
])

const listeningList = ref([
  '无痛当家',
  '死亡万花筒',
  '黑化美人',
  '北派盗墓',
  '三体',
  '活着',
  '十宗罪',
  '明朝那些事儿',
  '少年歌行',
  '一听就停不下来',
  '云边有个小卖部'
])

const router = useRouter()
const onClickLeft = () => {
  router.back()
}

const toggleDeleteMode = () => {
  deleteMode.value = !deleteMode.value
}

const deleteHistoryItem = (str) => {
  // searchHistory.value.splice(index, 1)
  palyMusicStore.delSearchHistory(str)
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})
// 搜索歌曲
const searchMusicList = ref([])
const search = async () => {
  if (!searchValue.value) return showToast({ message: '请输入搜索内容' })
  palyMusicStore.addSearchHistory(searchValue.value)
  const res = await searchMusicAPI(searchValue.value)

  searchMusicList.value = res.result.songs
}

// 点击搜索历史文字
const searchHistoryFn = (index) => {
  searchValue.value = palyMusicStore.searchHistory[index]
  search()
}
</script>
<template>
  <div class="song-search">
    <van-nav-bar fixed placeholder left-arrow @click-left="onClickLeft">
      <template #title>
        <div class="search-container">
          <van-search
            v-model="searchValue"
            placeholder="搜你想搜的"
            @keyup.enter="search"
            shape="round"
            background="#ffffff"
            :clearable="false"
          >
            <template #left-icon>
              <van-icon name="search text-[4vw]" />
            </template>
          </van-search>
          <van-button
            @click="search"
            size="small"
            type="primary"
            class="search-btn"
            >搜索</van-button
          >
        </div>
      </template>
    </van-nav-bar>
    <div class="search-history">
      <div class="section-header">
        <span>搜索历史</span>
        <van-icon name="delete" @click="toggleDeleteMode" />
      </div>
      <div class="list flex flex-wrap">
        <div
          style="width: fit-content"
          v-for="(item, index) in palyMusicStore.searchHistory"
          :key="index"
          class="history-item text-[3vw] bg-[#f7f8fa] rounded-[10px] mb-[1vw] mr-[1vw]"
          @click="searchHistoryFn(index)"
        >
          {{ item }}
          <span
            v-if="deleteMode"
            class="delete-btn"
            @click.stop="deleteHistoryItem(item)"
            >×</span
          >
        </div>
      </div>
    </div>

    <SearchMusicList :musicList="searchMusicList" v-if="searchValue" />
    <template v-else>
      <van-tabs v-model:active="activeTab" animated sticky>
        <van-tab>
          <template #title>
            <div class="custom-tab">
              <van-icon name="user-o" />
              <span>歌手</span>
            </div>
          </template>
        </van-tab>
        <van-tab>
          <template #title>
            <div class="custom-tab">
              <van-icon name="music-o" />
              <span>曲风</span>
            </div>
          </template>
        </van-tab>
        <van-tab>
          <template #title>
            <div class="custom-tab">
              <van-icon name="cluster-o" />
              <span>专区</span>
            </div>
          </template>
        </van-tab>
        <van-tab>
          <template #title>
            <div class="custom-tab">
              <van-icon name="music" />
              <span>识曲</span>
            </div>
          </template>
        </van-tab>
      </van-tabs>

      <div class="content">
        <div class="guess-like">
          <div class="section-header">猜你喜欢</div>
          <div class="guess-tags">
            <van-tag round type="primary">Dehors</van-tag>
            <van-tag round type="primary">Dehors (中法合唱版)</van-tag>
          </div>
        </div>

        <div class="ranking-lists">
          <van-swipe :show-indicators="false" :width="windowWidth">
            <van-swipe-item>
              <div class="ranking-section">
                <div class="section-header">
                  热搜榜 <van-icon name="play" />
                </div>
                <div class="ranking-list">
                  <van-cell-group>
                    <van-cell
                      v-for="(item, index) in hotSearchList"
                      :key="index"
                      :title="item"
                      :class="{ 'red-text': index < 3 }"
                    />
                  </van-cell-group>
                </div>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="ranking-section">
                <div class="section-header">听书榜</div>
                <div class="ranking-list">
                  <van-cell-group>
                    <van-cell
                      v-for="(item, index) in listeningList"
                      :key="index"
                      :title="item"
                    />
                  </van-cell-group>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.song-search {
  background-color: #ffffff;
  min-height: 100vh;
  padding-bottom: 60px; /* Add padding to account for the fixed PlayMusic component */
  position: relative;
}

.search-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.search-btn {
  flex-shrink: 0;
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
  margin-left: 8px;
}

.custom-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}

.custom-tab .van-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.content {
  padding-top: 10px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  font-weight: bold;
}

.search-history,
.guess-like,
.ranking-lists {
  margin-top: 20px;
}

.history-item {
  padding: 5px 16px;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  color: #999;
  font-size: 18px;
  padding: 0 5px;
}

.guess-tags {
  padding: 0 16px;
}

.guess-tags .van-tag {
  margin-right: 8px;
}

.ranking-lists {
  overflow: hidden;
}

.ranking-section {
  width: 100%;
}

.ranking-list {
  padding: 0 16px;
}

:deep(.van-swipe-item) {
  height: auto !important;
}

:deep(.van-swipe) {
  height: auto !important;
}

:deep(.van-cell) {
  padding: 10px 0;
}

:deep(.van-cell__title) {
  font-size: 14px;
}

.red-text {
  color: #ee0a24;
}

:deep(.van-nav-bar) {
  z-index: 999;
}

:deep(.van-tabs__wrap) {
  z-index: 998;
}

:deep(.van-search) {
  flex: 1;
  padding: 0;
}

:deep(.van-search__content) {
  background-color: #f7f8fa;
}

:deep(.van-field__left-icon) {
  margin-right: 8px;
}

:deep(.van-field__control) {
  text-align: left;
}

.play-music-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  z-index: 1000;
}
</style>
