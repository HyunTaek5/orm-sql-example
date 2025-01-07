import { Request, Response, Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
} from 'src/service/user.service';

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

router.put('/:id', async (req: Request, res: Response) => {
  const user = await updateUser(parseInt(req.params.id), req.body);

  res.json(user);
});

export const UserController = router;
