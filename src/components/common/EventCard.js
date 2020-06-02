import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { saveEventToDb, deleteDbEvent } from "../../store/actions/EventActions";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    height: 70,
    width: 70,
  },
}));

//used for calculating the distance between the users positon and the selected event in KM with latitude and longitude
const distance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    dist = Math.round(dist * 10) / 10;
    return dist;
  }
};

//Sets the color for the avatar based on distance
const setColor = (distance) => {
  let color;

  switch (true) {
    case distance <= 2:
      color = { backgroundColor: "crimson" };
      break;
    case distance > 2 && distance < 20:
      color = { backgroundColor: "gold", color: "black" };
      break;
    default:
      color = { backgroundColor: "seagreen" };
      break;
  }
  return color;
};

const EventCard = (props) => {
  //used for checking the authState data (error text and loading text)
  const auth = useSelector((state) => state.firebase.auth);

  //used for checking wether the users wants to check all events or their own
  const filter = useSelector((state) => state.filterState.filter);

  //used for storing data in the firebase database
  const firestore = useFirestore();

  //gets the event data and mypostion data passed down as props
  const { event, myPosition } = props;

  // used for setting components styles
  const classes = useStyles();

  //used for dispatching actions in the component
  const dispatch = useDispatch();

  //Used for binding the dispatch of our addToDb action
  const boundAddToDb = () =>
    dispatch(saveEventToDb(firestore, event, auth.uid));

  //Used for binding the dispatch of our DeleteEvent action
  const boundDeleteEvent = (id) =>
    dispatch(deleteDbEvent(firestore, id, auth.uid));

  //Toggles between content_teaser and full content on event cards
  const [expanded, setExpanded] = useState(false);

  //Toggles the "expanded" state
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            style={setColor(
              distance(
                event.lat,
                event.lng,
                myPosition.latitude,
                myPosition.longitude
              )
            )}
          >
            {`${distance(
              event.lat,
              event.lng,
              myPosition.latitude,
              myPosition.longitude
            )}km`}
          </Avatar>
        }
        title={`${event.title_type} - ${event.description}`}
        subheader={event.date_human}
      />
      <Link to={`/events/${event.id}`}>
        <CardMedia className={classes.media} image={event.image} title="" />
      </Link>
      <CardContent>
        {!expanded ? (
          <Typography variant="body2" color="textSecondary" component="p">
            {event.content_teaser}
          </Typography>
        ) : null}
      </CardContent>

      <CardActions disableSpacing>
        {!filter ? (
          <IconButton
            onClick={() => boundAddToDb()}
            aria-label="add to favorites"
            color="primary"
          >
            <AddCircleIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => boundDeleteEvent(event.id)}
            aria-label="delete"
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: event.content }} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default EventCard;
