import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

/**
 * Interface for the Group attributes
 */
interface GroupAttributes {
    id: number;
    name: string;
    description?: string;
    membersLimit: number;
    isPublic: boolean;
    course: string;
    telegramLink?: string; // Using camelCase for TypeScript
    telegramId?: number;
    adminId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Interface for Group creation attributes,
 * marking 'id', 'createdAt', and 'updatedAt' as optional
 */
type GroupCreationAttributes = Optional<GroupAttributes, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Group model for the "student_group" table in the "studybuds" schema
 */
class StudentGroup extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
    public id!: number;
    public name!: string;
    public description?: string;
    public membersLimit!: number;
    public isPublic!: boolean;
    public course!: string;
    public telegramLink?: string;
    public telegramId?: number;
    public adminId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StudentGroup.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        membersLimit: {
            type: DataTypes.INTEGER,
            field: 'members_limit',
            allowNull: false,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            field: 'is_public',
            defaultValue: false,
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telegramLink: {
            type: DataTypes.STRING,
            field: 'telegram_link',
            allowNull: true,
        },
        telegramId: {
            type: DataTypes.INTEGER,
            field: 'telegram_id',
            allowNull: true,
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

export default StudentGroup;
