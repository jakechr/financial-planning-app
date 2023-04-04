import asyncHandler from "./utils/asyncHandler";
import Express, { Response } from 'express';
import {Exception, JWTRequest} from "../model/objects";
import incomeService from "../services/income";
const router = Express.Router();

router.post('/', asyncHandler(async (req: JWTRequest, res: Response) => {
    if(!req.body.name || !req.body.description || !req.body.amount || !incomeService.verifyIncomeDate(req.body.date)) {
        throw {status: 400, message: 'Missing or invalid required fields'} as Exception;
    }

    const goalId = await incomeService.createIncome({
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        userId: req.user.userId
    });
    res.send(goalId);
}));

router.put(':incomeId', asyncHandler(async (req: JWTRequest, res: Response) => {
    if(!req.body.name || !req.body.description || !req.body.amount || !incomeService.verifyIncomeDate(req.body.date)) {
        throw {status: 400, message: 'Missing or invalid required fields'} as Exception;
    }

    await incomeService.updateIncome({
        incomeId: req.body.incomeId,
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        userId: req.user.userId
    });
    res.send();
}));

router.delete(':incomeId', asyncHandler(async (req: JWTRequest, res: Response) => {
    await incomeService.deleteIncome(req.params.incomeId, req.user.userId);
    res.send();
}));

router.get('/', asyncHandler(async (req: JWTRequest, res: Response) => {
    let income = await incomeService.getAllIncomes(req.user.userId);
    res.send(income);
}));

router.get('/:incomeId', asyncHandler(async (req: JWTRequest, res: Response) => {
    let income = await incomeService.getIncome(req.params.incomeId, req.user.userId);
    res.send(income);
}));

export default router;