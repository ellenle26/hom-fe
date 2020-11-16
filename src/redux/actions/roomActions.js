import * as types from "../constants/roomConstants";
import api from "../api";
import { message } from "antd";

const roomActions = {};

roomActions.getRooms = () => async (dispatch) => {
  dispatch({ type: types.GET_ROOMS_REQUEST, payload: null });
  try {
    const res = await api.get("/rooms");
    dispatch({ type: types.GET_ROOMS_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.GET_ROOMS_FAILURE, payload: err.message });
  }
};

roomActions.addRoom = (
  name,
  description,
  facilities,
  capacity,
  roomImages,
  price
) => async (dispatch) => {
  dispatch({ type: types.CREATE_ROOM_REQUEST, payload: null });
  try {
    const res = await api.post("/rooms", {
      name,
      description,
      facilities,
      capacity,
      roomImages,
      price,
    });
    dispatch({ type: types.CREATE_ROOM_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.CREATE_ROOM_FAILURE, payload: err.message });
  }
};

roomActions.changeRoomStat = (stat, roomId) => async (dispatch) => {
  dispatch({ type: types.SET_ROOM_STAT_REQUEST, payload: null });
  try {
    const res = await api.post("/rooms/status", { stat, roomId });
    dispatch({ type: types.SET_ROOM_STAT_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.SET_ROOM_STAT_FAILURE, payload: err.message });
  }
};

roomActions.deleteRoom = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_ROOM_REQUEST, payload: null });
  try {
    const res = await api.put("/rooms/delete", { id });
    dispatch({ type: types.DELETE_ROOM_SUCCESS, payload: res.data.data });
    message.success(res.data.message);
  } catch (err) {
    dispatch({ type: types.DELETE_ROOM_FAILURE, payload: err.message });
  }
};

roomActions.editRoom = (
  id,
  name,
  description,
  facilities,
  capacity,
  roomImages,
  price
) => async (dispatch) => {
  dispatch({ type: types.EDIT_ROOM_REQUEST, payload: null });
  try {
    const res = await api.put("/rooms", {
      id,
      name,
      description,
      facilities,
      capacity,
      roomImages,
      price,
    });
    dispatch({ type: types.EDIT_ROOM_SUCCESS, payload: res.data.data });
    message.success(res.data.message);
  } catch (err) {
    dispatch({ type: types.EDIT_ROOM_FAILURE, payload: err.message });
  }
};

export default roomActions;
