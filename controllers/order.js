require('dotenv').config();
const db = require('../config/db');
const { makePartsTechPostRequest, makePartsTechGetRequest } = require('../utils/ps-axios');
const { upsertInventoryItems } = require('./upsertInventoryItems');

module.exports = {
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const orderType = req.query.orderType
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const whereCondition = { orderType: orderType };
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
      const { data: orderData, orderId, orderType } = req.body;

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

      const order = await db.Order.create({ orders: result.orders, orderType: orderType });
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

      orders = orders.map((order) => {
        if (order.id === psOrderId) {
          return {
            ...order,
            ...psOrderResult,
            shippingAddress: { ...order.shippingAddress, ...psOrderResult.shippingAddress },
            delivery: { ...order.delivery, ...psOrderResult.delivery },
            parts: order.parts.map((part, index) => ({
              ...part,
              ...psOrderResult.parts[index],
            })),
            invoiceNumbers: [...(order.invoiceNumbers || []), ...(psOrderResult.invoiceNumbers || [])],
          };
        }
        return order;
      });

      const order = await db.Order.update({ orders }, { where: { id: orderId } });
      res.status(200).json(order);
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json(error);
    }
  },

  async addInventoryItems(req, res) {
    try {
      const { orderId, psOrderId, recievedItem, partId } = req.body.data;
      let invPart = null;

      const orderResult = await db.Order.findByPk(orderId);

      let orders = orderResult.dataValues?.orders || [];
      const foundOrder = orders.find((order) => order.id === psOrderId);

      const updatedParts = foundOrder.parts?.map((part) => {
        if (part.partId === partId) {
          invPart = { ...part, recievedItem: recievedItem + part.recievedItem || 0 };
          return invPart;
        }
        return part;
      }) || [];

      const updatedOrder = { ...foundOrder, parts: updatedParts };

      const updatedOrders = orders.map((order) => order.id === psOrderId ? updatedOrder : order);

      const order = await db.Order.update({ orders: updatedOrders }, { where: { id: orderId } });

      await upsertInventoryItems(invPart, recievedItem);

      res.status(200).json({ order: order.id });
    }
    catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json(error);
    }
  }
};
