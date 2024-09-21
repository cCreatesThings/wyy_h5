<script setup>
import { loginByPasswordAPI } from '@/api/login'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()

const formData = ref({
  phone: '',
  password: ''
})
const onSubmit = async (e) => {
  const res = await loginByPasswordAPI(e)

  if (res.code === 200) {
    userStore.setUserInfo(res)
    router.go(-1)
  }
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="formData.phone"
        name="phone"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
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
