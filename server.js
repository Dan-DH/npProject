//dependencies
require("dotenv").config();
// const reqDir = require("require-dir");
// const api = reqDir("./backend/API", { recurse: true });
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");

//requirements
const { typeDefs } = require("./backend/API/typeDefs");
const { resolvers } = require("./backend/API/resolvers");

//mongo config and connection
const mongoose = require("mongoose");

const db = process.env.MONGO_DB;

//starting server
const starServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    //mocks: true,
    resolvers,
    context: ({ req, res }) => {
      ({ req, res });
    },
  });

  const app = express();

  await mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(
      `Catbook backend listening at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

starServer();
