export const EXPAND_MENU = "menu/EXPAND"
export const COLLAPSE_MENU = "menu/COLLAPSE"
export const GET_MENU_REQUEST = "menu/GET_MENU_REQUEST"
export const GET_MENU_SUCCESS = "menu/GET_MENU_SUCCESS"
export const GET_MENU_FAIL = "menu/GET_MENU_FAIL"

const API_URL_ADMIN = 'http://test10.jy365.net/api/admin'

export function expandMenu () {
	return {type: EXPAND_MENU}
}

export function collapseMenu () {
	return {type: COLLAPSE_MENU}
}

export function getMenu () {
	return {
		types: [ GET_MENU_REQUEST, GET_MENU_SUCCESS, GET_MENU_FAIL ],
		promise: client => client.post(`${API_URL_ADMIN}/Right/GetPointMenu`)
	}
}