import mongoose from 'mongoose';
const EXPIRED_TOKEN = '10m';

const codeSchema = new mongoose.Schema({
  email: String,
  code: Number,
  createdAt: { type: Date, expires: EXPIRED_TOKEN, default: Date.now }
});

export const Code = mongoose.models.Code || mongoose.model('Code', codeSchema);
