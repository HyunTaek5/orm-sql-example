import { QueryOrder } from '@mikro-orm/core';

import { DI } from 'src/index';
import { User } from 'src/domain/user.entity';
import {
  createUserQuery,
  getUserByIdQuery,
  getUsersQuery,
} from 'src/query/user.query';

export const getUsers = async () => {
  // Using ORM
  const users = await DI.users.findAll({
    orderBy: { id: QueryOrder.DESC },
    limit: 10,
  });

  // Using Query
  // const users = await DI.em.getConnection().execute<User[]>(getUsersQuery());

  return users;
};

export const getUserById = async (id: number) => {
  // Using ORM
  const user = await DI.users.findOne({ id: id, isActive: true });

  // Using Query
  // const user: User = await DI.em.getConnection().execute(getUserByIdQuery(id));
  return user;
};

export const createUser = async (data: Pick<User, 'name' | 'email'>) => {
  // Using ORM
  const user = new User();

  user.name = data.name;
  user.email = data.email;

  await DI.em.persistAndFlush(user);

  // Using Query
  // const insertedData: {
  //   fieldCount: number;
  //   affectedRows: number;
  //   insertId: number;
  //   info: string;
  //   serverStatus: number;
  //   warningStatus: number;
  //   changedRows: number;
  // } = await DI.em
  //   .getConnection()
  //   .execute(createUserQuery(data.name, data.email));
  //
  // const user = await DI.em
  //   .getConnection()
  //   .execute<User>(getUserByIdQuery(insertedData.insertId));

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
