import React, {Component} from 'react';
import {isUndefined} from "lodash";
import {Link} from 'react-router-dom';
import {post} from 'utils/fetch'
import {API_URL_ADMIN} from "utils";
import {ADD_TAB, REMOVE_TAB, CHANGE_TAB, GET_OPERATE_LIST_REQUEST, GET_OPERATE_LIST_SUCCESS, GET_OPERATE_LIST_FAIL} from 'actions/tabs'

const initState = {
	operateLists: {Home: {data: [], isLoading: false}},
	shownTabs: {'Home': {url: '/', Code: 'Home', menuname: '主页'}},
	activeTab: "Home",
	previousTab: ""
};

export default function reducer (state = initState, action) {
	switch (action.type) {
		case ADD_TAB:
			const {Code} = action.tabData;
			let obj = {};
			obj[ Code ] = action.tabData;
			return {
				...state,
				shownTabs: Object.assign({}, state.shownTabs, obj),
				activeTab: Code
			};
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