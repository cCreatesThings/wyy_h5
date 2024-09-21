<script setup>
import { ref } from 'vue'
import { getPersonalizedAPI } from '@/api/personalized'
import CurrType from './components/CurrType.vue'
import { getHomeDataAPI } from '@/api/home'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePlayMusicStore } from '@/stores/playMusic'
import { getUserDetailAPI } from '@/api/user'
const userStore = useUserStore()
// 显示tabbar
const playMusicStore = usePlayMusicStore()
playMusicStore.showTabbarFun(true)

// 获取推荐歌单 , 渲染搜索框
const personalizedList = ref([])
const getPersonalized = async () => {
  const res = await getPersonalizedAPI()
  personalizedList.value = res.result
}
getPersonalized()

// 获取用户详情
const getUserDetail = async () => {
  if (!userStore.userInfo.token) return
  const res = await getUserDetailAPI(userStore.userInfo.account.id)
  userStore.setUserDetail(res)
}
getUserDetail()
// 时间提示文字
const timeText = {
  0: '早上好',
  1: '上午好',
  2: '下午好',
  3: '晚上好'
}
const curTime = ref(new Date().getHours())
const timeTextKey = ref(0)
if (curTime.value >= 0 && curTime.value < 6) {
  timeTextKey.value = 0
} else if (curTime.value >= 6 && curTime.value < 12) {
  timeTextKey.value = 1
} else if (curTime.value >= 12 && curTime.value < 18) {
  timeTextKey.value = 2
} else if (curTime.value >= 18 && curTime.value < 24) {
  timeTextKey.value = 3
}

// 获取首页全部数据
const homeData = ref({})
const blockCodeList = ref([])

const getHomeData = async () => {
  const res = await getHomeDataAPI()
  homeData.value = res.data
  blockCodeList.value = homeData.value.blocks.map((item) => item.blockCode)
}
getHomeData()
const loading = ref(true)
const onRefresh = () => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
const router = useRouter()
const gotoSearch = () => {
  const useStore = useUserStore()
  // 隐藏tabbar
  useStore.setShowTabbar(false)
  router.push('/search')
}
</script>

<template>
  <div class="home p-[1vw]">
    <div class="navbar sticky top-0 bg-white flex z-50 mt-[5px]">
      <div><Icon icon="ic:round-menu" class="icon" /></div>
      <div
        @click="gotoSearch"
        class="search flex items-center flex-1 bg-[#eaedf2] rounded-[50px] ml-[10px] mr-[10px]"
      >
        <Icon icon="bitcoin-icons:search-filled" class="ml-[5px] text-[8vw]" />
        <div class="searchKeyWord ml-[10px]">
          <van-swipe :show-indicators="false" :autoplay="3000" loop vertical>
            <van-swipe-item
              class="swipe-item text-[3.564vw]"
              v-for="(item, index) in personalizedList"
              :key="index"
              >{{ item.name }}</van-swipe-item
            >
          </van-swipe>
        </div>
      </div>
    </div>
    <van-pull-refresh
      style="padding-bottom: 15vw"
      v-model="loading"
      @refresh="onRefresh"
    >
      <div class="w-[100%] h-[50px] text-[8vw] time flex items-center">
        {{ timeText[timeTextKey] }}
        <div
          v-if="userStore?.userDetail?.profile.avatarUrl"
          class="userinfo flex items-center ml-[auto]"
        >
          <van-image
            round
            width="8vw"
            height="8vw"
            :src="userStore?.userDetail?.profile.avatarUrl"
          />
          <span class="nickname pl-[2vw] text-[4vw] text-[red]">{{
            userStore.userDetail.profile.nickname
          }}</span>
        </div>
      </div>

      <CurrType
        v-for="item in blockCodeList"
        :key="item"
        :curCom="item"
        :homeData="homeData?.blocks"
      />
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss">
.icon {
  font-size: 30px;
  color: rgb(35, 35, 35);
}
.searchKeyWord {
  height: 5vw;
  font-size: 4vw;
  color: gray;
  overflow: hidden;
}
.swipe-item {
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* 显示省略号 */
  width: 70%;
  display: --webkit;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.time {
  font-size: 25px;
  line-height: 50px;
}
</style>
