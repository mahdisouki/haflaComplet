const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
  services: { type: String, required: true },
  price: { type: String, required: true },
  commandes:[{type : mongoose.Schema.Types.ObjectId , ref : "offre"}],
},
{
  timestamps: true 
});

module.exports = mongoose.model("commande", CommandeSchema);