import api from "../api";
import { message } from "antd";
import * as types from "../constants/userConstants";

const userActions = {};

userActions.createUser = (name, email, password, avatarUrl) => async (
  dispatch
) => {
  dispatch({ type: types.REGISTER_USER_REQUEST, payload: null });
  try {
    const res = await api.post("users/register", {
      name,
      email,
      password,
      avatarUrl,
    });
    dispatch({ type: types.REGISTER_USER_SUCCESS, payload: res.data.data });
    message.success(`Successfully create account. Nice to meet you ${name}`);
  } catch (err) {
    dispatch({ type: types.REGISTER_USER_FAILURE, payload: err.message });
    message.error(`${err.message}`);
  }
};

userActions.getAllUsers = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_USERS_REQUEST, payload: null });
  try {
    const res = await api.get("/users/all");
    dispatch({ type: types.GET_ALL_USERS_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.GET_ALL_USERS_FAILURE, payload: err.message });
  }
};

userActions.changeAuth = (authLevel, userId) => async (dispatch) => {
  dispatch({ type: types.CHANGE_USER_AUTH_REQUEST, payload: null });
  try {
    const res = await api.put("/users/auth", { authLevel, userId });
    dispatch({ type: types.CHANGE_USER_AUTH_SUCCESS, payload: res.data.data });
    message.success(res.data.message);
  } catch (err) {
    dispatch({ type: types.CHANGE_USER_AUTH_FAILURE, payload: err.message });
  }
};

export default userActions;
