import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const adminUsers = [
  {
    name: 'Super Admin',
    email: 'superadmin@talenthunt.com',
    password: 'superadmin123',
    role: 'admin'
  },
  {
    name: 'Content Admin',
    email: 'contentadmin@talenthunt.com',
    password: 'contentadmin123',
    role: 'admin'
  },
  {
    name: 'System Admin',
    email: 'systemadmin@talenthunt.com',
    password: 'systemadmin123',
    role: 'admin'
  }
];

const initDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create admin users
    const createdUsers = await User.create(adminUsers);
    console.log('Created admin users:', createdUsers.map(user => user.email));

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initDB(); 