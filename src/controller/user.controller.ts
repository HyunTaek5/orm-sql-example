import { Request, Response, Router } from 'express';
import { createUser, getUserById, getUsers } from 'src/service/user.service';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await getUsers();
  res.json(users);
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await getUserById(parseInt(req.params.id));
  res.json(user);
});

router.post('/', async (req: Request, res: Response) => {
  const user = await createUser(req.body);

  res.status(201).json(user);
});

export const UserController = router;
