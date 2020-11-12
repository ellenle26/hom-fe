import * as types from "../constants/ratingConstant";

const initialState = {
  ratingList: [],
  rating: null,
  loading: false,
};

const ratingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_RATINGS_REQUEST:
    case types.CREATE_RATING_REQUEST:
      return { ...state, loading: true };

    case types.GET_RATINGS_SUCCESS:
      return { ...state, ratingList: payload, loading: false };

    case types.CREATE_RATING_SUCCESS:
      return { ...state, rating: payload, loading: false };

    case types.GET_RATINGS_FAILURE:
    case types.CREATE_RATING_FAILURE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};

export default ratingReducer;
