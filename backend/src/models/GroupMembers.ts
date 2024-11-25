import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const GroupMembers = sequelize.define(
    'GroupMembers',
    {
        studentId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            field: 'student_id',
            primaryKey: true
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'group_id',
            primaryKey: true
        },
    },
    {
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
    }
);

export default GroupMembers;
