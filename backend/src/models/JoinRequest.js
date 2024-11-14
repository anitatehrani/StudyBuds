const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JoinRequest = sequelize.define('JoinRequest', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    groupId: {
        type: DataTypes.BIGINT,
    },
    studentId: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected', 'Cancelled'),
    },
});

module.exports = JoinRequest;
