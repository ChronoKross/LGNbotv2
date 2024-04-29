// app.js

const startExpress () =>{
  const express = require("express");
  require("dotenv").config();
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    res.send("Bot is operational!");
  });

  app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
  });
}

module.exports = startExpress;