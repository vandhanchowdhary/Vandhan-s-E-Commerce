const expess = require("express");
const Order = require("../models/Order");
const {protect} = require("../middleware/authMiddleware");

const router = expess.Router();

// GET /api/orders/my-orders
// Get all orders for the logged-in user
router.get("/my-orders", protect, async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});