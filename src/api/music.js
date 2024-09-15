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

// 接口地址 : /search 或者 /cloudsearch(更全)

// 调用例子 :

/**
 * @description 搜索歌曲
 * @param  keywords: 海阔天空
 * @url  /search
 */
export const searchMusicAPI = (keywords) => {
  return request({
    url: '/search',
    params: {
      keywords
    }
  })
}

// 必选参数 : ids: 音乐 id, 如 ids=347230

// 接口地址 : /song/detail

/**
 * @description 获取歌曲详情
 * @param  ids: 音乐 id, 如 ids=347230
 * @url  /song/detail
 */
export const getMusicDetailAPI = (ids) => {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}
