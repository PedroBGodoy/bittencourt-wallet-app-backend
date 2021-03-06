const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  type: {
    type: Boolean,
    required: true
  }, // True = Add False = Remove
  madeAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
