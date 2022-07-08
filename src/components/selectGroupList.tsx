import React from "react";
import GROUP_USER from "../apollo/gql/selectGroupList.gql";
import { Groups } from "../types/groupList"
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import styled from '@emotion/styled'

const selectGroupList = () => {
  const imgURL = "https://anniversary-archive.herokuapp.com/image/";
  const {data} = useQuery(GROUP_USER);

  if(data){
    const nameList: JSX.Element[] = data.groups.map((group:Groups, index:number) =>
      <Grid key={index} item xs={6} sm={2}>
        <Link to="/searchCafe" state={{ id: group._id, name: group.name }}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: '200px',
              border: '1px solid #fff', 
              borderRadius: '20px',
              backgroundColor: '#222'
            }}
            alt="Group Logo"
            src={`${imgURL}${group.logo._id}`}
          />
        </Link>
      </Grid>
    );
 
    return (
      <>
        {nameList} 
      </>
    );
  }
  
  return (
    <>
    </>
  );
};

export default selectGroupList;