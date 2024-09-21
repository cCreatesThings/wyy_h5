<script setup>
import { getCaptchaAPI, loginByCaptchaAPI, verifyCaptchaAPI } from '@/api/login'
import { showFailToast, showToast } from 'vant'
import { ref } from 'vue'

const formData = ref({
  phone: '',
  captcha: ''
})

const str = ref('获取验证码')

let isWaiting = false // 标识符，判断是否在等待时间内

const getCaptcha = async () => {
  if (isWaiting) {
    showToast({ message: '验证码已经发送,有效时间 10 分钟' })
    return
  }

  isWaiting = true // 开始计时，设置为正在等待
  try {
    const res = await getCaptchaAPI(formData.value.phone) // 假设这是你的 API 请求
    showToast({ message: '验证码发送成功' })
    console.log(res)
  } catch (error) {
    console.error('验证码请求失败', error)
    isWaiting = false // 请求失败，解除等待状态
    return
  }

  // 开始倒计时 10分钟 秒后允许再次请求
  setTimeout(() => {
    isWaiting = false
  }, 60000 * 10)
}

// 获取验证码
const onSubmit = async (e) => {
  // 验证 验证码
  const { data } = await verifyCaptchaAPI(e)
  console.log(data)

  if (!data) return showFailToast('验证码错误')
  const res = await loginByCaptchaAPI(e)
  console.log(res)
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
      <div class="captcha relative">
        <van-field
          v-model="formData.captcha"
          type="number"
          name="captcha"
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
          @click="getCaptcha"
          :disabled="!/^1[3456789]\d{9}$/.test(formData.phone)"
          >{{ str }}</van-button
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
