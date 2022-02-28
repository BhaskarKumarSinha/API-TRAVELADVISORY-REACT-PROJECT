import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect, createRef } from "react";
import useStyles from "./List.js";
import PlaceDetail from "../PlaceDetail/PlaceDetail.jsx";

const List = ({
  places,
  childClicked,
  isLoding,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classes = useStyles();

  const [elrefs, setelRefs] = useState([]);
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elrefs[i] || createRef());
    setelRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants,Hotels & Attraction around you
      </Typography>
      {isLoding ? (
        <div className={classes.loading}>
          {" "}
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((places, i) => (
              <Grid item key={i} xs={12} ref={elrefs[i]}>
                <PlaceDetail
                  place={places}
                  selected={Number(childClicked === i)}
                  refProps={elrefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
