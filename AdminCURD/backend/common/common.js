const sequelize = require('../config/db')

const companys = require('../model/companyModel');
const groups = require('../model/groupModel')
const users = require('../model/userModel')
const sessions = require('../model/sessionModel')

const db = {}
db.companys = companys
db.groups = groups
db.users = users
db.sessions = sessions

db.companys.hasMany(db.users, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    foreignKey: 'company_id'
});
db.users.belongsTo(db.companys, { foreignKey: 'company_id' });

// db.groups.hasMany(db.users, { foreignKey: 'group_id' });
db.groups.hasMany(db.users, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    foreignKey: 'group_id'
});
db.users.belongsTo(db.groups, { foreignKey: 'group_id' });

sequelize.sync({ force: false })

module.exports = db



