$(document).ready(init);

function init() {
    console.log('DOM is Ready');
    $('.js-btn-deposit').on('click', onClickDeposit);

    // get account balance and show on DOM
    getAccountBalance();
}

//
// EVENT HANDLERS
// ------------------------------

function onClickDeposit(event) {
    let depositAmount = $('.js-field-deposit').val();

    // exit early if no value was entered
    if (!depositAmount) {
        return false;
    }

    depositAmount = parseFloat(depositAmount);
    console.log('Deposit amount: ', depositAmount);
    // pull deposit amount from field and send to server
    postDeposit(depositAmount);
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
        data: data,
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
