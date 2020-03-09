import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!"
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
