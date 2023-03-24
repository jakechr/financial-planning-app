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
