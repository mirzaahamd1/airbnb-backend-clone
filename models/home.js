const mongoose = require("mongoose");
const Favourites = require("./favourites");

const homeSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photoUrl: String,
  description: String,
});

homeSchema.pre('findOneAndDelete', async function (
  
){
  const homeId=this.getQuery()["_id"]
  await Favourites.deleteMany({homeId:homeId})

})

module.exports = mongoose.model("Home", homeSchema);
