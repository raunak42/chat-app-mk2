import { ApolloServer, ApolloServerOptionsWithSchema } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express from "express";
import http, { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import mongoose from "mongoose";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

async function main() {
  //   dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscriptions",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    context: () => ({ pubsub }),
  } as ApolloServerOptionsWithSchema<any>);

  await server.start();

  const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  };

  mongoose.connect(
    "mongodb+srv://raunaklanjewar42:OruPoBWyclykpMqr@cluster0.1jdjqpo.mongodb.net/",
    { dbName: "Book" }
  );

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    express.json(),
    // express.urlencoded({ extended: true }),
    // express.raw({ type: "application/graphql" }),
    // express.raw({ type: "application/json" }),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

main();
