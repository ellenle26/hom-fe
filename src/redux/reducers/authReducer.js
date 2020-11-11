import * as types from "../constants/authConstants";

const initialState = {
  isAuthorized: null,
  user: null,
  accessToken: "",
  loading: false,
  message: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_REQUEST:
    case types.GET_CURRENT_USER_REQUEST:
    case types.LOGIN_WITH_FB_REQUEST:
    case types.LOGIN_WITH_GG_REQUEST:
      return { ...state, loading: true };

    case types.LOGIN_SUCCESS:
    case types.LOGIN_WITH_FB_SUCCESS:
    case types.LOGIN_WITH_GG_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      console.log("authlevel la gif na", payload.user.authLevel);
      return {
        ...state,
        loading: false,
        user: payload.user,
        accessToken: payload.accessToken,
        isAuthorized: true,
      };

    case types.GET_CURRENT_USER_SUCCESS:
      return { ...state, loading: false, user: payload, isAuthorized: true };

    case types.LOGOUT:
      return {
        ...state,
        user: null,
        authLevel: "",
        accessToken: null,
        isAuthorized: false,
        loading: false,
      };

    case types.LOGIN_FAILURE:
    case types.GET_CURRENT_USER_FAILURE:
    case types.LOGIN_WITH_FB_FAILURE:
    case types.LOGIN_WITH_GG_FAILURE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};

export default authReducer;
