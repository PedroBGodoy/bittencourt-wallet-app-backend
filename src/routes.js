const express = require("express");
const routes = express.Router();

const authMiddleware = require("./middlewares/auth");

const TransactionController = require("./controllers/TransactionController");
const AuthController = require("./controllers/authController");

//PUBLIC ROUTES
routes.post("/auth/register", AuthController.register);
routes.post("/auth/authenticate", AuthController.authenticate);

routes.get("/", function(req, res) {
  res.send("Hello World!");
});

routes.use(authMiddleware);

//PRIVATE ROUTES
routes.get("/transactions", TransactionController.index);
routes.post("/transactions", TransactionController.store);
routes.delete("/transactions/:id", TransactionController.delete);
routes.put("/transactions/:id", TransactionController.update);

module.exports = routes;
