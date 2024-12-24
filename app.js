require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const psSearchRoutes = require('./routes/ps-catalog-search');

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

app.use('/api/users', userRoutes);
app.use('/api/ps-search', psSearchRoutes);

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
