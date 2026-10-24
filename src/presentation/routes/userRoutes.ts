import { Router } from 'express';
import { makeUserController } from '../../main/factories/userFactory';

const userController = makeUserController();

export const userRoutes = Router();

userRoutes.post('/', userController.create);
userRoutes.get('/', userController.getAll);
userRoutes.delete('/:id', userController.delete);
