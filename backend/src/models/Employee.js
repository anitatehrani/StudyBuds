const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Operator'),
    },
});

module.exports = Employee;