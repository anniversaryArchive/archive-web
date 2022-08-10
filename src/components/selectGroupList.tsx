import React from "react";
import GROUP_USER from "../apollo/gql/group.gql";
import { Group } from "../types/group"
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Loading from "../pages/Loading";

const SelectGroupList = () => {
  const imgURL = `${process.env.REACT_APP_SERVER_URL}`+"/image/";
  const {data, loading} = useQuery(GROUP_USER);

  if (loading) return <Loading />;

  const groupBoxes : JSX.Element[] = data.groups.map((group:Group) =>
    <Grid key={group._id} item xs={6} sm={2}>
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
      {groupBoxes} 
    </>
  );
};

export default SelectGroupList;