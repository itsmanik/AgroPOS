const pool = require('../config/db');
const multer = require('multer');
const path = require('path');

exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, img_url, nickname, category, unit, mrp, cgst, sgst, igst, selling_price, hsn_code } = req.body;
        const image = req.file ? req.file.filename : null;
        const [result] = await pool.query('INSERT INTO products (name, img_url, nickname, category, unit, mrp, cgst, sgst, igst, selling_price, hsn_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, image, nickname, category, unit, mrp, cgst, sgst, igst, selling_price, hsn_code]);
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};