import React, {Component} from 'react';
import {isUndefined} from "lodash";
import {Link} from 'react-router-dom';
import {post} from 'utils/fetch'
import {API_URL_ADMIN} from "utils";
import {ADD_TAB, ADD_ALL_TABS, REMOVE_TAB, CHANGE_TAB, GET_OPERATE_LIST_REQUEST, GET_OPERATE_LIST_SUCCESS, GET_OPERATE_LIST_FAIL} from 'actions/tabs'

const initState = {
	operateLists: {Home: {data: [], isLoading: false}},
	allTabs: {'Home':{url:'/', Code: 'Home', menuname: '主页'}},
	shownTabs: {'Home': {url: '/', Code: 'Home', menuname: '主页'}},
	activeTab: "Home",
	previousTab: ""
};

export default function reducer (state = initState, action) {
	let Code = null, obj = {}
	switch (action.type) {
		case ADD_TAB:
			Code = action.tabData.Code;
			obj = {};
			obj[ Code ] = action.tabData;
			return {
				...state,
				shownTabs: Object.assign({}, state.shownTabs, obj),
				activeTab: Code
			};
		case ADD_ALL_TABS:
			Code = action.tabData.Code;
			obj = {};
			obj[ Code ] = action.tabData;
			return {
				...state,
				allTabs: Object.assign({}, state.allTabs, obj)
			}
		case REMOVE_TAB:
			delete state.shownTabs[ action.tabCode ];
			return {
				...state,
				shownTabs: state.shownTabs,
				activeTab: 'Home'
			};
		case CHANGE_TAB:
			return {
				...state,
				previousTab: state.activeTab,
				activeTab: action.tabCode
			};
		case GET_OPERATE_LIST_REQUEST:
			state.operateLists[action.code] = {data: null, isLoading: true};
			return {
				...state
			}
		case GET_OPERATE_LIST_SUCCESS:
			console.log(action)
			state.operateLists[action.code] = {data: action.result.data, isLoading: false};
			return {
				...state
			}
		case GET_OPERATE_LIST_FAIL:
			state.operateLists[action.code] = {data: null, isLoading: false};
			return {
				...state
			}
		default:
			return state;
	}
}