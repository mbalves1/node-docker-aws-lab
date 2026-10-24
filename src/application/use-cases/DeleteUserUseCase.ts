import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('Id é obrigatório');
    }

    await this.userRepository.delete(id);
  }
}
