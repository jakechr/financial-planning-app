import { JWT } from "../model/objects";
import fs from 'fs';

export const AWS_REGION = 'us-west-2';
export const USERS_TABLE = 'CS501R_financial_planning_users';
export const INCOME_TABLE = 'CS501R_financial_planning_income';
export const GOALS_TABLE = 'CS501R_financial_planning_goals';

export const jwt = loadJwt();

function loadJwt(): JWT {
  const JWT_PUBLIC_KEY = './keypair/public.pem';
  const JWT_PRIVATE_KEY = './keypair/private.pem';
  let public_key;
  let private_key;

  // private key
  if(fs.existsSync(JWT_PRIVATE_KEY)) {
    private_key = fs.readFileSync(JWT_PRIVATE_KEY);
  } else {
    throw "Missing private key. See the README for instructions on how to generate it.";
  }

  // public key
  if(fs.existsSync(JWT_PUBLIC_KEY)) {
    public_key = fs.readFileSync(JWT_PUBLIC_KEY);
  } else {
    throw "Missing public key. See the README for instructions on how to generate it.";
  }
  return {public_key: public_key, private_key: private_key};
}
