import { useEffect, useState } from 'react';
import { MODAL_TYPES } from '~/constants/modal';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import CreatePostContent from './components/CreatePostContent';
import CreatePostImage from './components/CreatePostImage';
import { ModalType, useModalContext } from '~/contexts/ModalContext';
import { useCreatePostMutation } from '~/types/generated';
import { useAuthSelector } from '~/redux/selector';
import { toast } from 'react-toastify';
const cx = bindClass(styles);

const PostModal = () => {
  const { input, hideModal } = useModalContext();
  const [createPost, { data, loading }] = useCreatePostMutation();
  const { currentUser } = useAuthSelector();
  console.log(data);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [locationValue, setLocationValue] = useState<string>('');
  const handlePost = async () => {
    setIsExpand(true);
    if (!imageBase64 || !caption) return;
    try {
      const response = await createPost({
        variables: {
          CreatePostInput: {
            caption,
            imageBase64,
            location: locationValue,
            userId: +currentUser!.id
          }
        }
      });

      if (response.data?.createPost.success) {
        hideModal(MODAL_TYPES.POST_CREATOR as ModalType);

        toast.success('You created a post successfully');
      }
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error('Something went wrong!');
      }
    }
  };

  return (
    <div key={MODAL_TYPES.POST_CREATOR} className={cx('container', isExpand ? 'active' : '')}>
      <span className={cx('title')}>Create a new post</span>
      {input.upload && (
        <span onClick={handlePost} className={cx('next')}>
          {isExpand ? 'Share' : 'Next'}
        </span>
      )}
      <CreatePostImage
        isExpand={isExpand}
        imageBase64={imageBase64}
        setImageBase64={setImageBase64}
      />
      {isExpand && (
        <CreatePostContent
          caption={caption}
          setCaption={setCaption}
          setLocationValue={setLocationValue}
          locationValue={locationValue}
        />
      )}
    </div>
  );
};
export default PostModal;
