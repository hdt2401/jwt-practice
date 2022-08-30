const mongoose = require("mongoose");

const ProductShema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categgories: { type: Array },
    quantity: { type: String, required: true },
    price: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", ProductShema);