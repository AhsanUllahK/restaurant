import orders from "./../models/order-model.js";
export const placeOrder = async (req, res) => {
  try {
    let total = 0;
    const { cart, payment } = req.body;

    if (!cart) {
      return res
        .status(400)
        .json({ message: "Please add food cart or payment method." });
    }
    cart.forEach((i) => {
      total += i.price;
    });

    const newOrder = new orders({
      foods: cart,
      payment,
      buyer: req.body.id,
    });

    await newOrder.save();

    return res.status(201).json({ message: "Order placed Successfully." });
  } catch (error) {
    console.log(error.message, error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changeOrderStatus = async (req, res) => {
  const order_id = req.params.id;
  const { status } = req.body;
  try {
    if (!order_id) {
      return res.status(400).json({ message: "Order_ID is required" });
    }

    if (!status) {
      return res.status(400).json({ message: "Order Status is required" });
    }
    const order = await orders.findByIdAndUpdate(
      order_id,
      { status },
      { new: true }
    );

    if (!order) {
      return res
        .statsu(404)
        .json({ message: "No Order is Found with given id." });
    }
    return res.status(200).json({
      message: "Status updated Sccessfully.",
    });
  } catch (error) {
    console.log(error.message, error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
