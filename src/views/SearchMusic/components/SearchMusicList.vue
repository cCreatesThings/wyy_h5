<script setup>
import { getMusicDetailAPI } from '@/api/music'
import { usePlayMusicStore } from '@/stores/playMusic'
defineProps({
  musicList: Array
})

const playMusicStore = usePlayMusicStore()
const getSongUrl = async (item) => {
  const res = await getMusicDetailAPI(item.id)
  const { id, name: song } = res.songs[0]
  const { picUrl: pic } = res.songs[0].al
  const { name: author } = res.songs[0].ar[0]
  const obj = {
    id,
    song,
    pic,
    author
  }
  playMusicStore.setMusicInfo(obj)
}
</script>

<template>
  <div class="musicList">
    <van-cell-group>
      <van-cell
        @click="getSongUrl(item)"
        v-for="item in musicList"
        :key="item.id"
        :label="item.artists.map((cur) => cur.name).join('-')"
      >
        <template #title
          >{{ item.name }}
          <span v-if="item.transNames?.[0]" class="text-[gray]"
            >({{ item.transNames?.[0] }})</span
          ></template
        >
      </van-cell>
    </van-cell-group>
  </div>
</template>
