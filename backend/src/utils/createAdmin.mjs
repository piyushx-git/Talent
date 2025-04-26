import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear any existing admin users
    await User.deleteMany({ role: 'admin' });
    console.log('Cleared existing admin users');

    // Create admin user with specified credentials
    const admin = await User.create({
      name: 'System Administrator',
      email: 'admin@talent.com',
      password: 'password123',
      role: 'admin',
      department: 'Administration',
      bio: 'System Administrator with full access',
      permissions: {
        manageUsers: true,
        manageTeams: true,
        manageHackathons: true,
        manageCompetitions: true,
        manageContent: true,
        viewAnalytics: true,
        systemSettings: true
      }
    });

    console.log('Admin user created successfully:');
    console.log('Email:', admin.email);
    console.log('Password:', 'password123');
    console.log('Role:', admin.role);
    console.log('Permissions:', admin.permissions);

    // Verify the password by finding the user and comparing
    const foundAdmin = await User.findOne({ email: 'admin@talent.com' });
    const isMatch = await bcrypt.compare('password123', foundAdmin.password);
    console.log('Password verification:', isMatch ? 'Success' : 'Failed');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

createAdmin(); 