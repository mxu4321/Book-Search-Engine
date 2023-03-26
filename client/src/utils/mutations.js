// ✅ LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
// ✅ ADD_USER will execute the addUser mutation.
// ✅ SAVE_BOOK will execute the saveBook mutation.
// ✅ REMOVE_BOOK will execute the removeBook mutation.

import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: bookInput!) {
    saveBook(bookData: $bookData) {
      # ---- ⏰ TODO: Check if '_id' needed? ⤵️ --------
      _id
      username
      email
      savedBooks {
        # ---- ⏰ TODO: Check if 'bookId' needed? ⤵️ --------
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  # ---- ⏰ TODO: Check bookId: 'string!'? ⤵️ --------
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      # ---- ⏰ TODO: Check if '_id' needed? ⤵️ --------
      _id
      username
      email
      savedBooks {
        # ---- ⏰ TODO: Check if 'bookId' needed? ⤵️ --------
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
