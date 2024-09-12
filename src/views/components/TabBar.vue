<script setup>
import { ref } from 'vue'
// tabbar 当前选中的索引
const active = ref(0)
</script>
<template>
  <van-tabbar
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
</template>

<style scoped>
.iconSize {
  font-size: var(--icon-font-size);
}
</style>
