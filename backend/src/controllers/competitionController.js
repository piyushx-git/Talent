import Competition from '../models/Competition.js';
import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/AppError.js';

// Get all competitions (admin only)
export const getAllCompetitions = async (req, res, next) => {
  try {
    const competitions = await Competition.find()
      .populate('organizer', 'name email')
      .populate('participants', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: competitions.length,
      data: competitions
    });
  } catch (error) {
    next(error);
  }
};

// Get single competition (admin only)
export const getCompetition = async (req, res, next) => {
  try {
    const competition = await Competition.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('participants', 'name email');
    
    if (!competition) {
      return next(new AppError('No competition found with that ID', StatusCodes.NOT_FOUND));
    }
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: competition
    });
  } catch (error) {
    next(error);
  }
};

// Create competition (pending admin approval)
export const createCompetition = async (req, res, next) => {
  try {
    const competition = await Competition.create({
      ...req.body,
      organizer: req.user._id,
      status: 'pending' // New competitions start as pending
    });
    
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Competition created successfully and is pending approval',
      data: competition
    });
  } catch (error) {
    next(error);
  }
};

// Update competition (admin only)
export const updateCompetition = async (req, res, next) => {
  try {
    const competition = await Competition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('organizer', 'name email')
    .populate('participants', 'name email');
    
    if (!competition) {
      return next(new AppError('No competition found with that ID', StatusCodes.NOT_FOUND));
    }
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: competition
    });
  } catch (error) {
    next(error);
  }
};

// Delete competition (admin only)
export const deleteCompetition = async (req, res, next) => {
  try {
    const competition = await Competition.findByIdAndDelete(req.params.id);
    if (!competition) {
      return next(new AppError('No competition found with that ID', StatusCodes.NOT_FOUND));
    }
    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Update competition status (admin only)
export const updateCompetitionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected', 'active', 'completed'].includes(status)) {
      return next(new AppError('Invalid status value', StatusCodes.BAD_REQUEST));
    }
    
    const competition = await Competition.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
    .populate('organizer', 'name email')
    .populate('participants', 'name email');
    
    if (!competition) {
      return next(new AppError('No competition found with that ID', StatusCodes.NOT_FOUND));
    }
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: competition
    });
  } catch (error) {
    next(error);
  }
};

// Register for a competition (authenticated users)
export const registerForCompetition = async (req, res, next) => {
  try {
    const competition = await Competition.findById(req.params.id);
    
    if (!competition) {
      return next(new AppError('No competition found with that ID', StatusCodes.NOT_FOUND));
    }
    
    // Check if competition is approved
    if (competition.status !== 'approved') {
      return next(new AppError('Competition is not approved yet', StatusCodes.FORBIDDEN));
    }
    
    // Check if registration is still open
    if (new Date() > new Date(competition.registrationDeadline)) {
      return next(new AppError('Registration deadline has passed', StatusCodes.BAD_REQUEST));
    }
    
    // Check if competition is full
    if (competition.participants.length >= competition.maxParticipants) {
      return next(new AppError('Competition is full', StatusCodes.BAD_REQUEST));
    }
    
    // Check if user is already registered
    if (competition.participants.includes(req.user._id)) {
      return next(new AppError('You are already registered for this competition', StatusCodes.BAD_REQUEST));
    }
    
    competition.participants.push(req.user._id);
    await competition.save();
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: competition
    });
  } catch (error) {
    next(error);
  }
};

// Get competitions for a specific organizer
export const getOrganizerCompetitions = async (req, res, next) => {
  try {
    const competitions = await Competition.find({ organizer: req.user._id })
      .populate('organizer', 'name email')
      .populate('participants', 'name email')
      .populate('teams', 'name members')
      .populate('submissions', 'team status')
      .sort({ createdAt: -1 });
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: competitions.length,
      data: competitions
    });
  } catch (error) {
    next(error);
  }
}; 