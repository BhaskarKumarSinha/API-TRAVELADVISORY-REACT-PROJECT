import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./Header.js";
const Header = ({ setCoordinates }) => {
  const classes = useStyles();
  const [autoComplete, setAutoComplete] = useState(null);
  const onLoad = (autoCo) => setAutoComplete(autoCo);
  const OnPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>

        <Box display="flex">
          <Typography variant="h5" className={classes.title}>
            Explore New Places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={OnPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
