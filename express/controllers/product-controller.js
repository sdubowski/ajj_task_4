var Product = require('../model/product');


var controller = {
        getAll: function (req, res) {
                Product.findAll().then((result) => res.json(result))
        },

        getById: function (req, res) {
            Product.findAll({where: {id: req.params.id}}).then((result) => res.json(result))
        },

        getByCategoryId: function (req, res) {
            Product.findAll({where: {categoryId: req.params.id}}).then((result) => res.json(result))
        },

        add: function (req, res) {
            Product.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                weight: req.body.weight,
                categoryId: req.body.categoryId
            }).then((result) => res.json(result)).catch((err) => res.json(err))
        },

        updateById: function (req, res) {
            Product.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                weight: req.body.weight,
                categoryId: req.body.categoryId
            }, {
                where: {
                    id: req.params.id
                }
            }).then((result) => res.json(result)).catch((err) => res.json(err))
        }
};

module.exports = controller;
