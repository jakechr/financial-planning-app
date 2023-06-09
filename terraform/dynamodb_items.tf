# This file creates mock data for the dynamoDB tables

resource "aws_dynamodb_table_item" "sample-user" {
  table_name = aws_dynamodb_table.users.name
  hash_key   = aws_dynamodb_table.users.hash_key

  item = <<ITEM
{
  "userId": {"S": "sample"},
  "firstName": {"S": "Bob"},
  "lastName": {"S": "Jones"},
  "password": {"S": "password"}
}
ITEM
}

resource "aws_dynamodb_table_item" "sample-income" {
  table_name = aws_dynamodb_table.income.name
  hash_key   = aws_dynamodb_table.income.hash_key
  range_key  = aws_dynamodb_table.income.range_key

  item = <<ITEM
{
  "incomeId": {"S": "sampleId"},
  "userId": {"S": "sample"},
  "name": {"S": "Sample Income"},
  "date": {"S": "3/23"},
  "amount": {"N": "1000"},
  "description": {"S": "This is the salary from my job."}
}
ITEM
}

resource "aws_dynamodb_table_item" "sample-goal" {
  table_name = aws_dynamodb_table.goals.name
  hash_key   = aws_dynamodb_table.goals.hash_key
  range_key  = aws_dynamodb_table.goals.range_key

  item = <<ITEM
{
  "goalId": {"S": "subaru-outback"},
  "name": {"S": "Buy a used car"},
  "userId": {"S": "sample"},
  "date": {"S": "4/29/23"},
  "amount": {"N": "15000"},
  "description": {"S": "Save up for a used Subaru Outback."}
}
ITEM
}
