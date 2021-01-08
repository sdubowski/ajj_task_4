var Cart = require('../model/cart');

var controller = {
    add: function (req, res) {
        Cart.create({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            productId: req.body.productId
        }).then((result) => res.json(result))
    },

    delete:function (req, res) {
        Cart.destroy({
            where: {},
            truncate: true
        }).then((result) => res.json(result))
    },

    getAll: function (req, res) {
        Cart.findAll().then((result) => res.json(result))
    }
};


module.exports = controller;
