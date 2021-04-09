'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const configEnv = require('../config/database')[env];

let sequelize;
if (configEnv.use_env_variable) {
    sequelize = new Sequelize(process.env[configEnv.use_env_variable], { ...configEnv, logging: false });
} else {
    sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, { ...configEnv, logging: false });
}

// import all models
const User = require('./User')
const Book = require('./Book')

const db = {
    User: User(sequelize, Sequelize.DataTypes),
    Book: Book(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach(model => {
    if (db[model].associate) {
        db[model].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
