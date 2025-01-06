import { MySqlDriver, Options } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';

import { User } from 'src/domain/user.entity';

const config: Options = {
  driver: MySqlDriver,
  dbName: 'example-db',
  entities: [User],
  user: 'user',
  password: 'password',
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  debug: true,
};

export default config;
