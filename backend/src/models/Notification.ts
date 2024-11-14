const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
    userId: {
        type: DataTypes.INTEGER,
    },
    joinRequestId: {
        type: DataTypes.BIGINT,
    },
    type: {
        type: DataTypes.ENUM('Acceptance', 'Request', 'Rejection'),
    },
});

module.exports = Notification;
