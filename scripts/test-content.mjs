import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";

// Browser-only JSON overrides: the real content file and the user's preview
// remain untouched. Run against the Vite dev server (npm run dev).
const originalText = fs.readFileSync("src/content.json", "utf8");
const source = JSON.parse(originalText);
const edited = structuredClone(source);
const projectCount = source.projects.filter((p) => p.visible !== false).length;
const certificateCount = source.certs.filter((c) => c.visible !== false).length;
edited.config.firstname = "JSON";
edited.config.lastname = "Preview";
edited.config.aboutp1 = "This profile paragraph is controlled by content.json.";
edited.config.heroDescription.focus = "JSON-controlled copy";
edited.config["contact-email"] = "json-test@example.org";
edited.projects.find((p) => p.id === "codenova").title = "CodeNova JSON Test";
edited.projects.find((p) => p.id === "traffic").visible = false;
edited.exp[0].title = "JSON test role";
edited.exp[1].visible = false;
edited.certs[0].visible = false;
edited.skills.push({ name: "JSON Test Tools", pills: "Tool A,Tool B" });
edited.capabilities[0].tools.push("JSON Test Technology");
edited.heroModes[0].nodes[1].value = "Reasoning via JSON";
edited.hb.lede = "HealthBridge overview is controlled by hb.lede.";
edited.hb.featuredDescription = "A featured description edited through JSON.";
edited.hb.gallery.push({
  localImage: edited.hb.gallery[0].localImage,
  label: "JSON Gallery Test",
  tag: "JSON test",
});

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.route("**/src/content.json*", (route) =>
  route.fulfill({
    contentType: "text/javascript",
    body: "export default " + JSON.stringify(edited) + ";",
  }),
);
try {
  await page.goto(process.env.TEST_URL || "http://127.0.0.1:5173", {
    waitUntil: "networkidle",
  });
  assert.equal(
    await page.locator(".profile-heading h3").innerText(),
    "JSON Preview",
  );
  assert.ok(
    (await page.locator("#background").innerText()).includes(
      edited.config.aboutp1,
    ),
  );
  assert.equal(
    await page.locator(".hero-description strong").innerText(),
    "JSON-controlled copy",
  );
  assert.equal(
    await page.locator(".email-copy>a").getAttribute("href"),
    "mailto:json-test@example.org",
  );
  assert.equal(
    await page.locator(".hero-stats>div:nth-child(2)>strong").innerText(),
    String(projectCount - 1),
  );
  assert.equal(
    await page.locator(".timeline-entry").count(),
    source.exp.length - 1,
  );
  assert.ok(
    (await page.locator(".timeline").innerText()).includes("JSON test role"),
  );
  assert.ok(
    (await page.locator(".capability-tools").innerText()).includes(
      "JSON Test Technology",
    ),
  );
  assert.ok(
    (await page.locator(".neural-canvas").innerText()).includes(
      "Reasoning via JSON",
    ),
  );
  await page
    .getByRole("button", { name: "Explore CodeNova JSON Test", exact: true })
    .click();
  assert.ok(
    (await page.locator(".project-dialog-heading").innerText()).includes(
      "CodeNova JSON Test",
    ),
  );
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: /THE FULL ENGINEERING STACK/ })
    .click();
  assert.equal(
    await page.locator(".inventory-grid>article").count(),
    source.skills.length + 1,
  );
  await page
    .getByRole("button", {
      name: `View all ${certificateCount - 1} credentials`,
      exact: true,
    })
    .click();
  assert.equal(
    await page.locator(".credential-row").count(),
    certificateCount - 1,
  );
  await page
    .getByRole("button", { name: "Explore the system", exact: true })
    .click();
  assert.equal(
    await page.locator(".full-description").innerText(),
    edited.hb.lede,
  );
  await page
    .locator("dialog")
    .getByRole("tab", { name: "Gallery", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Previous screenshot", exact: true })
    .click();
  assert.ok(
    (await page.locator(".gallery-controls").innerText()).includes(
      "JSON Gallery Test",
    ),
  );
  assert.ok(
    (await page.locator(".gallery-controls small").innerText()).includes(
      "05 / 05",
    ),
  );
  await page.keyboard.press("Escape");

  // Add a project and a highlighted certificate without touching JSX or JS.
  edited.projects.push({
    id: "json-test-system",
    title: "JSON Added System",
    category: "Machine Learning",
    type: "Test system",
    art: "generic",
    summary: "A browser-only test project.",
    desc: "Created only in this test browser; never saved to the portfolio.",
    problem: "Validate the editing guide.",
    approach: ["Edit JSON", "Verify the interface"],
    stack: ["Python", "FastAPI"],
    link: source.projects.find((p) => p.id === "codenova").link,
    visible: true,
  });
  edited.certs.push({
    ...source.certs[0],
    id: "json-test-certificate",
    title: "JSON Added Certificate",
    visible: true,
    date: "2026",
  });
  edited.certHighlights = ["json-test-certificate"];
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(
    await page.locator(".hero-stats>div:nth-child(2)>strong").innerText(),
    String(projectCount),
  );
  assert.equal(await page.locator(".credential-row").count(), 1);
  assert.ok(
    (await page.locator(".credential-row").innerText()).includes(
      "JSON Added Certificate",
    ),
  );
  await page
    .getByRole("button", {
      name: `Explore all ${projectCount} systems`,
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Explore JSON Added System", exact: true })
    .click();
  assert.ok(
    (await page.locator(".project-dialog-heading").innerText()).includes(
      "JSON Added System",
    ),
  );
  assert.equal(errors.length, 0, errors.join("\n"));
  assert.equal(
    fs.readFileSync("src/content.json", "utf8"),
    originalText,
    "The real content file was not changed",
  );
  console.log(
    "PASS: JSON-only name/bio/hero/email edits; project title, hiding and addition; current experience; certificate hiding, addition and highlights; new skill group; capability tools; neural labels; HealthBridge overview; variable gallery count; no browser errors or changes to the real portfolio.",
  );
} finally {
  await browser.close();
}
