const mongoose = require("mongoose");

const SoldeSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  
  
},
{
  timestamps: true 
});

module.exports = mongoose.model("solde", SoldeSchema);