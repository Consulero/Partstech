require('dotenv').config();
const db = require('../config/db');
const { makePartsTechPostRequest, makePartsTechGetRequest } = require('../utils/ps-axios');

module.exports = {
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const whereCondition = {};
      const totalItems = await db.Order.count({ where: whereCondition });

      const data = await db.Order.findAll({
        where: whereCondition,
        offset: offset,
        limit: limit,
        order: [['id', 'DESC']],
      });
      res.status(200).json({
        data: data,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems: totalItems,
        },
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json(error);
    }
  },

  async placeOrder(req, res) {
    try {
      const { data: orderData, orderId } = req.body;

      const payload = orderData.map((order) => {
        return {
          storeId: order.store.id,
          poNumber: order.poNumber,
          notes: null, //todo take notes from user
          orderItems: order.parts.map((part) => {
            return {
              orderItemId: part.orderItemId,
              quantity: part.quantity,
            };
          }),
        };
      });

      const result = await makePartsTechPostRequest(`/punchout/cart/custom/order`, { orders: payload });

      if (!result?.orders?.length) {
        return res.status(500).json({ message: 'Order not placed' });
      }

      result.orders = result.orders?.map((order) => {
        return {
          ...order,
          parts: order.parts.map((part) => {
            return {
              ...part,
              recievedItem: false,
            };
          }),
        };
      });

      const order = await db.Order.create({ orders: result.orders });
      await db.Quotation.update({ isOrderPlaced: true }, { where: { id: orderId } });
      res.status(200).json(order);
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json(error);
    }
  },

  async setOrderDetails(req, res) {
    try {
      const { orderId, psOrderId } = req.body.data;
      const psOrderResult = await makePartsTechGetRequest(`/orders/${psOrderId}`);

      const { dataValues: orderResult } = await db.Order.findByPk(orderId);
      let orders = orderResult.orders || [];
      orders = orders.map((order) => (order.id === psOrderId ? { ...order, ...psOrderResult } : order));

      const order = await db.Order.update({ orders: orders }, { where: { id: orderId } });
      res.status(200).json(order);
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json(error);
    }
  },
};
