import restaurant from "./../models/restaurant-model.js";

export const createRestaurant = async (req, res) => {
  const {
    rest_title,
    imgUrl,
    foods,
    time,
    pickup,
    delivery,
    isOpen,
    logoUrl,
    ratingCount,
    rating,
    code,
    coords,
  } = req.body;

  //   const restData = req.body;
  try {
    if (!rest_title) {
      return res.status(400).json({ message: "Restaurant Name is required" });
    }

    const rest = await restaurant.findOne({ rest_title });
    if (rest) {
      return res
        .status(400)
        .json({ message: "Restaurant Name is already taken" });
    }

    const rest_code = await restaurant.findOne({ code });
    if (rest_code) {
      return res
        .status(400)
        .json({ message: "Restaurant Code is already in use" });
    }

    if (coords?.latitude && coords?.longitude) {
      const existingCoords = await restaurant.findOne({
        "coords.latitude": coords.latitude,
        "coords.longitude": coords.longitude,
      });
      if (existingCoords) {
        return res
          .status(400)
          .json({ message: "Restaurant already exists at this address" });
      }
    }

    // const new_rest = new restaurant({
    //   rest_title,
    //   imgUrl: imgUrl || "",
    //   foods: foods || [],
    //   time: time || "",
    //   pickup: pickup ?? true,
    //   delivery: delivery ?? true,
    //   isOpen: isOpen ?? true,
    //   logoUrl: logoUrl || "",
    //   rating: rating || 1,
    //   ratingCount: ratingCount || 0,
    //   code: code || "",
    //   coords: coords || {},
    // });

    const new_rest = new restaurant({
      rest_title,
      imgUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await new_rest.save();

    res.status(201).json(new_rest);
  } catch (error) {
    console.log(
      "Error in adding new restaurant controller. ",
      error.message,
      error.stack
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    // const rests = await restaurant.findAll();
    // const rests = await restaurant.find({});

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.isOpen) filter.isOpen = req.query.isOpen === "true";
    if (req.query.pickup) filter.pickup = req.query.pickup === "true";
    if (req.query.delivery) filter.delivery = req.query.delivery === "true";

    const totalCount = await restaurant.countDocuments(filter);
    const rests = await restaurant.find(filter).skip(skip).limit(limit);

    if (!rests.length === 0) {
      return res.status(404).json({ message: "No restaurant availalble" });
    }

    // const sortBy = req.query.sortBy || "createdAt";
    // const order = req.query.order === "desc" ? -1 : 1;
    // const sorted_rests = await restaurant.find({}).sort({ [sortBy]: order });
    // const totalPages = Math.ceil(totalCount / limit);
    return res.status(200).json({
      //   metadata: {
      //     totalCount,
      //     totalPages,
      //     currentPage: page,
      //   },
      totalCount: rests.length,
      data: rests,
    });
  } catch (error) {
    console.log("Error in getAllRestaurant Controller. ", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRestaurant = async (req, res) => {
  const rest_name = req.params.name;
  try {
    const rest_exists = await restaurant.find({
      // rest_title,
      rest_title: { $regex: new RegExp(rest_name, "i") },
    });
    if (rest_exists.length === 0) {
      return res.status(404).json({ message: "No restuarant Found" });
    }
    return res.status(200).json(rest_exists);
  } catch (error) {
    console.log("Error in getRestaurant controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRestaurant = async (req, res) => {
  const rest_name = req.params.name;
  try {
    const delete_rest = await restaurant.findOneAndDelete({
      rest_title: rest_name,
    });
    if (!delete_rest) {
      return res
        .status(404)
        .json({ message: "No restaurant exists with this name." });
    }

    return res
      .status(200)
      .json({ message: "Restaurant Deleted Successfully.", delete_rest });
  } catch (error) {
    console.log("Error in deleteRestaurant Controller. ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
