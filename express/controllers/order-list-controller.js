var OrderList = require('../model/order-list');
const {QueryTypes} = require('sequelize');

var controller = {
    add: function (req, res) {
        try {
            OrderList.create({
                orderId: req.body.orderId,
                productId: req.body.productId,
                quantity: req.body.quantity
            }).then((result) => res.json(result));
        } catch (e) {
            console.log(e)
        }
    },
    get: function (req, res) {
        try {
            OrderList.findAll().then((result) => res.json(result));
        } catch (e) {
            console.log(e)
        }
    }

};
module.exports = controller;
