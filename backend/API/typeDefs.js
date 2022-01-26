const { gql } = require("apollo-server-express");
//const { GraphQLScalarType, Kind } = require("graphql");
const Event = require("../models/Event");

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    acc_date: Date!
    profile_pic: String
    bio: String
    moderator: Boolean!
    supporter: Boolean!
    ban_status: Int!
    ban_timer: Int!
    events: [Event]!
  }

  type Event {
    id: ID!
    ev_organizer: String!
    ev_name: String!
    ev_type: String!
    ev_language: String
    ev_online: Boolean!
    ev_creation_date: Date #make compulsory
    ev_start_date: Date
    ev_end_date: Date
    ev_location: String!
    ev_description: String
    ev_max_participants: Int
    ev_participants: [String]!
  }

  type Query {
    getEvents: [Event]
    getUsers: [User]
    getEvent(id: String): Event
    getUser(id: String): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User

    createEvent(
      ev_organizer: String!
      ev_name: String!
      # ev_creation_date: Date!
      # ev_start_date: Date!
      # ev_end_date: Date!
      ev_location: String!
      ev_description: String
      ev_participants: [String]!
      ev_max_participants: Int
    ): Event
  }
`;

module.exports = { typeDefs };
