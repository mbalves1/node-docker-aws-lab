import { User } from '../entities/User';

export interface IUserRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
}
