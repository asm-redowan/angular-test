const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Company = sequelize.define(
    'Company',
    {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
            is: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        },
        allowNull: false,
        unique: true
    },
    package: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'companys', 
    // timestamps: true,
    // paranoid: true,
    createdAt: false,
    updatedAt: false,
    // deletedAt: 'destroyTime',
    
})

module.exports = Company