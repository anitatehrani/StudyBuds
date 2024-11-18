"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_1 = require("../config/database");
var JoinRequest = database_1.default.define('JoinRequest', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
    },
    groupId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        field: 'group_id'
    },
    studentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'student_id'
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Pending', 'Accepted', 'Rejected', 'Cancelled'),
    },
}, {
    tableName: 'join_request',
    schema: 'studybuds',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
exports.default = JoinRequest;
