type Logo = {
  filename: string;
  name: string;
  __typename: string;
  _id: string;
};

type Groups = {
  _id: string;
  name: string;
  logo: Logo;
};
  
export type { Groups, Logo };