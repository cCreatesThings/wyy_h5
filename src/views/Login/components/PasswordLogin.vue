<script setup>
import { ref } from 'vue'

const formData = ref({
  phone: '',
  password: ''
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
      <div class="password relative">
        <van-field
          v-model="formData.password"
          type="password"
          name="密码"
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
