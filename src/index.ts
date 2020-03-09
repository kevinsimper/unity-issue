import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { setupDatabase } from "./db";

setupDatabase();

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
`;

const fakeIssues = [
  {
    id: 1,
    summary: "Small summary",
    description: "A issue description",
    priority: 1,
    status: 0
  }
];

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    issues: () => {
      return fakeIssues;
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
