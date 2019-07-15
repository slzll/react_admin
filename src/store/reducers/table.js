import {
	ADD_ROWS_DATA,
	ADD_TABLE_PATH,
	GET_TABLE_LIST_REQUEST,
	GET_TABLE_LIST_SUCCESS,
	GET_TABLE_LIST_FAIL
} from "actions/table";

const initState = {
	tablePath: {},
	rowsData: {},
	tableList: {}
}

export default function reducer(state = initState, action) {
	switch(action.type) {
		case ADD_TABLE_PATH:
			const { tablePath } = action
			return {
				...state,
				tablePath
			}
		case ADD_ROWS_DATA:
			const { rowsData } = action
			return {
				...state,
				rowsData
			}
		case GET_TABLE_LIST_REQUEST:{
			const obj = {}
			obj[action.pointCode] = {
				data: null,
				isLoading: true
			}
			return {
				...state,
				tableList: Object.assign({}, state.tableList, obj)
			}
		}
		case GET_TABLE_LIST_SUCCESS: {
			const obj = {}
			obj[action.pointCode] = {
				data: action.result.data,
				isLoading: false
			}
			return {
				...state,
				tableList: Object.assign({}, state.tableList, obj)
			}
		}
		case GET_TABLE_LIST_FAIL: {
			const obj = {}
			obj[action.pointCode] = {
				data: null,
				isLoading: false
			}
			return {
				...state,
				tableList: Object.assign({}, state.tableList, obj)
			}
		}
		default:
			return state;
	}
}