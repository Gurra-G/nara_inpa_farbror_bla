import React from "react";
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
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { saveEventToDb } from "../../store/actions/EventActions";

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

const setColor = (distance) => {
  let color;
  console.log(distance);

  switch (true) {
    case distance < 1:
      color = { backgroundColor: "crimson" };
      break;
    case distance > 5 && distance < 20:
      color = { backgroundColor: "gold", color: "black" };
      break;
    default:
      color = { backgroundColor: "seagreen" };
      break;
  }
  return color;
};

const EventCard = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();
  const { event, myPosition } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const boundAddToDb = () =>
    dispatch(saveEventToDb(firestore, event, auth.uid));
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
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${event.title_type} - ${event.description}`}
        subheader={event.date_human}
      />
      <Link to={`/events/${event.id}`}>
        <CardMedia className={classes.media} image={event.image} title="" />
      </Link>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {event.content_teaser}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          onClick={() => boundAddToDb()}
          aria-label="add to favorites"
        >
          <AddCircleIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCard;
