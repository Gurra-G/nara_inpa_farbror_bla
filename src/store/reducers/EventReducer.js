import * as Types from "../actions/Types";

const INIT_STATE = {
  data: [],
  loading: false,
  error: false,
};

const EventReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.TRY_TO_FETCH_BROTTSPLATS_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case Types.SUCCEEDED_TO_FETCH_BROTTSPLATS_EVENTS:
      return {
        ...state,
        data: payload,
      };
    case Types.FAILED_TO_FETCH_BROTTSPLATS_EVENTS:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};

export default EventReducer;
