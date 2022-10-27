import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import Cors from 'micro-cors';
// types
import { MyContext } from '~/server/types/MyContext';
import connectPostgreDb from '~/server/connectPostgreDb';
import connectMongoDb from '~/server/connectMongoDb';
import AuthResolver from '~/server/resolvers/auth';
import PostResolver from '~/server/resolvers/post';
import CommentResolver from '~/server/resolvers/comment';
const cors = Cors({
  origin: 'http://localhost:3000/',
  allowCredentials: true
});

connectPostgreDb();
connectMongoDb();
const server = new ApolloServer({
  schema: await buildSchema({
    resolvers: [AuthResolver, PostResolver, CommentResolver]
  }),
  context: ({ req, res }): MyContext => ({ req, res }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
});

const startServer = server.start();

export default cors(async (req: any, res: any) => {
  await startServer;

  await server.createHandler({ path: '/api/graphql' })(req, res);
});

export const config = {
  api: {
    bodyParser: false
  }
};
