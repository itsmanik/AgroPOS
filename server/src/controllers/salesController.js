import pool from "../config/db.js";

const addSales = async (req, res) => {
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
        item.selling_price * item.qty,
        item.selling_price * item.qty * (item.gst / 100),
        item.selling_price * item.qty +
          item.selling_price * item.qty * (item.gst / 100),
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
};

const getAllSales = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `select * from sales order by created_at desc limit 100`
    );
    res.send(rows);
  } catch (err) {
    console.error("Get sales failed:", err);
    res.status(500).json({ message: "Failed to fetch all sales" });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const [saleDetails] = await pool.query(`select * from sales where id = ?`, [
      id,
    ]);
    if (saleDetails.length === 0) {
      return res.status(404).json({ message: "Sale not found" });
    }
    const [saleItems] = await pool.query(
      `select * from sale_items where sale_id = ?`,
      [id]
    );
    res.json({
      saleDetails: saleDetails[0],
      saleItems: saleItems,
    });
  } catch (err) {
    console.error("Get sale by id failed:", err);
    res.status(500).json({ message: "Failed to fetch sale" });
  }
};

export { addSales, getAllSales, getSaleById };
