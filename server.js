// //dependencies
// require("dotenv").config();
// // const reqDir = require("require-dir");
// // const api = reqDir("./backend/API", { recurse: true });
// const { ApolloServer } = require("apollo-server-express");
// const express = require("express");
// const cors = require("cors");

// //requirements
// const { typeDefs } = require("./backend/API/typeDefs");
// const { resolvers } = require("./backend/API/resolvers");

// //mongo config and connection
// const mongoose = require("mongoose");

// const db = process.env.MONGO_DB;

// //starting server
// const starServer = async () => {
//   const server = new ApolloServer({
//     typeDefs,
//     //mocks: true,
//     resolvers,
//     context: ({ req }) => {
//       ({ req });
//     },
//   });

//   const app = express();

//   await mongoose
//     .connect(db, { useNewUrlParser: true })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.log(err));

//   await server.start();

//   server.applyMiddleware({ app, path: "/graphql" });

//   const port = process.env.PORT;

//   app.listen(port, () => {
//     console.log(
//       `Catbook backend listening at http://localhost:${port}${server.graphqlPath}`
//     );
//   });
// };

// starServer();

require("dotenv").config();
const { ApolloServer } = require("apollo-server");

const gql = require("graphql-tag");
const mongoose = require("mongoose");

const { typeDefs } = require("./backend/API/typeDefs");
const { resolvers } = require("./backend/API/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // accés req body(post) dans notre context
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen(process.env.PORT || 5000);
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
