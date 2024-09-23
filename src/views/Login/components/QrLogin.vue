<script setup>
import qr from '@/assets/qr.svg'
</script>

<template>
  <div class="qr">
    <div class="qr-title">
      使用 <i class="text-red-500 not-italic">网易云app</i> 扫一扫
    </div>
    <van-image width="200" height="200" :src="qr" />
  </div>
</template>

<style scoped lang="scss">
.qr {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
