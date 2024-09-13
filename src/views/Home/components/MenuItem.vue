<script setup>
import { ref } from 'vue'
const props = defineProps({
  data: Object
})
const menuList = ref([])
menuList.value = props.data.creatives[0].resources.map((item) => item.uiElement)
// 每日推荐的 日期
const curDate = ref(new Date().getDate())
</script>
<template>
  <div class="menu flex w-[100%] mt-[3vw] overflow-auto">
    <div
      class="menu-item relative w-[12vw] flex-shrink mr-[5vw] flex justify-center flex-col items-center"
      v-for="item in menuList"
      :key="item"
    >
      <van-image
        class="rounded-[8px] red-filter"
        width="8vw"
        height="8vw"
        :src="item.image.imageUrl"
      />
      <span
        v-show="item.mainTitle.title === '每日推荐'"
        class="date absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-80%] w-[12vw] text-center block text-[3vw]"
        >{{ curDate }}</span
      >

      <span class="title w-[12vw] text-center block text-[2.564vw]">{{
        item.mainTitle.title
      }}</span>
    </div>
  </div>
</template>
<style scoped>
::v-deep .red-filter img {
  background-color: red; /* 设置红色背景 */
  mix-blend-mode: multiply; /* 使用混合模式 */
  opacity: 0.8; /* 调整图片透明度，以增强红色效果 */
  border-radius: 8px;
}
</style>
