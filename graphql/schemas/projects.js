import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar Json

  type Project {
    name: String
    description: String
    customField1: Json
    customField2: String
    customField3: String
    customField4: String
    customField5: String
    completed: Boolean
    _id: ID!
  }

  type Query {
    singleProject(_id: ID!): Project
    allProjects(completed: Boolean): [Project]
  }

  type Mutation {
    createProject(
      name: String!
      description: String!
      customField1: Json
      customField2: String
      customField3: String
      customField4: String
      customField5: String
      completed: Boolean!
    ): Project
    editProject(
      name: String
      description: String
      customField1: String
      customField2: String
      customField3: String
      customField4: String
      customField5: String
      completed: Boolean
    ): Project
    deleteProject(
      id: ID!
    ): String
  }
`;
