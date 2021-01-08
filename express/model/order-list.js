const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./order');
const Product = require('./product');

class OrderList extends Model {}

OrderList.init({
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        },
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            not: /^[a-z]+$/i
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'OrderList'
});
module.exports = OrderList;
//console.log('OrderList');
console.log(OrderList === sequelize.models.OrderList);
