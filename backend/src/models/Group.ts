import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface GroupAttributes {
    id: number; // Auto-generated field
    name: string;
    description?: string;
    membersLimit: number;
    isPublic: boolean;
    course: string;
    telegramLink?: string;
    telegramId?: number;
    adminId: number;
}

// Optional id field for creating new groups
type GroupCreationAttributes=Optional<GroupAttributes, 'id'>;

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
    public id!: number;
    public name!: string;
    public description?: string;
    public membersLimit!: number;
    public isPublic!: boolean;
    public course!: string;
    public telegramLink?: string;
    public telegramId?: number;
    public adminId!: number;
}

Group.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(100),
        },
        membersLimit: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            field: 'members_limit',
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_public',
        },
        course: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        telegramLink: {
            type: DataTypes.STRING(100),
            field: 'telegram_link',
        },
        telegramId: {
            type: DataTypes.INTEGER,
            field: 'telegram_id',
        },
        adminId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'admin_id',
        },
    },
    {
        sequelize,
        tableName: 'student_group',
        schema: 'studybuds',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);


export default Group;
