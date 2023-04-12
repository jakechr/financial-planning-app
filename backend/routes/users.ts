import asyncHandler from "./utils/asyncHandler"
import Express, { Response } from 'express';
import { JWTRequest } from "../model/objects";
import userService from "../services/users";
const router = Express.Router();

router.delete('/', asyncHandler(async (req: JWTRequest, res: Response) => {
  await userService.deleteUser(req.user.userId);
  res.send();
}));

export default router;