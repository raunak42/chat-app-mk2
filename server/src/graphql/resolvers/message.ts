import { PubSub } from 'graphql-subscriptions';

interface Message {
  id: number;
  content: string;
  sender: string;
}

const messages: Message[] = [];
let messageCounter = 1;

const pubsub = new PubSub();

const resolvers = {
  Query: {
    messages: (): Message[] => messages,
  },
  Mutation: {
    sendMessage: (_: any, { content, sender }: { content: string, sender: string }): Message => {
      const newMessage: Message = {
        id: messageCounter++,
        content,
        sender,
      };

      messages.push(newMessage);

      // Publish the new message to subscribers
      pubsub.publish('MESSAGE_ADDED', { messageAdded: newMessage });

      return newMessage;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_ADDED'),
    },
  },
};

export default resolvers;
