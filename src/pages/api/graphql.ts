import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import Cors from 'micro-cors';
// types
import { Context } from '~/server/types/Context';
import connectPostgreDb from '~/server/connectPostgreDb';
import connectMongoDb from '~/server/connectMongoDb';
import Register from '~/server/resolvers/auth/register';

const cors = Cors({
  origin: 'http://localhost:3000/',
  allowCredentials: true,
});

connectPostgreDb();
connectMongoDb();
const server = new ApolloServer({
  schema: await buildSchema({
    resolvers: [Register],
  }),
  context: ({ req, res }): Context => ({ req, res }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

const startServer = server.start();

export default cors(async (req: any, res: any) => {
  await startServer;

  await server.createHandler({ path: '/api/graphql' })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
