import mongoose from 'mongoose';

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is required')
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000
    })
    console.log(`MongoDB connected: ${conn.connection.host}`)
    return conn
}

export default connectDB;
