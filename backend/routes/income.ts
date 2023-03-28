import asyncHandler from "./utils/asyncHandler";
import Express, { Request, Response } from 'express';
import { Exception, Income } from "../model/objects";
import {} from "../services/income";
import { jwtSigner } from "./utils/auth";
const router = Express.Router();

router.post('/income/create', asyncHandler(async (req: Request, res: Response) => {

}));

router.post('/income/update/{incomeId}', asyncHandler(async (req: Request, res: Response) => {

}));

router.delete('/income/delete/{incomeId}', asyncHandler(async (req: Request, res: Response) => {

}));

router.get('/income/get/{incomeId}', asyncHandler(async (req: Request, res: Response) => {

}));