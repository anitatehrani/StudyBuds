import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Notification = sequelize.define(
    'Notification', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        joinRequestId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'join_request_id'
        },
        type: {
            type: DataTypes.ENUM('Acceptance', 'Request', 'Rejection'),
        },
    },
    {
        tableName: 'notification',
        schema: 'studybuds',
        timestamps: true
    }
);

export default Notification;
