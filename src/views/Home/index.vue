<script setup>
import { ref } from 'vue'
import { getPersonalizedAPI } from '@/api/personalized'
// 获取推荐歌单 , 渲染搜索框
const personalizedList = ref([])
const getPersonalized = async () => {
  const res = await getPersonalizedAPI()
  personalizedList.value = res.result
}
getPersonalized()
</script>

<template>
  <div class="home">
    <div class="navbar flex mt-[10px]">
      <div><Icon icon="ic:round-menu" class="icon" /></div>
      <div
        class="search flex items-center flex-1 bg-[#eaedf2] rounded-[50px] ml-[10px] mr-[10px]"
      >
        <Icon icon="bitcoin-icons:search-filled" class="ml-[5px]" />
        <div class="searchKeyWord ml-[10px]">
          <van-swipe :show-indicators="false" :autoplay="3000" loop vertical>
            <van-swipe-item
              class="swipe-item"
              v-for="(item, index) in personalizedList"
              :key="index"
              >{{ item.name }}</van-swipe-item
            >
          </van-swipe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
  font-size: 30px;
  color: gray;
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
</style>
