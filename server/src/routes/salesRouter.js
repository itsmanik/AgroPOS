import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body;
  let customerId = null;
  if (data.customer?.phone_number) {
    const [existing] = await pool.query(
      `select id from customers where phone = ? limit 1`,
      [data.customer.phone_number]
    );
    if (existing.length > 0) {
      customerId = existing[0].id;
    } else {
      const [created] = await pool.query(
        "insert into customers (name, phone, address) values (?, ?, ?)",
        [data.customer.name, data.customer.phone_number, data.customer.address]
      );
      customerId = created.insertId;
    }
  }
  const [saleResult] = await pool.query(
    `insert into sales (
            customer_id,
            customer_name,
            customer_phone,
            customer_address,
            subtotal,
            cgst_total,
            sgst_total,
            igst_total,
            discount,
            grand_total,
            payment_mode 
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      customerId,
      data.customer?.name,
      data.customer?.phone_number,
      data.customer?.address,
      data.summary.subtotal,
      data.summary.cgst_amount,
      data.summary.sgst_amount,
      data.summary.igst_amount,
      data.summary.discount,
      data.summary.grand_total,
      data.summary.payment_mode,
    ]
  );
  const saleId = saleResult.insertId;
  // Generate Invoice number
  const invoiceNo = `INV-${saleId}`;
  await pool.query(`update sales set invoice_no = ? where id = ?`, [
    invoiceNo,
    saleId,
  ]);
  // insert sale items

  for (const item of data.items) {
    const taxable = item.rate * item.qty;
    const gstAmount = (taxable * item.gst_percent) / 100;
    const lineTotal = taxable + gstAmount;

    await pool.query(
      `INSERT INTO sale_items (
          sale_id,
          product_id,
          product_name,
          hsn_code,
          unit,
          qty,
          rate,
          gst_percent,
          taxable_amount,
          gst_amount,
          line_total
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        saleId,
        item.id,
        item.name,
        item.hsn_code,
        item.unit,
        item.qty,
        item.selling_price,
        item.gst,
        (item.selling_price * item.qty),
        (item.selling_price * item.qty) * (item.gst / 100),
        (item.selling_price * item.qty) + ((item.selling_price * item.qty) * (item.gst / 100)),
      ]
      );
    await pool.query(
      `UPDATE products
         SET stock_quantity = stock_quantity - ?
         WHERE id = ?`,
      [item.qty, item.id]
    );
  }
  res.send(data);
});

export default router;
