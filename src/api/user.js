import request from '@/utils/request'

/**
 * 提交登录
 * @param {Object} data
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @returns promise
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 获取用户详细信息
 * @param {string} id
 * @returns promise
 */
export function getUserDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
