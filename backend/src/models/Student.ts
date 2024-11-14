import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Student = sequelize.define(
    'Student', {
        studentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'student_id'
        },
        telegramAccount: {
            type: DataTypes.INTEGER,
            field: 'telegram_account'
        },
    },
    {
        tableName: 'student',
        schema: 'studybuds',
        timestamps: false
    }
);

export default Student;
