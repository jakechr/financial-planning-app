import {v4 as uuidv4} from 'uuid';
import ddb from '../db/dynamodb';
import { GOALS_TABLE } from "../constants/constants";
import { Exception, Goal } from '../model/objects';

async function createGoal(goal: Goal): Promise<string> {
  const goalId = uuidv4();
  const resp = await ddb.putItem({
    TableName: GOALS_TABLE,
    Item: {
      goalId: {S: goalId},
      userId: {S: goal.userId},
      name: {S: goal.name},
      description: {S: goal.description},
      date: {S: goal.date},
      amount: {N: goal.amount.toString()}
    }
  });

  if (resp.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to create goal'} as Exception;
  } else {
    return goalId;
  }
}

async function getAllGoals(userId: string): Promise<Goal[]> {
  const resp = await ddb.query({
    TableName: GOALS_TABLE,
    ExpressionAttributeValues: {
      ':id': {S: userId},
    },
    KeyConditionExpression: 'userId = :id',
  });

  if (resp.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to get goals'} as Exception;
  } else {
    return resp.Items?.map((item) => ({
      goalId: item.goalId.S,
      userId: item.userId.S || '',
      name: item.name.S || '',
      description: item.description.S || '',
      date: item.date.S || '',
      amount: parseInt(item.amount.N || '0')
    })) || [];
  }
}

async function getGoal(goalId: string, userId: string): Promise<Goal> {
  const resp = await ddb.getItem({
    TableName: GOALS_TABLE,
    Key: {
      goalId: {S: goalId},
      userId: {S: userId}
    }
  });

  if (resp.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to get goal'} as Exception;
  } else if (!resp.Item) {
    throw {status: 404, message: 'Goal not found'} as Exception;
  } else {
    return {
      goalId: resp.Item?.goalId.S,
      userId: resp.Item?.userId.S || '',
      name: resp.Item?.name.S || '',
      description: resp.Item?.description.S || '',
      date: resp.Item?.date.S || '',
      amount: parseInt(resp.Item?.amount.N || '0')
    };
  }
}

async function deleteGoal(goalId: string, userId: string): Promise<void> {
  const resp = await ddb.deleteItem({
    TableName: GOALS_TABLE,
    Key: {
      goalId: {S: goalId},
      userId: {S: userId}
    }
  });

  if (resp.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to delete goal'} as Exception;
  }
}

async function updateGoal(goal: Goal): Promise<void> {
  if (!goal.goalId) {
    throw {status: 400, message: 'Goal id is required'} as Exception;
  }
  const resp = await ddb.updateItem({
    TableName: GOALS_TABLE,
    Key: {
      goalId: {S: goal.goalId},
      userId: {S: goal.userId}
    },
    UpdateExpression: 'set #name = :name, #description = :description, #date = :date, #amount = :amount',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#description': 'description',
      '#date': 'date',
      '#amount': 'amount'
    },
    ExpressionAttributeValues: {
      ':name': {S: goal.name},
      ':description': {S: goal.description},
      ':date': {S: goal.date},
      ':amount': {N: goal.amount.toString()}
    },
  });

  if (resp.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to update goal'} as Exception;
  }
}

const goalDAO = {
  createGoal,
  getAllGoals,
  getGoal,
  deleteGoal,
  updateGoal
};
export default goalDAO;