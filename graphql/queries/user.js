import { gql } from '@apollo/client';

export const SIGN_IN_QUERY = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      value
    }
  }
`;
