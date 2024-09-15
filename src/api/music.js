import { request } from '@/utils/request'

/**
 * @description 获取音乐url
 * @param 必选参数: id : 音乐 id
 * @url /song/url
 */

export const getMusicUrlAPI = (id) => {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}
