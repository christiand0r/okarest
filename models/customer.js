const { v4: uuidv4 } = require("uuid");
const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "+00000000000",
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

//Hide password for response and change name _id
customerSchema.methods.toJSON = function () {
  const { password, _id, ...customer } = this.toObject();

  const id = _id;
  const sortedCustomer = Object.assign({ id }, customer);

  return sortedCustomer;
};

module.exports = model("Customer", customerSchema);
