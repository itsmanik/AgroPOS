import express from "express";
import { addSales, getAllSales, getSaleById } from "../controllers/salesController.js";

const router = express.Router();

router.post("/", addSales);
router.get("/", getAllSales);
router.get("/:id", getSaleById);

export default router;
