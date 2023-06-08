import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../services/api/auth/AuthService";
import {setHeaderConfigAxios} from "../services/https/apiConfig";
import NavigationService from "../services/NavigationService";

export const INCREMENT = 'INCREMENT';
export const SAVE_HISTORY = 'SAVE_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const DELETE_ALL_HISTORY = 'DELETE_ALL_HISTORY';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const CHANGE_PROFILE_SUCCESS = 'CHANGE_PROFILE_SUCCESS'
export const CHANGE_PROFILE_FAILED = 'CHANGE_PROFILE_FAILED'

export const login = (data) => async (dispatch) => {
  dispatch({
    type: LOGIN
  })
  try {
    const payload = await authService.login(data)
    const resData = payload.data;
    if (payload.status == 1){
        setHeaderConfigAxios(resData.access_token);
        console.log(payload);
        await AsyncStorage.setItem("access_token", resData.access_token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload:resData
        })
        NavigationService.reset('/user')
    }
    else{
      throw new Error(payload.message)
    }
  } catch (error) {
      alert(error.message)
      dispatch({
        type: LOGIN_FAILED,
        payload: "Đăng nhập thất bại"
      })
  }
};

export const logout = (data) => async (dispatch) => {
  await dispatch({
    type: LOGOUT
  })
  try {
    NavigationService.reset('/auth');
    setHeaderConfigAxios();
    // const payload = await authService.logout(data)
    // console.log(payload);
    // if (payload){
    //   NavigationService.reset('/auth');
    //   setHeaderConfigAxios();
    // }
  } catch (error) {
      alert(error.message)
      dispatch({
        type: LOGIN_FAILED,
        payload: "Đăng nhập thất bại"
      })
  }
}

export function increment(value) {
  return {
    type: INCREMENT,
    payload: value,
  };
}


export function save_history(value) {
  return {
    type: SAVE_HISTORY,
    payload: value,
  };
}

export function delete_history(value) {
  return {
    type: DELETE_HISTORY,
    payload: value,
  };
}

export function delete_all_history() {
  return {
    type: DELETE_ALL_HISTORY,
  };
}
export const changeProfile = (data) => async (dispatch) => {
  dispatch({
    type: CHANGE_PROFILE
  })
  try {
    const payload = await authService.updateProfile(data)
    console.log(payload.data);
    if (payload.status == 1){
      dispatch({
        type: CHANGE_PROFILE_SUCCESS,
        payload:{
          name:data.name,
          email:data.email,
          phoneNumber: data.phoneNumber,
          profilePicture:payload.data.imageUrl,
        }
      })
      NavigationService.reset('/user')
    }
    else{
      throw new Error(payload.message)
    }
  } catch (error) {
    alert(error.message)
    dispatch({
      type: CHANGE_PROFILE_FAILED,
      payload: error
    })
  }
};

