import { API_URL, post } from "utils";

export const LOGIN = "user/LOGIN"
export const GET_USER_INFO = "user/GET_USER_INFO"

export const loginSuccess = (isLogin) => {
  return { type: LOGIN, isLogin }
}

export const getUserInfoSuccess = (userInfo) => {
  return { type: GET_USER_INFO, userInfo }
}

export const getUserInfo = () => {
  return dispatch => {
    return post(`${API_URL}/Page/LoginShort`).then(res => {
      console.log(res)
      dispatch(getUserInfoSuccess(res.Data))
    })
  }
}

export const login = data => {
  return dispatch => {
    return post(`${API_URL}/Page/LoginCode`, data).then(res => {
      dispatch(loginSuccess(res.Type == 1))
      if (res.Type == 1) {
        dispatch(getUserInfo())
      }
    });
  };
};
