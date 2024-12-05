import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Column, Model, Table } from 'sequelize-typescript';

@Table(
    {
        tableName: 'join_request',
        schema: 'studybuds',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)
class JoinRequest extends Model{
    @Column({
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        })
    public override id!:number;
    @Column(
{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'group_id',
        }
    )
    public groupId!:number;
    @Column(
{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'student_id',
        }
    )
    public studentId!:number;
    @Column(
{
            type: DataTypes.STRING(20),
        }
    )
    public status!:string;
}

sequelize.addModels([JoinRequest])



export default JoinRequest;
