import { User } from 'src/domain/user/user.entity';

export const toUserResponse = (user: User) => {
  return {
    id: user.id,
    email: user.email,
  };
};

export const mapToLoginUserResponse = (user: User, token: string) => {
  return {
    id: user.id,
    email: user.email,
    access_token: token,
  };
};
