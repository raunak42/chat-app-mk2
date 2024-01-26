// resolvers.ts

import { PubSub } from "graphql-subscriptions";

interface ChatMessage {
  sender: string;
  content: string;
}

const messages: ChatMessage[] = [];
const pubsub = new PubSub();

const resolvers = {
  Query: {
    // Any additional queries
  },
  Mutation: {
    sendMessage: (_: any, { sender, content }: ChatMessage) => {
      const message = { sender, content };
      messages.push(message);
      pubsub.publish("CHAT_MESSAGE", { chatMessage: message });
      return true;
    },
  },
  Subscription: {
    chatMessage: {
      subscribe: () => pubsub.asyncIterator("CHAT_MESSAGE"),
    },
  },
};

export default resolvers;
