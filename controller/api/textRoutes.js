// const Contact = require("../models/contact");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { Text, User } = require('../../models');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.post('/recieve', async (req, res) => {
  const { From, SmsMessageSid, Body, SmsSid, To } = req.body;
  try {
    // find user based on number
    const findUserBasedOnNumber = await User.findOne({
      where: { twilio_number: To },
    });
    if (findUserBasedOnNumber) {
      const newText = await Text.create({
        recipients_num: To,
        senders_num: From,
        text: Body,
        user_id: findUserBasedOnNumber.id,
      });
      res.writeHead(200, { 'Content-Type': 'text/xml' });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// WithAuth
router.post('/send', withAuth, async (req, res) => {
  const { to, message } = req.body;
  const { user_id, cookie, logged_in } = req.session;

  try {
    const findUser = await User.findByPk(user_id);
    if (findUser && logged_in === true) {
      const twilioNum = findUser.twilio_number;
      // When you click into a converstaion you should already know which number you're texting
      const twilioToMobileMessage = await client.messages.create({
        body: message,
        from: twilioNum,
        to,
      });

      const saveUserText = await Text.create({
        recipients_num: twilioNum,
        senders_num: to,
        text: message,
        user_id: req.session.user_id,
      });
      res.json(saveUserText);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get('/messages', withAuth, async (req, res) => {
  try {
    // filter out texts based on sender_num
    // When you click into a converstaion you should already know which number you're texting
    const allMessages = await Text.findAll({
      where: { user_id: req.session.user_id },
    });
    res.status(200).json(allMessages);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
