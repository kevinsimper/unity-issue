import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import bodyParser from "body-parser";
import { signUpRoute } from "./routes/user";

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

app.use(bodyParser.json());

server.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.send("Unity Issue");
});

app.post("/signup", signUpRoute);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log("Listening on localhost:" + PORT));
