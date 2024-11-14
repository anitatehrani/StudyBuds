const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GroupMembers = sequelize.define('GroupMembers', {
    studentId: {
        type: DataTypes.INTEGER,
    },
    groupId: {
        type: DataTypes.BIGINT,
    },
});

module.exports = GroupMembers;