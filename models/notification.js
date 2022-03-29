const { v4: uuidv4 } = require("uuid");
const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Notification", notificationSchema);
