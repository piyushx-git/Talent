import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Hackathon title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Hackathon description is required'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  registrationDeadline: {
    type: Date,
    required: [true, 'Registration deadline is required']
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  maxTeamSize: {
    type: Number,
    default: 5
  },
  minTeamSize: {
    type: Number,
    default: 2
  },
  themes: [{
    type: String,
    trim: true
  }],
  prizes: [{
    position: String,
    description: String,
    value: String
  }],
  judgingCriteria: [{
    criterion: String,
    weight: Number,
    description: String
  }],
  requirements: {
    type: String,
    trim: true
  },
  resources: [{
    title: String,
    url: String,
    description: String
  }],
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

export default Hackathon; 