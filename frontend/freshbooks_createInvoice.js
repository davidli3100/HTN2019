// Create an invoice billed to OHIP

const amount = 77.20;
const expenseName = "General Consultation";
const appointmentDate = "2019-09-30";
const invoiceEndpoint = "https://api.freshbooks.com/accounting/account/Pdowla/invoices/invoices";
const phoneNumber = "6471231234";
const invoiceBody = {
  "invoice": {
    "email": "ohip@ontario.ca",
    "customerid": 15536, // "client" is OHIP (hardcoded value because we only have 1 client rn)
    "create_date": appointmentDate,
    "lines": [
      {
        "type": 0,
        "description": phoneNumber,
        "taxName1": "",
        "taxAmount1": 0,
            "name": expenseName,
        "qty": 1,
        "unit_cost": {
            "amount": amount,
            "code": "CAD"
        }
      }
    ]
  }
};

createInvoice(invoiceEndpoint, invoiceBody)
  .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
  .catch(error => console.error(error));

function createInvoice(url = '', data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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