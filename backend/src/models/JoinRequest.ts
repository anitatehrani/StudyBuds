import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const JoinRequest = sequelize.define(
    'JoinRequest',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'group_id',
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'student_id',
        },
        status: {
            type: DataTypes.STRING(20),
        },
    },
    {
        tableName: 'join_request',
        schema: 'studybuds',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default JoinRequest;
