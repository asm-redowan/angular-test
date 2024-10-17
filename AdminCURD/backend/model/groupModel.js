const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Group = sequelize.define(
    'Group',
    {
        group_name: {
            type: DataTypes.STRING,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }

    },{
        tableName: 'groups',
        // timestamps: true,
        // paranoid: true,
        createdAt: false,
        updatedAt: false,
        // deletedAt: 'destroyTime',
    }
)

module.exports = Group