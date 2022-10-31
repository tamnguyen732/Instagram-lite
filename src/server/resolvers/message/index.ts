import { Resolver } from 'type-graphql';
import combineResolvers from '~/helpers/combineResolvers';
import createMessage from './createMessage';
import getMessages from './getMessages';
import lastMessage from './lastMessage';
import seenMessage from './seenMessage';
@Resolver()
export default class MessageResolver extends combineResolvers(
  createMessage,
  getMessages,
  lastMessage,
  seenMessage
) {}
