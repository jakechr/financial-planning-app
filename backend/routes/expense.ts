import asyncHandler from "./utils/asyncHandler";
import Express, { Response } from 'express';
import {Exception, JWTRequest} from "../model/objects";
import expenseService from "../services/expense";
import dateService from "../services/date";
const router = Express.Router();

router.post('/', asyncHandler(async (req: JWTRequest, res: Response) => {
    if(!req.body.name || !req.body.description || !req.body.amount || !dateService.verifyMonthYearFormat(req.body.date)) {
        throw {status: 400, message: 'Missing or invalid required fields'} as Exception;
    }

    const expenseId = await expenseService.createExpense({
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        userId: req.user.userId
    });
    res.send(expenseId);
}));

router.put(':expenseId', asyncHandler(async (req: JWTRequest, res: Response) => {
    if(!req.body.name || !req.body.description || !req.body.amount || !dateService.verifyMonthYearFormat(req.body.date)) {
        throw {status: 400, message: 'Missing or invalid required fields'} as Exception;
    }

    await expenseService.updateExpense({
        expenseId: req.body.expenseId,
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        userId: req.user.userId
    });
    res.send();
}));

router.delete(':expenseId', asyncHandler(async (req: JWTRequest, res: Response) => {
    await expenseService.deleteExpense(req.params.expenseId, req.user.userId);
    res.send();
}));

router.get('/', asyncHandler(async (req: JWTRequest, res: Response) => {
    let expense = await expenseService.getAllExpenses(req.user.userId);
    res.send(expense);
}));

router.get('/:expenseId', asyncHandler(async (req: JWTRequest, res: Response) => {
    let expense = await expenseService.getExpense(req.params.expenseId, req.user.userId);
    res.send(expense);
}));

export default router;