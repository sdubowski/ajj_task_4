var Status = require('../model/order-status')

var controller = {
    getAll: function (req, res) {
        Status.findAll().then((result) => res.json(result))
    }
};


module.exports = controller;
