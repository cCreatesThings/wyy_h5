<script setup>
import { ref } from 'vue'
import { getPersonalizedAPI } from './api/personalized'
const personalizedList = ref([])
// 获取推荐歌单
const getSon = async () => {
  const res = await getPersonalizedAPI(10)
  console.log(res)
  personalizedList.value = res.result
}
</script>
<template>
  <van-button @click="getSon" type="primary">getSon</van-button>
  <ol>
    <li v-for="(item, index) in personalizedList" :key="item.id">
      <span>{{ index + 1 }}. </span> {{ item.name }}
      <img class="w-[40vw] h-[30vh] object-contain" :src="item.picUrl" />
    </li>
  </ol>
</template>
