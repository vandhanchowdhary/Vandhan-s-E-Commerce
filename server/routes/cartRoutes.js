const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get or create a cart by  guestId or userId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// Add cart item to a guest
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Determine if the user is logged in or a guest
    let cart = await getCart(userId, guestId);

    // if cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // If product exists in the cart, update the quantity
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        // If product does not exist in the cart, add it
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity: Number(quantity),
        });
      }

      // Recalculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } // if cart not exists, create new cart
    else {
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * Number(quantity),
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Update product quantity in cart for both guest and logged-in user
// PUT /api/cart
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId.toString() &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      // Update the quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = Number(quantity);
      } else {
        // Remove the product if quantity is zero or less
        cart.products.splice(productIndex, 1);
      }

      // Recalculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Remove product from cart for both guest and logged-in user
// DELETE /api/cart
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId.toString() &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      // Remove the product
      cart.products.splice(productIndex, 1);
      // Recalculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Get cart for both guest and logged-in user
// GET /api/cart
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Merge guest cart into user cart upon login
// POST /api/cart/merge
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }
      if (userCart) {
        // Merge carts
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === guestItem.productId.toString() &&
              p.size === guestItem.size &&
              p.color === guestItem.color
          );

          if (productIndex > -1) {
            // Product exists in user cart, update quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Product does not exist in user cart, add it
            userCart.products.push(guestItem);
          }
        });
        // Recalculate total price
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();

        // Clear guest cart after merging
        try {
          await Cart.findByIdAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart:", error);
        }

        return res.status(200).json(userCart);
      } else {
        // If user cart does not exist, assign guest cart to user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        // If no guest cart but user cart exists, return user cart
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
