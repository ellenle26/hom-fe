import * as types from "../constants/authConstants";
import api from "../api";
import { message } from "antd";

const authActions = {};

authActions.login = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("auth/login", { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    message.success(`Welcome back, ${res.data.data.user.name} !`);
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILURE, payload: err.message });
  }
};

authActions.getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

authActions.logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.removeItem("accessToken");
  dispatch({ type: types.LOGOUT, payload: null });
};

authActions.loginWithFB = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_WITH_FB_REQUEST, payload: null });
  try {
    const res = await api.post("auth/login/facebook", { access_token });
    dispatch({ type: types.LOGIN_WITH_FB_SUCCESS, payload: res.data.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.LOGIN_WITH_FB_FAILURE, payload: err });
  }
};

authActions.loginWithGG = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_WITH_GG_REQUEST, payload: null });
  try {
    const res = await api.post("auth/login/google", { access_token });
    console.log("hahaha", res.data);
    dispatch({ type: types.LOGIN_WITH_GG_SUCCESS, payload: res.data.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.LOGIN_WITH_GG_FAILURE, payload: err });
  }
};

export default authActions;
