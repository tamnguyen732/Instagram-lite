import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import Image from '~/components/Image';
import { useRef, useState } from 'react';

import EmojiIcon from '~/components/Icon/EmojiIcon';

const cx = bindClass(styles);

const CreatePostContent = () => {
  const inputRef = useRef<any | null>(null);
  const [value, setValue] = useState<string>('');

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <div className={cx('wrapper')}>
          <Image
            className={cx('avatar')}
            src={
              'https://cdn-ajggd.nitrocdn.com/kMoOFpDlsOVtlYJLrnSRNCQXaUFHZPTY/assets/static/optimized/rev-9b0736f/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg#'
            }
            alt='profile'
            objectFit='cover'
            rounded
          />
          <span className={cx('name')}> Tam Nguyen </span>
        </div>
        <EmojiIcon value={value} setValue={setValue} inputRef={inputRef} />
        <textarea
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
          value={value}
          className={cx('text-area')}
        ></textarea>
      </div>
    </div>
  );
};

export default CreatePostContent;
