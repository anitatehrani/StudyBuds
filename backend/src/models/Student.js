"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_1 = require("../config/database");
var Student = database_1.default.define('Student', {
    studentId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'student_id'
    },
    telegramAccount: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'telegram_account'
    },
}, {
    tableName: 'student',
    schema: 'studybuds',
    timestamps: false
});
exports.default = Student;
