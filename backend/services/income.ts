import { dbCreateIncome, dbUpdateIncome, dbDeleteIncome, dbGetIncome } from "../dao/income"
import { Income } from "../model/objects"

export async function createIncome(income: Income): Promise<Income> {
    return await dbCreateIncome(income);
}

export async function updateIncome(income: Income): Promise<Income> {
    return await dbUpdateIncome(income);
}

export async function deleteIncome(income: Income): Promise<void> {
    return await dbDeleteIncome(income);
}

export async function getIncome(incomeId: string, userId: string): Promise<Income> {
    return await dbGetIncome(incomeId, userId);
}