'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('todolists', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING(255)
			},
			slug: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING(255)
			},
			createdAt: {
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()'),
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('todolists');
	}
};