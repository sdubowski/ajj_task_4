const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const OrderStatus = require('./order-status');
const OrderList = require('./order-list');

class Order extends Model {}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    approvalDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    orderStatusId: {
        type: DataTypes.INTEGER,
        references: {
            model: OrderStatus,
            key: 'id'
        }
    },
    userName: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    userMail: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    userPhoneNumber: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            not: /^[a-z]+$/i,
        }
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'Order'
});

Order.hasMany(OrderList,{as: 'orderedProducts', foreignKey: 'orderId'});

module.exports = Order;

//console.log('Order');
console.log(Order === sequelize.models.Order);
