import { Resolver } from 'type-graphql';
import combineResolvers from '~/helpers/combineResolvers';
import createMessage from './createMessage';
@Resolver()
export default class MessageResolver extends combineResolvers(createMessage) {}
