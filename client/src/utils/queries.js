// ✅ This will hold the query GET_ME, which will execute the me query set up using Apollo Server.

import { gql } from "@apollo/client";

export const GET_ME = gql`
# ----- ⏰TODO: check if 'query: me' is needed ------
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;
