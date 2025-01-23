import mongoose from "mongoose";

const category_Schema = mongoose.Schema(
  {
    cat_title: {
      type: String,
      required: [true, "Category is required"],
    },
    imgUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ficons%2Ffood&psig=AOvVaw29V_0nd4Nv-ZOpV0XpzCL1&ust=1737717773368000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLilqafdi4sDFQAAAAAdAAAAABAJ",
    },
  },
  {
    timestamps: true,
  }
);

const category = mongoose.model("category", category_Schema);
export default category;

// PRICE REQUIRED
