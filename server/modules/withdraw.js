function withdraw(account, amount) {
    if (account.balance < amount) {
        return { message: 'Error, not enough money.' };
    } else {
        account.balance -= amount;
        return { message: 'Money withdrawn.' };
    }
}

module.exports = withdraw;