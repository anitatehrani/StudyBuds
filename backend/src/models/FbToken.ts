import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Column, Model, Table } from 'sequelize-typescript';

@Table(
    {
        tableName: 'fb_token',
        schema: 'studybuds',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
class FbToken extends Model {
    @Column(
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    )
    public override id!: number;
    @Column(
        {
            type: DataTypes.STRING(200),
            allowNull: false,
        }
    )
    public token!: string;
    @Column(
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'student_id',
        }
    )
    public studentId!: number;
}

sequelize.addModels([FbToken])

export default FbToken;
