import ddb from '../db/dynamodb';
import { USERS_TABLE } from "../constants/constants";
import { Exception, User, UserInfo } from '../model/objects';

async function doesUserExist(userId: string): Promise<boolean> {
  const resp = await ddb.getItem({
    TableName: USERS_TABLE,
    Key: {
      userId: {S: userId}
    }
  });
  return !!resp.Item;
}

async function createUser(user: User): Promise<UserInfo> {
  const resp = await ddb.putItem({
    TableName: USERS_TABLE,
    Item: {
      userId: {S: user.userId},
      firstName: {S: user.firstName},
      lastName: {S: user.lastName},
      password: {S: user.password}
    }
  });

  if (resp.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to create user'} as Exception;
  } else {
    return {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName
    };
  }
}

async function getUser(userId: string, password: string): Promise<UserInfo> {
  const resp = await ddb.getItem({
    TableName: USERS_TABLE,
    Key: {
      userId: {S: userId}
    }
  });
  if (resp.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to get user'} as Exception;
  } else if (resp.Item?.password.S !== password) {
    throw {status: 401, message: 'Invalid password'} as Exception;
  } else {
    return {
      userId: resp.Item?.userId.S || '',
      firstName: resp.Item?.firstName.S || '',
      lastName: resp.Item?.lastName.S || ''
    };
  }
}

async function deleteUser(userId: string): Promise<void> {
  const resp = await ddb.deleteItem({
    TableName: USERS_TABLE,
    Key: {
      userId: {S: userId}
    }
  });
  if (resp.$metadata.httpStatusCode !== 200) {
    throw {status: 500, message: 'Failed to delete user'} as Exception;
  }
}

const userDAO = {
  doesUserExist,
  createUser,
  getUser,
  deleteUser
};
export default userDAO;