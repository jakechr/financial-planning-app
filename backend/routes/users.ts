import asyncHandler from "./utils/asyncHandler"
import Express, { Request, Response } from 'express';
import { Exception, User, UserInfo } from "../model/objects";
import { register, login } from "../services/users";
import { jwtSigner } from "./utils/auth";
const router = Express.Router();

router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
    throw {status: 400, message: 'Missing required fields'} as Exception;
  }
  const userInfo = await register({
    userId: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  });
  res.send(jwtSigner(userInfo));
}));

router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  if(!req.body.userId || !req.body.password) {
    throw {status: 400, message: 'Missing required fields'} as Exception;
  }
  const userInfo = await login(req.body.userId, req.body.password);
  res.send(jwtSigner(userInfo));
}));

router.delete('/', asyncHandler(async (req: Request, res: Response) => {
  if(!req.body.email) {
    throw {status: 400, message: 'Missing required fields'} as Exception;
  }
  // TODO
  res.send();
}));

export default router;