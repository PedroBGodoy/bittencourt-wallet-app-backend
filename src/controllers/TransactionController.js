const Transaction = require("../models/transaction");

module.exports = {
  async index(req, res) {
    try {
      const transactions = await Transaction.find({ user: req.body.userId }).sort(
        "-madeAt"
      );

      return res.json(transactions);
    } catch (err) {
      console.log(err);
    }
  },

  async store(req, res) {
    const transaction = await Transaction.create(req.body);

    return res.json(transaction);
  },

  async delete(req, res) {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    return res.json(transaction);
  },

  async update(req, res) {
    const transaction = await Transaction.findById(req.params.id);

    transaction.set({
      description: req.body.description,
      value: req.body.value,
      type: req.body.type
    });

    await transaction.save();

    return res.json(transaction);
  }
};
