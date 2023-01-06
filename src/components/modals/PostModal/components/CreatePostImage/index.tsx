import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { CiImageOn, CiYoutube } from 'react-icons/ci';
import Button from '~/components/Button';
import { INPUT_TYPES, useModalContext } from '~/contexts/ModalContext';
const cx = bindClass(styles);

interface Props {
  isExpand: boolean;
  imageBase64?: string;
  setImageBase64: Dispatch<SetStateAction<string>>;
}

const CreatePostImage = ({ isExpand, imageBase64, setImageBase64 }: Props) => {
  const { checkEmtyInput } = useModalContext();
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) setImageBase64('');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const fileBase64 = reader.result as string;
      setImageBase64(fileBase64);
    };
  };

  checkEmtyInput(imageBase64 as string, INPUT_TYPES.UPLOAD);
  return (
    <div className={cx('wrapper', isExpand ? 'active' : '')}>
      {imageBase64 ? (
        <div className={cx('image-wrapper')}>
          <div
            className={cx('image', isExpand ? 'active' : '')}
            style={{
              backgroundImage: `url(${imageBase64})`
            }}
          ></div>
        </div>
      ) : (
        <div className={cx('content-wrapper')}>
          <div className={cx('icon-wrapper')}>
            <CiImageOn className={cx('icon1')} />
            <CiYoutube className={cx('icon2')} />
          </div>
          <span className={cx('text')}> Drag your photos or video in here</span>
          <div className={cx('input-wrapper')}>
            <input onChange={handleUpload} value='' type='file' className={cx('input-field')} />
            <Button className={cx('button')} primary size='sm'>
              Choose from latop
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostImage;
