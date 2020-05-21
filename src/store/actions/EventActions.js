import * as Types from "./Types";

export const fetchEvents = () => {
  return (dispatch) => {
    dispatch({ type: Types.TRY_TO_FETCH_BROTTSPLATS_EVENTS });
    fetch("https://brottsplatskartan.se/api/events?area=skåne län")
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        dispatch({
          type: Types.SUCCEEDED_TO_FETCH_BROTTSPLATS_EVENTS,
          payload: data.data,
        })
      )
      .catch((error) => {
        dispatch({
          type: Types.FAILED_TO_FETCH_BROTTSPLATS_EVENTS,
          payload: error,
        });
      });
  };
};

export const fetchDbEvents = (firestore, useSelector) => {
  return (dispatch) => {
    dispatch({ type: Types.TRY_TO_FETCH_DB_EVENTS });
    firestore(() => [
      {
        collection: "events",
      },
    ]);
    const events = useSelector((state) => state.firestore.ordered.events);
    if (events !== null) {
      dispatch({ type: Types.SUCCEEDED_TO_FETCH_DB_EVENTS, payload: events });
    } else {
      dispatch({ type: Types.FAILED_TO_FETCH_DB_EVENTS });
    }
  };
};
