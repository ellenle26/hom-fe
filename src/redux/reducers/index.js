import { combineReducers } from "redux";
import roomReducer from "./roomReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import bookingReducer from "./bookingReducer";
import eventReducer from "./eventReducer";
import ratingReducer from "./ratingReducer";

export default combineReducers({
  room: roomReducer,
  auth: authReducer,
  user: userReducer,
  booking: bookingReducer,
  event: eventReducer,
  rating: ratingReducer,
});
