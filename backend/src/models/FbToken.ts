import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const FbToken = sequelize.define(
    'FbToken', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        studentId: {
            type: DataTypes.INTEGER,
            field: 'student_id'
        },
        token: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'fb_token',
        schema: 'studybuds',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }

);

export default FbToken;
