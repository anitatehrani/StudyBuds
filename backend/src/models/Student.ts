import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Column, Model, Table } from "sequelize-typescript";


@Table({
    tableName: "student",
    schema: "studybuds",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})
class Student extends Model {
    @Column({
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'student_id', // Map to database column
    })
    public studentId!: number;

    @Column({
        type: DataTypes.INTEGER,
        field: 'telegram_account', // Map to database column
    })
    public telegramAccount!: number;

}

sequelize.addModels([Student]);


export default Student;
