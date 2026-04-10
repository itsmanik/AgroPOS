import express from "express";
import {getAllProducts, createProduct, getProductById } from "../controllers/productsController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', upload.single("image"), createProduct);

export default router;