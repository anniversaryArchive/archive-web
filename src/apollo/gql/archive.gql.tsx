import { gql } from "@apollo/client";

const CREATE_ARCHIVE = gql`
mutation ($input: createArchiveInput!) {
  archive: createArchive (input: $input) {
    _id
    lat
    lng
    archiveName
    themeName
    organizer
    address
    startDate
    endDate
    phoneNumber
    link
  }
}
`;

export { CREATE_ARCHIVE };
