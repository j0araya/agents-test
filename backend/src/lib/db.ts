import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chile_atlas';

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;

  await mongoose.connect(MONGODB_URI);
  isConnected = true;
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}

export default mongoose;
