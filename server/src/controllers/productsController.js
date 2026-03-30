import pool from '../config/db.js';
import multer from "multer"
import path from "path";
import sharp from "sharp";
import upload from '../middleware/upload.js';

const getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;
        const products = rows.map((product) => ({
            ...product,
            img_url: product.img_url ? baseUrl + product.img_url : null,
        }));
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createProduct = async (req, res) => {
    try {
        let img_url = null;
        if (req.file) {
            const filename = Date.now() + ".jpg";
            const uploadPath = path.join("uploads", filename);
            await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toFile(uploadPath);
            img_url = `/${filename}`;
        }
        const { name, nickname, category, unit, mrp, gst, selling_price, hsn_code, stock_quantity } = req.body;
        const [result] = await pool.query('INSERT INTO products (name, img_url, nickname, category, unit, mrp, gst, selling_price, hsn_code, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, img_url, nickname, category, unit, mrp, gst, selling_price, hsn_code, stock_quantity]);
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

export {getAllProducts, createProduct}