import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Competition from '../models/Competition.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env file');
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB with URI:', process.env.MONGO_URI);
    
    // Connect to MongoDB with options
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB successfully');

    // Clear existing data
    await User.deleteMany();
    console.log('Cleared existing users');
    
    await Competition.deleteMany();
    console.log('Cleared existing competitions');

    // Create admin users
    const adminUsers = [
      {
        name: 'System Admin',
        email: 'admin@talent.com',
        password: 'Admin@123',
        role: 'admin',
        student: null,
        mentor: null,
        organizer: null
      },
      {
        name: 'Technical Admin',
        email: 'techadmin@talent.com',
        password: 'Tech@123',
        role: 'admin',
        student: null,
        mentor: null,
        organizer: null
      },
      {
        name: 'Content Admin',
        email: 'contentadmin@talent.com',
        password: 'Content@123',
        role: 'admin',
        student: null,
        mentor: null,
        organizer: null
      },
      {
        name: 'Operations Admin',
        email: 'opsadmin@talent.com',
        password: 'Ops@123',
        role: 'admin',
        student: null,
        mentor: null,
        organizer: null
      }
    ];

    // Hash passwords and create admin users
    const hashedAdminUsers = await Promise.all(
      adminUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12)
      }))
    );

    const createdUsers = await User.create(hashedAdminUsers);
    console.log('Created admin users:', createdUsers.length);

    // Create sample competitions
    const competitions = [
      {
        title: 'Hackathon 2024',
        description: 'Annual coding competition for students',
        startDate: new Date('2024-05-01'),
        endDate: new Date('2024-05-03'),
        registrationDeadline: new Date('2024-04-25'),
        maxParticipants: 100,
        status: 'pending',
        categories: ['Web Development', 'Mobile App', 'AI/ML'],
        rules: [
          'Teams of 2-4 members',
          'No pre-built solutions',
          'Must use provided APIs'
        ],
        prizes: [
          { position: 1, description: '₹50,000' },
          { position: 2, description: '₹30,000' },
          { position: 3, description: '₹20,000' }
        ],
        judgingCriteria: [
          { criterion: 'Innovation', weight: 30 },
          { criterion: 'Technical Implementation', weight: 40 },
          { criterion: 'User Experience', weight: 30 }
        ],
        location: {
          type: 'online',
          address: 'Virtual Event'
        },
        requirements: 'Basic programming knowledge required',
        resources: [
          { title: 'API Documentation', url: 'https://api.example.com/docs' },
          { title: 'Design Guidelines', url: 'https://design.example.com/guidelines' }
        ],
        tags: ['hackathon', 'coding', '2024']
      },
      {
        title: 'Robotics Challenge',
        description: 'Build and program autonomous robots',
        startDate: new Date('2024-06-15'),
        endDate: new Date('2024-06-17'),
        registrationDeadline: new Date('2024-06-01'),
        maxParticipants: 50,
        status: 'pending',
        categories: ['Robotics', 'AI', 'Engineering'],
        rules: [
          'Teams of 3-5 members',
          'Use provided robotics kit',
          'Follow safety guidelines'
        ],
        prizes: [
          { position: 1, description: '₹75,000' },
          { position: 2, description: '₹50,000' },
          { position: 3, description: '₹25,000' }
        ],
        judgingCriteria: [
          { criterion: 'Robot Performance', weight: 40 },
          { criterion: 'Innovation', weight: 30 },
          { criterion: 'Technical Documentation', weight: 30 }
        ],
        location: {
          type: 'physical',
          address: 'Tech Park, Bangalore',
          coordinates: [77.5946, 12.9716]
        },
        requirements: 'Basic robotics knowledge required',
        resources: [
          { title: 'Robotics Kit Manual', url: 'https://robotics.example.com/manual' },
          { title: 'Programming Guide', url: 'https://robotics.example.com/programming' }
        ],
        tags: ['robotics', 'engineering', '2024']
      }
    ];

    const createdCompetitions = await Competition.create(competitions);
    console.log('Created competitions:', createdCompetitions.length);

    console.log('Database seeded successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Could not connect to MongoDB. Please check if MongoDB is running and the connection string is correct.');
    } else if (error.name === 'MongoError') {
      console.error('MongoDB error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});

seedDatabase(); 