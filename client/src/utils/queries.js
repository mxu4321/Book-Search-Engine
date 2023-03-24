import { gql } from '@apollo/client';

// queries.js: This will hold the query GET_ME, 
// which will execute the me query set up using Apollo Server.




// User type:
// _id
// username
// email
// bookCount
// savedBooks (This will be an array of the Book type.)
// -----------------------------------
// Book type:
// bookId (Not the _id, but the book's id value returned from Google's Book API.)
// authors (An array of strings, as there may be more than one author.)
// description
// title
// image
// link
// -----------------------------------
// Auth type:
// token
// user (References the User type.)