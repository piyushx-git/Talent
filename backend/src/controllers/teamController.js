import Team from '../models/Team.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { StatusCodes } from 'http-status-codes';

// Create a new team (pending admin approval)
export const createTeam = async (req, res, next) => {
  try {
    const { name, description, competition, requiredSkills, maxSize } = req.body;

    // Check if user is a student
    if (req.user.role !== 'student') {
      return next(new AppError('Only students can create teams', StatusCodes.FORBIDDEN));
    }

    // Create the team with pending status
    const team = await Team.create({
      name,
      description,
      competition,
      leader: req.user._id,
      members: [req.user._id],
      requiredSkills,
      maxSize,
      status: 'pending' // New teams start as pending
    });

    // Update the user's document to include the team
    await User.findByIdAndUpdate(
      req.user._id,
      { 
        $push: { 
          'student.teams': {
            team: team._id,
            role: 'leader'
          }
        }
      },
      { new: true }
    );

    // Populate the team with user details
    const populatedTeam = await Team.findById(team._id)
      .populate('leader', 'name email')
      .populate('members', 'name email')
      .populate('competition', 'title');

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Team created successfully and is pending approval',
      data: populatedTeam
    });
  } catch (error) {
    next(error);
  }
};

// Get all teams (admin only)
export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'name email')
      .populate('members', 'name email')
      .populate('competition', 'title');
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: teams.length,
      data: teams
    });
  } catch (error) {
    next(error);
  }
};

// Get single team
export const getTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'name email')
      .populate('members', 'name email')
      .populate('competition', 'title');
    
    if (!team) {
      return next(new AppError('No team found with that ID', StatusCodes.NOT_FOUND));
    }
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// Update team status (admin only)
export const updateTeamStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    // Validate status
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return next(new AppError('Invalid status value', StatusCodes.BAD_REQUEST));
    }
    
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return next(new AppError('No team found with that ID', StatusCodes.NOT_FOUND));
    }

    // Update team status
    team.status = status;
    await team.save();

    // If team is approved, update all members' documents
    if (status === 'approved') {
      await User.updateMany(
        { _id: { $in: team.members } },
        { 
          $push: { 
            'student.teams': {
              team: team._id,
              role: team.leader.equals(req.user._id) ? 'leader' : 'member'
            }
          }
        }
      );
    }

    // Populate the updated team
    const populatedTeam = await Team.findById(team._id)
      .populate('leader', 'name email')
      .populate('members', 'name email')
      .populate('competition', 'title');
    
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: `Team ${status} successfully`,
      data: populatedTeam
    });
  } catch (error) {
    next(error);
  }
};

// Update team (admin only)
export const updateTeam = async (req, res, next) => {
  try {
    const { name, description, status, members } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, description, status, members },
      { new: true, runValidators: true }
    )
    .populate('leader', 'name email')
    .populate('members', 'name email')
    .populate('competition', 'title');

    if (!team) {
      return next(new AppError('No team found with that ID', StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// Delete team (admin only)
export const deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return next(new AppError('No team found with that ID', StatusCodes.NOT_FOUND));
    }
    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Join a team
export const joinTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return next(new AppError('No team found with that ID', StatusCodes.NOT_FOUND));
    }

    // Check if team is approved
    if (team.status !== 'approved') {
      return next(new AppError('Team is not approved yet', StatusCodes.FORBIDDEN));
    }

    // Check if user is already a member
    if (team.members.includes(req.user._id)) {
      return next(new AppError('You are already a member of this team', StatusCodes.BAD_REQUEST));
    }

    // Check if team is full
    if (team.members.length >= team.maxSize) {
      return next(new AppError('Team is full', StatusCodes.BAD_REQUEST));
    }

    // Add user to team
    team.members.push(req.user._id);
    await team.save();

    // Update user's document
    await User.findByIdAndUpdate(
      req.user._id,
      { 
        $push: { 
          'student.teams': {
            team: team._id,
            role: 'member'
          }
        }
      }
    );

    // Populate the updated team
    const populatedTeam = await Team.findById(team._id)
      .populate('leader', 'name email')
      .populate('members', 'name email')
      .populate('competition', 'title');

    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Successfully joined the team',
      data: populatedTeam
    });
  } catch (error) {
    next(error);
  }
}; 