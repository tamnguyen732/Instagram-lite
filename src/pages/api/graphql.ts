import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import Cors from 'micro-cors';

// types
import { Context } from '~/server/types/Context';
import { LoginResolver } from '~/server/resolvers/auth/login';
import { AppDataSource, connectPostgreDb } from '~/server/connectPostgreDb';
import connectMongoDb from '~/server/connectMongoDb';

const cors = Cors({
  origin: 'http://localhost:3000/',
  allowCredentials: true,
});

connectPostgreDb();
connectMongoDb();
const server = new ApolloServer({
  schema: await buildSchema({
    resolvers: [LoginResolver],
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
