import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";
import axe from "axe-core";
const base = process.env.TEST_URL || "http://127.0.0.1:5173";
const fallback =
  "/home/user/.cache/ms-playwright/chromium-1161/chrome-linux/chrome";
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"],
  ...(fs.existsSync(fallback) ? { executablePath: fallback } : {}),
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  permissions: ["clipboard-read", "clipboard-write"],
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
fs.mkdirSync("qa", { recursive: true });
const count = async (s, n) => assert.equal(await page.locator(s).count(), n, s);
const settle = async () => {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
};
const open = async () => {
  await page.goto(base, { waitUntil: "networkidle" });
  await settle();
};
try {
  await open();
  assert.deepEqual(
    await page
      .locator("main > section")
      .evaluateAll((items) => items.map((item) => item.id)),
    ["top", "background", "systems", "expertise", "credentials", "contact"],
    "Background must precede Systems without changing the rest of the layout",
  );
  assert.deepEqual(
    await page
      .locator(".main-nav a:not(.nav-mobile-contact)")
      .evaluateAll((items) => items.map((item) => item.getAttribute("href"))),
    ["#background", "#systems", "#expertise", "#credentials"],
  );
  assert.equal(
    await page
      .locator(".engineer-portrait img")
      .evaluate((img) => getComputedStyle(img).filter),
    "none",
    "Portrait should keep its natural colors",
  );
  await page.waitForFunction(
    () => document.querySelector(".engineer-portrait img").naturalWidth > 0,
  );
  assert.ok(
    await page.locator(".engineer-portrait img").evaluate((img) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 64;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 64, 64);
      const pixels = ctx.getImageData(0, 0, 64, 64).data;
      let colored = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (
          Math.max(pixels[i], pixels[i + 1], pixels[i + 2]) -
            Math.min(pixels[i], pixels[i + 1], pixels[i + 2]) >
          12
        )
          colored++;
      }
      return colored > 100;
    }),
    "Portrait file itself must be in color, not just its CSS filter",
  );
  await count(".featured-system", 1);
  await count(".system-card", 3);
  assert.match(await page.locator("h1").innerText(), /Engineering/);
  await page.screenshot({ path: "qa/ai-desktop-final.png" });
  await page
    .locator(".scene-modes")
    .getByRole("button", { name: "Computer vision", exact: true })
    .click();
  assert.match(
    await page.locator(".neural-scene").getAttribute("class"),
    /mode-vision/,
  );
  await page
    .getByRole("button", { name: /Explore identity: Embeddings/ })
    .click();
  assert.match(
    await page.locator(".scene-detail").innerText(),
    /InsightFace and FAISS/,
  );
  await page
    .getByRole("button", { name: "Pause visual animation", exact: true })
    .click();
  assert.match(
    await page.locator(".neural-scene").getAttribute("class"),
    /is-paused/,
  );
  await page
    .getByRole("button", { name: "Resume visual animation", exact: true })
    .click();
  await page
    .locator(".scene-modes")
    .getByRole("button", { name: "Agentic AI", exact: true })
    .click();
  const filters = page.locator(".system-filters");
  await filters
    .getByRole("button", { name: "Computer Vision", exact: true })
    .click();
  await count(".system-card", 5);
  await count(".featured-system", 0);
  await filters
    .getByRole("button", { name: "Machine Learning", exact: true })
    .click();
  await count(".system-card", 3);
  await filters
    .getByRole("button", { name: "Agentic AI", exact: true })
    .click();
  await count(".system-card", 1);
  await count(".featured-system", 1);
  await filters.getByRole("button", { name: /All systems/ }).click();
  await page
    .getByRole("button", { name: "Explore all 10 systems", exact: true })
    .click();
  await count(".system-card", 9);
  await page
    .getByRole("button", { name: "Show selected systems", exact: true })
    .click();
  await count(".system-card", 3);
  await page.getByRole("tab", { name: "Product", exact: true }).click();
  assert.match(
    await page.locator(".featured-product>img").getAttribute("src"),
    /healthbridge-3/,
  );
  await page
    .getByRole("button", { name: "Explore the product gallery", exact: true })
    .click();
  assert.equal(await page.locator("dialog").isVisible(), true);
  await page
    .getByRole("button", { name: "Next screenshot", exact: true })
    .click();
  assert.match(
    await page.locator(".gallery-main>img").getAttribute("src"),
    /healthbridge-1/,
  );
  await page
    .getByRole("button", { name: "View Doctor Dashboard", exact: true })
    .click();
  assert.match(
    await page.locator(".gallery-main>img").getAttribute("src"),
    /healthbridge-3/,
  );
  await page
    .locator("dialog")
    .getByRole("tab", { name: "Architecture", exact: true })
    .click();
  assert.match(
    await page.locator(".architecture-notes").innerText(),
    /Generator → Reflector → Curator/,
  );
  await page.screenshot({ path: "qa/ai-system-explorer.png" });
  await page.getByRole("tab", { name: "Demos", exact: true }).click();
  await count(".demo-card", 2);
  await count("iframe", 0);
  assert.equal(
    await page
      .getByRole("link", { name: "Watch on YouTube" })
      .first()
      .getAttribute("href"),
    "https://youtu.be/AkmpXr-Mj1I",
  );
  await page.keyboard.press("Escape");
  await count("dialog", 0);
  await page.getByRole("tab", { name: "Architecture", exact: true }).click();
  await page
    .getByRole("button", { name: "Explore CodeNova", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("link", { name: /Launch live app/ })
      .getAttribute("href"),
    "https://coding-bot.fly.dev/",
  );
  await page.getByRole("button", { name: "Close dialog", exact: true }).click();
  await page.getByRole("tab", { name: /Computer Vision/ }).click();
  assert.match(
    await page.locator(".capability-panel>h3").innerText(),
    /Computer Vision/,
  );
  await page.getByRole("tab", { name: /Production Engineering/ }).click();
  assert.match(
    await page.locator(".capability-workflow").innerText(),
    /Deploy \+ observe/,
  );
  await page
    .getByRole("button", { name: /THE FULL ENGINEERING STACK/ })
    .click();
  await count(".inventory-grid>article", 6);
  await page
    .getByRole("button", { name: /THE FULL ENGINEERING STACK/ })
    .click();
  await count(".inventory-grid>article", 0);
  await page.getByRole("tab", { name: "Education", exact: true }).click();
  await count(".timeline-entry", 1);
  await page.getByRole("tab", { name: "Experience", exact: true }).click();
  await count(".timeline-entry", 4);
  await count(".credential-row", 4);
  await page
    .getByRole("button", { name: "View all 11 credentials", exact: true })
    .click();
  await count(".credential-row", 11);
  await page.locator(".credential-row").first().click();
  assert.equal(await page.locator(".certificate-image>img").isVisible(), true);
  assert.match(
    await page
      .getByRole("link", { name: /Verify credential/ })
      .getAttribute("href"),
    /coursera/,
  );
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Show highlights", exact: true })
    .click();
  await count(".credential-row", 4);
  await page
    .getByRole("button", { name: "Copy email address", exact: true })
    .click();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    "eyad.eldokany@gmail.com",
  );
  await page
    .getByRole("button", { name: "Open command palette", exact: true })
    .click();
  const search = page.getByRole("combobox", { name: "Search portfolio" });
  await search.fill("RAG");
  await count(".command-results>[role=option]", 2);
  await search.press("Enter");
  await count(".command-dialog", 0);
  assert.match(
    await page.locator(".project-dialog-heading h2").innerText(),
    /HealthBridge/,
  );
  await page.keyboard.press("Escape");
  await page.keyboard.press("Control+k");
  await search.fill("Background");
  await search.press("Enter");
  await count("dialog", 0);
  await page.keyboard.press("Control+k");
  await search.fill("no-such-system");
  assert.match(await page.locator(".command-empty").innerText(), /No results/);
  await page.keyboard.press("Escape");
  await open();
  const a11y = await page.evaluate(
    axe.source +
      ';axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})',
  );
  fs.writeFileSync(
    "qa/ai-accessibility-desktop.json",
    JSON.stringify(a11y.violations, null, 2),
  );
  assert.equal(
    a11y.violations.length,
    0,
    "Desktop automated accessibility checks",
  );
  for (const width of [320, 360, 375, 390, 430, 768, 900, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await settle();
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `Horizontal overflow at ${width}px`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await settle();
  await page.screenshot({ path: "qa/ai-mobile-final.png" });
  const mobileA11y = await page.evaluate(
    axe.source +
      ';axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})',
  );
  fs.writeFileSync(
    "qa/ai-accessibility-mobile.json",
    JSON.stringify(mobileA11y.violations, null, 2),
  );
  assert.equal(
    mobileA11y.violations.length,
    0,
    "Mobile automated accessibility checks",
  );
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  assert.equal(await page.locator(".main-nav").isVisible(), true);
  await page
    .locator(".main-nav")
    .getByRole("link", { name: "Background", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation", exact: true })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.locator("#background").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "qa/ai-mobile-background.png" });
  await page
    .getByRole("button", { name: "Explore the system", exact: true })
    .click();
  await page.getByRole("tab", { name: "Gallery", exact: true }).click();
  await page
    .getByRole("button", { name: "Next screenshot", exact: true })
    .click();
  assert.equal(
    await page.locator(".gallery-main>img").evaluate((i) => i.naturalWidth),
    1000,
  );
  await page.keyboard.press("Escape");
  assert.equal(errors.length, 0, errors.join("\n"));
  assert.equal(
    (await context.request.get(base + "/Eyad-Eldokany-Resume.pdf")).status(),
    200,
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await open();
  for (const id of [
    "background",
    "systems",
    "expertise",
    "credentials",
    "contact",
  ]) {
    await page.locator("#" + id).scrollIntoViewIfNeeded();
    await page.evaluate(
      () =>
        new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(r)),
        ),
    );
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "qa/ai-desktop-full.png", fullPage: true });
  console.log(
    "PASS: neural-map modes, node explanations, pause, all 10 systems, filters, architecture/product preview, case explorer, gallery, videos, source/demo links, capabilities, full stack, trajectory, 11 credentials, copy, keyboard command palette, mobile navigation, PDF, 10 screen sizes, zero browser errors, and zero automated accessibility violations on desktop/mobile.",
  );
} finally {
  await browser.close();
}
