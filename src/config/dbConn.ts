import mongoose from 'mongoose';
import { ConnectOptions } from "mongoose"

const connectDB = async (): Promise<void> => {
  try {
    type ConnectionOptionsExtend = {
      useNewUrlParser: boolean
      useUnifiedTopology: boolean
    }

    const options: ConnectOptions & ConnectionOptionsExtend = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    await mongoose.connect(process.env.DATABASE_URI || '', options);
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

export default connectDB;