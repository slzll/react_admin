import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded'

//拦截器
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})
export const post = (url, data) => {
	return axios({
		method: 'post',
		url: 'http://test10.jy365.net/api/' + url,
		data: qs.stringify(data),
	}).then(
		(response) => {
			return response
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
		url: 'http://test10.jy365.net/api/' + url,
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
export default {
	get,
	post
}
