<script setup>
import LoginForm from './components/LoginForm.vue'
</script>

<template>
  <div class="login">
    <div class="logo">
      <Icon icon="tabler:brand-netease-music" class="logo" />
    </div>
    <LoginForm />
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
  padding-top: 20%;
  display: flex;
  justify-content: center;
}
</style>
