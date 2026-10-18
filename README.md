# Eyad Eldokany — AI Engineering Portfolio / v2

A complete redesign focused on **AI Systems / Neural Interface**. This version replaces the previous editorial design with a dark navy background, blue and cyan gradients, technical typography, and an interactive systems map instead of emphasizing the personal photo and generic decorative elements.

## Getting Started

Requires Node.js 20.19+ and npm.

```bash
npm install
npm run dev
```

For production:

```bash
npm run build
npm run preview
```

## Deployment on Vercel

- Framework: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- No API keys or environment variables are required.

A `vercel.json` file is included. The original website has not been modified, and this version has not been deployed to your account. Deployment requires access to your hosting account.

## Concept and Structure

1. **Identity / Interactive System Map** — A direct introduction to your name and AI Engineering focus. Select Agentic AI, Computer Vision, or Production ML, then click the map nodes to explore what each stage represents. Animation can be paused.

2. **Background / Trajectory** — Your photo in its natural colors alongside your bio and a structured timeline of experience and education.

3. **Selected Systems** — HealthBridge as the featured project, with a toggle between Architecture and Product views, followed by CodeNova, Edge AI, and Traffic Sign Detection. Includes filters and an overview of all ten projects.

4. **Engineering Capabilities** — An explorer covering four specializations, with a workflow diagram, technologies, and related projects for each specialization. The complete technology list can be expanded.

5. **Credentials** — Four featured credentials, with access to all eleven certifications, their images, and verification links.

6. **Contact** — Email with a copy-to-clipboard option, GitHub and LinkedIn links, and freelance contact options.

### Interactions

- `Ctrl+K` / `⌘K`: Search sections, projects, and technologies.
- Try searching for `RAG`, `YOLO`, or `FastAPI`.
- Keyboard navigation and Enter work inside search; Escape closes it.
- HealthBridge explorer: Overview / Architecture / Gallery / Demos.
- Original project images and videos, repository links, and the live CodeNova application.
- Respects reduced-motion preferences and supports keyboard navigation and responsive layouts.

## Editing Content and Design

| File | Purpose |
|---|---|
| `src/content.json` | Editable content: personal information, projects, experience, education, certifications, skills, capabilities, and the system map. |
| `src/portfolio.js` | Prepares JSON data for rendering, hides items, and automatically calculates counts and categories. |
| `src/App.jsx` | Sections, search, tabs, modals, and filters. |
| `src/NeuralScene.jsx` | Interactive AI system map. |
| `src/ProjectArt.jsx` | System diagrams, architecture visualizations, and illustrations for project cards. |
| `src/styles.css` | New visual identity and responsive styling rules. |
| `public/images/` | Local images and other assets. |
| `public/Eyad-Eldokany-Resume.pdf` | Resume PDF generated from the portfolio data. |
| `scripts/create-resume.py` | Regenerates the PDF; requires `pip install reportlab`. |
| `scripts/export-standalone.py` | Exports a standalone HTML file after the build. |

**Complete Content Editing Guide:**

- [Browser-friendly HTML version](CONTENT-EDITING-GUIDE.ar.html)
- [Editable Markdown version](CONTENT-EDITING-GUIDE.ar.md)

The guide explains JSON fields, adding projects, experience, and certifications, managing images, hiding and reordering items, rebuilding and deploying the website, and identifying legacy fields that no longer control the interface.

The technical content previously stored in `portfolio.js` has been moved into `content.json`, allowing you to edit everything from a single file while preserving the same design and displayed text.

## Standalone HTML

```bash
npm run build
python3 scripts/export-standalone.py ../Eyad-Eldokany-AI-Portfolio.html
```

The standalone file includes JavaScript, CSS, fonts, images, and the resume. It can be opened without a server.

An internet connection is only required to access external websites or play YouTube videos. Some embedded file viewers may restrict external links; downloading the HTML file and opening it directly in a browser avoids these limitations.

## Testing

```bash
npx playwright install --with-deps chromium
npm run dev
# In another terminal
npm run test:ui
npm run test:content
```

`TEST_URL` can be used to change the URL targeted by the tests.

The tests cover:

- The interactive system map, its modes, node details, and animation controls.
- All ten projects, filters, the product gallery, and architecture diagrams.
- Tabs, capabilities, technologies, experience, education, and certifications.
- Keyboard-based search, clipboard functionality, the mobile menu, and the PDF resume.
- Ten viewport widths ranging from 320 to 1920 pixels.
- Automated axe-core accessibility checks on desktop and mobile.

These tests do not constitute comprehensive certification of compliance with all accessibility requirements.

## Important Notes

- This is a standalone portfolio interface, not a monitoring dashboard, API, or AI model running in the background.
- The system map and diagrams illustrate workflows and technologies. They do not claim to display live connections, actual results, or performance metrics.
- The visual foundation of the system map, `neural-core.webp`, is an AI-generated abstract illustration. The interactions, explanations, and links are implemented programmatically.
- HealthBridge images, certification images, and the personal photo are sourced from the original portfolio.
- Achievement data is taken from the source material and has not been independently verified.
- The PDF was generated from the portfolio data and is not a copy of an originally uploaded resume. Review it before using it for job applications.
- The contact button opens an email application. It does not claim to send messages through a backend service.
- The original Firebase configuration, authentication system, and dashboard have not been copied.

## Sources and Licenses

Public content was updated using:

https://eyad-eldokany-portfolio-kappa.vercel.app/

Content snapshot: October 18, 2026.

Items that were hidden in the source website have not been presented as additional experience or education.

Fonts: Space Grotesk, IBM Plex Mono, and Manrope, with their SIL Open Font License (OFL) files included in `public/fonts/`.

Licenses for React, React DOM, Scheduler, and Lucide are included in `public/licenses/`.

Original images and portfolio content remain the property of their respective owners.
