const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const withdraw = require('./modules/withdraw');

const account = {
    name: 'Phillip Thatcher',
    account_number: '12345',
    balance: 1000
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/balance', (req, res) => {
    res.send({
        balance: account.balance
    })
});

app.post('/api/withdraw', (req, res) => {
    res.send(withdraw(account, req.body.withdraw));
})

app.post('/api/deposit', (req, res) => {
    const deposit = req.body.deposit;
    account.balance += deposit;
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})