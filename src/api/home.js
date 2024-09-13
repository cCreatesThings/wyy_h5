// 说明 : 调用此接口 , 可获取 APP 首页信息

import { request } from '@/utils/request'

// 接口地址 : /homepage/block/page
/**
 * @description 获取首页数据
 * @url /homepage/block/page
 */
export const getHomeDataAPI = () => {
  return request({
    url: '/homepage/block/page'
  })
}
