<script setup>
import { ref } from 'vue'
import Home from '@/views/Home/index.vue'
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
  <Home />
  <button
    @click="getSon"
    class="bg-green-500 rounded-[5px] transition-all text-cyan-50 w-[20vw] h-[10vh] hover:bg-green-400"
  >
    getSong
  </button>
  <ol>
    <li v-for="(item, index) in personalizedList" :key="item.id">
      <span>{{ index + 1 }}. </span> {{ item.name }}
      <img class="w-[40vw] h-[30vh] object-contain" :src="item.picUrl" />
    </li>
  </ol>
</template>
