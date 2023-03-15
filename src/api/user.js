import request from '@/utils/axiosReq'

export function loginReq(data) {
  return request({
    //url: '/integration-front/user/loginValid',
    url: '/oauth/token',
    data,
    method: 'post',
    bfLoading: false,
    isParams: true,
    isAlertErrorMsg: false,    
    contentType:'application/x-www-form-urlencoded'
  })
}
export function getInfoReq() {
  return request({
    url: '/integration-front/user/getUserInfo',
    bfLoading: false,
    method: 'post',
    isAlertErrorMsg: false
  })
}

export function logoutReq() {
  return request({
    url: '/integration-front/user/loginOut',
    method: 'post'
  })
}
