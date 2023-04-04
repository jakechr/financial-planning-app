import asyncHandler from "./utils/asyncHandler"
import Express, { Response } from 'express';
import { Exception, JWTRequest } from "../model/objects";
import goalService from "../services/goals";
const router = Express.Router();

router.post('/', asyncHandler(async (req: JWTRequest, res: Response) => {
  if(!req.body.name || !req.body.description || !req.body.amount || !verifyGoalDate(req.body.date)) {
    throw {status: 400, message: 'Missing or invalid required fields'} as Exception;
  }

  const goalId = await goalService.createGoal({
    name: req.body.name,
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date,
    userId: req.user.userId
  });
  res.send(goalId);
}));

router.get('/', asyncHandler(async (req: JWTRequest, res: Response) => {
  const goals = await goalService.getAllGoals(req.user.userId);
  res.send(goals);
}));

router.get('/:goalId', asyncHandler(async (req: JWTRequest, res: Response) => {
  const goal = await goalService.getGoal(req.params.goalId, req.user.userId);
  res.send(goal);
}));

router.put('/:goalId', asyncHandler(async (req: JWTRequest, res: Response) => {
  if(!req.body.name || !req.body.description || !req.body.amount || !verifyGoalDate(req.body.date)) {
    throw {status: 400, message: 'Missing or invalid required fields'} as Exception;
  }

  await goalService.updateGoal({
    name: req.body.name,
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date,
    userId: req.user.userId,
    goalId: req.params.goalId
  });
  res.send();
}));

router.delete('/:goalId', asyncHandler(async (req: JWTRequest, res: Response) => {
  await goalService.deleteGoal(req.params.goalId, req.user.userId);
  res.send();
}));

function verifyGoalDate(date: string): boolean {
  if (!date)
    return false;

  const dateParts = date.split('/').map((part) => parseInt(part));
  if (dateParts.length !== 3)
    return false;
  if (dateParts[0] > 12 || dateParts[0] < 1)
    return false;
  if (dateParts[1] > 31 || dateParts[1] < 1) // TODO: Bad check
    return false;
  if (dateParts[2] < 0)
    return false;

  return true;
}

export default router;