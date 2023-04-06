import {v4 as uuidv4} from 'uuid';
import ddb from '../db/dynamodb';
import { EXPENSE_TABLE } from "../constants/constants";
import { Exception, Expense } from '../model/objects';

async function dbCreateExpense(expense: Expense): Promise<string> {
    const expenseId = uuidv4();
    const resp = await ddb.putItem({
        TableName: EXPENSE_TABLE,
        Item: {
            expenseId: {S: expenseId},
            userId: {S: expense.userId},
            name: {S: expense.name},
            description: {S: expense.description},
            date: {S: expense.date},
            amount: {N: expense.amount.toString()}
        }
    });

    if (resp.$metadata.httpStatusCode !== 200) {
        throw {status: 500, message: 'Failed to create expense'} as Exception;
    } else {
        return expenseId;
    }
}

async function dbGetAllExpenses(userId: string): Promise<Expense[]> {
    const resp = await ddb.query({
        TableName: EXPENSE_TABLE,
        ExpressionAttributeValues: {
            ':id': {S: userId},
        },
        KeyConditionExpression: 'userId = :id',
    });

    if (resp.$metadata.httpStatusCode !== 200) {
        throw {status: 500, message: 'Failed to get expenses'} as Exception;
    } else {
        return resp.Items?.map((item) => ({
            expenseId: item.expenseId.S,
            userId: item.userId.S || '',
            name: item.name.S || '',
            description: item.description.S || '',
            date: item.date.S || '',
            amount: parseInt(item.amount.N || '0')
        })) || [];
    }
}

async function dbGetExpense(expenseId: string, userId: string): Promise<Expense> {
    const resp = await ddb.getItem({
        TableName: EXPENSE_TABLE,
        Key: {
            expenseId: {S: expenseId},
            userId: {S: userId}
        }
    });

    if (resp.$metadata.httpStatusCode !== 200) {
        throw {status: 500, message: 'Failed to get expense'} as Exception;
    } else if (!resp.Item) {
        throw {status: 404, message: 'Expense not found'} as Exception;
    } else {
        return {
            expenseId: resp.Item?.expenseId.S,
            userId: resp.Item?.userId.S || '',
            name: resp.Item?.name.S || '',
            description: resp.Item?.description.S || '',
            date: resp.Item?.date.S || '',
            amount: parseInt(resp.Item?.amount.N || '0')
        };
    }
}

async function dbUpdateExpense(expense: Expense): Promise<void> {
    if (!expense.expenseId) {
        throw {status: 400, message: 'Expense id is required'} as Exception;
    }
    const resp = await ddb.updateItem({
        TableName: EXPENSE_TABLE,
        Key: {
            expenseId: {S: expense.expenseId},
            userId: {S: expense.userId}
        },
        UpdateExpression: 'set #name = :name, #description = :description, #date = :date, #amount = :amount',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#description': 'description',
            '#date': 'date',
            '#amount': 'amount'
        },
        ExpressionAttributeValues: {
            ':name': {S: expense.name},
            ':description': {S: expense.description},
            ':date': {S: expense.date},
            ':amount': {N: expense.amount.toString()}
        },
    });

    if (resp.$metadata.httpStatusCode !== 200) {
        throw {status: 500, message: 'Failed to update expense'} as Exception;
    }
}

async function dbDeleteExpense(expenseId: string, userId: string): Promise<void> {
    const resp = await ddb.deleteItem({
        TableName: EXPENSE_TABLE,
        Key: {
            expenseId: {S: expenseId},
            userId: {S: userId}
        }
    });

    if (resp.$metadata.httpStatusCode !== 200) {
        throw {status: 500, message: 'Failed to delete expense'} as Exception;
    }
}

const expenseDAO = {
    dbCreateExpense,
    dbGetAllExpenses,
    dbGetExpense,
    dbUpdateExpense,
    dbDeleteExpense
};

export default expenseDAO;