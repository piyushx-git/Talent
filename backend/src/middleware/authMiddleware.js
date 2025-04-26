import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { StatusCodes } from 'http-status-codes';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-123';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return next(new AppError('User not found', StatusCodes.UNAUTHORIZED));
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return next(new AppError('Not authorized, token failed', StatusCodes.UNAUTHORIZED));
    }
  } else {
    return next(new AppError('Not authorized, no token', StatusCodes.UNAUTHORIZED));
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Please log in to access this route', StatusCodes.UNAUTHORIZED));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', StatusCodes.FORBIDDEN));
    }

    next();
  };
};

export { protect, restrictTo }; 