import { createUser, doesUserExist, getUser, deleteUser as dbDeleteUser } from "../dao/users";
import { User, UserInfo, Exception } from "../model/objects";

export async function register(user: User): Promise<UserInfo> {
  if(await doesUserExist(user.userId)) {
    throw {status: 400, message: 'User already exists'} as Exception;
  }
  return await createUser(user);
}

export async function login(username: string, password: string): Promise<UserInfo> {
  return await getUser(username, password);
}

export async function deleteUser(username: string): Promise<void> {
  return await dbDeleteUser(username);
}