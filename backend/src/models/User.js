import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Sub-schema for Skills to include proficiency and category
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  proficiency: { type: Number, min: 1, max: 5, default: 1 }
}, { _id: false });

// Sub-schema for Certifications
const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  issuer: { type: String, required: true, trim: true },
  date: { type: String }, // Using String for 'YYYY-MM' format
  url: { type: String, trim: true }
}, { _id: false });

// Sub-schema for Projects
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  technologies: [String],
  url: { type: String, trim: true }
}, { _id: false });

// Sub-schema for Team Memberships
const teamMembershipSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  role: { type: String, enum: ['leader', 'member'], default: 'member' }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['student', 'mentor', 'organizer', 'admin'],
    default: 'student'
  },
  department: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  socialLinks: {
    linkedin: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    }
  },
  permissions: {
    type: [String],
    default: []
  },
  // Student specific fields
  student: {
    institution: {
      type: String,
      required: function() { return this.role === 'student'; }
    },
    course: {
      type: String,
      required: function() { return this.role === 'student'; }
    },
    year: {
      type: String,
      required: function() { return this.role === 'student'; }
    },
    studentId: {
      type: String,
      required: function() { return this.role === 'student'; },
      unique: true,
      sparse: true
    },
    skills: [{
      name: String,
      category: String,
      proficiency: Number
    }],
    interests: [String],
    certifications: [{
      name: String,
      issuer: String,
      date: Date,
      url: String
    }],
    projects: [{
      name: String,
      description: String,
      technologies: [String],
      url: String
    }],
    teams: [teamMembershipSchema]
  },
  // Mentor specific fields
  mentor: {
    experience: {
      type: String,
      required: function() { return this.role === 'mentor'; }
    },
    organization: {
      type: String,
      required: function() { return this.role === 'mentor'; }
    },
    designation: {
      type: String,
      required: function() { return this.role === 'mentor'; }
    },
    availability: {
      type: String,
      required: function() { return this.role === 'mentor'; }
    },
    expertise: [String],
    officeLocation: String,
    preferredDays: [String],
    preferredTime: String,
    maxTeams: {
      type: Number,
      default: 3
    },
    researchGate: String
  },
  // Organizer specific fields
  organizer: {
    organization: {
      type: String,
      required: function() { return this.role === 'organizer'; }
    },
    designation: {
      type: String,
      required: function() { return this.role === 'organizer'; }
    },
    contactNumber: {
      type: String,
      required: function() { return this.role === 'organizer'; }
    },
    eventManagementExperience: {
      type: String,
      required: function() { return this.role === 'organizer'; }
    },
    previousEvents: [String],
    website: String
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

export default User; 