<script setup>
import { formatLargeNumber } from '@/utils/formatLargeNum'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayMusicStore } from '@/stores/playMusic'
const playMusicStore = usePlayMusicStore()
const router = useRouter()
const props = defineProps({
  data: Object
})
const list = ref([])
list.value = props.data.creatives.map((item) => item.resources).flat(Infinity)
const gotoRecmdSonglist = (id) => {
  router.push({
    path: '/recmdSonglist',
    query: {
      id
    }
  })
  // 隐藏tabbar
  playMusicStore.showTabbarFun(false)
}
</script>

<template>
  <div class="playListBox mt-[4vw]">
    <div class="title text-[5vw]">
      {{ data.uiElement.subTitle.title }}
    </div>
    <div class="palyItem flex overflow-x-auto col">
      <div
        class="recommendItem mr-[10px] relative w-[30vw] flex-shrink-0 rounded-[8px]"
        v-for="item in list"
        :key="item.creativeId"
        @click="gotoRecmdSonglist(item.resourceId)"
      >
        <div
          class="playCount flex absolute z-50 top-[2vw] left-[2vw] text-[white]"
        >
          <Icon icon="ic:round-headset" class="text-[5vw]" />
          <span class="text-[3vw] font-bold">
            {{ formatLargeNumber(item.resourceExtInfo.playCount) }}</span
          >
        </div>
        <van-image
          :src="item.uiElement.image.imageUrl"
          width="100%"
          height="30vw"
        >
          <template #default>
            <span class="mainTitle">
              {{ item.uiElement.mainTitle.title }}
            </span>
          </template>
        </van-image>
      </div>
    </div>
  </div>
</template>

<style scoped>
::v-deep img {
  border-radius: 8px;
}
.mainTitle {
  /* 单行显示省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  font-size: 3vw;
  width: 100%;
  overflow: hidden;
}
.recommendItem {
  height: fit-content;
}
</style>
