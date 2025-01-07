import { DI } from 'src/index';
import { QueryOrder } from '@mikro-orm/core';
import { User } from 'src/domain/user.entity';

export const getUsers = async () => {
  const users = await DI.users.findAll({
    orderBy: { id: QueryOrder.DESC },
    limit: 10,
  });

  return users;
};

export const getUserById = async (id: number) => {
  const user = await DI.users.findOne({ id: id, isActive: true });

  return user;
};

export const createUser = async (data: Pick<User, 'name' | 'email'>) => {
  const user = new User();

  user.name = data.name;
  user.email = data.email;

  await DI.em.persistAndFlush(user);

  return user;
};
