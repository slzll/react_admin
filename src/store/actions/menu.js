export const EXPAND_MENU = "menu/EXPAND"
export const COLLAPSE_MENU = "menu/COLLAPSE"
export const GET_MENU_REQUEST = "menu/GET_MENU_REQUEST"
export const GET_MENU_SUCCESS = "menu/GET_MENU_SUCCESS"
export const GET_MENU_FAIL = "menu/GET_MENU_FAIL"
export const ADD_TAB = "menu/ADD_TAB"
export const REMOVE_TAB = "menu/REMOVE_TAB"
export const CHANGE_TAB = "menu/CHANGE_TAB"

const API_URL_ADMIN = 'http://test10.jy365.net/api/admin'

export function expandMenu () {
    return { type: EXPAND_MENU }
}
export function collapseMenu () {
    return { type: COLLAPSE_MENU }
}
export function addTab () {
    return { type: ADD_TAB }
}
export function removeTab () {
    return { type: REMOVE_TAB }
}
export function changeTab () {
    return { type: CHANGE_TAB }
}

export function getMenu () {
    return {
        types: [GET_MENU_REQUEST, GET_MENU_SUCCESS, GET_MENU_FAIL],
        promise: client => client.post(`${API_URL_ADMIN}/Right/GetPointMenu`)
    }
}