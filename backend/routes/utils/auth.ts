import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Exception, JWTRequest, UserInfo } from '../../model/obects';
import { jwt as serverJWT } from '../../constants/constants';


/**
 * Auth middleware for routes that require an authenticated user
 */
export function authenticatedUser(req: JWTRequest, _: Response, next: NextFunction) {
  verifyJWT(req);
  next();
}

export function jwtSigner(user: UserInfo) {
  if(!serverJWT) {
    console.error('JWT Error: Could not load keypair');
    throw {status: 500, message: 'JWT Error: Could not load keypair'} as Exception;
  }
  return jwt.sign(user, serverJWT.private_key, {algorithm: 'RS256'});
}

function verifyJWT(req: JWTRequest) {
  let token = req.header('Authorization')
  if(!token)
    throw {status: 401, message: 'JWT required for this route'} as Exception;
  if(!serverJWT) {
    console.error('JWT Error: Could not load keypair');
    throw {status: 500, message: 'JWT Error: Could not load keypair'} as Exception;
  }
  try {
    let verified_token = jwt.verify(token, serverJWT.public_key)
    req.user = (verified_token as UserInfo);
  } catch(err) {
    console.error('JWT Error: Could not verify token', err);
    throw {status: 401};
  }
}