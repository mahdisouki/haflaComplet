const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true},
  solde:{type : mongoose.Schema.Types.ObjectId , ref : "solde"},
  offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "offre" }] // Add reference to offers

},
{
  timestamps: true 
});

module.exports = mongoose.model("service", ServiceSchema);