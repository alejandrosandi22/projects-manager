import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    fullName: String!
    email: String!
    password: String!
    image: String
    _id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    createUser(
      fullName: String!
      email: String!
      password: String!
      image: String
    ): Token
    signIn(
      email: String!
      password: String!
    ): Token
  }
`;
