import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 10000
axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//拦截器
axios.interceptors.request.use(config => {
    // 将aspxauth添加到请求头
    let aspxauth = localStorage.getItem('ASPXAUTH')
    if (aspxauth) {
        config.headers.ASPXAUTH = aspxauth
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

export default {
    post (url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
        }).then(
            (response) => {
                return response
            }
        ).catch(
            ()=>{
                console.error("POST请求出错")
            }
        )
    },
    get (url, params) {
        return axios({
            method: 'get',
            url,
            params: params
        }).then(
            (response) => {
                return response
            }
        ).catch(
            () => {
                console.error("GET请求出错")
            }
        )
    }
}
