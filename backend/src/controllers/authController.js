import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

// Default JWT secret if not set in environment
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-123';

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' } // Consider a shorter duration for production
  );
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    // Basic validation first
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation errors", errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      role,
      department,
      bio,
      socialLinks,
      student,
      mentor,
      organizer
    } = req.body;

    // Check required common fields
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Missing required fields: Name, Email, Password, Role' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Prepare user data - Start with common fields
    const userData = {
      name,
      email,
      password,
      role,
      department,
      bio,
      socialLinks: {
        linkedin: socialLinks?.linkedin || '',
        github: socialLinks?.github || ''
      }
    };

    // Add role-specific data and perform validation
    if (role === 'student') {
      if (!student) {
        return res.status(400).json({ message: 'Student details are required for student role' });
      }
      const { institution, course, year, studentId, skills, interests, certifications, projects } = student;
      if (!institution || !course || !year || !studentId) {
        return res.status(400).json({ message: 'Missing required student fields: Institution, Course, Year, Student ID' });
      }
      
      const existingStudentId = await User.findOne({ 'student.studentId': studentId });
      if (existingStudentId) {
          return res.status(400).json({ message: 'Student ID already exists' });
      }
      
      userData.student = {
        institution,
        course,
        year,
        studentId,
        skills: Array.isArray(skills) ? skills : [],
        interests: Array.isArray(interests) ? interests : [],
        certifications: Array.isArray(certifications) ? certifications : [],
        projects: Array.isArray(projects) ? projects : []
      };
    } else if (role === 'mentor') {
      if (!mentor) {
        return res.status(400).json({ message: 'Mentor details are required for mentor role' });
      }
      const { experience, organization, designation, availability, expertise, officeLocation, preferredDays, preferredTime, maxTeams, researchGate } = mentor;
      if (!experience || !organization || !designation || !availability) {
        return res.status(400).json({ message: 'Missing required mentor fields: Experience, Organization, Designation, Availability' });
      }
      
      userData.mentor = {
        experience,
        organization,
        designation,
        availability,
        expertise: Array.isArray(expertise) ? expertise : [],
        officeLocation: officeLocation || '',
        preferredDays: Array.isArray(preferredDays) ? preferredDays : [],
        preferredTime: preferredTime || '',
        maxTeams: parseInt(maxTeams) || 3,
        researchGate: researchGate || ''
      };
    } else if (role === 'organizer') {
      if (!organizer) {
        return res.status(400).json({ message: 'Organizer details are required for organizer role' });
      }
      const { organization, designation, contactNumber, eventManagementExperience, previousEvents, website } = organizer;
      if (!organization || !designation || !contactNumber || !eventManagementExperience) {
        return res.status(400).json({ message: 'Missing required organizer fields: Organization, Designation, Contact Number, Event Management Experience' });
      }
      
      userData.organizer = {
        organization,
        designation,
        contactNumber,
        eventManagementExperience,
        previousEvents: Array.isArray(previousEvents) ? previousEvents : [],
        website: website || ''
      };
    }

    // Create and save the new user
    const user = new User(userData);
    await user.save();

    // Generate token
    const token = generateToken(user);

    const userToReturn = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      bio: user.bio,
      socialLinks: user.socialLinks,
      ...(user.role === 'student' && { student: user.student }),
      ...(user.role === 'mentor' && { mentor: user.mentor }),
      ...(user.role === 'organizer' && { organizer: user.organizer }),
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: userToReturn,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => `${val.path}: ${val.message}`);
      return res.status(400).json({ 
        message: 'Validation Error',
        errors: messages
      });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const friendlyField = field.includes('.') ? field.split('.').pop() : field;
      return res.status(400).json({ message: `An account with this ${friendlyField} already exists.` });
    }
    res.status(500).json({ message: 'Server error during registration. Please try again later.' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('=== Login Attempt ===');
    console.log('Email:', email);
    
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide email and password',
        errors: [
          { 
            msg: !email ? 'Email is required' : null,
            path: 'email'
          },
          { 
            msg: !password ? 'Password is required' : null,
            path: 'password'
          }
        ].filter(error => error.msg)
      });
    }

    // Find user and explicitly include password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid credentials',
        errors: [{ msg: 'No user found with this email', path: 'email' }]
      }); 
    }

    // Use the comparePassword method from the User model
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Invalid credentials',
        errors: [{ msg: 'Incorrect password', path: 'password' }]
      });
    }

    // Generate token
    const token = generateToken(user);

    // Selectively return user data (exclude password)
    const userToReturn = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      bio: user.bio,
      socialLinks: user.socialLinks,
      permissions: user.permissions,
      // Conditionally include role-specific data
      ...(user.role === 'student' && { student: user.student }),
      ...(user.role === 'mentor' && { mentor: user.mentor }),
      ...(user.role === 'organizer' && { organizer: user.organizer }),
    };

    res.status(200).json({ 
      message: 'Login successful',
      user: userToReturn, 
      token 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private (Requires authMiddleware)
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); 
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error while fetching user data' });
  }
}; 