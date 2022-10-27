import { Resolver } from 'type-graphql';
import combineResolvers from '~/helpers/combineResolvers';
import createComment from './createComment';
import deleteComment from './deleteComment';
import reactToComment from './reactToComment';
import updateComment from './updateComment';

@Resolver()
export default class CommentResolver extends combineResolvers(
  createComment,
  deleteComment,
  reactToComment,
  updateComment
) {}
