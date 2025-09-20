const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/checkout
// Create a new checkout session
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  // Validate request
  if (!checkoutItems || checkoutItems.length === 0) {
    return res
      .status(400)
      .json({ message: "No items present in cart to Checkout " });
  }

  try {
    // Create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    res.status(201).json(newCheckout);

    // // Clear user's cart after creating checkout session
    // await Cart.findOneAndDelete({ user: req.user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/checkout/:id/pay
// Update checkout session to mark as paid after successful payment
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout session not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();

      res.status(200).json(checkout);
    } else {
      return res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/checkout/:id/finalize
// Finalize the checkout session and create an order after payment is confirmed
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout session not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      //create final order based on checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      // Mark checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });

      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
        res.status(400).json({ message: "Checkout already finalized" });
    } else {
      return res.status(400).json({ message: "Checkout not paid" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;