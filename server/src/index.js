require('dotenv').config();
const express = require('express')
const productsRouter = require('./routes/products');
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.use('/api/products', productsRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});