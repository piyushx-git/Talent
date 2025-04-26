import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A competition must have a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'A competition must have a description'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'A competition must have a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'A competition must have an end date'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  registrationDeadline: {
    type: Date,
    required: [true, 'A competition must have a registration deadline'],
    validate: {
      validator: function(value) {
        return value < this.startDate;
      },
      message: 'Registration deadline must be before start date'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active', 'completed'],
    default: 'pending'
  },
  maxParticipants: {
    type: Number,
    required: [true, 'A competition must specify maximum participants'],
    min: [1, 'Maximum participants must be at least 1']
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A competition must have an organizer']
  },
  participants: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  categories: [{
    type: String,
    trim: true
  }],
  rules: [{
    type: String,
    trim: true
  }],
  prizes: [{
    position: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  judgingCriteria: [{
    criterion: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  }],
  location: {
    type: {
      type: String,
      enum: ['online', 'physical'],
      default: 'online'
    },
    address: {
      type: String,
      trim: true
    },
    coordinates: {
      type: [Number],
      validate: {
        validator: function(value) {
          return value.length === 2;
        },
        message: 'Coordinates must be [longitude, latitude]'
      }
    }
  },
  requirements: {
    type: String,
    trim: true
  },
  resources: [{
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }],
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
competitionSchema.index({ startDate: 1 });
competitionSchema.index({ status: 1 });
competitionSchema.index({ organizer: 1 });
competitionSchema.index({ tags: 1 });

// Virtual field for duration
competitionSchema.virtual('duration').get(function() {
  return this.endDate - this.startDate;
});

// Middleware to update currentParticipants count
competitionSchema.pre('save', function(next) {
  this.currentParticipants = this.participants.length;
  next();
});

const Competition = mongoose.model('Competition', competitionSchema);

export default Competition; 