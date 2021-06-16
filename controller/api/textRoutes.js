// const Contact = require("../models/contact");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { Text } = require('../../models');

module.exports = {
  async recieveText(req, res) {
    console.log(req.body.Body);
    const { From, SmsMessageSid, Body, SmsSid, To } = req.body;
    try {
      const newText = await Text.create({});
      // save the text
      // const txt = await Text.create({
      // 	From,
      // 	To,
      // 	SmsMessageSid,
      // 	Body,
      // 	SmsSid,
      // });
      // match sender number and user number
      // if first time sending
      // create a new conversation
      // have to write content type of twilio as xml
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.send(txt);
      // else there's already a conversation between sender and twilio/user
      // find and update that convo by adding new text
      // res.writeHead(200, { "Content-Type": "text/xml" });
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },

  async sendText(req, res) {
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
  },

  async getRelatedText(req, res) {
    res.send('get text messages related to a specific number');
  },

  async getListofSenders(req, res) {
    res.send('gets all the phone numbers to seperate the conversations');
  },
};
