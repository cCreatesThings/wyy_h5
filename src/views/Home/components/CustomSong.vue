<script setup>
// HOMEPAGE_BLOCK_STYLE_RCMD

const props = defineProps({
  data: Object
})
console.log(props.data.uiElement.subTitle.title)

const playSong = (id) => {
  console.log(id)
}
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
              lazy-load
              :src="
                cur.resourceExtInfo.songData?.album.picUrl ||
                cur.uiElement.image.imageUrl
              "
              width="13vw"
              height="13vw"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" /> </template
            ></van-image>
            <span class="songName absolute top-0 test-[6vw] left-[14vw]">{{
              cur.uiElement.mainTitle.title
            }}</span>
            <span
              class="author absolute bottom-0 left-[16vw] text-[3vw] text-[gray]"
              >{{ cur.resourceExtInfo.artists[0]?.name }}</span
            >
            <span class="icon" @click="playSong(cur.resourceId)">
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
