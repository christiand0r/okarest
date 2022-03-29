const { v4: uuidv4 } = require("uuid");
const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
    },
    price: {
      type: Number,
      default: 0,
      required: [true, "El precio del producto es obligatorio"],
    },
    description: {
      type: String,
      default: "No posee descripción",
    },
    state: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.String,
      ref: "Customer",
      required: [true, "Debe indicar el propietario del producto"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.methods.toJSON = function () {
  const { _id, ...product } = this.toObject();

  const id = _id;
  const sortedCustomer = Object.assign({ id }, product);

  return sortedCustomer;
};

module.exports = model("Product", productSchema);
