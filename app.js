require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const psAuthRoutes = require('./routes/ps-auth');
const psSearchRoutes = require('./routes/ps-catalog-search');
const psVehicleRoutes = require('./routes/ps-vehicle-search');
const psCategoryRoutes = require('./routes/ps-category');
const quotationRoutes = require('./routes/quotation');
const psCallbackRoutes = require('./routes/ps-callback');
const orderRoutes = require('./routes/order');
const inventoryRoutes = require('./routes/inventory');

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
const cors = require('cors');

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  })
);
app.use('/api/ps-auth', psAuthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ps-search', psSearchRoutes);
app.use('/api/ps-vehicle', psVehicleRoutes);
app.use('/api/ps-category', psCategoryRoutes);
app.use('/api/quotes', quotationRoutes);
app.use('/api/callback', psCallbackRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);

const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('MySQL DB Connected!');
    await db.sequelize.sync({ alter: true }); // for dev only
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

start();
