import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Professor = sequelize.define('Professor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
});

export default Professor;