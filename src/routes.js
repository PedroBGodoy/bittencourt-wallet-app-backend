const express = require('express');

const routes = express.Router();

const TransactionController = require('./controllers/TransactionController');

routes.get('/', function(req, res){
    res.send('Hello World!')
})
routes.get('/transactions/:id', TransactionController.index);
routes.post('/transactions', TransactionController.store);
routes.delete('/transactions/:id', TransactionController.delete);
routes.put('/transactions/:id', TransactionController.update);

module.exports = routes;