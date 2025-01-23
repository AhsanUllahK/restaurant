import mongoose from "mongoose";
const food_schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food Name is required."],
    },
    description: {
      type: String,
      required: [true, "Food Description is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    imgUrl: {
      type: String,
      default:
        "https://www.freepik.com/premium-psd/delicious-mouthwatering-chicken-karahi-dish-isolated-transparent-background_44959021.htm",
    },
    foodTags: {
      type: String,
    },
    foodCategory: {
      type: String,
    },
    code: {
      type: String,
    },
    isFoodAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

const food = mongoose.model("food", food_schema);
export default food;
