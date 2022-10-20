import { Resolver } from 'type-graphql';
import combineResolvers from '~/helpers/combineResolvers';
import createPost from './createPost';
import getPosts from './getPosts';

@Resolver()
export default class PostResolver extends combineResolvers(createPost, getPosts) {}
