<script setup>
defineProps({
  data: Object
})
</script>

<template>
  <div class="playListBox mt-[4vw]">
    <div class="title text-[5vw]">
      {{ data.uiElement.subTitle.title }}
    </div>
    <div class="palyItem flex overflow-x-auto col">
      <div
        class="recommendItem mr-[10px] w-[30vw] h-[55vw] flex-shrink-0 rounded-[8px]"
        v-for="item in data.creatives"
        :key="item.creativeId"
      >
        <van-image
          :src="item.uiElement.image.imageUrl"
          width="100%"
          height="80%"
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
</style>
