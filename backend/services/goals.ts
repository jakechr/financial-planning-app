import goalDAO from "../dao/goals";
import { Goal } from "../model/objects";

async function createGoal(goal: Goal): Promise<string> {
  return await goalDAO.createGoal(goal);
}

async function deleteGoal(goalId: string, userId: string): Promise<void> {
  return await goalDAO.deleteGoal(goalId, userId);
}

async function getGoal(goalId: string, userId: string): Promise<Goal> {
  return await goalDAO.getGoal(goalId, userId);
}

async function getAllGoals(userId: string): Promise<Goal[]> {
  return await goalDAO.getAllGoals(userId);
}

async function updateGoal(goal: Goal): Promise<void> {
  return await goalDAO.updateGoal(goal);
}

const goalService = {
  createGoal,
  deleteGoal,
  getGoal,
  getAllGoals,
  updateGoal
};
export default goalService;