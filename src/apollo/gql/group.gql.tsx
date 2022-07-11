import { gql } from "@apollo/client";

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

export default GROUP_USER;