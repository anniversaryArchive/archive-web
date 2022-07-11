type Logo = {
  filename: string;
  name: string;
  __typename: string;
  _id: string;
};

type Group = {
  _id: string;
  name: string;
  logo: Logo;
};
  
export type { Group, Logo };