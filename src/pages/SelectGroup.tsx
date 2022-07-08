import React from "react";
import SelectGroupList from "../components/selectGroupList";
import { Grid, } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";

const SelectGroup = () => {
  return (
    <>
    <CardContent sx={{ flexGrow: 1, padding: '3% 0 0 5%' }}>
      <Typography gutterBottom variant="h5" component="h2" color="#fff">
        그룹 선택
      </Typography>
      <Typography color="#fff">
        원하는 그룹을 선택하세요.
      </Typography>
    </CardContent>

    <Grid container spacing={1} sx={{ padding: '2% 5%' }}>
      <SelectGroupList />
    </Grid>    
    </>
  );
};

export default SelectGroup;