import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";

const GROUP_USER = gql`
query {
    groups {
      _id
      name
      debutDate
      logo{
        name
        filename
        _id
      }
    }
  }
`;

export type Logo = {
  filename: string;
  name: string;
  __typename: string;
  _id: string;
};

export type Groups = {
  _id: string;
  name: string;
  logo: Logo;
};

function selectGroupList () {
  const {data} = useQuery(GROUP_USER);
  const imgURL = "https://anniversary-archive.herokuapp.com/image/";
  console.log(data);

  if(data){
    const nameList: JSX.Element[] = data.groups.map((group:Groups, index:number) => // {group.logo.filename}
      <Grid key={index} item xs={6} sm={2}>
        <Link to="/searchCafe" state={{ id: `${group._id}`, name: `${group.name}` }}>
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
            src={`${imgURL}` + `${group.logo._id}`}
          />
        </Link>
      </Grid>
    );

    return (
      <>{nameList}</>
    );
  }
}

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
      {selectGroupList()}
    </Grid>    
    </>
  );
};

export default SelectGroup;