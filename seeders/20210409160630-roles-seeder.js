'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('books', [
            {
                title: 'Attack On Titan',
                slug: 'attack-on-titan',
                year: 2021,
                authorid: 1
            }
        ], {});

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('books', null, {});
    }
};
