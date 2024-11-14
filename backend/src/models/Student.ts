const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
    studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    tel_account: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Student;