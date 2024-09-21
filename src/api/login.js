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
