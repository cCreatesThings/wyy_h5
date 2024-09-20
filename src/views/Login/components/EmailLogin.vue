<script setup>
import { ref } from 'vue'

const formData = ref({
  email: '',
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
        v-model="formData.email"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
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
