const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    membersLimit: {
        type: DataTypes.INTEGER,
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
    },
    course: {
        type: DataTypes.STRING,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
    },
    telegram_link: {
        type: DataTypes.STRING,
    },
    telegram_id: {
        type: DataTypes.INTEGER,
    },
    adminId: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Group