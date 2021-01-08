const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category')

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }

    },
    description: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }

    },
    price: {
        type: DataTypes.DECIMAL,
        validate: {
            min: 1
        }

    },
    weight: {
        type: DataTypes.DECIMAL

    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'Product',
});
module.exports = Product;

//console.log('Product');
console.log(Product === sequelize.models.Product);
