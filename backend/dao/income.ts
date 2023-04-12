import {v4 as uuidv4} from 'uuid';
import ddb from '../db/dynamodb';
import { INCOME_TABLE } from "../constants/constants";
import { Exception, Income } from '../model/objects';

async function dbCreateIncome(income: Income): Promise<string> {
    const incomeId = uuidv4();
    const resp = await ddb.putItem({
        TableName: INCOME_TABLE,
        Item: {
            incomeId: {S: incomeId},
            userId: {S: income.userId},
            name: {S: income.name},
            description: {S: income.description},
            date: {S: income.date},
            amount: {N: income.amount.toString()}
        }
    });

    if (resp.$metadata.httpStatusCode !== 200) {
        throw {status: 500, message: 'Failed to create income'} as Exception;
    } else {
        return incomeId;
    }
}

async function dbGetAllIncomes(userId: string): Promise<Income[]> {
    const resp = await ddb.query({
        TableName: INCOME_TABLE,
        ExpressionAttributeValues: {
            ':id': {S: userId},
        },
        KeyConditionExpression: 'userId = :id',
    });

    if (resp.$metadata.httpStatusCode !== 200) {
        throw {status: 500, message: 'Failed to get incomes'} as Exception;
    } else {
        return resp.Items?.map((item) => ({
            incomeId: item.incomeId.S,
            userId: item.userId.S || '',
            name: item.name.S || '',
            description: item.description.S || '',
            date: item.date.S || '',
            amount: parseInt(item.amount.N || '0')
        })) || [];
    }
}

async function dbGetIncome(incomeId: string, userId: string): Promise<Income> {
    const resp = await ddb.getItem({
        TableName: INCOME_TABLE,
        Key: {
            incomeId: {S: incomeId},
            userId: {S: userId}
        }
    });

    if (resp.$metadata.httpStatusCode !== 200) {
        throw {status: 500, message: 'Failed to get income'} as Exception;
    } else if (!resp.Item) {
        throw {status: 404, message: 'Income not found'} as Exception;
    } else {
        return {
            incomeId: resp.Item?.incomeId.S,
            userId: resp.Item?.userId.S || '',
            name: resp.Item?.name.S || '',
            description: resp.Item?.description.S || '',
            date: resp.Item?.date.S || '',
            amount: parseInt(resp.Item?.amount.N || '0')
        };
    }
}

async function dbUpdateIncome(income: Income): Promise<void> {
    if (!income.incomeId) {
        throw {status: 400, message: 'Income id is required'} as Exception;
    }
    const resp = await ddb.updateItem({
        TableName: INCOME_TABLE,
        Key: {
            incomeId: {S: income.incomeId},
            userId: {S: income.userId}
        },
        UpdateExpression: 'set #name = :name, #description = :description, #date = :date, #amount = :amount',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#description': 'description',
            '#date': 'date',
            '#amount': 'amount'
        },
        ExpressionAttributeValues: {
            ':name': {S: income.name},
            ':description': {S: income.description},
            ':date': {S: income.date},
            ':amount': {N: income.amount.toString()}
        },
    });

    if (resp.$metadata.httpStatusCode !== 200) {
        throw {status: 500, message: 'Failed to update income'} as Exception;
    }
}

async function dbDeleteIncome(incomeId: string, userId: string): Promise<void> {
    const resp = await ddb.deleteItem({
        TableName: INCOME_TABLE,
        Key: {
            incomeId: {S: incomeId},
            userId: {S: userId}
        }
    });

    if (resp.$metadata.httpStatusCode !== 200) {
        throw {status: 500, message: 'Failed to delete income'} as Exception;
    }
}

const incomeDAO = {
    dbCreateIncome,
    dbGetAllIncomes,
    dbGetIncome,
    dbUpdateIncome,
    dbDeleteIncome
};

export default incomeDAO;