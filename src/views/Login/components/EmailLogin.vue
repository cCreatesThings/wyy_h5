<script setup>
import { loginByEmailAPI } from '@/api/login'
import { showToast } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const formData = ref({
  email: '',
  password: ''
})
const onSubmit = async (e) => {
  const res = await loginByEmailAPI(e)
  console.log(res)
  userStore.setUserInfo(res)
  showToast('登录成功')
  setTimeout(() => router.replace(history.state.back ?? '/'), 1500)
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="formData.email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <div class="password relative">
        <van-field
          v-model="formData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        ></van-field>
      </div>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<style scoped lang="scss"></style>
