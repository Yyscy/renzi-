import request from '@/utils/request'

/**
 * 获取组织架构数据
 * @returns promise
 */
export function getDeptsApai() {
  return request({
    url: '/company/department'
  })
}
