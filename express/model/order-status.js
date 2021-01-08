const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class OrderStatus extends Model {}

OrderStatus.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'OrderStatus'
});
module.exports = OrderStatus;

//console.log('OrderStatus');
console.log(OrderStatus === sequelize.models.OrderStatus);
