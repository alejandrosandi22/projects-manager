import { gql } from '@apollo/client';

export const SIGN_IN_QUERY = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      value
    }
  }
`;

export const SIGN_UP_QUERY = gql`
  mutation createUser($ name: String!, $email: String!, $password: String!) {
    createUser( name: $ name, email: $email, password: $password) {
      value
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      name
      email
      image
      _id
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($email: String!) {
    deleteUser(email: $email) {
      name
      email
      image
    }
  }
`;
