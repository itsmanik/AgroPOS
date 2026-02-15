import express from "express";
import {getAllProducts, createProduct } from "../controllers/productsController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/', (getAllProducts));
router.post('/', upload.single("image"), createProduct);

export default router;