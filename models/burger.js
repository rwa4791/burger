module.exports = function(sequelize, DataTypes) {
	var Burger = sequelize.define("Burger", {
	burger_name : {
	type: DataTypes.STRING,
	allowNull: fa;se
	},
	devoured: {
	type: DataTypes.BOOLEAN,
	defaultValue: false
	}
	}, {
	classMethods: {
	associate: function(models){
	Burger.hasone(models.Customer);
	}
	}
	});
	return Burger;
};