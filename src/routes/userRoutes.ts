import express from 'express';
import {
  validateUserCreation,
  validateUserUpdate,
  validateUserId,
  validateCitySearch,
  validatePagination,
} from '../middleware/userValidation';
import { validateRequest } from '../middleware/validateRequest';
import { UserController } from '../controllers/userController';

const router = express.Router();

router.post(
  '/',
  validateUserCreation,
  validateRequest,
  UserController.createUser
);

router.get('/', validatePagination, validateRequest, UserController.getUsers);

router.get(
  '/search',
  validateCitySearch,
  validateRequest,
  UserController.searchUsersByCity
);

router.get('/:id', validateUserId, validateRequest, UserController.getUserById);

router.put(
  '/:id',
  validateUserUpdate,
  validateRequest,
  UserController.updateUser
);

router.delete(
  '/:id',
  validateUserId,
  validateRequest,
  UserController.deleteUser
);

export default router;
