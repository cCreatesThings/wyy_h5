// 接口地址 : /user/detail

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
