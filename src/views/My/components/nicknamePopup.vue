<script setup>
import { showNotify } from 'vant'
import { ref } from 'vue'
import { updateUserInfoAPI } from '@/api/user'

const show = ref(false)
const showPopup = () => {
  show.value = true
}
const nickname = ref('')
// 修改昵称
const confirm = async () => {
  show.value = false
  if (!nickname.value) {
    showNotify({
      message: '请输入昵称',
      type: 'warning',
      background: '#ff976a'
    })
    return
  } else {
    await updateUserInfoAPI({ nickname: nickname.value })
    showNotify({ message: '修改成功', type: 'success', background: 'green' })
  }
}
// 取消
const cancel = () => {
  show.value = false
  nickname.value = ''
}
defineExpose({ showPopup })
</script>
<template>
  <van-popup v-model:show="show" :style="{ padding: '34px' }">
    <van-field v-model="nickname" label="昵称" placeholder="请输入昵称" />
    <div class="btn flex justify-end">
      <van-button
        class="cancel-btn"
        type="warning"
        @click="cancel"
        size="small"
      >
        取消
      </van-button>
      <van-button type="primary" @click="confirm" size="small">确定</van-button>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.btn {
  padding-top: 20px;
}
.cancel-btn {
  margin-right: 10px;
}
</style>
