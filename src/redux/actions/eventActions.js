import * as types from "../constants/eventConstant";
import api from "../api";
import { message } from "antd";

const eventActions = {};

eventActions.getEvents = () => async (dispatch) => {
  dispatch({ type: types.GET_EVENTS_REQUEST, payload: null });
  try {
    const res = await api.get("/events");
    dispatch({ type: types.GET_EVENTS_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.GET_EVENTS_FAILURE, payload: err.message });
  }
};

eventActions.getEventsByDate = (date) => async (dispatch) => {
  dispatch({ type: types.GET_EVENTS_BYDATE_REQUEST, payload: null });
  try {
    const res = await api.post("/events/date", { date });
    dispatch({ type: types.GET_EVENTS_BYDATE_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.GET_EVENTS_BYDATE_FAILURE, payload: err.message });
  }
};

eventActions.addEvent = (
  name,
  eventContent,
  startDate,
  endDate,
  posterUrl
) => async (dispatch) => {
  dispatch({ type: types.ADD_EVENT_REQUEST, payload: null });
  try {
    const res = await api.post("/events", {
      name,
      eventContent,
      startDate,
      endDate,
      posterUrl,
    });
    dispatch({ type: types.ADD_EVENT_SUCCESS, payload: res.data.data });
    message.success(res.data.message);
  } catch (err) {
    dispatch({ type: types.GET_EVENTS_FAILURE, payload: err.message });
  }
};

export default eventActions;
