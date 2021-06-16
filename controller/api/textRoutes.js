// const Contact = require("../models/contact");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { Text } = require('../../models');
const router = require('express').Router();

router.post('/recieve', async (req, res) => {
  const { From, SmsMessageSid, Body, SmsSid, To } = req.body;
  try {
    const newText = await Text.create({
      recipients_num: To,
      senders_num: From,
      text: Body,
    });
    res.writeHead(200, { 'Content-Type': 'text/xml' });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// WithAuth
router.post('/send', async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get('/messages', async (req, res) => {
  try {
    // filter out texts based on sender_num
    const allMessages = await Text.findAll({});
    res.status(200).json(allMessages);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
