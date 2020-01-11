// 专门处理用户信息的存储和删除，一级获取放置在localStorge
const USER_TOKEN = 'heima-toutiao-m-91-token' // 这个key专门来存储用户信息
// 设置用户信息
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 读取用户信息
export function getUser () {
  JSON.parse(localStorage.getItem(USER_TOKEN) || '{}') // 短路表达式，前面的否后面才执行
}
// 删除用户信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
