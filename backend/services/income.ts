import { CreateIncome } from "../dao/income"
import { Income } from "../model/objects"

export async function createIncome(income: Income): Promise<Income> {
    return await CreateIncome(income);
}