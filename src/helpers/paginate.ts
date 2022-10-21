import { Post } from '~/server/entities';
export interface Props {
  limitPerPage: number;
  page: number;
  userId?: number;
}
type ReturnProps = {
  totalCount: number;
  lastPage: number;
  posts: Post[];
};
export const paginate = async ({ limitPerPage, page, userId }: Props): Promise<ReturnProps> => {
  let totalCount;
  if (userId) {
    totalCount = await Post.count({ where: { userId } });
  } else {
    totalCount = await Post.count();
  }

  const lastPage = Math.ceil(totalCount / limitPerPage);

  if (page > lastPage) {
    throw new Error('This Page Not Found');
  }

  let query = Post.createQueryBuilder('post')
    .orderBy('post.createdAt', 'DESC')
    .take(limitPerPage)
    .skip((page - 1) * limitPerPage);
  if (userId) {
    query = query.where('post.userId =:userId', { userId: userId });
  }

  const posts: Post[] = await query.getMany();
  return { totalCount, lastPage, posts };
};
