<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { showNotify, showToast } from 'vant'
import { useCascaderAreaData } from '@vant/area-data'
import nicknameDialog from './nicknamePopup.vue'
import UpdateGender from './UpdateGender.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import cascaderOptions, { DivisionUtil } from '@pansy/china-division'
import { updateUserInfoAPI } from '@/api/user'
// import { checkRequestInterval } from '@/utils/throttle'

const divisionUtil = new DivisionUtil(cascaderOptions)
const userStore = useUserStore()
const router = useRouter()
userStore.setShowTabbar(false)

const userInfo = ref({
  avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  nickname: 'codewhisperer',
  gender: '',
  region: userStore.regionStr,
  birthday: '',
  accountAge: '2天(2024年09月创建)',
  ipLocation: '湖北',
  university: '',
  musicTag: '',
  introduction: '',
  musicLevel: 'Lv.1'
})
console.log(
  userStore.userDetail.profile.province,
  userStore.userDetail.profile.city
)

const showRegionPicker = ref(false)
const showDatePicker = ref(false)
const showUniversityPicker = ref(false)
const showMusicTagPicker = ref(false)

// 地区
const regionOptions = useCascaderAreaData()

const cascaderValue = ref('')

const universityOptions = ['武汉大学', '华中科技大学', '其他大学']
const musicTagOptions = ['流行', '摇滚', '古典', '爵士', '电子']

const onClickLeft = () => {
  router.back(-1)
}

const onChangeAvatar = () => {
  showToast('更换头像')
}

const nicknamePopupEl = ref(null)
const showNicknamePopup = () => {
  nicknamePopupEl.value.showPopup()
}
const onShowQRCode = () => {
  showToast('显示二维码')
}

const onShowMusicLevel = () => {
  showToast('显示音乐等级详情')
}

const onFinishRegion = async ({ selectedOptions }) => {
  // if (!checkRequestInterval()) return
  const [province, city] = selectedOptions.map((option) => option.value)
  console.log(province, city)
  userInfo.value.region = `${divisionUtil.getNameByCode(province)} ${divisionUtil.getNameByCode(city)}`
  await updateUserInfoAPI({ province, city })
  userStore.setRegionStr(
    `${divisionUtil.getNameByCode(province)} ${divisionUtil.getNameByCode(city)}`
  )
  // 拉取新数据
  await userStore.getUserDetail(userStore.userDetail.profile.userId)
  showNotify({ message: '更新成功', type: 'success', background: 'green' })
  showRegionPicker.value = false
}

const onConfirmDate = ({ selectedValues }) => {
  userInfo.value.birthday = selectedValues.join('-')
  showDatePicker.value = false
}

const onConfirmUniversity = ({ selectedOptions }) => {
  userInfo.value.university = selectedOptions[0]
  showUniversityPicker.value = false
}

const onConfirmMusicTag = ({ selectedOptions }) => {
  userInfo.value.musicTag = selectedOptions[0]
  showMusicTagPicker.value = false
}

const updateGenderEl = ref(null)
const clickGender = () => {
  updateGenderEl.value.showGenderPopup()
}
</script>
<template>
  <div class="personal-info-editor">
    <van-nav-bar title="我的资料" left-arrow @click-left="onClickLeft" />

    <div class="avatar-container">
      <van-image
        round
        width="20vw"
        height="20vw"
        :src="userInfo.avatar"
        @click="onChangeAvatar"
      />
      <div class="change-avatar">
        <Icon icon="mdi:camera" />
        更换
      </div>
    </div>
    <van-cell-group inset>
      <van-field
        :placeholder="userStore.userDetail.profile.nickname"
        readonly
        is-link
        @click="showNicknamePopup"
        label="昵称"
      />
      <van-field
        @click="clickGender"
        is-link
        readonly
        label="性别"
        :placeholder="
          userStore.userDetail.profile.gender === 1
            ? '男'
            : userStore.userDetail.profile.gender === 2
              ? '女'
              : '保密'
        "
      />
      <van-field
        v-model="userInfo.region"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="showRegionPicker = true"
      />
      <van-popup v-model:show="showRegionPicker" round position="bottom">
        <van-cascader
          v-model="userInfo.region"
          title="请选择所在地区"
          :options="regionOptions"
          @close="showRegionPicker = false"
          @finish="onFinishRegion"
        />
      </van-popup>
      <van-field
        v-model="userInfo.birthday"
        is-link
        readonly
        label="生日"
        placeholder="请选择生日"
        @click="showDatePicker = true"
      />
      <van-cell title="我的二维码" is-link @click="onShowQRCode">
        <template #right-icon>
          <Icon icon="mdi:qrcode" />
        </template>
      </van-cell>
      <van-cell title="我的村龄" :value="userInfo.accountAge" />
      <van-cell title="IP属地" :value="userInfo.ipLocation" />
      <van-field
        v-model="userInfo.university"
        is-link
        readonly
        label="大学"
        placeholder="请选择大学"
        @click="showUniversityPicker = true"
      />
      <van-field
        v-model="userInfo.musicTag"
        is-link
        readonly
        label="音乐标签"
        placeholder="请选择音乐标签"
        @click="showMusicTagPicker = true"
      />
      <van-field
        v-model="userInfo.introduction"
        label="简介"
        type="textarea"
        placeholder="介绍一下自己吧"
        rows="3"
        autosize
      />
      <van-cell
        title="云音乐等级"
        :value="userInfo.musicLevel"
        is-link
        @click="onShowMusicLevel"
      />
    </van-cell-group>

    <!-- Region Picker -->
    <van-popup v-model:show="showRegionPicker" position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择所在地区"
        :options="regionOptions"
        @close="showRegionPicker = false"
        @finish="onFinishRegion"
      />
    </van-popup>

    <!-- Date Picker -->
    <van-popup v-model:show="showDatePicker" position="bottom">
      <van-date-picker
        title="选择生日"
        @confirm="onConfirmDate"
        @cancel="showDatePicker = false"
      />
    </van-popup>

    <!-- University Picker -->
    <van-popup v-model:show="showUniversityPicker" position="bottom">
      <van-picker
        :columns="universityOptions"
        @confirm="onConfirmUniversity"
        @cancel="showUniversityPicker = false"
      />
    </van-popup>

    <!-- Music Tag Picker -->
    <van-popup v-model:show="showMusicTagPicker" position="bottom">
      <van-picker
        :columns="musicTagOptions"
        @confirm="onConfirmMusicTag"
        @cancel="showMusicTagPicker = false"
      />
    </van-popup>
    <nicknameDialog ref="nicknamePopupEl" />
    <UpdateGender ref="updateGenderEl" />
  </div>
</template>

<style scoped>
.personal-info-editor {
  background-color: #f7f8fa;
  min-height: 100vh;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background-color: #ffffff;
}

.change-avatar {
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: #646566;
  font-size: 14px;
}

:deep(.van-cell-group) {
  margin-top: 12px;
}

:deep(.van-field__label) {
  width: 90px;
}
</style>
