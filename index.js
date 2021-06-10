const express = require("express");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);
// const session = require("express-session");
// const MessagingResponse = require("twilio").twiml.MessagingResponse;
const client = require("twilio")(accountSid, authToken);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
// 	session({
// 		secret: "anything-you-want-but-keep-secret",
// 		resave: false,
// 		saveUninitialized: false,
// 	})
// );
const port = process.env.PORT || 1337;

// client.messages
// 	.create({ body: "Hi there", from: "+15017122661", to: "+15558675310" })
// 	.then((message) => console.log(message.sid));

// SEND TO USER
app.post("/reply", async (req, res) => {
	const mes = req.body.message;
	// FIGURE OUT WHO I AM REPLYING TO
	const message = await client.messages.create({
		body: mes,
		from: process.env.TWILIO_NUMBER,
		to: process.env.MOBILE_NUMBER,
	});
	// FIND CONVERSATION
	// ADD MESSAGE TO CONVERSATION
	// ALWAYS UPDATE THE CONVERSATION
	res.json(message);
});

// Receive
app.post("/sms", async (req, res) => {
	const body = req.body.Body;
	// SAVE text and number
	// CREATE new convo
	// assign the the number and twilio number as participants
	console.log(body);

	// Start our TwiML response.
	// const twiml = new MessagingResponse();

	// Add a text message.
	// const msg = twiml.message(
	// 	"Hey Phone thanks for the text here's a return text"
	// );

	// res.writeHead(200, { "Content-Type": "text/xml" });
	// res.end(twiml.toString());
});

app.listen(port, () => {
	console.log(`[server]: Server is running on http://localhost:${port}`);
});
