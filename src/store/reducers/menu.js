import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { EXPAND_MENU, COLLAPSE_MENU, GET_MENU_REQUEST, GET_MENU_SUCCESS, GET_MENU_FAIL, ADD_TAB, REMOVE_TAB, CHANGE_TAB } from "actions/menu";

const initState = {
    isExpand: true,
    isLoading: false,
    menus: [],
    errMsg: '',
    currentTab: "Home",
    panes: [{ title: <Link to="/">Home</Link>, key: 'Home', closable: false }]
}

export default function reducer(state = initState, action) {
    switch (action.type) {
        case EXPAND_MENU:
            return {
                ...state,
                isExpand: true
            };
        case COLLAPSE_MENU:
            return {
                ...state,
                isExpand: false
            };
        case GET_MENU_REQUEST:
            return {
                ...state,
                isLoading: true,
                menus: [],
                errMsg: ''
            };
        case GET_MENU_SUCCESS:
            return {
                ...state,
                isLoading: false,
                menus: action.result.data.menus,
                errMsg: ''
            };
        case GET_MENU_FAIL:
            return {
                ...state,
                isLoading: false,
                menus: [],
                errMsg: '请求出错'
            };
        case ADD_TAB:
            return {
                ...state,
                panes: [...state.panes, action.pane]
            };
        case REMOVE_TAB:
            const {code} = action;
            state.panes.filter(item => item.key != code)
        default:
            return state;
    }
}