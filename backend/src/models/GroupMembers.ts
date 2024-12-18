import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';
import sequelize from '../config/database';



@Table({
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
})

class GroupMembers extends Model {
    @Column(
        {
            type: DataTypes.SMALLINT,
            allowNull: false,
            field: 'student_id',
            primaryKey: true
        }
    )
    public studentId!: number;

    @Column(
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'group_id',
            primaryKey: true
        }
    )
    public groupId!: number;
}
sequelize.addModels([GroupMembers])

export default GroupMembers;
