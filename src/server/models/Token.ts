import mongoose from 'mongoose';
const EXPIRED_TOKEN = '5m';

const tokenSchema = new mongoose.Schema({
  userId: String,
  token: String,
  createdAt: { type: Date, expires: EXPIRED_TOKEN, default: Date.now }
});

export const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema);
