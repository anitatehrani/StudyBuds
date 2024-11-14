const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professor = sequelize.define('Professor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
});

module.exports = Professor;