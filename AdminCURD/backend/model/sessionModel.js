const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Session = sequelize.define(
    'Session',
    {
    email:{
        type: DataTypes.STRING,
        validate:{
            isEmail:true
        },
        allowNull: false,
        unique: true
    },
    otp:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ip_address:{
        type: DataTypes.STRING,
        validate:{
            is: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        },
        allowNull: false
    }

},{

    tableName: 'sessions',
    // timestamps: false
    createdAt: false,
    updatedAt: 'last_login'

})

module.exports = Session