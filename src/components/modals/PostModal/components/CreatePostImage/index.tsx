import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import Image from '~/components/Image';
import { CiImageOn, CiYoutube } from 'react-icons/ci';
import Button from '~/components/Button';
const cx = bindClass(styles);

interface Props {
  isExpand: boolean;
}

const CreatePostImage = ({ isExpand }: Props) => {
  return (
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
        <div
          className={cx('image', isExpand ? 'active' : '')}
          style={{
            backgroundImage: `url(https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg)`
          }}
        ></div>
      </div>
    </div>
  );
};

export default CreatePostImage;
