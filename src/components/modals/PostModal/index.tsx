import { useState } from 'react';
import { MODAL_TYPES } from '~/constants/modal';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import CreatePostContent from './components/CreatePostContent';
import Image from '~/components/Image';
const cx = bindClass(styles);

const PostModal = () => {
  const [isExpand, setIsExpand] = useState<boolean>(false);

  return (
    <div key={MODAL_TYPES.POST_CREATOR} className={cx('container', isExpand ? 'active' : '')}>
      <span className={cx('title')}>Create a new post</span>
      <span onClick={() => setIsExpand(true)} className={cx('next')}>
        {isExpand ? 'Share' : 'Next'}
      </span>
      <div className={cx('wrapper', isExpand ? 'active' : '')}>
        {/* <div className={cx('content-wrapper')}>
          <div className={cx('icon-wrapper')}>
            <CiImageOn className={cx('icon1')} />
            <CiYoutube className={cx('icon2')} />
          </div>
          <span className={cx('text')}> Drag your photos or video in here</span>
          <Button className={cx('button')} primary size='sm'>
            Choose from latop
          </Button>
        </div> */}
        <div className={cx('image-wrapper')}>
          <Image
            className={cx('image', isExpand ? 'active' : '')}
            src={
              'https://cdn-ajggd.nitrocdn.com/kMoOFpDlsOVtlYJLrnSRNCQXaUFHZPTY/assets/static/optimized/rev-9b0736f/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg#'
            }
            alt='image-upload'
          />
        </div>
      </div>

      {isExpand && <CreatePostContent />}
    </div>
  );
};
export default PostModal;
