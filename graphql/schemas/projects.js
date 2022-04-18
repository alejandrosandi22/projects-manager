import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar Json

  type Project {
    name: String
    description: String
    customField1: Json
    customField2: Json
    customField3: Json
    customField4: Json
    customField5: Json
    completed: Boolean
    createdAt: Json
    updatedAt: Json
    userId: String
    _id: ID!
  }

  type Query {
    singleProject(_id: ID!): Project
    getAllProjects(completed: Boolean): [Project]
  }

  type Mutation {
    createProject(
      name: String!
      description: String!
      customField1: Json
      customField2: Json
      customField3: Json
      customField4: Json
      customField5: Json
      userId: String
      completed: Boolean!
    ): Project
    editProject(
      name: String
      description: String
      customField1: Json
      customField2: Json
      customField3: Json
      customField4: Json
      customField5: Json
      completed: Boolean
    ): Project
    deleteProject(
      _id: ID!
    ): String
  }
`;
