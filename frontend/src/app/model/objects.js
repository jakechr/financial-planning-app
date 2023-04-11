
export class User {
  userId
  firstName
  lastName
  password
}

// Date is of the form {MONTH}/{YEAR}, ex. 2/23
export class Income {
  incomeId
  userId
  name
  date
  amount
  description
}

// Date is of the form {MONTH}/{YEAR}, ex. 2/23
export class Expense {
  expenseId
  userId
  name
  date
  amount
  description
}

// Date is of the form {MONTH}/{DAY}/{YEAR}, ex. 4/28/23
export class Goal {
  goalId
  userId
  name
  date
  amount
  description
}