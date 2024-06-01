const puppeteer = require("puppeteer");
require("dotenv").config();

async function hughesLogin(username, password, page) {
  const loginUrl = "https://hughesstatesville.com/login";
  console.log("URL");

  try {
    await page.goto(loginUrl);
    console.log("Hit URL");
    await page.waitForSelector('input[name="D1"]');
    console.log("wait URL");
    await page.type('input[name="D1"]', username);
    await page.type('input[name="D2"]', password);
    await page.click('button[type="submit"]');
    console.log("submit");

    await page.waitForNavigation();
    console.log("Login successful");
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
}

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
  });

  try {
    const page = await browser.newPage();

    const username = process.env.HugheshUserName || "mlcole@griffinbros.com";
    const password = process.env.HughesPassword || "Picc1701!";

    await hughesLogin(username, password, page);
  } catch (error) {
    console.log("Error", error);
    res.send(`Something went wrong:- ${error} `);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
