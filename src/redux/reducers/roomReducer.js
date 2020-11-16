import * as types from "../constants/roomConstants";

const initialState = {
  roomList: [],
  room: {},
  loading: false,
};

const roomReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ROOM_REQUEST:
    case types.GET_ROOMS_REQUEST:
    case types.SET_ROOM_STAT_REQUEST:
    case types.DELETE_ROOM_REQUEST:
    case types.GET_ROOMS_REQUEST:
      return { ...state, loading: true };

    case types.CREATE_ROOM_SUCCESS:
    case types.DELETE_ROOM_SUCCESS:
    case types.EDIT_ROOM_SUCCESS:
      return { ...state, room: payload, loading: false };

    case types.GET_ROOMS_SUCCESS:
    case types.SET_ROOM_STAT_SUCCESS:
      return { ...state, roomList: payload, loading: false };

    case types.CREATE_ROOM_FAILURE:
    case types.GET_ROOMS_FAILURE:
    case types.SET_ROOM_STAT_FAILURE:
    case types.DELETE_ROOM_FAILURE:
    case types.EDIT_ROOM_FAILURE:
      return { ...state, payload };

    default:
      return { ...state };
  }
};

export default roomReducer;
