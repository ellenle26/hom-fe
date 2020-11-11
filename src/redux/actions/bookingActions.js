import * as types from "../constants/bookingConstant";
import api from "../api";
import { message } from "antd";

const bookingActions = {};

bookingActions.addBooking = (id, price, checkIn, checkOut, userId) => async (
  dispatch
) => {
  dispatch({ type: types.ADD_BOOKING_REQUEST, payload: null });
  try {
    const res = await api.post("/bookings/user", {
      id,
      price,
      checkIn,
      checkOut,
      userId,
    });
    dispatch({ type: types.ADD_BOOKING_SUCCESS, payload: res.data.data });
    message.success(`${res.data.message}!`);
  } catch (err) {
    dispatch({ type: types.ADD_BOOKING_FAILURE, payload: err.message });
  }
};

bookingActions.getBookingByUser = () => async (dispatch) => {
  dispatch({ type: types.GET_USER_BOOKING_REQUEST, payload: null });
  try {
    const res = await api.get("/users/bookings");
    dispatch({ type: types.GET_USER_BOOKING_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.GET_USER_BOOKING_FAILURE, payload: err.message });
  }
};

bookingActions.confirmPayment = (
  bookingIdList,
  bookingContact,
  userNote,
  promoCode
) => async (dispatch) => {
  dispatch({ type: types.PAYMENT_REQUEST, payload: null });
  try {
    const res = await api.post("/bookings/payment", {
      bookingIdList,
      bookingContact,
      userNote,
      promoCode,
    });
    dispatch({ type: types.PAYMENT_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.PAYMENT_FAILURE, payload: err.message });
  }
};

bookingActions.getBookings = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_BOOKING_REQUEST, payload: null });
  try {
    const res = await api.get("/bookings");
    dispatch({ type: types.GET_ALL_BOOKING_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.GET_ALL_BOOKING_FAILURE, payload: err.message });
  }
};

bookingActions.changeStatus = (email, num, paid) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BOOKING_STATUS_REQUEST, payload: null });
  try {
    const res = await api.post("/bookings", { email, num, paid });
    dispatch({
      type: types.UPDATE_BOOKING_STATUS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: types.UPDATE_BOOKING_STATUS_FAILURE,
      payload: err.message,
    });
  }
};

bookingActions.changeBookingStat = (selectedRoomId, date, stat) => async (
  dispatch
) => {
  dispatch({ type: types.SET_BOOKING_STAT_REQUEST, payload: null });
  try {
    const res = await api.post("/bookings/status", {
      selectedRoomId,
      date,
      stat,
    });
    dispatch({ type: types.SET_BOOKING_STAT_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.SET_BOOKING_STAT_FAILURE, pyaload: err.message });
  }
};

bookingActions.cancelPendingBooking = (bookingId) => async (dispatch) => {
  dispatch({ type: types.CANCEL_PENDING_BOOKING_REQUEST, payload: null });
  try {
    const res = await api.put("/bookings/pending", { bookingId });
    dispatch({
      type: types.CANCEL_PENDING_BOOKING_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: types.CANCEL_PENDING_BOOKING_FAILURE,
      payload: err.message,
    });
  }
};

bookingActions.getUserPendingBooking = () => async (dispatch) => {
  dispatch({ type: types.GET_USER_PENDING_BOOKING_REQUEST, payload: null });
  try {
    const res = await api.get("/bookings/user");
    dispatch({
      type: types.GET_USER_PENDING_BOOKING_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: types.GET_USER_PENDING_BOOKING_FAILURE,
      payload: err.message,
    });
  }
};

bookingActions.cancelEBooking = (bookingNo) => async (dispatch) => {
  dispatch({ type: types.CANCEL_ENTIRE_BOOKING_REQUEST, payload: null });
  try {
    const res = await api.put("/bookings/entirely", { bookingNo });
    dispatch({
      type: types.CANCEL_ENTIRE_BOOKING_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: types.CANCEL_ENTIRE_BOOKING_FAILURE,
      payload: err.message,
    });
  }
};

bookingActions.clearRedirect = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_REDIRECT",
  });
};

bookingActions.searchBooking = (bookingNo, date) => async (dispatch) => {
  dispatch({ type: types.SEARCH_BOOKING_REQUEST, payload: null });
  try {
    const res = await api.post("/bookings/search", { bookingNo, date });
    dispatch({ type: types.SEARCH_BOOKING_SUCCESS, payload: res.data.data });
    message.success(`Found ${res.data.data.length} booking(s)!`);
  } catch (err) {
    dispatch({ type: types.SEARCH_BOOKING_FAILURE, payload: err.message });
  }
};

export default bookingActions;
