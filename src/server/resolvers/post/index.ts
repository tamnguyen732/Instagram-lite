import { Resolver } from 'type-graphql';
import combineResolvers from '~/helpers/combineResolvers';
import createPost from './createPost';
import deletePost from './deletePost';
import getPosts from './getPosts';
import getSinglePost from './getSinglePost';
import reactToPost from './reactToPost';
import updatedPost from './updatePost';
import uploadPostImage from './uploadPostImage';

@Resolver()
export default class PostResolver extends combineResolvers(
  createPost,
  getPosts,
  getSinglePost,
  updatedPost,
  deletePost,
  reactToPost,
  uploadPostImage
) {}
