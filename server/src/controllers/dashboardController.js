import express from "express";
import pool from "../config/db.js";

const dashboardController = async (req, res) => {
  try {
    const [summaryRow] = await pool.query(`
                select 
                    count(*) as billsToday, 
                    coalesce(sum(grand_total), 0) as salesToday, 
                    coalesce(sum(cgst_total + sgst_total + igst_total), 0) as gstToday
                from sales
                where date(created_at) = curdate();
            `);
    const [recentBills] = await pool.query(`
            select *
            from sales
            order by created_at desc
            limit 10
        `);
    const [lowStock] = await pool.query(`
            select * 
            from products 
            where stock_quantity <= 5
            order by stock_quantity asc
            limit 50
        `);
    res.json({
      summary: summaryRow[0],
      recentBills,
      lowStock,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};

export default dashboardController;
