var express = require("express");

var router = express.router();

var db = require("../models");

router.get("/", function(req,res){
	res.redirect("/burgers");
});

router.get("/burgers", function(req,res){
	db.Burger.findAll({
		include: [db.Customer],
		order: [
		["burger_name", "ASC"]
		]
	})
})

.then(function(dbBruger){
	var hbsObject = {
		burger: dbBurger
	};
	return res.render("index", hbsObject);
});

router.post("/burgers/create", function(req,res){
	db.Burger.create({
		burger_name: req.body.burger_name
	})
	.then(function(dbBurger){
		console.log(dbBurger);
		res.redirect("/");
	});
});

router.put("/burgers/update", function(req,res){
	if(req.body.customer){
		db.Customer.create({
			customer: req.body.customer,
			BurgerId: req.body.burger_id
		})
		.then(function(dbCustomer){
			return db.Burger.update({
				devoured:true
			},{
				where:{
					id: req.body.burger_id
				}
			}
			});
		})
		.then(function(dbBurger){
			res.json("/");
		});
	}
	else{
		db.Burger.update({
			devoured:true
		},{
			where:{
				id: req.body.burger_id
			}
		}
		})
		.then(function(dbBurger){
			res.josn("/");
		});
	}
});
module.exports=router;