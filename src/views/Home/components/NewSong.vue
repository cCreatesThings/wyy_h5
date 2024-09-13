<script setup>
import CustomSong from './CustomSong.vue'
defineProps({
  data: Object
})
</script>

<template>
  <div class="newSong">
    <CustomSong :data="data" />
  </div>
</template>
