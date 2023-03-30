import asyncHandler from "./utils/asyncHandler";
import Express, { Request, Response } from 'express';
import {Exception, Income, JWTRequest} from "../model/objects";
import { createIncome, updateIncome, deleteIncome, getIncome } from "../services/income";
import { jwtSigner } from "./utils/auth";
const router = Express.Router();

router.post('/create', asyncHandler(async (req: JWTRequest, res: Response) => {

}));

router.post('/update/:incomeId', asyncHandler(async (req: JWTRequest, res: Response) => {

}));

router.delete('/delete/:incomeId', asyncHandler(async (req: JWTRequest, res: Response) => {

}));

router.get('/get/:incomeId', asyncHandler(async (req: JWTRequest, res: Response) => {
    let income = await getIncome(req.params.userId, req.user.userId);
    res.send(income);
}));

export default router;