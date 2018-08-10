import { API_URL } from "utils";

export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST"
export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS"
export const GET_USER_INFO_FAIL = "userInfo/GET_USER_INFO_FAIL"

export const getUserInfoRequest = () => {
	return {type: GET_USER_INFO_REQUEST}
}
export const getUserInfoSuccess = (userInfo) => {
	return {type: GET_USER_INFO_SUCCESS, userInfo}
}
export const getUserInfoFail = () => {
	return {type: GET_USER_INFO_FAIL}
}

export function getUserInfo () {
	return {
		types: [ GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL ],
		promise: client => client.post(`${API_URL}/Page/LoginShort`)
	}
}
