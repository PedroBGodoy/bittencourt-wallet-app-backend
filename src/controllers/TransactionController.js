const Transaction = require('../models/transaction');

module.exports = {
    async index(req, res){
        try{
            const transactions = await Transaction.find({ user: req.params.id }).sort('-madeAt')

            return res.json(transactions);
        }catch(err)
        {
            console.log(err)
        }
    },

    async store(req, res){
        const transaction = await Transaction.create(req.body);

        return res.json(transaction);
    },

    async delete(req, res){
        const transaction = await Transaction.findByIdAndDelete(req.params.id)

        return res.json(transaction)
    },

    async update(req, res){
        console.log(req.params)
        const transaction = await Transaction.findById(req.params.id)

        transaction.set({ transactionDescription: req.body.transactionDescription, transactionValue: req.body.transactionValue, transactionType: req.body.transactionType })

        await transaction.save()

        return res.json(transaction)
    }
};