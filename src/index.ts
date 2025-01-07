import express, { Express, Request, Response } from 'express';
import { RequestContext } from '@mikro-orm/core';
import config from 'src/mikro-orm.config';
import http from 'http';
import dotenv from 'dotenv';
import { UserController } from 'src/controller/user.controller';
import { MikroORM, EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { User } from 'src/domain/user.entity';

dotenv.config();

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  users: EntityRepository<User>;
};

const main = async () => {
  DI.orm = await MikroORM.init(config);
  DI.em = DI.orm.em;
  DI.users = DI.orm.em.getRepository(User);

  await DI.orm.getMigrator().up();

  const app: Express = express();
  const port = process.env.PORT || 8000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.use('/users', UserController);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
