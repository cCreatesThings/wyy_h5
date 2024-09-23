<script setup>
import { ref, onBeforeUnmount } from 'vue'
import {
  getLoginQRKeyAPI,
  getLoginQRCodeAPI,
  checkLoginQRCodeAPI,
  getLoginStatusAPI
} from '@/api/login'
import { showToast } from 'vant'
import router from '@/router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const base64Str = ref()
const key = ref()
//800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies),如扫码后返回502,则需加上noCookie参数,如&noCookie=true
const statusCode = ref('')
const statusText = {
  800: '二维码过期',
  801: '等待扫码',
  802: '待确认',
  803: '授权登录成功',
  502: '授权失败'
}
const createQR = async () => {
  const res = await getLoginQRKeyAPI()
  key.value = res.data.unikey
  const {
    data: { qrimg }
  } = await getLoginQRCodeAPI(key.value)
  base64Str.value = qrimg
  checkLoginQRCode(key.value)
}

let polling = true // 用于控制轮询是否继续

const checkLoginQRCode = async (key) => {
  if (!polling) return // 如果polling为false，停止轮询

  const res = await checkLoginQRCodeAPI(key)
  statusCode.value = res.code

  switch (res.code) {
    case 800:
      showToast('二维码已过期')
      polling = false // 停止轮询
      break
    case 801:
    case 802:
      // 等待扫码或待确认，继续轮询
      setTimeout(() => {
        checkLoginQRCode(key)
      }, 2000)
      break
    case 502:
      // 授权失败，重试一次带noCookie参数
      // eslint-disable-next-line no-case-declarations
      const retryRes = await checkLoginQRCodeAPI(key, { noCookie: true })
      statusCode.value = retryRes.code
      if (retryRes.code !== 803) {
        setTimeout(() => {
          checkLoginQRCode(key)
        }, 2000)
      } else {
        polling = false
        showToast('授权成功')
        setTimeout(() => router.replace(history.state.back ?? '/'), 1500)
      }
      break
    case 803:
      // 授权成功，停止轮询
      showToast('授权成功')
      // eslint-disable-next-line no-case-declarations
      const loginStatusRes = await getLoginStatusAPI()
      console.log(loginStatusRes)
      userStore.setUserInfo({ ...loginStatusRes.data, cookie: res.cookie })

      setTimeout(() => router.replace(history.state.back ?? '/'), 1000)
      polling = false
      break
  }
}

createQR()

// 页面离开. 停止
onBeforeUnmount(() => {
  polling = false
})
</script>

<template>
  <div class="qr">
    <div class="qr-title">
      使用 <i class="text-red-500 not-italic">网易云app</i> 扫一扫
    </div>
    <van-image v-if="base64Str" width="200" height="200" :src="base64Str">
      <div class="status text-center text-[red]" v-if="statusCode">
        {{ statusText[statusCode] }}
      </div>
    </van-image>
  </div>
</template>

<style scoped lang="scss">
.qr {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
