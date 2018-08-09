import React, {Component} from 'react';
import { isUndefined } from "lodash";
import {Link} from 'react-router-dom';
import {post} from 'utils/fetch'
import {ADD_TAB, REMOVE_TAB, CHANGE_TAB} from 'actions/tabs'

const initState = {
	tabsData: {},
	shownTabs: {'Home': {url: '/', Code: 'Home', menuname: '主页'}},
	activeTab: "Home",
	previousTab: ""
}

export default function reducer (state = initState, action) {
	switch (action.type) {
		case ADD_TAB:
			let obj = {};
			obj[action.tabData.Code] = action.tabData;
			return {
				...state,
				shownTabs: Object.assign({}, state.shownTabs, obj),
				activeTab: action.tabData.Code
			};
		case REMOVE_TAB:
			delete state.shownTabs[action.tabCode];
			return {
				...state,
				shownTabs: state.shownTabs,
				activeTab: 'Home'
			};
		case CHANGE_TAB:
			return {
				...state,
				activeTab: action.tabCode
			};
		default:
			return state;
	}
}