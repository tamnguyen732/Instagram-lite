const CLOUDINARY_BASE_FOLDER = 'instagram-lite';

export const CLOUDINARY = {
  NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.CLOUD_API_KEY,
  SECRET: process.env.CLOUD_API_SECRET
};

export const CLOUDINARY_FOLDERS = {
  POSTS: CLOUDINARY_BASE_FOLDER + '/posts',
  AVATARS: CLOUDINARY_BASE_FOLDER + '/avatars'
};
