import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import bodyParser from "body-parser";
import { signUpRoute, loginRoute } from "./routes/user";
import { Context } from "./context";
import cors from "cors";

const server = new ApolloServer({ typeDefs, resolvers, context: Context });

const app = express();

app.use(cors());
app.use(bodyParser.json());

server.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.send("Unity Issue");
});

app.post("/signup", signUpRoute);
app.post("/login", loginRoute);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log("Listening on localhost:" + PORT));
