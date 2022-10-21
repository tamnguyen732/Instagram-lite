import { CLOUDINARY_FOLDERS } from '~/constants';
import cloudinary from '~/config/cloudinary';

type Cloudinary = {
  uploadImage: (newPhoto: string) => Promise<string>;
  updateImage: (newPhoto: string, oldPhotoUrl: string) => Promise<string>;
  deleteImage: (oldPhotoUrl: string) => Promise<void>;
};
const cloudinaryUploader = (folder: string): Cloudinary => {
  const selectedFolder =
    folder === 'avatars' ? CLOUDINARY_FOLDERS.AVATARS : CLOUDINARY_FOLDERS.POSTS;

  const findImagePath = (photoUrl: string) => {
    const regex = new RegExp(selectedFolder + '/(?:vd+/)?([^.]+)');

    return photoUrl.match(regex)?.[0];
  };

  const uploadImage = async (newPhoto: string) => {
    const { secure_url: photo } = await cloudinary.uploader.upload(newPhoto, {
      folder: selectedFolder
    });
    return photo;
  };

  const updateImage = async (newPhoto: string, oldPhotoUrl: string) => {
    const photoId = findImagePath(oldPhotoUrl);

    const { secure_url: photo } = await cloudinary.uploader.upload(newPhoto, {
      public_id: photoId,
      overwrite: true,
      invalidate: true
    });

    return photo;
  };

  const deleteImage = async (oldPhotoUrl: string) => {
    const photoId = findImagePath(oldPhotoUrl);

    if (photoId == null) return;

    await cloudinary.uploader.destroy(photoId);
  };

  return { uploadImage, updateImage, deleteImage };
};
export default cloudinaryUploader;
