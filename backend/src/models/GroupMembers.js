"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_1 = require("../config/database");
var GroupMembers = database_1.default.define('GroupMembers', {
    studentId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'student_id',
        primaryKey: true
    },
    groupId: {
        type: sequelize_1.DataTypes.BIGINT,
        field: 'group_id',
        primaryKey: true
    },
}, {
    tableName: 'group_members',
    schema: 'studybuds',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            unique: true,
            fields: ['student_id', 'group_id']
        }
    ]
});
exports.default = GroupMembers;
