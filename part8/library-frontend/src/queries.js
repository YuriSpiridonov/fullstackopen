import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

// query Query {
//   allAuthors {
//     name
//     bookCount
//     born
//     id
//   }
// }
