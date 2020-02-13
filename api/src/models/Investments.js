const mongoose = require ('mongoose');

const InvestmentSchema = new mongoose.Schema ({
  type: String,
  value: Number,
  date: Date,
});

module.exports = mongoose.model ('Investment', InvestmentSchema);
