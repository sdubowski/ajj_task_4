const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model {}

Category.init({
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
    modelName: 'Category'
});

module.exports = Category;
//console.log('Category');
console.log(Category === sequelize.models.Category);
