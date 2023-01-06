import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { PostFragment, useGetAllPostsLazyQuery } from '~/types/generated';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import Loading from '~/components/Loading';

const cx = bindClass(styles);

const PAGE = 1;
const LIMIT_POST = 4;

const Feed = () => {
  const [fetchAllPosts, { data, loading }] = useGetAllPostsLazyQuery();
  const [posts, setPosts] = useState<PostFragment[]>([]);
  const [page, setPage] = useState<number>(PAGE);
  const hasMore = data?.getAllPosts.hasMore;
  const { observerRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '5px'
  });
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetchAllPosts({ variables: { page, limitPerPage: LIMIT_POST } });
      if (response.data?.getAllPosts.success) {
        const newPosts = response.data?.getAllPosts.paginatedPosts;
        if (newPosts?.length) {
          setPosts((prev) => {
            return [...new Set([...prev, ...newPosts])];
          });
        }
      }
    };
    fetchPost();
  }, [page]);

  useEffect(() => {
    if (isIntersecting && hasMore) {
      setPage((page) => page + 1);
    }
  }, [isIntersecting, hasMore]);
  return (
    <>
      {posts.length ? (
        <div>
          {posts.map((post) => {
            return (
              <div className={cx('container')}>
                <Header photo={post.photo as string} />
                <Footer />
              </div>
            );
          })}
          <div ref={observerRef} />
          {loading && <Loading size='md' className={cx('loading1')} />}
        </div>
      ) : (
        <Loading size='md' className={cx('loading2')} />
      )}
    </>
  );
};

export default Feed;
