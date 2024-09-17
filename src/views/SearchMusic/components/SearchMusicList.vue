<script setup>
import { ref } from 'vue'
import { usePlayMusicStore } from '@/stores/playMusic'
const props = defineProps({
  musicList: Array
})
const IdList = ref([])

const playMusicStore = usePlayMusicStore()
const getSongUrl = async (item) => {
  IdList.value = props.musicList.map((item) => item.id)
  playMusicStore.setMusicInfo(item.id, IdList.value)
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
