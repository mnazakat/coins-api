# coins-api

This is a simple Node.js API for managing user transactions using SQLite.The API Supports deposit, withdraw, and transfer operations, and allows fetching transactions by their status (active or inactive)

API ENDPOINTS

DEPOSIT

URL: /transactions/deposit

Method: POST
Payload: 

{
    "userId": 1,
    "amount": 200
}

curl -X POST http://localhost:3000/transactions/deposit \
-H "Content-Type: application/json" \
-d '{
    "userId": 1,
    "amount": 200
}'

Withdraw
URL: /transactions/withdraw
Method: POST
Payload:

json
{
    "userId": 1,
    "amount": 100
}

curl -X POST http://localhost:3000/transactions/withdraw \
-H "Content-Type: application/json" \
-d '{
    "userId": 1,
    "amount": 100
}'


Transfer

URL: /transactions/transfer
Method: POST
Payload:
json
{
    "fromUserId": 1,
    "toUserId": 2,
    "amount": 50
}

curl -X POST http://localhost:3000/transactions/transfer \
-H "Content-Type: application/json" \
-d '{
    "fromUserId": 1,
    "toUserId": 2,
    "amount": 50
}'


Get Transactions by User ID

URL: /transactions/:userId
Method: GET

curl -X GET http://localhost:3000/transactions/1


Get Active Transactions

URL: /transactions/status/active
Method: GET
cURL Command:

curl -X GET http://localhost:3000/transactions/status/active


Get All Transactions
URL: /transactions
Method: GET
cURL Command:
curl -X GET http://localhost:3000/transactions



Update Transaction Status

URL: /transactions/status
Method: PUT
Payload:
json
Copy code
{
    "transactionId": 1,
    "status": "inactive"
}
cURL Command:

curl -X PUT http://localhost:3000/transactions/status \
-H "Content-Type: application/json" \
-d '{
    "transactionId": 1,
    "status": "inactive"
}'


