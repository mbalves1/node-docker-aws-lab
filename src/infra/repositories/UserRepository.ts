import { Pool } from 'pg';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private readonly db: Pool) {}

  async create(user: User): Promise<void> {
    await this.db.query(
      'INSERT INTO users (id, name, email, phone) VALUES ($1, $2, $3, $4)',
      [user.id, user.name, user.email, user.phone],
    );
  }

  async findAll(): Promise<User[]> {
    const { rows } = await this.db.query<User>('SELECT id, name, email, phone FROM users');
    return rows;
  }

  async delete(id: string): Promise<void> {
    await this.db.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
