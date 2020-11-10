import * as types from "../constants/bookingConstant";

const initialState = {
  bookingList: [],
  booking: {},
  loading: false,
};

const bookingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_BOOKING_REQUEST:
    case types.GET_USER_BOOKING_REQUEST:
    case types.PAYMENT_REQUEST:
    case types.GET_ALL_BOOKING_REQUEST:
    case types.UPDATE_BOOKING_STATUS_REQUEST:
    case types.SET_BOOKING_STAT_REQUEST:
    case types.CANCEL_PENDING_BOOKING_REQUEST:
    case types.GET_USER_PENDING_BOOKING_REQUEST:
    case types.CANCEL_ENTIRE_BOOKING_REQUEST:
      return { ...state, loading: true };

    case types.SET_BOOKING_STAT_SUCCESS:
    case types.ADD_BOOKING_SUCCESS:
      return { ...state, booking: payload, loading: false };

    case types.GET_USER_BOOKING_SUCCESS:
    case types.PAYMENT_SUCCESS:
    case types.GET_ALL_BOOKING_SUCCESS:
    case types.UPDATE_BOOKING_STATUS_SUCCESS:
    case types.CANCEL_PENDING_BOOKING_SUCCESS:
    case types.GET_USER_PENDING_BOOKING_SUCCESS:
    case types.CANCEL_ENTIRE_BOOKING_SUCCESS:
      return { ...state, bookingList: payload, loading: false };

    case types.ADD_BOOKING_FAILURE:
    case types.GET_USER_BOOKING_FAILURE:
    case types.PAYMENT_FAILURE:
    case types.GET_ALL_BOOKING_FAILURE:
    case types.UPDATE_BOOKING_STATUS_FAILURE:
    case types.SET_BOOKING_STAT_FAILURE:
    case types.CANCEL_PENDING_BOOKING_FAILURE:
    case types.GET_USER_PENDING_BOOKING_FAILURE:
    case types.CANCEL_ENTIRE_BOOKING_FAILURE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};

export default bookingReducer;
