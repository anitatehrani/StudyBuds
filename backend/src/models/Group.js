"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_1 = require("../config/database");
var StudentGroup = database_1.default.define('StudentGroup', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    membersLimit: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'members_limit'
    },
    isPublic: {
        type: sequelize_1.DataTypes.BOOLEAN,
        field: 'is_public',
        defaultValue: false
    },
    course: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telegramLink: {
        type: sequelize_1.DataTypes.STRING,
        field: 'telegram_link'
    },
    telegramId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'telegram_id'
    },
    adminId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'admin_id'
    },
}, {
    tableName: 'student_group',
    schema: 'studybuds',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
exports.default = StudentGroup;
