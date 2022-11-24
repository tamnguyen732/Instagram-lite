import { ChangeEvent, useState } from 'react';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { CiImageOn, CiYoutube } from 'react-icons/ci';
import Button from '~/components/Button';
import { INPUT_TYPES, useModalContext } from '~/contexts/ModalContext';
const cx = bindClass(styles);

interface Props {
  isExpand: boolean;
}

const CreatePostImage = ({ isExpand }: Props) => {
  const [tempURL, setTempURL] = useState<string>('');
  const { checkEmtyInput } = useModalContext();
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) setTempURL('');
    setTempURL(URL.createObjectURL(file));
  };
  checkEmtyInput(tempURL, INPUT_TYPES.UPLOAD);
  return (
    <div className={cx('wrapper', isExpand ? 'active' : '')}>
      {tempURL ? (
        <div className={cx('image-wrapper')}>
          <div
            className={cx('image', isExpand ? 'active' : '')}
            style={{
              backgroundImage: `url(${tempURL})`
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
