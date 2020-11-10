import * as types from "../constants/userConstants";

const initialState = {
  userList: [],
  totalPageNum: 1,
  selectedUser: {},
  loading: false,
  message: "",
  registerUser: {},
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.REGISTER_USER_REQUEST:
    case types.GET_ALL_USERS_REQUEST:
    case types.CHANGE_USER_AUTH_REQUEST:
      return { ...state, loading: true };

    case types.REGISTER_USER_SUCCESS:
      return { ...state, loading: false, registerUser: payload };

    case types.GET_ALL_USERS_SUCCESS:
    case types.CHANGE_USER_AUTH_SUCCESS:
      return { ...state, loading: false, userList: payload };

    case types.REGISTER_USER_FAILURE:
    case types.GET_ALL_USERS_FAILURE:
    case types.CHANGE_USER_AUTH_FAILURE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};

export default userReducer;
