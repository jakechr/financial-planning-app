import incomeDAO from "../dao/income"
import { Income } from "../model/objects"

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

function verifyIncomeDate(date: string): boolean {
    if (!date)
        return false;

    const dateParts = date.split('/').map((part) => parseInt(part));
    if (dateParts.length !== 2) {
        return false;
    }
    if (dateParts[0] > 12 || dateParts[0] < 1) {
        return false;
    }

    return dateParts[2] >= 0;
}

const incomeService = {
    createIncome,
    updateIncome,
    deleteIncome,
    getIncome,
    getAllIncomes,
    verifyIncomeDate
};

export default incomeService;