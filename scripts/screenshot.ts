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

  const posterType = process.env.SCREENSHOT_TYPE ?? "gigs";
  const baseUrl = process.env.SCREENSHOT_URL ?? "http://localhost:5173";

  const targetUrl = `${baseUrl}/?poster=${posterType}`;

  page.on("console", async (message) => {
    const args = await Promise.all(
      message.args().map(async (arg) => {
        try {
          return await arg.jsonValue();
        } catch {
          return String(arg);
        }
      }),
    );

    console.log(
      `[PAGE LOG] ${message.type()}: ${message.text()} ${
        args.length ? JSON.stringify(args) : ""
      }`,
    );
  });
  page.on("pageerror", (error) => {
    console.error(`[PAGE ERROR] ${String(error)}`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      console.warn(`[PAGE RESPONSE] ${response.status()} ${response.url()}`);
    }
  });

  console.log(`Navigating to target canvas: ${targetUrl}`);

  await page.goto(targetUrl, {
    waitUntil: "networkidle0",
  });

  // Wait for poster to render (important for fonts/images)
  const poster = await page.waitForSelector(".poster", {
    visible: true,
    timeout: 45000,
  });
  await page.waitForFunction('document.fonts.status === "loaded"', {
    timeout: 30000,
  });

  await new Promise((r) => setTimeout(r, 1000));

  const outputFileName = `${posterType}-poster.png`;

  if (poster) {
    await poster.screenshot({
      path: outputFileName,
      fullPage: false,
    });
    console.log(`Successfully saved snapped card to: ${outputFileName}`);
  } else {
    console.error(
      "Critical Failure: Could not find the '.poster' DOM target container.",
    );
  }

  await browser.close();
};

run();
