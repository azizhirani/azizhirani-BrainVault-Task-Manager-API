import mongoose from 'mongoose';


const dbConnect = async () => {
  const connectionString = process.env.DB_STRING;
  try {
    const name = await mongoose.connect(connectionString, {
    });
    console.log('Connected to MongoDB via mongoose connection');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
  }
};


export default dbConnect;
