import category from "./../models/category-model.js";
export const addCategory = async (req, res) => {
  try {
    const { cat_title, imgUrl } = req.body;

    if (!cat_title) {
      return res.status(400).json({ message: "Please add title and ImageURL" });
    }

    const new_cate = new category({ cat_title, imgUrl });
    await new_cate.save();

    return res
      .status(201)
      .json({ message: "Category added Successfully. ", new_cate });
  } catch (error) {
    console.log("Error in addCategory Controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { cat_title, imgUrl } = req.body;
    const { id } = req.params;

    if (!cat_title) {
      return res.status(400).json({
        message: "cat_title is required to update a category.",
      });
    }
    const updated_Cat = await category.findByIdAndUpdate(
      id,
      {
        cat_title,
        imgUrl,
      },
      { new: true }
    );

    if (!updated_Cat) {
      return res.status(404).json({ message: "No such category Found." });
    }

    res
      .status(200)
      .json({ message: "Category updated Successfully.", updated_Cat });
  } catch (error) {
    console.log("Error in updateCategory Controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const all_category = await category.find({});
    if (all_category.length === 0) {
      return res.status(404).json({ message: "No Category Found." });
    }
    return res.status(200).json(all_category);
  } catch (error) {
    console.log("Error in getAllCategory Controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Category ID is required to delete a category.",
      });
    }

    const cat_exist = await category.findById(id);
    if (!cat_exist) {
      return res.status(404).json({
        message: "Category Not Found.",
      });
    }
    await category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted Successfully." });
  } catch (error) {
    console.log("Error in deleteCategory Controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
