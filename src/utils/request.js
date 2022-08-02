import { Message } from 'element-ui'
// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use() // 请求拦截器
service.interceptors.response.use((res) => {
  const { success, data, message } = res.data
  if (success) {
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message)) // eslint-disable-next-line
}, function (error) {
  // 对响应错误做点什么
  Message.error('系统异常')
  return Promise.reject(error)
}) // 响应拦截器
export default service // 导出axios实例
