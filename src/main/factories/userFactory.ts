import { pool } from '../../infra/database/connection';
import { UserRepository } from '../../infra/repositories/UserRepository';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { GetUsersUseCase } from '../../application/use-cases/GetUsersUseCase';
import { DeleteUserUseCase } from '../../application/use-cases/DeleteUserUseCase';
import { UserController } from '../../presentation/controllers/UserController';

// Monta as dependências: repository -> use cases -> controller
export const makeUserController = (): UserController => {
  const userRepository = new UserRepository(pool);

  return new UserController(
    new CreateUserUseCase(userRepository),
    new GetUsersUseCase(userRepository),
    new DeleteUserUseCase(userRepository),
  );
};
