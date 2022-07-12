import React from "react";
import { useLocation } from 'react-router-dom';
import Typography from "@mui/material/Typography";

export default function SearchCafe() {
  const location = useLocation();
  const {id, name} = location.state as { id: string; name: string };

  return (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff'}}>
        <p>id: {id}</p>
        <p>name: {name}</p>
      </Typography>
    </>
  );
}