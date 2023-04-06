import userDAO from "../dao/users";
import { User, UserInfo, Exception } from "../model/objects";

async function register(user: User): Promise<UserInfo> {
  if(await userDAO.doesUserExist(user.userId)) {
    throw {status: 400, message: 'User already exists'} as Exception;
  }
  return await userDAO.createUser(user);
}

async function login(username: string, password: string): Promise<UserInfo> {
  return await userDAO.getUser(username, password);
}

async function deleteUser(username: string): Promise<void> {
  return await userDAO.deleteUser(username);
}

const userService = {
  register,
  login,
  deleteUser
};
export default userService;