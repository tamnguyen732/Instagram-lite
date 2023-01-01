import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { CiImageOn, CiYoutube } from 'react-icons/ci';
import Button from '~/components/Button';
import { INPUT_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useUploadPostImageMutation } from '~/types/generated';
const cx = bindClass(styles);

interface Props {
  isExpand: boolean;
}

const CreatePostImage = ({ isExpand }: Props) => {
  const [uploadPostImage, { data, loading }] = useUploadPostImageMutation();
  console.log(loading);

  const [imageBase64, setImageBase64] = useState<string>('');
  const { checkEmtyInput } = useModalContext();
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) setImageBase64('');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImageBase64(reader.result as string);
  };

  const uploadImage = useCallback(async () => {
    try {
      const response = await uploadPostImage({ variables: { imageBase64 } });

      if (response.data?.uploadPostImage.success) {
        setImageBase64(response.data!.uploadPostImage.imageUrl!);
      }
    } catch (error) {
      console.log(error);
    }
  }, [imageBase64]);
  useEffect(() => {
    uploadImage();
  }, [uploadImage]);

  checkEmtyInput(imageBase64, INPUT_TYPES.UPLOAD);
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
