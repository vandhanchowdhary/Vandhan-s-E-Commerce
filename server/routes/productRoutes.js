const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new product
// POST /api/products
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, // Associate product with the authenticated user
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a product
// PUT /api/products/:id
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields. If a field is not provided in the request body, retain the existing value.
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.countInStock = countInStock || product.countInStock;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.collections = collections || product.collections;
    product.material = material || product.material;
    product.gender = gender || product.gender;
    product.images = images || product.images;
    product.isFeatured =
      isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.isPublished =
      isPublished !== undefined ? isPublished : product.isPublished;
    product.tags = tags || product.tags;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;
    product.sku = sku || product.sku;

    // Save the updated product
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a product
// DELETE /api/products/:id
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Find product by ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all products with optional filtering
// GET /api/products
router.get("/", async (req, res) => {
  try {
    const {
      collections,
      size,
      color,
      gender,
      minPrice,
      maxprice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // filter by collections
    if (collections && collections.toLocaleLowerCase() !== "all") {
      query.collections = collections;
    }

    // filter by category
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    // filter by material
    if (material) {
      query.material = { $in: material.split(",") };
    }

    // filter by brand
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    // filter by size
    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    // filter by color
    if (color) {
      query.colors = { $in: [color] };
    }

    // filter by gender
    if (gender) {
      query.gender = gender;
    }

    // filter by price range
    if (minPrice || maxprice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = minPrice;
      }
      if (maxprice) {
        query.price.$lte = maxprice;
      }
    }

    // filter by search keyword in name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting by price, popularity, etc.
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // Fetch products based on query and apply sorting and limit.
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Best-selling products
// GET /api/products/best-seller
router.get("/best-seller", async (req, res) => {
  try {
    const bestSellers = await Product.findOne().sort({ rating: -1 });
    if (bestSellers) {
      res.json(bestSellers);
    } else {
      res.status(404).json({ message: "No best-selling products found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// New Arrivals
// GET /api/products/new-arrivals
router.get("/new-arrivals", async (req, res) => {
    try {
        // fetch 8 latest products
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrivals);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get a single product by ID
// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get similar products based on category and gender
// GET /api/products/similar/:id
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product
      gender: product.gender,
      category: product.category,
    }).limit(4); // Limit to 4 similar products

    res.json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
