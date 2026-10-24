import { randomUUID } from 'node:crypto';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export interface CreateUserInput {
  name: string;
  email: string;
  phone: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ name, email, phone }: CreateUserInput): Promise<User> {
    if (!name || !email || !phone) {
      throw new Error('Nome, email e telefone são obrigatórios');
    }

    const user: User = { id: randomUUID(), name, email, phone };
    await this.userRepository.create(user);
    return user;
  }
}
