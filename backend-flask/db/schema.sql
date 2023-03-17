CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

export CONNECTION_URL="postgresql://postgres:password@localhost:5432/cruddur"
gp env CONNECTION_URL="postgresql://postgres:password@localhost:5432/cruddur"

export PROD_CONNECTION_URL="cruddurroot:goodDataPassword1@cruddur-db-instance.cj7u8ryrxt2b.eu-west-2.rds.amazonaws.com:5432/cruddur"
gp env PROD_CONNECTION_URL="cruddurroot:goodDataPassword1@cruddur-db-instance.cj7u8ryrxt2b.eu-west-2.rds.amazonaws.com:5432/cruddur"
