// schema.js
import gql from "graphql-tag";

const typeDefs = gql`
  type Message {
    sender: String!
    content: String!
  }

  type Mutation {
    sendMessage(sender: String, content: String!): Boolean
  }

  type Subscription {
    chatMessage: Message
  }
`;

export default typeDefs;
