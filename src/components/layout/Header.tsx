import React from "react";
import { Link } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <strong>Archive</strong>
        </Typography>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Join</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;