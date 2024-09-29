// 接口地址 : /user/detail

import { useUserStore } from '@/stores/user'
import { request } from '@/utils/request'

// 调用例子 : /user/detail?uid=32953014

/**
 * @description 获取用户详情
 * @param {*} uid
 * @returns
 */
export const getUserDetailAPI = (uid) => {
  return request({
    url: '/user/detail',
    params: { uid }
  })
}

// 接口地址 : /user/update

// 调用例子 : /user/update?gender=0&signature=测试签名&city=440300&nickname=binary&birthday=1525918298004&province=440000

/**
 * @description 修改用户信息
 * @param {*} data
 * @returns
 */
export const updateUserInfoAPI = (data) => {
  const userStore = useUserStore()
  const { nickname, gender, birthday, city, province, signature } =
    userStore.userDetail.profile

  data = { nickname, gender, birthday, city, province, signature, ...data }
  return request({
    url: '/user/update',
    method: 'POST',
    data
  })
}
