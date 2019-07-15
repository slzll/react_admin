import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  const { Type } = response.data
  if (Type === 401) {
    console.error("::401::掉线啦")
    return Promise.reject(response)
  }
  return response
}, error => {
  return Promise.reject(error.response)
})
export const post = (url, data) => {
  return axios({
    method: 'post',
    url: url,
    data: qs.stringify(data)
  }).then(
    (response) => {
      return response.data
    }
  ).catch(
    () => {
      console.error("POST请求出错")
    }
  )
};
export const get = (url, params) => {
  return axios({
    method: 'get',
    url: url,
    params: params
  }).then(
    (response) => {
      return response.data
    }
  ).catch(
    () => {
      console.error("GET请求出错")
    }
  )
}
export default {
  get,
  post
}
