import { gql } from '@apollo/client';

export const SINGLE_PROJECT_QUERY = gql`
  query singleProject($id: ID!, $userId: String) {
    singleProject(_id: $id, userId: $userId) {
      name
      description
      customField1
      customField2
      customField3
      customField4
      customField5
      completed
      createdAt
      updatedAt
      _id
    }
  }
`;

export const ALL_PROJECTS_QUERY = gql`
  query getAllProjects($completed: Boolean, $userId: String) {
    getAllProjects(completed: $completed, userId: $userId) {
      name
      description
      customField1
      customField2
      customField3
      customField4
      customField5
      userId,
      completed
      createdAt
      updatedAt
      _id
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($name: String!,
  $description: String!,
  $customField1: Json,
  $customField2: Json,
  $customField3: Json,
  $customField4: Json,
  $customField5: Json,
  $userId: String,
  $completed: Boolean!) {
    createProject(name: $name,
    description: $description,
    customField1: $customField1,
    customField2: $customField2,
    customField3: $customField3,
    customField4: $customField4,
    customField5: $customField5,
    userId: $userId,
    completed: $completed) {
      name
      description
      customField1
      customField2
      customField3
      customField4
      customField5
      userId
      completed
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(_id: $id) {
      name
    }
  }
`;
