import { User } from './user.entity';

export interface UserRepository {
  create: (user: Omit<User, 'id'>) => Promise<User>;
}
