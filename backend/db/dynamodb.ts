import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { AWS_REGION } from '../constants/constants';

export default new DynamoDB({ region: AWS_REGION });