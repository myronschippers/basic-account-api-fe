$(document).ready(init);

function init() {
    console.log('DOM is Ready');

    // get account balance and show on DOM
    getAccountBalance();
}

function getAccountBalance() {
    // make AJAX request for account balance
    $.ajax({
        method: 'GET',
        url: '/api/balance',
    })
    .then(function(response) {
        // successful GET response
        console.log('response: ', response);
        render(response);
    })
    .catch(function(err) {
        console.log('err: ', err);
        // error from GET response
        alert('There was an error retrieving your account balance.');
    });
}

function render(account) {
    const $balance = $('.js-balance');

    $balance.append(`
        <strong>$${account.balance}</strong>
    `);
}
