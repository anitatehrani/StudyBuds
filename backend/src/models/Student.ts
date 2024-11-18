import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface StudentAttributes {
    studentId: number; // Maps to "student_id" in the database
    telegramAccount?: number;
}

class Student extends Model<StudentAttributes> implements StudentAttributes {
    public studentId!: number;
    public telegramAccount?: number;
}

Student.init(
    {
        studentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'student_id', // Map to database column
        },
        telegramAccount: {
            type: DataTypes.INTEGER,
            field: 'telegram_account', // Map to database column
        },
    },
    {
        sequelize,
        tableName: 'student',
        schema: 'studybuds',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Student;
