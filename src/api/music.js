import { request } from '@/utils/request'

/**
 * @description 获取音乐url
 * @param 必选参数: id : 音乐 id
 * @url /song/url
 */

export const getMusicUrlAPI = (id) => {
  return request({
    url: '/song/url/v1',
    params: {
      id,
      level: 'lossless'
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

// 接口地址 : /playlist/detail

// 调用例子 : /playlist/detail?id=24381616

/**
 * @description 获取推荐歌单详情
 * @param {*} id 歌单 id
 */
export const getSongListDetailAPI = (id) => {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

/**
 * @description 调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
 * @param {*} id
 * @returns
 */
export const getSongListDetailDynamicAPI = (id) => {
  return request({
    url: '/playlist/detail/dynamic',
    params: {
      id
    }
  })
}

/**
 * @description 获取歌词
 * @param {*} id 歌曲id
 * @returns
 */
export const getLyricAPI = (id) => {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}
