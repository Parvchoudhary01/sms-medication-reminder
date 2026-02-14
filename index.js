require('dotenv').config();

const express = require("express");
const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const cron = require('node-cron');
const moment = require('moment');

console.log(`Medication Reminder started at ${moment().format('DD/MM/YYYY HH:mm')}`);

// Simple route so browser can open it
app.get("/", (req, res) => {
  res.send("SMS Medication Reminder is running 🚀");
});

// Cron job
cron.schedule('* * * * *', async () => {

  let startDate = '08/03/2022';

  if (moment(startDate, 'DD/MM/YYYY').isBefore()) {

    client.messages
      .create({
        body: 'Take your medication',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.PHONE_NUMBER,
      })
      .then(message => console.log("Message Sent:", message.sid))
      .catch(err => console.log("Error:", err.message));
  }

});

// IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
