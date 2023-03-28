# This file is used to create the DynamoDB tables
# AWS free tier allows for 25 read and 25 write capacity units, so spread them out among the tables
# Currently using:
# 2 read and 2 write capacity units for the Users table
# 4 read and 2 write capacity units for the Goals table
# 8 read and 2 write capacity units for the Income table
# 8 read and 2 write capacity units for the Expenses table


terraform {
  required_version = ">= 1.2.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_dynamodb_table" "users" {
  name           = "CS501R_financial_planning_users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "userId"

  attribute {
    name = "userId" # This will be email address for now
    type = "S"
  }

  # Other attributes: firstName, lastName, password
  # These do not need to be set through terraform. Only set indexes

  tags = {
    Name        = "cs501r-financial-planning-users"
    Environment = "dev"
  }
}

resource "aws_dynamodb_table" "goals" {
  name           = "CS501R_financial_planning_goals"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "goalId"
  range_key      = "userId"

  attribute {
    name = "goalId"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

  # Other attributes: name, description, amount, date

  tags = {
    Name        = "cs501r-financial-planning-goals"
    Environment = "dev"
  }
}

resource "aws_dynamodb_table" "income" {
  name           = "CS501R_financial_planning_income"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "incomeId"
  range_key      = "userId"

  attribute {
    name = "incomeId"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

  # Other attributes: date, amount, description

  tags = {
    Name        = "cs501r-financial-planning-income"
    Environment = "dev"
  }
}

resource "aws_dynamodb_table" "expenses" {
  name           = "CS501R_financial_planning_expenses"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "expenseId"
  range_key      = "userId"

  attribute {
    name = "expenseId"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

  # Other attributes: date, amount, description

  tags = {
    Name        = "cs501r-financial-planning-expenses"
    Environment = "dev"
  }
}
