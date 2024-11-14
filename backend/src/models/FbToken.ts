const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FbToken = sequelize.define('FbToken', {
    userId: {
        type: DataTypes.INTEGER,
    },
    token: {
        type: DataTypes.STRING,
    },
});

module.exports = FbToken;
