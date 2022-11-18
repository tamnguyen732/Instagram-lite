import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import Image from '~/components/Image';
import { useEffect, useRef, useState } from 'react';
import EmojiIcon from '~/components/Icon/EmojiIcon';
import { BsEmojiSmile } from 'react-icons/bs';
import useAutoFocus from '~/hooks/useAutoFocus';
import { GoLocation } from 'react-icons/go';
import { TfiClose } from 'react-icons/tfi';
import FormField from '~/components/FormField';
import fecthLocation from '~/helpers/fetchLocation';
import Loading from '~/components/Loading';
const cx = bindClass(styles);
const CreatePostContent = () => {
  const inputRef = useRef<any | null>(null);
  const [value, setValue] = useState<string>('');
  const [locationValue, setLocationValue] = useState<string>('');
  const [countCharater, setCharacter] = useState(0);
  const [hasValue, setHasValue] = useState<boolean>(false);
  const [activeIconList, setActiveIconList] = useState<boolean>(false);
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setValue(value);
    setCharacter(value.split('').length);
  };

  // useAutoFocus({ inputRef, value });
  const { location, loading } = fecthLocation({ value: locationValue });

  const handleChooseLocation = (name: string, country: string) => {
    if (!country) {
      setLocationValue(`${name}`);
    }
    setLocationValue(`${name}, ${country}`);
    setHasValue(true);
  };
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
              'https://cdn-ajggd.nitrocdn.com/kMoOFpDlsOVtlYJLrnSRNCQXaUFHZPTY/assets/static/optimized/rev-9b0736f/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg#'
            }
            alt='profile'
            objectFit='cover'
            rounded
          />
          <span className={cx('name')}> Tam Nguyen </span>
        </div>
        <textarea
          onChange={(e) => handleInput(e)}
          placeholder='Write status...'
          ref={inputRef}
          value={value}
          className={cx('text-area')}
        ></textarea>
      </div>
      <div className={cx('footer')}>
        {activeIconList ? (
          <EmojiIcon
            value={value}
            setValue={setValue}
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
          <FormField
            className={cx('location-input')}
            value={locationValue}
            placeholder='Add location'
            onChange={(e) => setLocationValue(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <Loading size='sm' />
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
