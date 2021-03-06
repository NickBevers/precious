const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    recipient: String,
    sender: String,
    amount: Number,
    reason: String,
    message: String,
    date: Date
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;