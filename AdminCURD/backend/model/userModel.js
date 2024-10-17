const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Company = require('./companyModel');
const Group = require('./groupModel');

const User = sequelize.define(
    'User',
    {
        name:{
           type: DataTypes.STRING,
           isAlpha: true,
           allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            validate:{
                isEmail:true,
                is: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
            },
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        },
        company_id:{
            type: DataTypes.INTEGER,
            references:{
                model: Company,
                key: 'id'
            },
            allowNull: true
        },
        group_id:{
            type: DataTypes.INTEGER,
            references:{
                model: Group,
                key: 'id'
            },
            allowNull: true
        }

    }, {

        tableName: 'users',
        // timestamps: true,
        // paranoid: true,
        createdAt: false,
        updatedAt: false,
        // deletedAt: 'destroyTime',

    }
)

module.exports = User