import {API_URL_ADMIN} from "utils";

export const ADD_TAB = "tabs/ADD_TAB"
export const REMOVE_TAB = "tabs/REMOVE_TAB"
export const CHANGE_TAB = "tabs/CHANGE_TAB"
export const GET_OPERATE_LIST_REQUEST = "tabs/GET_OPERATE_LIST_REQUEST"
export const GET_OPERATE_LIST_SUCCESS = "tabs/GET_OPERATE_LIST_SUCCESS"
export const GET_OPERATE_LIST_FAIL = "tabs/GET_OPERATE_LIST_FAIL"

export function addTab (tabData) {
	return {type: ADD_TAB, tabData}
}

export function removeTab (tabCode) {
	return {type: REMOVE_TAB, tabCode}
}

export function changeTab (tabCode) {
	return {type: CHANGE_TAB, tabCode}
}

export function getOperateList (Code) {
	return {
		types: [GET_OPERATE_LIST_REQUEST, GET_OPERATE_LIST_SUCCESS, GET_OPERATE_LIST_FAIL],
		code: Code,
		promise: client =>client.post(`${API_URL_ADMIN}Right/GetPointRolePointOperateList?pointCode=${Code}`)
	}
}