<script setup>
import { ref, watch } from 'vue'
import PlayMusic from '@/views/components/PlayMusic.vue'
import { usePlayMusicStore } from '@/stores/playMusic'
const playMusicStore = usePlayMusicStore()
import { useRoute } from 'vue-router'
// 获取当前路由
const route = useRoute()

// tabbar 当前选中的索引
const active = ref(0)

// 根据当前路由动态设置 Tabbar 索引
const tabbarRoutes = ['/', '/find', '/roam', '/dynamic', '/my']
// 监听路由变化，并设置 active 值
watch(
  () => route.path,
  (newPath) => {
    // 匹配根路径 /
    if (newPath === '/') {
      active.value = 0
    } else {
      // 查找其他以一级路由开头的路径
      const index = tabbarRoutes.findIndex(
        (baseRoute) => baseRoute !== '/' && newPath.startsWith(baseRoute)
      )
      if (index !== -1) {
        active.value = index
      }
    }
  },
  { immediate: true } // 立即执行，以便首次加载时也能生效
)
</script>
<template>
  <div class="tabbarBox">
    <PlayMusic
      class="mb-[25vw] fixed"
      :style="{ bottom: playMusicStore.showTabbar ? '-13vw' : '-25vw' }"
    />
    <van-tabbar
      v-if="playMusicStore.showTabbar"
      v-model="active"
      @change="active = $event"
      active-color="#ee0a24"
      inactive-color="#7e838b"
    >
      <van-tabbar-item>
        <template #icon>
          <Icon icon="tabler:brand-netease-music" class="iconSize" />
        </template>
        <RouterLink to="/"> 推荐 </RouterLink>
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon><Icon icon="mdi:compass" class="iconSize" /></template>
        <RouterLink to="/find"> 发现 </RouterLink>
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <Icon icon="material-symbols:radio" class="iconSize" />
        </template>
        <RouterLink to="/roam"> 漫游 </RouterLink>
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <Icon icon="jam:messages-alt-f" class="iconSize" />
        </template>
        <RouterLink to="/dynamic"> 动态 </RouterLink>
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <Icon icon="charm:person" class="iconSize" />
        </template>
        <RouterLink to="/my" class="flex flex-col items-center">
          我的
        </RouterLink>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.iconSize {
  font-size: var(--icon-font-size);
}
.tabbarBox {
  height: max-content;
}
</style>
