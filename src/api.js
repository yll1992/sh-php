import Axios from 'axios'

// 设置基地址
Axios.defaults.baseURL = 'http://localhost:3000'

// 使用拦截器添加令牌
// 这个函数会在发送请求之前执行
Axios.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem('token')
  // 如果有令牌就加到协议头上 Authorization: Bearer xxxxxxx
  if (token !== undefined) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

export function regist (username, password, passwordC) {
    return Axios.post('/users', {
      username,
      password,
      password_confirmation: passwordC
    })
  }
  
  export function login (username, password) {
    return Axios.post('/access_token', {
      username,
      password
    })
  }
  
  export function sponser (id, num) {
    return Axios.post(`/users/${id}/money/${num}`)
  }

  export function userInfo () {
    return Axios.get('/user_info')
  }

  export function createRoom (roomName, roomDesc) {
    return Axios.post('/rooms', {
      room_name: roomName,
      room_desc: roomDesc
    })
  }
  
  export function getRooms (pagenum, pagesize) {
    return Axios.get(`/rooms?pagenum=${pagenum}&pagesize=${pagesize}`)
  }
  
  export function roomInfo (id) {
    return Axios.get(`/rooms/${id}`)
  }