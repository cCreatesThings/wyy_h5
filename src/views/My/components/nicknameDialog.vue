<script setup>
import { showDialog, showNotify } from 'vant'
import { ref } from 'vue'
import { updateUserInfoAPI } from '@/api/user'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const show = ref(false)

const showTrue = () => {
  show.value = true
}
const formEl = ref(null)
const nickname = ref('')
const confirmHandle = async () => {
  const { nickname } = formEl.value.getValues()
  if (nickname) {
    await updateUserInfoAPI({ nickname })
    await userStore.getUserDetail(userStore.userDetail.profile.userId)
    showNotify({
      message: '修改成功',
      type: 'success',
      background: 'green',
      color: '#fff'
    })
  } else {
    showDialog({ message: '输入不能为空' })
  }
}
defineExpose({ showTrue })
</script>
<template>
  <van-dialog
    @confirm="confirmHandle"
    v-model:show="show"
    title="一天只能两次修改哦!"
    show-cancel-button
  >
    <van-cell-group inset>
      <van-form ref="formEl">
        <van-field
          name="nickname"
          :rules="[{ required: true, message: '请输入用户名' }]"
          placeholder="请输入用户名"
          v-model="nickname"
        />
      </van-form>
    </van-cell-group>
  </van-dialog>
</template>
