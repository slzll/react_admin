import { GET_USER_INFO, LOGIN } from '../actions/user'

const initState = {
  isLoading: false,
  isLogin: false,
  userInfo: {},
  errMsg: ''
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
        errorMsg: ''
      };
    case LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
        errorMsg: ''
      };
    default:
      return state;
  }
}
