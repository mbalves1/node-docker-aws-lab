import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { GetUsersUseCase } from '../../application/use-cases/GetUsersUseCase';
import { DeleteUserUseCase } from '../../application/use-cases/DeleteUserUseCase';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const { name, email, phone } = req.body ?? {};
      const user = await this.createUserUseCase.execute({ name, email, phone });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const users = await this.getUsersUseCase.execute();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  delete = async (req: Request<{ id: string }>, res: Response) => {
    try {
      await this.deleteUserUseCase.execute(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}
