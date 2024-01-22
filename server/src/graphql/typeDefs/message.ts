// schema.js
import gql from "graphql-tag";

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
    sender: String!
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    sendMessage(content: String!, sender: String!): Message
  }

  type Subscription {
    messageAdded: Message
  }
`;

export default typeDefs;
