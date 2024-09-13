<script setup>
import RecommendItem from './RecommendItem.vue'
import SwiperItem from './SwiperItem.vue'
import MenuItem from './MenuItem.vue'
import CustomSong from './CustomSong.vue'
import NewSong from './NewSong.vue'
defineProps({
  homeData: Array,
  curCom: String
})

const blockCodeList = {
  HOMEPAGE_BANNER: SwiperItem,
  HOMEPAGE_BLOCK_OLD_DRAGON_BALL: MenuItem,
  HOMEPAGE_BLOCK_PLAYLIST_RCMD: RecommendItem,
  HOMEPAGE_BLOCK_STYLE_RCMD: CustomSong,
  HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG: NewSong
  //   5: 'HOMEPAGE_BLOCK_HOT_TOPIC',
  //   6: 'HOMEPAGE_MUSIC_CALENDAR',
  //   7: 'HOMEPAGE_MUSIC_MLOG',
  //   8: 'HOMEPAGE_BLOCK_MGC_PLAYLIST',
  //   9: 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST',
  //   10: 'HOMEPAGE_VOICELIST_RCMD',
  //   11: 'HOMEPAGE_PODCAST24',
  //   12: 'HOMEPAGE_BLOCK_YUNCUN_PRODUCED',
  //   13: 'HOMEPAGE_BLOCK_VIDEO_PLAYLIST',
  //   14: 'HOMEPAGE_BLOCK_NEW_HOT_COMMENT',
  //   15: 'HOMEPAGE_VOICEBOOK_RCMD'
}
</script>

<template>
  <component
    :is="blockCodeList[curCom]"
    :data="homeData.find((item) => item.blockCode === curCom)"
  ></component>
</template>

<style scoped></style>
