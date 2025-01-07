import { QueryOrder } from '@mikro-orm/core';

import { DI } from 'src/index';
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

export const updateUser = async (id: number, data: Partial<User>) => {
  const user = await DI.users.findOneOrFail({ id });

  Object.assign(user, data);

  await DI.em.persistAndFlush(user);

  return user;
};

export const deleteUser = async (id: number) => {
  const user = await DI.users.findOneOrFail({ id });

  user.isActive = false;

  await DI.em.persistAndFlush(user);
};
