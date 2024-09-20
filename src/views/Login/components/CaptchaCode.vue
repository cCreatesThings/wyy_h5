<script setup>
import { ref } from 'vue'

const formData = ref({
  phone: '',
  captcha: ''
})
const onSubmit = () => {
  console.log('submit')
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="formData.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <div class="captcha relative">
        <van-field
          v-model="formData.captcha"
          type="number"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        ></van-field>
        <van-button
          class="captcha-btn"
          type="primary"
          hairline
          size="mini"
          plain
          >获取验证码</van-button
        >
      </div>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<style scoped lang="scss">
.captcha-btn {
  position: absolute;
  right: 0;
  top: 10px;
}
</style>
