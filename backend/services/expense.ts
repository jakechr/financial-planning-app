import expenseDAO from "../dao/expense"
import { Expense } from "../model/objects"

async function createExpense(expense: Expense): Promise<string> {
    return await expenseDAO.dbCreateExpense(expense);
}

async function updateExpense(expense: Expense): Promise<void> {
    return await expenseDAO.dbUpdateExpense(expense);
}

async function deleteExpense(expenseId: string, userId: string): Promise<void> {
    return await expenseDAO.dbDeleteExpense(expenseId, userId);
}

async function getExpense(expenseId: string, userId: string): Promise<Expense> {
    return await expenseDAO.dbGetExpense(expenseId, userId);
}

async function getAllExpenses(userId: string): Promise<Expense[]> {
    return await expenseDAO.dbGetAllExpenses(userId);
}

const expenseService = {
    createExpense,
    updateExpense,
    deleteExpense,
    getExpense,
    getAllExpenses
};

export default expenseService;