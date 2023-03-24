import { gql } from '@apollo/client';

// queries.js: This will hold the query GET_ME, 
// which will execute the me query set up using Apollo Server.

export const GET_ME = gql`
  query me {}`;