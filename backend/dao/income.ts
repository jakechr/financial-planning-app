import ddb from '../db/dynamodb';
import { INCOME_TABLE } from "../constants/constants";
import { Exception, Income } from '../model/objects';

export async function dbCreateIncome(income: Income): Promise<Income> {

}

export async function dbUpdateIncome(income: Income): Promise<Income> {

}

export async function dbDeleteIncome(income: Income): Promise<void> {

}

export async function dbGetIncome(incomeId: string, userId: string): Promise<Income> {
    const item = await ddb.getItem({
        TableName: INCOME_TABLE,
        Key: {
            incomeId: {S: incomeId},
            userId: {S: userId}
        }
    });
    return item.Item;
}