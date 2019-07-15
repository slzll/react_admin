import { hashHistory } from 'react-router';
import {
  ADD_TAB,
  ADD_ALL_TABS,
  REMOVE_TAB,
  CHANGE_TAB,
  GET_OPERATE_LIST,
} from 'actions/tabs'

const initState = {
  operateLists: { Home: { data: [], isLoading: false } },
  allTabs: { 'Home': { url: '/', Code: 'Home', menuname: '主页' } },
  shownTabs: { 'Home': { url: '/', Code: 'Home', menuname: '主页' } },
  activeTab: "Home",
  previousTab: ""
};

export default function reducer(state = initState, action) {
  let Code = null, obj = {}
  switch (action.type) {
    case ADD_TAB:
      Code = action.tabData.Code;
      obj = {};
      obj[Code] = action.tabData;
      return {
        ...state,
        shownTabs: Object.assign({}, state.shownTabs, obj),
        activeTab: Code
      };
    case ADD_ALL_TABS:
      Code = action.tabData.Code;
      obj = {};
      obj[Code] = action.tabData;
      return {
        ...state,
        allTabs: Object.assign({}, state.allTabs, obj)
      }
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
        previousTab: state.activeTab,
        activeTab: action.tabCode
      };
    case GET_OPERATE_LIST:
      console.log(action)
      state.operateLists[action.code] = { data: action.result.data, isLoading: false };
      return {
        ...state
      }
    default:
      return state;
  }
}
