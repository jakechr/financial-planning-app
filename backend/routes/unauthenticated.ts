import Express, { Request, Response } from 'express';
import asyncHandler from "./utils/asyncHandler"
import { Exception } from "../model/objects";
import userService from "../services/users";
import { jwtSigner } from "./utils/auth";
const router = Express.Router();

/* GET health */
router.get('/health', (_: Request, res: Response) => {
  res.send('good');
});

/* POST register */
router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
    throw {status: 400, message: 'Missing required fields'} as Exception;
  }
  const userInfo = await userService.register({
    userId: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  });
  res.send(jwtSigner(userInfo));
}));

/* POST login */
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  if(!req.body.userId || !req.body.password) {
    throw {status: 400, message: 'Missing required fields'} as Exception;
  }
  const userInfo = await userService.login(req.body.userId, req.body.password);
  res.send(jwtSigner(userInfo));
}));

export default router;
