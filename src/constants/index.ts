export * from './cloudinary';
export * from './token';

export const SALT_NUMBER = 10;
export const _production_ = process.env.NODE_ENV === 'production';
export const DOMAIN = _production_ ? process.env.NEXT_PUBLIC_DOMAIN : 'http://localhost:3000';
