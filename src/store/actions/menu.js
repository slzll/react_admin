import { API_URL_ADMIN, post } from "utils";

export const EXPAND_MENU = "menu/EXPAND"
export const COLLAPSE_MENU = "menu/COLLAPSE"
export const GET_MENU_REQUEST = "menu/GET_MENU_REQUEST"
export const GET_MENU_SUCCESS = "menu/GET_MENU_SUCCESS"
export const GET_MENU_FAIL = "menu/GET_MENU_FAIL"

export function expandMenu() {
  return { type: EXPAND_MENU }
}

export function collapseMenu() {
  return { type: COLLAPSE_MENU }
}

export const getMenuSuccess = (menus) => {
  return { type: GET_MENU_SUCCESS, menus }
}

export function getMenu() {
  return dispatch => {
    return post(`${API_URL_ADMIN}/Right/GetPointMenu`).then(res => {
      dispatch(getMenuSuccess(res.menus))
    })
  }
}
