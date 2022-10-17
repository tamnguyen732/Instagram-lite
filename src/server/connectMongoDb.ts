import mongoose from 'mongoose';
const connectMongoDb = () => {
  if (mongoose.connections[0].readyState) {
    console.log('DB already connected');
    return;
  }

  if (!process.env.MONGODB_URI) throw new Error('MongoDB URI not found');

  mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
    if (err) throw new Error('Server got an error');

    console.log('Connected to DB');
  });
};

export default connectMongoDb;
