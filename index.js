const express = require("express");
const session = require("express-session");
const routes = require("./controller");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const socketIO = require("socket.io");

// const session = require("express-session");
// const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();
const server = http.createServer(app);
// const io = socketIO(server, {
// 	cors: true,
// 	origins: ["localhost:3000"],
// });

const PORT = process.env.PORT || 1337;

const sess = {
	secret: "Super secret secret",
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
// const NEW_MESSAGE_EVENT = "new-message-event";
// const room = "general";
// io.on("connection", (socket) => {
// 	console.log("Conneted to socket");
// 	socket.join(room);

// 	socket.on(NEW_MESSAGE_EVENT, (data) => {
// 		io.in(room).emit(NEW_MESSAGE_EVENT, data);
// 	});

// 	socket.on("disconnet", () => {
// 		socket.leave(room);
// 	});
// });

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log("Now listening"));
});
