import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { createIssue, getIssues, getIssue } from "./models/issue";

const typeDefs = gql`
  type Issue {
    id: Int
    summary: String
    description: String
    priority: Int
    status: Int
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
  }
  type Mutation {
    createIssue(input: CreateIssueInput!): Issue
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    issues: () => {
      return getIssues();
    }
  },
  Mutation: {
    createIssue: async (parent, args) => {
      const rows = await createIssue(args.input);
      const newIssue = await getIssue(rows[0]);
      return newIssue[0];
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.send("Unity Issue");
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log("Listening on localhost:" + PORT));
