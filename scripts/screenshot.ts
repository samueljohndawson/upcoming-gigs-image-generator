import puppeteer from "puppeteer";

const run = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: process.env.CI ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
  });

  const page = await browser.newPage();

  // Set viewport to Instagram Story size
  await page.setViewport({
    width: 1080,
    height: 1920,
    deviceScaleFactor: 2, // makes it crisp (important!)
  });

  const url = process.env.SCREENSHOT_URL ?? "http://localhost:5173";
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  // Wait for your poster to render (important for fonts/images)
  const poster = await page.$(".poster");

  await page.waitForFunction('document.fonts.status === "loaded"');

  // Optional: wait a bit for background/image/fonts
  await new Promise((r) => setTimeout(r, 1000));

  await poster?.screenshot({
    path: "poster.png",
    fullPage: false,
  });

  await browser.close();
};

run();
