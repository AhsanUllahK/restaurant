import food from "./../models/food-model.js";
export const addFood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imgUrl,
      foodTags,
      foodCategory,
      code,
      isFoodAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(400).json({ message: "All fields must be filled." });
    }
    const new_food = new food({
      title,
      description,
      price,
      imgUrl,
      foodTags,
      foodCategory,
      code,
      isFoodAvailable,
      restaurant,
      rating,
      ratingCount,
    });

    await new_food.save();
    return res.status(201).json({ message: "New Food Added Successfully." });
  } catch (error) {
    console.log("Error in addFood controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getAllFoods = async (req, res) => {
  try {
    const allfoods = await food.find({});
    console.log("getAllFoods route hit");
    if (allfoods.length === 0) {
      return res.status(400).json({ message: "No Restaurant Found" });
    }
    return res
      .status(200)
      .json({ message: "All Restaurants.", count: allfoods.length, allfoods });
  } catch (error) {
    console.log("Error in getAllFood controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getFoodById = async (req, res) => {
  try {
    const foodId = req.params.id;
    const foods = await food.findById(foodId);
    if (!foods) {
      return res.status(404).json({ message: "No Restaurant Found" });
    }
    // await food.findById(foodId);

    return res.status(200).json(foods);
  } catch (error) {
    console.log("Error in getFoodById controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const find_food = await food.findById(foodId);
    if (!find_food) {
      return res.status(404).json({ message: "No Food Food." });
    }
    await food.findByIdAndDelete(foodId);
    res.status(200).json({ message: "Food Deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteFood controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const updateFood = async (req, res) => {
  const foodId = req.params.id;
  try {
    const {
      title,
      description,
      price,
      imgUrl,
      foodTags,
      foodCategory,
      code,
      isFoodAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    if (!foodId) {
      return res.status(400).json({ message: "foodIdis required.", foodId });
    }
    if (!title || !description || !price || !restaurant) {
      return res
        .status(400)
        .json(
          "Food title, description, price and restaurant are mandatory fields."
        );
    }

    const upd_food = await food.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imgUrl,
        foodTags,
        foodCategory,
        code,
        isFoodAvailable,
        restaurant,
        rating,
        ratingCount,
      },
      { new: true }
    );

    if (!upd_food) {
      return res
        .status(404)
        .json({ message: "No food available with this Id.", foodId });
    }
    return res.status(200).json({ message: "Food is updated Successfully" });
  } catch (error) {
    console.log("Error in updateFood controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
