import request from '@/utils/request'

/**
 * 获取角色数据
 * @returns promise
 */
export function getRoeslApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 获取角色数据
 * @returns promise
 */
export function addRoeslApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 删除
 */
export function RemoveRoeslApi(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

