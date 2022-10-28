import { Resolver } from 'type-graphql';
import combineResolvers from '~/helpers/combineResolvers';
import createConversation from './createConversation';
import deleteConversation from './deleteConversation';
import getConversationById from './getConversationById';
import getConversations from './getConversations';
@Resolver()
export default class ConversationResolver extends combineResolvers(
  createConversation,
  deleteConversation,
  getConversationById,
  getConversations
) {}
