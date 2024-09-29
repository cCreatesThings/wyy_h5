<script setup>
import { showNotify } from 'vant'
import { ref } from 'vue'
import { updateUserInfoAPI } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { checkRequestInterval } from '@/utils/throttle'
const userStore = useUserStore()
const genderType = { 0: '保密', 1: '男性', 2: '女性' }
const show = ref(false)
const showGenderPopup = () => {
  show.value = true
}
const gender = ref(userStore.userDetail.profile.gender)

// 修改昵称
const confirm = async () => {
  show.value = false
  if (!checkRequestInterval()) return
  if (Object.keys(genderType).includes(gender.value)) {
    await updateUserInfoAPI({ gender: +gender.value })
    await userStore.getUserDetail(userStore.userInfo.account.id)
    showNotify({ message: '修改成功', background: 'green', type: 'success' })
  } else {
    showNotify({
      message: '请选择性别',
      background: '#ff976a',
      type: 'warning'
    })
  }
}

// 取消
const cancel = () => {
  show.value = false
  gender.value = ''
}
defineExpose({ showGenderPopup })
</script>
<template>
  <van-popup v-model:show="show" :style="{ padding: '34px' }">
    <van-radio-group v-model="gender">
      <van-radio v-for="(item, k) in genderType" :key="item" :name="k">
        {{ item }}
      </van-radio>
    </van-radio-group>
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
