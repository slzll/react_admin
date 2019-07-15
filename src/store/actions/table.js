import { API_URL_ADMIN } from "utils";

export const ADD_TABLE_PATH = 'table/ADD_TABLE_PATH'
export const ADD_ROWS_DATA = 'table/ADD_ROWS_DATA'
export const CHANGE_TABLE_OPTION = "table/CHANGE_TABLE_OPTION"
export const GET_TABLE_LIST_REQUEST = "table/GET_TABLE_LIST_REQUEST"
export const GET_TABLE_LIST_SUCCESS = "table/GET_TABLE_LIST_SUCCESS"
export const GET_TABLE_LIST_FAIL = "table/GET_TABLE_LIST_FAIL"

export function addTablePath(tablePath) {
	return { type: ADD_TABLE_PATH, tablePath }
}

export function addRowsData(rowsData) {
	return { type: ADD_ROWS_DATA, rowsData }
}

export function changeTableOption(option) {
	return { type: CHANGE_TABLE_OPTION, option }
}

export function getTableList({ url, option, pointCode }) {
	return {
		pointCode: pointCode,
		option: option,
		types: [GET_TABLE_LIST_REQUEST, GET_TABLE_LIST_SUCCESS, GET_TABLE_LIST_FAIL],
		promise: client => client.post(`${API_URL_ADMIN + url}`, option)
	}
}