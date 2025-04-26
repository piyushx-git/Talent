import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: [true, 'A submission must belong to a team']
  },
  competition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: [true, 'A submission must belong to a competition']
  },
  files: [{
    name: {
      type: String,
      required: [true, 'File name is required']
    },
    url: {
      type: String,
      required: [true, 'File URL is required']
    },
    type: {
      type: String,
      required: [true, 'File type is required']
    }
  }],
  description: {
    type: String,
    required: [true, 'A submission must have a description']
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A submission must have a submitter']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected'],
    default: 'pending'
  },
  feedback: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Indexes
submissionSchema.index({ team: 1 });
submissionSchema.index({ competition: 1 });
submissionSchema.index({ submittedBy: 1 });
submissionSchema.index({ status: 1 });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission; 