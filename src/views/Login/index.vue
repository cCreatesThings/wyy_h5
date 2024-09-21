<script setup>
import { ref, markRaw } from 'vue'
import CaptchaCode from './components/CaptchaCode.vue'
import PasswordLogin from './components/PasswordLogin.vue'
import QrLogin from './components/QrLogin.vue'
import EmailLogin from './components/EmailLogin.vue'

// 标记组件为非响应式
const PasswordLoginMarked = markRaw(PasswordLogin)
const CaptchaCodeMarked = markRaw(CaptchaCode)
const QrLoginMarked = markRaw(QrLogin)
const EmailLoginMarked = markRaw(EmailLogin)

const loginType = [
  {
    type: 'password',
    name: '密码登录',
    component: PasswordLoginMarked
  },
  {
    type: 'captcha',
    name: '验证码登录',
    component: CaptchaCodeMarked
  },
  {
    type: 'email',
    name: '邮箱登录',
    component: EmailLoginMarked
  },
  {
    type: 'qrcode',
    name: '二维码登录',
    component: QrLoginMarked
  }
]

const showLoginTypeState = ref(false)
const curComponent = ref(PasswordLoginMarked)

const showLoginTypeFn = () => {
  showLoginTypeState.value = !showLoginTypeState.value
}
// 切换登录方式的组件
const toggleCurComFn = (item) => {
  curComponent.value = item.component
  showLoginTypeFn()
}
</script>

<template>
  <div class="login">
    <div class="logo pb-[13vw]">
      <Icon icon="tabler:brand-netease-music" class="logo" />
    </div>
    <component :is="curComponent"></component>
  </div>
  <div class="footer ml-[2vw]">
    <!-- 切换登录的方式 -->
    <van-button size="small" type="plain" @click="showLoginTypeFn">
      其他登录方式
    </van-button>
    <div class="footer-item" v-show="showLoginTypeState">
      <span
        v-for="item in loginType"
        @click="toggleCurComFn(item)"
        :key="item.name"
        v-show="item.component !== curComponent"
        class="footer-item-line mr-[2vw] text-[3.456vw] text-[#1ab4fd]"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  background: linear-gradient(to bottom, #ffeded, #fef8f8);
}

.logo {
  font-size: 100px;
  color: red;
  height: 50%;
  padding-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &-item {
    display: flex;

    align-items: flex-start;
    gap: 10px;
  }

  .footer-item-line {
    cursor: pointer;
  }
}
</style>
