const express = require("express");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);
const session = require("express-session");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const client = require("twilio")(accountSid, authToken);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "anything-you-want-but-keep-secret",
		resave: false,
		saveUninitialized: false,
	})
);
const port = process.env.PORT || 1337;

app.post("/", async (req, res) => {
	const messageFromApp = req.body.message;
	// send to phone
	if (messageFromApp) {
		const message = await client.messages.create({
			body: messageFromApp,
			from: process.env.TWILIO_NUMBER,
			to: process.env.MOBILE_NUMBER,
		});
		res.json(message);
	}
	// .then((message) => console.log(message));
});

app.listen(port, () => {
	console.log(`[server]: Server is running on http://localhost:${port}`);
});
