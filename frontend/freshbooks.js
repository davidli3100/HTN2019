// Create an invoice billed to OHIP

function createInvoice(amount) {
    const invoice = async () => {
        const response = await fetch('https://api.freshbooks.com/accounting/account/Pdowla/invoices/invoices', {
            method: 'POST',
            body: {
                "invoice": {
                  "email": "ohip@ontario.ca",
                  "customerid": 15536,
                  "create_date": "2019-09-14",
                  "lines": [
                    {
                      "type": 0,
                      "description": "",
                      "taxName1": "",
                      "taxAmount1": 0,
                          "name": "General Consultation",
                      "qty": 1,
                      "taxName2": "",
                      "taxAmount2": 0,
                      "unit_cost": {
                          "amount": amount,
                          "code": "CAD"
                      }
                    }
                  ]
                }
              },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json(); //extract JSON from the http response
        // do something with jsonResponse...
    }
}

createInvoice(69)