$(document).ready(init);

function init() {
    console.log('DOM is Ready');
    $('.js-btn-deposit').on('click', onClickDeposit);
    $('.js-btn-withdraw').on('click', onClickWithdraw);

    // get account balance and show on DOM
    getAccountBalance();
}

//
// EVENT HANDLERS
// ------------------------------

function onClickDeposit(event) {
    const $depositField = $('.js-field-deposit');
    let depositAmount = $depositField.val();
    $depositField.val('');

    // exit early if no value was entered
    if (!depositAmount) {
        return false;
    }

    depositAmount = parseFloat(depositAmount);
    console.log('Deposit amount: ', depositAmount);
    // pull deposit amount from field and send to server
    postDeposit(depositAmount);
}

function onClickWithdraw(event) {
    const $withdrawField = $('.js-field-withdraw');
    let withdrawAmount = $withdrawField.val();
    $withdrawField.val('');
    
    if (!withdrawAmount) {
        return false;
    }
    withdrawAmount = parseFloat(withdrawAmount);
    console.log('Withdraw amount: ', withdrawAmount);
    postWithdraw(withdrawAmount);
}

//
// AJAX CALLS
// ------------------------------

function getAccountBalance() {
    // make AJAX request for account balance
    $.ajax({
        method: 'GET',
        url: '/api/balance',
    })
    .then(function(response) {
        // successful GET response
        console.log('GET response: ', response);
        render(response);
    })
    .catch(function(err) {
        console.log('err: ', err);
        // error from GET response
        alert('There was an error retrieving your account balance.');
    });
}

function postDeposit(deposit) {
    const data = {
        deposit: deposit,
    };
    console.log('postDeposit - data: ', data);
    $.ajax({
        method: 'POST',
        url: '/api/deposit',
        data: JSON.stringify(data),
        header: {
            'Content-Type': 'application/json', 
        },
    })
    .then(function(response) {
        // successful POST response
        console.log('POST response: ', response);
        getAccountBalance();
    })
    .catch(function(err) {
        console.log('err: ', err);
        // error from POST response
        alert('There was an error with your deposit.');
    });
}

function postWithdraw(withdraw) {
    const data = {
        deposit: withdraw,
    };
    console.log('postWithdraw - data: ', data);
    $.ajax({
        method: 'POST',
        url: '/api/withdraw',
        data: JSON.stringify(data),
        header: {
            'Content-Type': 'application/json', 
        },
    })
    .then(function(response) {
        // successful POST response
        console.log('POST response: ', response);
        getAccountBalance();
    })
    .catch(function(err) {
        console.log('err: ', err);
        // error from POST response
        alert('There was an error with your deposit.');
    });
}

//
// VIEW UPDATES
// ------------------------------

function render(account) {
    const $balance = $('.js-balance');
    
    $balance.empty();
    $balance.append(`
        <strong>$${account.balance}</strong>
    `);
}
