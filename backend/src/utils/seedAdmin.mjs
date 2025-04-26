import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcryptjs';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Import User model
import User from '../models/User.js';

const seedAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully');

    // Clear existing admin users
    await User.deleteMany({ role: 'admin' });
    console.log('Cleared existing admin users');

    // Read admin data from JSON file
    const adminData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'adminSeed.json'), 'utf8'));

    // Create admin user
    const admin = await User.create(adminData[0]);
    console.log('Created admin user:', admin.email);

    // Verify the password
    const isPasswordValid = await bcrypt.compare('Admin@123', admin.password);
    console.log('Password verification:', isPasswordValid ? 'Success' : 'Failed');

    console.log('Admin seeding completed successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin(); 