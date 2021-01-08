var Order = require('../model/order');
var OrderList = require('../model/order-list');


var controller = {
    getAll: function (req, res) {
        Order.findAll({
            include: [{
                model: OrderList,
                as: 'orderedProducts'
            }]
        }).then((result) => res.json(result))
    },
    get: function (req, res) {
        Order.findAll({
            include: [{
                model: OrderList,
                as: 'orderedProducts'
            }],
            where: {orderStatusId: req.params.id}
        }).then((result) => res.json(result))
    },

    add: function (req, res) {
            Order.create({
                approvalDate: req.body.approvalDate,
                orderStatusId: req.body.orderStatusId,
                userName: req.body.userName,
                userMail: req.body.userMail,
                userPhoneNumber: req.body.userPhoneNumber
            }).then((result) => res.json(result)).catch((err) => res.json(err));

    },

    updateById: function (req, res) {
        Order.update({
            orderStatusId: req.body.orderStatusId
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result))
    },

    getLatest: function (req, res) {
        try {
            Order.findAll({
                limit: 1,
                order: [['Id', 'DESC']]
            }).then((result) => res.json(result));
        } catch (e) {
            console.log(e)
        }
    }
};


module.exports = controller;
