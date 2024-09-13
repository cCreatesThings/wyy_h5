<script setup>
defineProps({
  menuList: Array
})
</script>
<template>
  <div class="menu flex w-[100%] overflow-auto">
    <div
      class="menu-item w-[12vw] flex-shrink mr-[5vw] flex justify-center flex-col items-center"
      v-for="item in menuList"
      :key="item"
    >
      <van-image
        class="rounded-[8px] red-filter"
        width="8vw"
        height="8vw"
        :src="item.image.imageUrl"
      />
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
