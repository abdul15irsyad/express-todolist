'use strict';
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book',
        {
            title: DataTypes.STRING,
            slug: DataTypes.STRING,
            year: DataTypes.INTEGER,
        },
        {}
    );
    Book.associate = function ({ User }) {
        Book.belongsTo(User, {
            foreignKey: 'authorId',
            as: 'author'
        });
    };
    return Book;
};
