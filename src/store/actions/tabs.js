import { API_URL_ADMIN } from "utils";
import { post } from 'utils/fetch'

export const ADD_TAB = "tabs/ADD_TAB"
export const ADD_ALL_TABS = "tabs/ADD_ALL_TABS"
export const REMOVE_TAB = "tabs/REMOVE_TAB"
export const CHANGE_TAB = "tabs/CHANGE_TAB"
export const GET_OPERATE_LIST = "tabs/GET_OPERATE_LIST"

export function addAllTabs(tabData) {
  return { type: ADD_ALL_TABS, tabData }
}

export function addTab(tabData) {
  return { type: ADD_TAB, tabData }
}

export function removeTab(tabCode) {
  return { type: REMOVE_TAB, tabCode }
}

export function changeTab(tabCode) {
  return { type: CHANGE_TAB, tabCode }
}
export const getOperateListSuccess = (list)=> {
  return {type: GET_OPERATE_LIST, list}
}

export const getOperateList = (Code) => {
  return dispatch => {
    return post(`${API_URL_ADMIN}/Right/GetPointRolePointOperateList?pointCode=${Code}`).then(res => {
      console.log(res)
      dispatch(getOperateListSuccess(res))
    })
  }
}
