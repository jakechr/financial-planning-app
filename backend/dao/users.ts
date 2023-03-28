import ddb from '../db/dynamodb';
import { USERS_TABLE } from "../constants/constants";
import { Exception, User, UserInfo } from '../model/objects';

export async function doesUserExist(userId: string): Promise<boolean> {
  const item = await ddb.getItem({
    TableName: USERS_TABLE,
    Key: {
      userId: {S: userId}
    }
  });
  return !!item.Item;
}

export async function createUser(user: User): Promise<UserInfo> {
  const item = await ddb.putItem({
    TableName: USERS_TABLE,
    Item: {
      userId: {S: user.userId},
      firstName: {S: user.firstName},
      lastName: {S: user.lastName},
      password: {S: user.password}
    }
  });

  if (item.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to create user'} as Exception;
  } else {
    return {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName
    };
  }
}

export async function getUser(userId: string, password: string): Promise<UserInfo> {
  const item = await ddb.getItem({
    TableName: USERS_TABLE,
    Key: {
      userId: {S: userId}
    }
  });
  if (item.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to get user'} as Exception;
  } else if (item.Item?.password.S !== password) {
    throw {status: 401, message: 'Invalid password'} as Exception;
  } else {
    return {
      userId: item.Item?.userId.S || '',
      firstName: item.Item?.firstName.S || '',
      lastName: item.Item?.lastName.S || ''
    };
  }
}

export async function deleteUser(userId: string): Promise<void> {
  const item = await ddb.deleteItem({
    TableName: USERS_TABLE,
    Key: {
      userId: {S: userId}
    }
  });
  if (item.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to delete user'} as Exception;
  }
}