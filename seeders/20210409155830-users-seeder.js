'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const SALT_WORK_FACTOR = 5;
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        await queryInterface.bulkInsert('users', [
            {
                name: 'Irsyad Abdul Hamid',
                username: 'abdulirsyad',
                email: 'abdulirsyad15@gmail.com',
                password: bcrypt.hashSync('Qwerty123', salt),
                gender: 'm',
            },
            {
                name: 'John Doe',
                username: 'johndoe15',
                email: 'johndoe@email.com',
                password: bcrypt.hashSync('Qwerty123', salt),
                gender: 'm',
            },
        ], {});

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};
