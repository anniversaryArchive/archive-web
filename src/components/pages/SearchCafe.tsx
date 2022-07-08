import React from "react";
import { useLocation } from 'react-router-dom';
import Typography from "@mui/material/Typography";

export default function SearchCafe() {
  const location = useLocation();

  const state = location.state as { id: string; name: string };
  const id = state.id;
  const name = state.name;

  console.log(state);

  return (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff'}}>
        <p>id: {id}</p>
        <p>name: {name}</p>
      </Typography>
    </>
  );
}