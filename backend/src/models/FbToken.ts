import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const FbToken = sequelize.define(
    'FbToken',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'student_id',
        },
    },
    {
        tableName: 'fb_token',
        schema: 'studybuds',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default FbToken;
