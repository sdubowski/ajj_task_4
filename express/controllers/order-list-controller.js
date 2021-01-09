var OrderList = require('../model/order-list');
const {QueryTypes} = require('sequelize');

var controller = {
    add: function (req, res) {
            OrderList.create({
                orderId: req.body.orderId,
                productId: req.body.productId,
                quantity: req.body.quantity
            }).then((result) => res.json(result)).catch((err) => res.status(400).send(err));

    },
    get: function (req, res) {
            OrderList.findAll().then((result) => res.json(result)).catch((err) => res.status(400).send(err));

    }

};
module.exports = controller;
