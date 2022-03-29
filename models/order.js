const { v4: uuidv4 } = require("uuid");
const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    customer_id: {
      type: String,
      ref: "Customer",
      required: [true, "Debe indicar el ID de cliente"],
    },
    customer: {
      type: Schema.Types.Mixed,
      ref: "Customer",
      required: [true, "Debe proporcionar el cliente"],
    },
    products: {
      type: Array,
      of: Object,
      required: [true, "Debe indicar algún producto"],
    },
    total: {
      type: Number,
      required: [true, "Debe indicar el monto total"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Order", orderSchema);
