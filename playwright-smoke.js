const { chromium } = require("playwright");

async function answerCurrentQuestion(page) {
  const question = await page.evaluate(() => window.eval("game.currentQuestion"));
  if (!question) {
    throw new Error("No current question available");
  }

  if (question.type === "total" || question.type === "missing") {
    const value = String(question.answer);
    for (const char of value) {
      await page.locator("#inputGrid .digit-key", { hasText: char }).first().click();
    }
    await page.getByRole("button", { name: /check|count it|check choice/i }).click();
    return;
  }

  if (question.type === "drag") {
    const tokenCount = await page.locator(".drag-token").count();
    for (let i = 0; i < tokenCount; i += 1) {
      await page.locator(".drag-token").nth(i).click();
    }
    await page.getByRole("button", { name: /count it/i }).click();
    return;
  }

  if (question.type === "missing-letter") {
    await page.locator("#inputGrid .digit-key", { hasText: question.answer }).first().click();
    await page.getByRole("button", { name: /check/i }).click();
    return;
  }

  if (question.type === "sound-match") {
    await page.locator("#inputGrid .digit-key", { hasText: question.answer }).first().click();
    return;
  }

  throw new Error(`Unsupported question type: ${question.type}`);
}

async function playWorld(page, worldId, label) {
  await page.locator(`.world-card[data-world-id="${worldId}"]`).click();
  await page.waitForTimeout(150);

  for (let i = 0; i < 10; i += 1) {
    await answerCurrentQuestion(page);
    await page.waitForTimeout(1400);
  }

  await page.waitForTimeout(2000);
  const state = await page.evaluate(() => ({
    currentWorldId: window.eval("game.currentWorldId"),
    finished: window.eval("game.finished"),
    stars: window.eval("game.stars"),
    homeHidden: document.getElementById("homeView").classList.contains("is-hidden"),
    playHidden: document.getElementById("playView").classList.contains("is-hidden"),
  }));
  console.log(`after-${label}`, JSON.stringify(state));
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    pageErrors.push(err.message);
  });

  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });

  await playWorld(page, "flower-sums", "Flower Sums");
  await playWorld(page, "missing-number", "Find the Missing Number");
  await playWorld(page, "drag-count", "Treasure Drag Count");

  await page.getByRole("button", { name: /reading safari/i }).click();
  await page.waitForTimeout(300);

  await playWorld(page, "missing-letter", "Missing Letter Trail");
  await playWorld(page, "sound-match", "Sound Match");
  await playWorld(page, "mixed-safari", "Mixed Safari");

  if (consoleErrors.length || pageErrors.length) {
    throw new Error(
      `Console errors: ${consoleErrors.join(" | ")}\nPage errors: ${pageErrors.join(" | ")}`
    );
  }

  console.log("smoke-ok");
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
