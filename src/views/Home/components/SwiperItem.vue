<script setup>
import { ref } from 'vue'
const props = defineProps({
  data: Object
})
const bannerList = ref([])
bannerList.value = props.data.extInfo?.banners
</script>
<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in bannerList" :key="index">
      <van-image width="100%" height="100%" :src="item.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped>
.my-swipe {
  width: 100%;
  height: 35vw;
}
</style>
