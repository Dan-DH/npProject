const { gql } = require("apollo-server");
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
    profile_pic: String #or obj? or image?
    bio: String
    moderator: Boolean!
    supporter: Boolean!
    ban_status: Int!
    ban_timer: Int!
    #myEvents: [Event]!
    attendingEvents: [String]!
    token: String
  }

  type Event {
    id: ID!
    ev_organizer: String!
    ev_name: String!
    ev_type: String!
    ev_language: String
    ev_online: String!
    ev_creation_date: Date #make compulsory
    ev_start_date: Date
    ev_end_date: Date
    ev_location: String!
    ev_description: String
    ev_max_participants: Int
    ev_participants: [String]!
    ev_waiting_list: [String]!
  }

  type Query {
    getEvents: [Event]

    getUsers: [User]

    getEvent(id: ID!): Event

    getUser(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User

    createEvent(
      ev_organizer: String!
      ev_name: String!
      ev_type: String!
      ev_language: String
      ev_online: String!
      # ev_creation_date: Date!
      ev_start_date: Date!
      ev_end_date: Date!
      ev_location: String!
      ev_description: String
      ev_participants: [String]
      ev_max_participants: Int!
    ): Event

    login(username: String!, password: String!): User

    passRecovery(email: String!): User

    passwordReset(id: ID!, token: String!, password: String!): String!

    #TODO: send emails to event participants
    deleteEvent(id: ID!): String!

    deleteUser(id: ID!): String!

    #TODO: add logic. If max attendants, add 'Event full' to # participants and change button to 'Join waitlist'
    attend(userId: ID!, eventId: ID!): String!

    #TODO: this action triggers:
    # -first person (fp) in the waiting list gets added to the event
    # -fp is removed from waiting list
    # -fp receives an email informing them that they are now part of the event
    #String!
    unattend(userId: ID!, eventId: ID!): String!

    changeInfoUser(
      userId: ID!
      username: String!
      email: String!
      password: String!
      profile_pic: String!
    ): User

    changeBioUser(userId: ID!, bio: String!): User

    #TODO: send emails to all participants
    #TODO: add dates to this resolver
    #TODO: add logic for max participants (can't reduce max number below number of current participants)
    #TODO: add logic for date (can't set event in the past)
    changeInfoEvent(
      eventId: ID!
      ev_name: String!
      ev_type: String!
      ev_language: String
      ev_online: String!
      ev_location: String!
      ev_description: String
      ev_participants: [String]!
      ev_max_participants: Int
    ): Event
  }
`;

module.exports = { typeDefs };
