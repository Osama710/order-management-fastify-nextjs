const product = require("../controllers/product.controller")
async function productRoutes(app) {
  app.get("/product", product.getAllProduct);
    app.post("/product", product.addNewProduct);
    app.get("/product/:id", product.getProductById);
    app.put("/product/:id", product.updateProductById);
    app.delete("/product/:id", product.deleteProduct);
}

module.exports = productRoutes;