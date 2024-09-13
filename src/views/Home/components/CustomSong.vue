<script setup>
// HOMEPAGE_BLOCK_STYLE_RCMD

defineProps({
  data: Object
})
</script>

<template>
  <div class="custom-song-container">
    <div class="title text-[5vw] mt-[4vw]">
      {{ data.uiElement.subTitle.title }}
    </div>
    <div class="listBox flex overflow-x-auto">
      <div
        class="song-list flex-shrink-0 mt-[2vw] w-[90vw] h-[50vw]"
        v-for="(item, index) in data.creatives"
        :key="index"
      >
        <div
          class="song-item flex relative items-center mb-[2vw]"
          v-for="(cur, i) in item.resources"
          :key="i"
        >
          <div class="song-img">
            <van-image
              :src="cur.resourceExtInfo.song.al.picUrl"
              width="13vw"
              height="13vw"
            />
            <span class="songName absolute top-0 test-[6vw] left-[14vw]">{{
              cur.resourceExtInfo.song.name
            }}</span>
            <span
              class="author absolute bottom-0 left-[16vw] text-[3vw] text-[gray]"
              >{{ cur.resourceExtInfo.song.ar[0].name }}</span
            >
            <span class="icon">
              <Icon
                icon="fe:play"
                class="absolute text-[5vw] text-gray-700 right-[5vw] bottom-[50%]"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.listBox {
  scroll-snap-type: x mandatory;
  .song-list {
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }
}
.songName {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
}
</style>
