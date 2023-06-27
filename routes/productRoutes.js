const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  clearProducts,
} = require("../controllers/productController");
const { uploadProductImage } = require("../controllers/uploadsController");

router.route("/").post(createProduct).get(getAllProducts)
router.route("/uploads").post(uploadProductImage);
router.route("/clear").delete(clearProducts);

module.exports = router;
