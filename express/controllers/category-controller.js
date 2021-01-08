var Category = require('../model/category');

var controller = {
    getAll: function (req, res) {
        Category.findAll().then((result) => res.json(result))
    },
    getByCategoryId: function (req, res) {
        Category.findAll({where: {id: req.params.id}}).then((result) => res.json(result))
    }
};


module.exports = controller;
