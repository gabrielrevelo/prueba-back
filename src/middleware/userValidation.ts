import { body, param, ValidationChain, query } from 'express-validator';

export const validateUserCreation: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid format'),

  body('age').optional().isInt().withMessage('Age must be an integer'),

  body('addresses')
    .optional()
    .isArray()
    .withMessage('Addresses must be an array'),

  body('addresses.*.street').notEmpty().withMessage('Street is required'),

  body('addresses.*.city').notEmpty().withMessage('City is required'),

  body('addresses.*.country').notEmpty().withMessage('Country is required'),

  body('addresses.*.postal_code')
    .notEmpty()
    .withMessage('Postal code is required'),
];

export const validateUserUpdate: ValidationChain[] = [
  param('id').isMongoId().withMessage('Invalid user ID format'),
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  body('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid format'),

  body('age').optional().isInt().withMessage('Age must be an integer'),

  body('addresses')
    .optional()
    .isArray()
    .withMessage('Addresses must be an array'),

  body('addresses.*.street')
    .optional()
    .notEmpty()
    .withMessage('Street is required'),

  body('addresses.*.city')
    .optional()
    .notEmpty()
    .withMessage('City is required'),

  body('addresses.*.country')
    .optional()
    .notEmpty()
    .withMessage('Country is required'),

  body('addresses.*.postal_code')
    .optional()
    .notEmpty()
    .withMessage('Postal code is required'),
];

export const validateUserId: ValidationChain[] = [
  param('id').isMongoId().withMessage('Invalid user ID format'),
];

export const validateCitySearch: ValidationChain[] = [
  query('city').notEmpty().withMessage('City parameter is required'),
];

export const validatePagination: ValidationChain[] = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];
