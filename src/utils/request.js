// 封装request模块
// 因为要在拦截器理处理token同意注入，响应数据的同意处理返回，处理大数字
// token失效
import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store' // 引入vuex中的实例

// 创建一个新的插件实例
// 给request请求一个默认的请求头  baseURL
// 创建一个axios的请求工具
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 设置一个常量地址
  transformResponse: [function (data) {
    // data是一个字符串  把字符串转化成对象 并且返回 默认的是JSON.parse()
    // 如果data是一个空字符串  直接转换就会报错
    // return data ? JSONBig.parse(data) : {}
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data // 如果失败  就把字符串直接返回
    }
  }] // 处理后台返回的数据  字符串 =>  对象 JSON.parse => JSONBig.parse()   转换大数字类型
})

// 拦截器
// 请求拦截器 => 发起请求 => 请求拦截器 =>服务器
instance.interceptors.request.use(function (config) {
// 应该在返回配置之前， 网配置里塞入token
  if (store.state.user.token) {
    // 如果token存在，就要注入
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
  return config
  // 配置信息
}, function (error) {
  return Promise.reject(error) // 直接返回promise错误
})
// 响应拦截器 => 服务器=> 响应拦截器 => then await
instance.interceptors.response.use(function (response) {
  // 响应数据  返回得到响应数据  第一层data是axios默认包data。第二个data是接口返回
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, function (error) {
  // 错误的时候  同token容易失效
  return Promise.reject(error)
})
export default instance // 导出request工具
