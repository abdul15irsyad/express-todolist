'use strict';
module.exports = (sequelize, DataTypes) => {
    const Todolist = sequelize.define('Todolist',
        {
            title: DataTypes.STRING(255),
            slug: DataTypes.STRING(255),
        },
        {}
    );
    return Todolist;
};