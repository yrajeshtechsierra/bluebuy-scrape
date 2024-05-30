const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();

app.get("/", async (req, res) => {
  res.send("Render Puppeteer Server");
});

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});

app.listen(4000, () => console.log("Starting"));
