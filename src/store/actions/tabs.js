export const ADD_TAB = "tabs/ADD_TAB"
export const REMOVE_TAB = "tabs/REMOVE_TAB"
export const CHANGE_TAB = "tabs/CHANGE_TAB"

export function addTab (tabData) {
	return {type: ADD_TAB, tabData}
}

export function removeTab (tabCode) {
	return {type: REMOVE_TAB, tabCode}
}

export function changeTab (tabCode) {
	return {type: CHANGE_TAB, tabCode}
}