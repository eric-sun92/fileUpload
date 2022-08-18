const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
