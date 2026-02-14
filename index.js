const express = require("express");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 3000;

// Home Route
app.get("/", (req, res) => {
  res.send("Reminder App is Running 🚀");
});

// Cron Job (runs every 1 minute)
cron.schedule("* * * * *", () => {
  console.log("⏰ Reminder triggered at:", new Date().toLocaleString());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
