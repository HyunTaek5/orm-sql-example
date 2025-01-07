export const getUserByIdQuery = (id: number) =>
  `SELECT * FROM user WHERE id = ${id} AND is_active = true LIMIT 1;`;

export const getUsersQuery = () =>
  `SELECT * FROM user WHERE is_active = true ORDER BY id DESC LIMIT 10;`;

export const createUserQuery = (name: string, email: string) =>
  `INSERT INTO user (name, email, created_at, updated_at) VALUES ('${name}', '${email}', NOW(), NOW());`;
