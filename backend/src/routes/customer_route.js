const customer = require("../controllers/customer.controller")
async function customerRoute(app){
    app.get("/customers", customer.getAllCustomers);
    app.post("/customers", customer.addNewCustomer);
    app.get("/customer/:id", customer.getCustomerById);
    app.put("/customer/:id", customer.updateCustomerById);
    app.delete("/customer/:id", customer.deleteCustomer);
}

module.exports = customerRoute