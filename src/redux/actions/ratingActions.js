import * as types from "../constants/ratingConstant";
import api from "../api";

const ratingActions = {};

ratingActions.getRatings = () => async (dispatch) => {
  dispatch({ type: types.GET_RATINGS_REQUEST, payload: null });
  try {
    const res = await api.get("/ratings");
    dispatch({ type: types.GET_RATINGS_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.GET_RATINGS_FAILURE, payload: err.message });
  }
};

ratingActions.addRating = (roomId, rating, review) => async (dispatch) => {
  dispatch({ type: types.CREATE_RATING_REQUEST, payload: null });
  try {
    const res = await api.post("/ratings", { roomId, rating, review });
    dispatch({ type: types.CREATE_RATING_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.CREATE_RATING_FAILURE, payload: err.message });
  }
};

export default ratingActions;
