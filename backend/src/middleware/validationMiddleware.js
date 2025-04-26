import { body, validationResult } from 'express-validator';

// Login validation
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required'),

  // This final middleware function checks the results of the above validators
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation errors',
        errors: errors.array() 
      });
    }
    next();
  }
];

// Simplified validation for registration, focusing on essential top-level fields.
// Nested object validation will be primarily handled by Mongoose schema and controller logic.
export const validateRegistration = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['student', 'mentor', 'organizer', 'admin']).withMessage('Invalid role selected'),

  // Optional fields
  body('department').optional().trim(),
  body('bio').optional().trim(),
  body('socialLinks').optional().isObject(),
  body('socialLinks.linkedin').optional().isURL().withMessage('Invalid LinkedIn URL'),
  body('socialLinks.github').optional().isURL().withMessage('Invalid GitHub URL'),

  // Student specific fields
  body('student.institution').if(body('role').equals('student')).notEmpty().withMessage('Institution is required for students'),
  body('student.course').if(body('role').equals('student')).notEmpty().withMessage('Course is required for students'),
  body('student.year').if(body('role').equals('student')).notEmpty().withMessage('Year is required for students'),
  body('student.studentId').if(body('role').equals('student')).notEmpty().withMessage('Student ID is required for students'),

  // Mentor specific fields
  body('mentor.experience').if(body('role').equals('mentor')).notEmpty().withMessage('Experience is required for mentors'),
  body('mentor.organization').if(body('role').equals('mentor')).notEmpty().withMessage('Organization is required for mentors'),
  body('mentor.designation').if(body('role').equals('mentor')).notEmpty().withMessage('Designation is required for mentors'),
  body('mentor.availability').if(body('role').equals('mentor')).notEmpty().withMessage('Availability is required for mentors'),

  // Organizer specific fields
  body('organizer.organization').if(body('role').equals('organizer')).notEmpty().withMessage('Organization is required for organizers'),
  body('organizer.designation').if(body('role').equals('organizer')).notEmpty().withMessage('Designation is required for organizers'),
  body('organizer.contactNumber').if(body('role').equals('organizer')).notEmpty().withMessage('Contact number is required for organizers'),
  body('organizer.eventManagementExperience').if(body('role').equals('organizer')).notEmpty().withMessage('Event management experience is required for organizers'),

  // This final middleware function checks the results of the above validators
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation errors',
        errors: errors.array() 
      });
    }
    next();
  }
]; 