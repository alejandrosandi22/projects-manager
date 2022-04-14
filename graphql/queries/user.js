import { gql } from '@apollo/client';

export const SIGN_IN_QUERY = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      value
    }
  }
`;


export const SIGN_UP_QUERY = gql`
  mutation createUser($fullName: String!, $email: String!, $password: String!) {
    createUser(fullName: $fullName, email: $email, password: $password) {
      value
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      fullName
      email
      image
    }
  }
`;