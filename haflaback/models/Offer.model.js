const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: String}],
  dispDays: [{ type: String, required: true}],
  service:{type:mongoose.Types.ObjectId , ref:"service"}
},
{
  timestamps: true 
});

module.exports = mongoose.model("offre", OfferSchema);