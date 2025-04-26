import Submission from '../models/Submission.js';
import AppError from '../utils/AppError.js';
import { StatusCodes } from 'http-status-codes';

// Create a new submission
export const createSubmission = async (req, res, next) => {
  try {
    const { team, competition, files, description } = req.body;

    // Check if the team exists and belongs to the user
    const teamExists = await Team.findOne({ _id: team, members: req.user._id });
    if (!teamExists) {
      return next(new AppError('Team not found or you are not a member', StatusCodes.NOT_FOUND));
    }

    // Create the submission
    const submission = await Submission.create({
      team,
      competition,
      files,
      description,
      submittedBy: req.user._id,
      status: 'pending'
    });

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

// Get all submissions
export const getAllSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find()
      .populate('team', 'name members')
      .populate('competition', 'title')
      .populate('submittedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: submissions.length,
      data: submissions
    });
  } catch (error) {
    next(error);
  }
};

// Get single submission
export const getSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('team', 'name members')
      .populate('competition', 'title')
      .populate('submittedBy', 'name email');
    
    if (!submission) {
      return next(new AppError('No submission found with that ID', StatusCodes.NOT_FOUND));
    }
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

// Update submission status (organizer only)
export const updateSubmissionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'reviewed', 'approved', 'rejected'].includes(status)) {
      return next(new AppError('Invalid status value', StatusCodes.BAD_REQUEST));
    }
    
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
    .populate('team', 'name members')
    .populate('competition', 'title')
    .populate('submittedBy', 'name email');
    
    if (!submission) {
      return next(new AppError('No submission found with that ID', StatusCodes.NOT_FOUND));
    }
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

// Update submission (admin only)
export const updateSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('team', 'name members')
    .populate('competition', 'title')
    .populate('submittedBy', 'name email');
    
    if (!submission) {
      return next(new AppError('No submission found with that ID', StatusCodes.NOT_FOUND));
    }
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

// Delete submission (admin only)
export const deleteSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return next(new AppError('No submission found with that ID', StatusCodes.NOT_FOUND));
    }
    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
}; 