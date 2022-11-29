import { useState } from 'react';
import { MODAL_TYPES } from '~/constants/modal';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { TfiClose } from 'react-icons/tfi';
import FormField from '~/components/FormField';
import IconNotFound from '~/components/Icon/IconNotFound';
import { ModalType, useModalContext } from '~/contexts/ModalContext';
import Profile from '~/components/Profile';
const cx = bindClass(styles);
interface Name {
  name: string;
  src: string;
  subText: string;
}
const username: Name[] = [
  {
    name: 'tamnguyen',
    src: 'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg',
    subText: '2 hours ago'
  },
  {
    name: 'adam',
    src: 'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg',
    subText: '2 hours ago'
  },
  {
    name: 'mike',
    src: 'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg',
    subText: '2 hours ago'
  }
];

const MessageModal = () => {
  const [names, setNames] = useState<string[]>([]);
  const newNames = [...new Set(names)];
  const { hideModal } = useModalContext();

  const handleRemoveName = (name: string) => {
    const names = newNames.filter((n) => n !== name);
    setNames(names);
  };
  return (
    <>
      <div key={MODAL_TYPES.NEW_MESSAGE} className={cx('container')}>
        <div className={cx('header')}>
          <TfiClose
            className={cx('icon')}
            onClick={() => hideModal(MODAL_TYPES.NEW_MESSAGE as ModalType)}
          />
          <span className={cx('text1')}>New Message</span>
          <span className={cx('text2')}>Next</span>
        </div>
        <div className={cx('wrapper')}>
          <span>To:</span>
          <div className={cx('input-wrapper')}>
            <div className={cx('name-wrapper')}>
              {newNames.map((name) => {
                return (
                  <div className={cx('name')} onClick={() => handleRemoveName(name)}>
                    <span>{name}</span>
                    <TfiClose className={cx('icon2')} />
                  </div>
                );
              })}
            </div>

            <FormField className={cx('input')} value='' placeholder='Search...' />
          </div>
        </div>
        {/* <div className={cx('result')}>
          <IconNotFound className={cx('icon-notfound')} />
          <span className={cx('text3')}>We didn't find any results</span>
          <span className={cx('text4')}>
            Make sure everything is spelled correctly or try different keywords.
          </span>
        </div> */}
        <div className={cx('user-list')}>
          {username.map(({ name, src, subText }) => {
            return (
              <Profile
                onClick={() => setNames([...names, name])}
                className={cx('profile')}
                name={name}
                subText={subText}
                src={src}
                alt='profile'
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default MessageModal;
