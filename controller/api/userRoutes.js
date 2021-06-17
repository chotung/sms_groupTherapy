// const { User } = require("../models");

// module.exports = {
// 	// Only for dev use
// 	async getAllUsers(req, res) {
// 		res.send("get all the users for dev purposes")
// 		// 	try {
// 		// 		const users = await User.find({});
// 		// 		res.status(201).json(users);
// 		// 	} catch (e) {
// 		// 		console.log(e);
// 		// 		res.send(e);
// 		// 	}
// 	},

// 	async register(req, res) {
// 		const { name, password, email, twilioNumber } = req.body;
// 		// take info from client
// 		// create a new user for chat app
// 		// redirect to login after success

// 		// try {
// 		// 	// const findUser = await User.find({ where: { name } });
// 		// 	if (!findUser) {
// 		// 		const createUser = await User.create({
// 		// 			name,
// 		// 			password,
// 		// 			email,
// 		// 			twilioNumber,
// 		// 		});
// 		// 		res.status(200).json(createUser);
// 		// 	} else {
// 		// 		// res.redirect("/login");
// 		// 		// res.json(findUser);
// 		// 		res.send("Login");
// 		// 	}
// 		// } catch (e) {}
// 	},

// 	async login(req, res) {},
// };

const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
