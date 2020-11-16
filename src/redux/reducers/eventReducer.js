import * as types from "../constants/eventConstant";

const initialState = {
  eventList: [],
  eventByDate: [],
  eventCreated: {},
  loading: false,
};

const eventReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_EVENTS_REQUEST:
    case types.GET_EVENTS_BYDATE_REQUEST:
    case types.ADD_EVENT_REQUEST:
    case types.EDIT_EVENT_REQUEST:
      return { ...state, loading: true };

    case types.GET_EVENTS_SUCCESS:
      return { ...state, eventList: payload, loading: false };

    case types.GET_EVENTS_BYDATE_SUCCESS:
      return { ...state, eventByDate: payload, loading: false };

    case types.ADD_EVENT_SUCCESS:
    case types.ADD_EVENT_SUCCESS:
      return { ...state, eventCreated: payload, loading: false };

    case types.GET_EVENTS_FAILURE:
    case types.GET_EVENTS_BYDATE_FAILURE:
    case types.ADD_EVENT_FAILURE:
    case types.EDIT_EVENT_FAILURE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};

export default eventReducer;
