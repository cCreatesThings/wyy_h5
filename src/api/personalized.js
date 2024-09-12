import { request } from '@/utils/request'

/**
 *  @description 获取推荐歌单
 *  @param limit 取出数量
 */
export const getPersonalizedAPI = (limit = 5) => {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}
