import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Issue {
    id: Int
    summary: String
    description: String
    priority: Int
    status: Int
    assigned: Int
  }
  type Query {
    hello: String
    issues: [Issue]
  }
  input CreateIssueInput {
    summary: String
    description: String
    priority: Int
    status: Int
    assigned: Int
  }
  input UpdateIssueInput {
    id: Int!
    summary: String
    description: String
    priority: Int
    status: Int
    assigned: Int
  }
  type Mutation {
    createIssue(input: CreateIssueInput!): Issue
    updateIssue(input: UpdateIssueInput!): Issue
  }
`;
