import * as Types from "./Types";

export const fetchEvents = (counter) => {
  return (dispatch, getState) => {
    const oldEvents = getState().eventState.data;
    dispatch({ type: Types.TRY_TO_FETCH_BROTTSPLATS_EVENTS });
    fetch(
      `https://brottsplatskartan.se/api/events?area=skåne län&limit=20&page=${counter}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        dispatch({
          type: Types.SUCCEEDED_TO_FETCH_BROTTSPLATS_EVENTS,
          payload: oldEvents.concat(data.data),
        });
      })
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

export const deleteDbEvent = (firestore, id, uid) => {
  return (dispatch) => {
    dispatch({ type: Types.TRY_TO_DELETE_DB_EVENT });
    firestore
      .collection("users")
      .doc(uid)
      .collection("events")
      .doc(id.toString())
      .delete()
      .then(() => dispatch({ type: Types.SUCCEEDED_TO_DELETE_DB_EVENT }))
      .catch(() => dispatch({ type: Types.FAILED_TO_DELETE_DB_EVENT }));
  };
};

export const saveEventToDb = (firestore, event, uid) => {
  const finalEvent = {
    lat: event.lat,
    lng: event.lng,
    date_human: event.date_human,
    description: event.description,
    image: event.image,
    title_type: event.title_type,
    content_teaser: event.content_teaser,
    id: event.id,
    content_formatted: event.content_formatted,
    user: uid,
  };
  return (dispatch) => {
    try {
      dispatch({ type: Types.TRY_TO_SAVE_DB_EVENT });
      firestore
        .collection("users")
        .doc(uid)
        .collection("events")
        .doc(event.id.toString())
        .set(finalEvent)
        .then(() => {
          dispatch({ type: Types.SUCCEEDED_TO_SAVE_DB_EVENT });
          dispatch({
            type: Types.OPEN_CUSTOMSNACKBAR,
            payload: { text: "Händelsen har sparats.", color: "success" },
          });
        })
        .catch((error) => {
          dispatch({ type: Types.FAILED_TO_SAVE_DB_EVENT });
          dispatch({
            type: Types.OPEN_CUSTOMSNACKBAR,
            payload: {
              text: "Du måste vara inloggad för att spara en händelse.",
              color: "error",
            },
          });
        });
    } catch {
      dispatch({
        type: Types.OPEN_CUSTOMSNACKBAR,
        payload: {
          text: "Du måste vara inloggad för att spara en händelse.",
          color: "error",
        },
      });
    }
  };
};
