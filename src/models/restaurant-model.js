import mongoose from "mongoose";
const restaurant_Schema = new mongoose.Schema(
  {
    rest_title: {
      type: String,
      required: [true, "Restaurant name is required"],
      unique: true,
    },
    imgUrl: { type: String },
    foods: { type: Array },
    time: { type: String },
    pickup: { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: true },
    logoUrl: { type: String },
    rating: { type: Number, default: 1, min: 1, max: 5 },
    ratingCount: { type: String },
    code: { type: String },
    coords: {
      id: {
        type: String,
      },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      adderss: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

const restaurant = mongoose.model("restuarant", restaurant_Schema);
export default restaurant;
