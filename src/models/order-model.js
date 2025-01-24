import mongoose from "mongoose";

const order_schema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
      },
    ],
    payment: {},
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepared", "On the Way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

const orders = mongoose.model("orders", order_schema);
export default orders;
