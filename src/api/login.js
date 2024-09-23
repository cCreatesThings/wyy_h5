import { request } from '@/utils/request'

/**
 * 手机号登录
 * @description /login/cellphone
 * @param 必选参数 phone: 手机号, captcha: 验证码
 */
export function loginByCaptchaAPI(params) {
  return request({
    url: '/login/cellphone',
    params
  })
}

/**
 * @description 获取手机登录的验证码
 * @params   必选参数 : phone: 手机号码
 * @url 接口地址 : /captcha/sent
 */
export const getCaptchaAPI = (phone) => {
  return request({
    url: '/captcha/sent',
    params: {
      phone
    }
  })
}

/**
 * @description 验证验证码
 * @params   必选参数 : phone: 手机号码, captcha: 验证码
 * @url 接口地址 : /captcha/verify
 */
export const verifyCaptchaAPI = (params) => {
  return request({
    url: '/captcha/verify',
    params
  })
}

/**
 *  @description 密码登录
 * @param {*} :  phone password
 */
export const loginByPasswordAPI = (params) => {
  return request({
    url: '/login/cellphone',
    params
  })
}

/**
 * @description 邮箱登录
 * @param {*} params {email,password}
 * @returns
 */
export const loginByEmailAPI = (params) => {
  return request({
    url: '/login',
    params
  })
}

/**
 * @description 二维码 key 生成接口
 */
export const getLoginQRKeyAPI = () => {
  const timestamp = Date.now()
  return request({
    url: '/login/qr/key',
    params: {
      timestamp
    }
  })
}

/**
 * @description 二维码生成接口
 * @param key  二维码 key
 */

export const getLoginQRCodeAPI = (key) => {
  const timestamp = Date.now()
  return request({
    url: '/login/qr/create',
    params: {
      key,
      qrimg: true,
      timestamp
    }
  })
}

// 3. 二维码检测扫码状态接口
// 说明: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies),如扫码后返回502,则需加上noCookie参数,如&noCookie=true

// 必选参数: key,由第一个接口生成

// 接口地址 : /login/qr/check

// 调用例子 : /login/qr/check?key=xxx

/**
 * @description 二维码检测扫码状态接口
 * @param {*} key
 * @returns
 */
export const checkLoginQRCodeAPI = (key, noCookie = {}) => {
  //携带时间戳

  const timestamp = Date.now()
  return request({
    url: '/login/qr/check',
    params: {
      key,
      noCookie,
      timestamp
    }
  })
}

/**
 * @description 获取登录状态
 * @returns
 */
export const getLoginStatusAPI = () => {
  const timestamp = Date.now()
  return request({
    method: 'POST',
    url: '/login/status',
    data: {
      timestamp
    }
  })
}
