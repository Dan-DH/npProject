require("dotenv").config();
const { ApolloServer } = require("apollo-server");

const gql = require("graphql-tag");
const mongoose = require("mongoose");

const { typeDefs } = require("./backend/API/typeDefs");
const { resolvers } = require("./backend/API/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
  })
  .catch((err) => {
    console.error(err);
  });
