import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { EXPAND_MENU, COLLAPSE_MENU, GET_MENU_REQUEST, GET_MENU_SUCCESS, GET_MENU_FAIL } from "actions/menu";

const initState = {
    isExpand: true,
    isLoading: false,
    menus: [],
    errMsg: ''
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
        default:
            return state;
    }
}