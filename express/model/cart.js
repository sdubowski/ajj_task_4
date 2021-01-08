const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Cart extends Model {}

Cart.init({
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    productId: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'Cart'
});
Cart.removeAttribute('id');
module.exports = Cart;
//console.log('Category');
console.log(Cart === sequelize.models.Cart);
