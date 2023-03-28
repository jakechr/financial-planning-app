import asyncHandler from "./utils/asyncHandler"
import Express, { Response } from 'express';
import { JWTRequest } from "../model/objects";
import { deleteUser } from "../services/users";
const router = Express.Router();

router.delete('/', asyncHandler(async (req: JWTRequest, res: Response) => {
  console.log(req.user);
  await deleteUser(req.user.userId);
  // TODO
  res.send();
}));

export default router;