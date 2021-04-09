'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',
        {
            name: DataTypes.STRING,
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
            },
            gender: DataTypes.ENUM('m', 'f'),
        },
        {}
    );
    User.associate = function ({ Book }) {
        User.hasMany(Book, {
            foreignKey: 'authorId',
            as: 'books'
        });
    };
    return User;
};