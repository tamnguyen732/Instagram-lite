import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import Image from '~/components/Image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import EmojiIcon from '~/components/Icon/EmojiIcon';
import { BsEmojiSmile } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { TfiClose } from 'react-icons/tfi';
import fecthLocation from '~/helpers/fetchLocation';
import Loading from '~/components/Loading';
import { INPUT_TYPES, useModalContext } from '~/contexts/ModalContext';

interface Props {
  caption: string;
  setCaption: Dispatch<SetStateAction<string>>;
  locationValue: string;
  setLocationValue: Dispatch<SetStateAction<string>>;
}
const cx = bindClass(styles);
const CreatePostContent = ({ caption, setCaption, locationValue, setLocationValue }: Props) => {
  const inputRef = useRef<any | null>(null);
  const [countCharater, setCharacter] = useState(0);
  const [hasValue, setHasValue] = useState<boolean>(false);
  const [activeIconList, setActiveIconList] = useState<boolean>(false);
  const { checkEmtyInput } = useModalContext();
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setCaption(value);
    setCharacter(value.split('').length);
  };

  const { location, loading } = fecthLocation({ value: locationValue });
  const handleChooseLocation = (name: string, country: string) => {
    if (!country) {
      setLocationValue(`${name}`);
    }
    setLocationValue(`${name}, ${country}`);
    setHasValue(true);
  };
  checkEmtyInput(caption, INPUT_TYPES.STATUS);

  checkEmtyInput(locationValue, INPUT_TYPES.LOCATION);
  useEffect(() => {
    if (!locationValue) {
      setHasValue(false);
    }
  }, [locationValue]);

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <div className={cx('wrapper')}>
          <Image
            className={cx('avatar')}
            src={
              'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
            }
            alt='profile'
            objectFit='cover'
            profile
          />
          <span className={cx('name')}> Tam Nguyen </span>
        </div>
        <textarea
          onChange={(e) => handleInput(e)}
          placeholder='Write status...'
          ref={inputRef}
          value={caption}
          className={cx('text-area')}
        ></textarea>
      </div>
      <div className={cx('footer')}>
        {activeIconList ? (
          <EmojiIcon
            value={caption}
            setValue={setCaption}
            inputRef={inputRef}
            setActiveIconList={setActiveIconList}
          />
        ) : null}
        <div className={cx('emoji-wrapper')}>
          <BsEmojiSmile
            className={cx('emoji-icon')}
            onClick={() => setActiveIconList(!activeIconList)}
          />
          <span>{`${countCharater}/2200`}</span>
        </div>
        <div className={cx('location-wrapper')}>
          {locationValue ? (
            <TfiClose className={cx('close-icon')} onClick={() => setLocationValue('')} />
          ) : (
            <GoLocation className={cx('location-icon')} />
          )}
          <input
            className={cx('location-input', hasValue ? 'noncursor' : '')}
            value={locationValue}
            placeholder='Add location'
            onChange={(e) => setLocationValue(e.target.value)}
          />
        </div>
      </div>
      {loading && locationValue ? (
        !hasValue && <Loading size='sm' />
      ) : locationValue ? (
        <div className={cx('location-fetch', hasValue ? 'hidden' : '')}>
          {location.map(({ name, country }) => {
            return (
              <span
                onClick={() => {
                  handleChooseLocation(name, country?.name);
                }}
              >
                {name + ', ' + country?.name}
              </span>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default CreatePostContent;
