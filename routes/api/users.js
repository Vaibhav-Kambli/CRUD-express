const express = require("express");
const router = express.Router();
const users = require("../../Users");
const uuid = require("uuid");

/** Gets all users from Users.js file */
router.get("/", (req, res) => {
	res.json(users);
});

/** Get single user */
router.get("/:id", (req, res) => {
	const found = users.some((user) => user.id === parseInt(req.params.id));

	if (found) {
		res.json(users.filter((user) => user.id === parseInt(req.params.id)));
	} else {
		res
			.status(404)
			.json({ message: `User with id ${req.params.id} not found` });
	}
});

/** Create a user */
router.post("/", (req, res) => {
	const newUser = {
		id: uuid.v4(),
		name: req.body.name,
		age: req.body.age,
	};

	if (!newUser.name || !newUser.age) {
		return res.status(400).json({ message: "Please include a name and age" });
	}

	users.push(newUser);
	res.json(users);
});

/** Update a user */
router.put("/:id", (req, res) => {
	const found = users.filter((user) => user.id === parseInt(req.params.id));

	if (found) {
		const updUser = req.body;

		users.forEach((user) => {
			if (user.id === parseInt(req.params.id)) {
				user.name = updUser.name ? updUser.name : user.name;
				user.age = updUser.age ? updUser.age : user.age;

				res.json({ message: "Member updated", user });
			}
		});
	} else {
		res
			.status(404)
			.json({ message: `User with id ${req.params.id} not found` });
	}

	users.push(updateUser);
	res.json(users);
});

/** Delete a user */
router.delete("/:id", (req, res) => {
	const found = users.filter((user) => user.id === parseInt(req.params.id));
	if (found) {
		res.json({
			message: "User deleted successfully",
			users: users.filter((user) => user.id !== parseInt(req.params.id)),
		});
	} else {
		res
			.status(404)
			.json({ message: `User with id ${req.params.id} not found` });
	}
});

module.exports = router;
