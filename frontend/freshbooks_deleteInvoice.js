// Create an invoice billed to OHIP

var listOfInvoices = "Asdasd";
const invoiceId = 123213;
const phoneNumber = "6471231234";
const deleteEndpoint = `https://api.freshbooks.com/accounting/account/Pdowla/invoices/invoices/${invoiceId}`;
const listInvoiceEndpoint = "https://api.freshbooks.com/accounting/account/Pdowla/invoices/invoices"
const deleteBody = {
  "invoice": {
    "vis_state": 1
  }
};


function findInvoice() {
  // for (var i = 0; i < listOfInvoices.response.result.invoices.length; i++) {
  //   console.log(listOfInvoices.response.result.invoices[i].description);
  // }
  listInvoice(listInvoiceEndpoint)
    .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
}



// deleteInvoice(deleteEndpoint, deleteBody)
//   .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
//   .catch(error => console.error(error));

function listInvoice(url = '') {
  // Default options are marked with *
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ee66e3250c752fe6a21c53e09ecebd0581212ad0cb47002a31f7034c550a77b0'
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then(response => response.json())
    .catch(error => console.log(error)); // parses JSON response into native JavaScript objects 
}

fetch(listInvoiceEndpoint,
  {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ee66e3250c752fe6a21c53e09ecebd0581212ad0cb47002a31f7034c550a77b0'
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
  .then(function (response) {
    //callback(response.json());
    return response.json();
  })
  .then(function (myJson) {
    listOfInvoices = myJson;
    console.log(listOfInvoices);
  });


findInvoice();
//console.log(listOfInvoices);
function callback(response) {
  console.log(response);
  listOfInvoices = response;
}

function deleteInvoice(url = '', data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ee66e3250c752fe6a21c53e09ecebd0581212ad0cb47002a31f7034c550a77b0'
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(response => response.json()); // parses JSON response into native JavaScript objects 
}