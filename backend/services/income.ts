import incomeDAO from "../dao/income"
import { Income } from "../model/objects"

const MONTH: number = 0;
const YEAR: number = 1;

async function createIncome(income: Income): Promise<string> {
    return await incomeDAO.dbCreateIncome(income);
}

async function updateIncome(income: Income): Promise<void> {
    return await incomeDAO.dbUpdateIncome(income);
}

async function deleteIncome(incomeId: string, userId: string): Promise<void> {
    return await incomeDAO.dbDeleteIncome(incomeId, userId);
}

async function getIncome(incomeId: string, userId: string): Promise<Income> {
    return await incomeDAO.dbGetIncome(incomeId, userId);
}

async function getAllIncomes(userId: string): Promise<Income[]> {
    return await incomeDAO.dbGetAllIncomes(userId);
}

const incomeService = {
    createIncome,
    updateIncome,
    deleteIncome,
    getIncome,
    getAllIncomes
};

export default incomeService;