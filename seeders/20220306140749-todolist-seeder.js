'use strict';
const { toSlug } = require('../utils/string')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('todolists', [
			{ title: 'Do homework', get slug() { return toSlug(this.title) } },
			{ title: 'Buy Milk', get slug() { return toSlug(this.title) } },
		], {});

	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('todolists', null, {});
	}
};