import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    image: String
    provider: String
  }
  type Token {
    value: String!
  }

  type Query {
    currentUser: User
    allUsers: User
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      image: String
    ): Token
    socialSignIn(
      name: String!
      email: String!
      image: String
      provider: String
    ): Token
    signIn(
      email: String!
      password: String!
    ): Token
    deleteUser(
      email: String!
    ): User
  }
`;
