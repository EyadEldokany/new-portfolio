import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Github,
  Linkedin,
  Search,
  Menu,
  X,
  Download,
  Copy,
  Check,
  Mail,
  MapPin,
  GraduationCap,
  BriefcaseBusiness,
  Bot,
  ScanFace,
  ChartNoAxesCombined,
  Boxes,
  Cpu,
  Network,
  Layers3,
  Code2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  FileText,
  Terminal,
  Braces,
  BadgeCheck,
  Sparkles,
  CornerDownLeft,
  SlidersHorizontal,
  Database,
  HeartPulse,
} from "lucide-react";
import NeuralScene from "./NeuralScene";
import ProjectArt, { HealthArchitecture } from "./ProjectArt";
import {
  content,
  fullName,
  email,
  profiles,
  projects,
  categories,
  capabilities,
} from "./portfolio";

const navigation = [
  ["background", "Background"],
  ["systems", "Systems"],
  ["expertise", "Expertise"],
  ["credentials", "Credentials"],
];
const capabilityIcons = {
  agents: Bot,
  vision: ScanFace,
  learning: ChartNoAxesCombined,
  production: Boxes,
};
const skillIcons = [Cpu, Bot, Braces, Network, Boxes, ChartNoAxesCombined];
function External({ href, className = "", children, ...rest }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
}
function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <i />
      {children}
    </div>
  );
}
function StatNumber({ value }) {
  const text = String(value);
  return (
    <strong>
      {text.replace(/\+$/, "")}
      {text.endsWith("+") && <span>+</span>}
    </strong>
  );
}
function Brand({ small = false }) {
  return (
    <a
      href="#top"
      className={`brand ${small ? "brand-small" : ""}`}
      aria-label={`${fullName} home`}
    >
      <span className="brand-symbol">
        <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="20 24 256 256" role="img" aria-labelledby="logo-title">
          <title id="logo-title">Eyad Eldokany</title>
          <defs>
            <linearGradient id="silver" x1="48" y1="14" x2="88" y2="130" gradientUnits="userSpaceOnUse">
              <stop stop-color="#ffffff"/>
              <stop offset="1" stop-color="#dce6f4"/>
            </linearGradient>
            <linearGradient id="electric-blue" x1="61" y1="128" x2="164" y2="28" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1174d8"/>
              <stop offset=".38" stop-color="#159fff"/>
              <stop offset=".72" stop-color="#2ca7ff"/>
              <stop offset="1" stop-color="#3187fa"/>
            </linearGradient>
            <linearGradient id="cobalt" x1="107" y1="80" x2="183" y2="131" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2ba6ff"/>
              <stop offset=".55" stop-color="#327cf9"/>
              <stop offset="1" stop-color="#4546f3"/>
            </linearGradient>
            <linearGradient id="ribbon-fold" x1="54" y1="119" x2="78" y2="127" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1668bd"/>
              <stop offset="1" stop-color="#278be9"/>
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="#070b14"/>
          <g transform="translate(-31 26) scale(1.4)">
            <path fill="url(#silver)" d="M66 14h72l-19 18H53v31h37L72 81H53v29c0 4 3 6 9 7h6l-8 13c-16-4-26-14-26-27V43c0-17 14-29 32-29Z"/>
            <path fill="url(#cobalt)" d="M126 72h48v20h-54v21h72l-19 19h-71V98Z"/>
            <path fill="url(#electric-blue)" d="M135 30h59l-20 21h-39l-65 75c-4 5-9 7-14 3-6-4-5-10-1-15l75-81c2-2 3-3 5-3Z"/>
            <path fill="url(#ribbon-fold)" d="M56 113h25l-11 13c-4 5-9 7-14 3-5-3-5-9 0-16Z"/>
          </g>
        </svg>
      </span>
      <span>
        {content.config.firstname.toUpperCase()}
        <span className="brand-separator">/</span>
        {content.config.lastname.toUpperCase()}
        <small>{content.config.primaryRole.toUpperCase()}</small>
      </span>
    </a>
  );
}
function tabNavigation(event) {
  if (
    ![
      "ArrowRight",
      "ArrowLeft",
      "ArrowDown",
      "ArrowUp",
      "Home",
      "End",
    ].includes(event.key)
  )
    return;
  const tabs = [...event.currentTarget.querySelectorAll('[role="tab"]')];
  const current = tabs.indexOf(document.activeElement);
  if (current < 0) return;
  event.preventDefault();
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? tabs.length - 1
        : (current +
            (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) +
            tabs.length) %
          tabs.length;
  tabs[next].focus();
  tabs[next].click();
}
function trackPointer(event) {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--mouse-x",
    `${event.clientX - box.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--mouse-y",
    `${event.clientY - box.top}px`,
  );
}
function Dialog({ title, children, onClose, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    ref.current.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`system-dialog ${className}`}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="dialog-shell">
        <button
          className="dialog-close icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </dialog>
  );
}
function CommandPalette({ onClose, onProject, onCapability }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => {
    const items = [
      ...navigation.map(([id, label]) => ({
        id,
        label,
        type: "PAGE",
        icon: Network,
        keywords: label,
        action: () => {
          onClose();
          requestAnimationFrame(() =>
            document.getElementById(id).scrollIntoView({ behavior: "smooth" }),
          );
        },
      })),
      ...projects.map((p) => ({
        id: p.id,
        label: p.title,
        type: p.category,
        icon:
          p.category === "Agentic AI"
            ? Bot
            : p.category === "Computer Vision"
              ? ScanFace
              : ChartNoAxesCombined,
        keywords: [p.title, p.type, ...p.stack, ...p.tags].join(" "),
        action: () => {
          onClose();
          onProject(p);
        },
      })),
      ...capabilities.map((c, index) => ({
        id: "capability-" + c.id,
        label: c.title,
        type: "CAPABILITY",
        icon: capabilityIcons[c.id],
        keywords: [c.title, ...c.tools].join(" "),
        action: () => {
          onClose();
          onCapability(index);
          requestAnimationFrame(() =>
            document
              .getElementById("expertise")
              .scrollIntoView({ behavior: "smooth" }),
          );
        },
      })),
      {
        id: "resume",
        label: "Download résumé",
        type: "DOCUMENT",
        icon: FileText,
        keywords: "resume cv experience education",
        action: () => {
          onClose();
          const a = document.createElement("a");
          a.href = "/Eyad-Eldokany-Resume.pdf";
          a.download = "Eyad-Eldokany-Resume.pdf";
          a.click();
        },
      },
      {
        id: "contact",
        label: "Get in touch",
        type: "CONTACT",
        icon: Mail,
        keywords: "email contact freelance connect",
        action: () => {
          onClose();
          requestAnimationFrame(() =>
            document
              .getElementById("contact")
              .scrollIntoView({ behavior: "smooth" }),
          );
        },
      },
    ];
    const q = query.toLowerCase().trim();
    return (
      q ? items.filter((r) => r.keywords.toLowerCase().includes(q)) : items
    ).slice(0, 12);
  }, [query, onClose, onProject, onCapability]);
  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    document
      .getElementById(`command-result-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);
  const current = Math.min(active, results.length - 1);
  function keydown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((current + 1) % Math.max(results.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((current - 1 + results.length) % Math.max(results.length, 1));
    }
    if (e.key === "Enter" && results[current]) {
      e.preventDefault();
      results[current].action();
    }
  }
  return (
    <Dialog
      title="Navigate the portfolio"
      onClose={onClose}
      className="command-dialog"
    >
      <div className="command-input-row">
        <Search size={21} />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={keydown}
          placeholder="Search systems, pages, or technologies…"
          aria-label="Search portfolio"
          role="combobox"
          aria-expanded="true"
          aria-autocomplete="list"
          aria-controls="command-results"
          aria-activedescendant={
            results.length ? `command-result-${current}` : undefined
          }
        />
        <kbd>ESC</kbd>
      </div>
      <div className="command-group-label">
        {query ? "SEARCH RESULTS" : "QUICK NAVIGATION"}
        <span>{results.length} RESULTS</span>
      </div>
      <ul
        className="command-results"
        id="command-results"
        role="listbox"
        aria-label="Search results"
      >
        {results.map((r, i) => {
          const Icon = r.icon;
          return (
            <li
              key={r.id}
              id={`command-result-${i}`}
              role="option"
              aria-selected={current === i}
              className={current === i ? "active" : ""}
              onMouseEnter={() => setActive(i)}
              onClick={r.action}
            >
              <span className="command-result-icon">
                <Icon size={18} />
              </span>
              <span>
                {r.label}
                <small>{r.type}</small>
              </span>
              <ArrowUpRight size={15} />
            </li>
          );
        })}
        {!results.length && (
          <li className="command-empty" role="presentation">
            No results. Try “RAG”, “vision”, or “FastAPI”.
          </li>
        )}
      </ul>
      <div className="command-footer">
        <span>
          <kbd>↑</kbd>
          <kbd>↓</kbd> to navigate
        </span>
        <span>
          <CornerDownLeft size={12} /> to open
        </span>
        <span>BUILT TO BE EXPLORED.</span>
      </div>
    </Dialog>
  );
}
function FeaturedSystem({ project, onOpen }) {
  const [view, setView] = useState("architecture");
  return (
    <article
      className="featured-system glow-panel"
      onPointerMove={trackPointer}
    >
      <div className="featured-copy">
        <div className="system-eyebrow">
          <span className="flagship-label">
            <Sparkles size={11} /> FLAGSHIP BUILD
          </span>
          <span>01 / HEALTHCARE AI</span>
        </div>
        <h3>
          {project.title}
          <span>↗</span>
        </h3>
        <p className="featured-subtitle">
          {content.hb.featuredSubtitleLines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
        <p className="featured-description">{content.hb.featuredDescription}</p>
        <div className="feature-metrics">
          {content.hb.stats.slice(0, 3).map((stat) => (
            <div key={stat.label}>
              <strong>{stat.num}</strong>
              <span>{stat.shortLabel || stat.label}</span>
            </div>
          ))}
        </div>
        <div className="tech-tags">
          {project.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="feature-actions">
          <button
            className="button button-primary"
            onClick={() => onOpen(project)}
          >
            Explore the system <ArrowUpRight size={16} />
          </button>
          <External
            href={project.link}
            className="feature-repo"
            aria-label="HealthBridge source code on GitHub"
          >
            <Github size={19} />
          </External>
        </div>
        <div className="feature-footnote">
          <GraduationCap size={12} /> EELU GRADUATION PROJECT
        </div>
      </div>
      <div className="featured-preview">
        <div className="preview-topbar">
          <span>
            <span className="preview-dot" /> SYSTEM OVERVIEW
          </span>
          <div
            className="preview-tabs"
            role="tablist"
            aria-label="HealthBridge preview"
            onKeyDown={tabNavigation}
          >
            {[
              ["architecture", "Architecture"],
              ["product", "Product"],
            ].map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={view === id}
                tabIndex={view === id ? 0 : -1}
                aria-controls="feature-preview-panel"
                id={`preview-tab-${id}`}
                onClick={() => setView(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div
          id="feature-preview-panel"
          role="tabpanel"
          aria-labelledby={`preview-tab-${view}`}
          className="feature-preview-panel"
        >
          {view === "architecture" ? (
            <HealthArchitecture />
          ) : (
            <div className="featured-product">
              <div className="product-address">
                <span />
                <span />
                <span />
                <small>HealthBridge / clinician dashboard</small>
              </div>
              <img
                src={
                  content.hb.gallery[content.hb.productImageIndex].localImage
                }
                alt="Original HealthBridge clinician dashboard screenshot"
                loading="lazy"
              />
              <button
                className="product-gallery-link"
                onClick={() => onOpen(project, "gallery")}
              >
                Explore the product gallery <ArrowUpRight size={13} />
              </button>
            </div>
          )}
        </div>
        <div className="preview-footer">
          <span>CONTEXT → REASONING → CLINICAL ASSISTANCE</span>
          <span>PYTHON / AWS</span>
        </div>
      </div>
    </article>
  );
}
function SystemCard({ project, onOpen }) {
  return (
    <article className="system-card glow-panel" onPointerMove={trackPointer}>
      <button
        className="system-art-button"
        onClick={() => onOpen(project)}
        aria-label={`Explore ${project.title}`}
      >
        <ProjectArt project={project} />
        <span className="art-open">
          <ArrowUpRight size={18} />
        </span>
      </button>
      <div className="system-card-body">
        <div className="system-card-meta">
          <span>{project.category}</span>
          <span>SYS_{project.number}</span>
        </div>
        <h3>
          <button onClick={() => onOpen(project)}>{project.title}</button>
          <ArrowUpRight size={17} />
        </h3>
        <p>{project.summary}</p>
        <div className="tech-tags">
          {project.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
function SystemDialog({ project, initialTab = "overview", onClose }) {
  const [tab, setTab] = useState(initialTab);
  const [image, setImage] = useState(0);
  const [video, setVideo] = useState(null);
  const hb = project.id === "healthbridge";
  const tabs = hb
    ? ["overview", "architecture", "gallery", "demos"]
    : ["overview"];
  return (
    <Dialog
      title={`${project.title} system details`}
      onClose={onClose}
      className="project-dialog"
    >
      <div className="project-dialog-heading">
        <div className="dialog-path">
          <span>SYSTEMS</span>
          <i>/</i>SYS_{project.number}
          <i>/</i>
          {project.category.toUpperCase()}
        </div>
        <h2>
          {project.title}
          <span>.</span>
        </h2>
        <p>{project.type}</p>
        <div
          className="detail-tabs"
          role="tablist"
          aria-label="System details"
          onKeyDown={tabNavigation}
        >
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              tabIndex={tab === t ? 0 : -1}
              aria-selected={tab === t}
              id={`detail-tab-${t}`}
              aria-controls="system-detail-panel"
              onClick={() => {
                setTab(t);
                setVideo(null);
              }}
            >
              {t === "demos" && <Play size={12} />}{" "}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div
        className="project-dialog-body"
        role="tabpanel"
        id="system-detail-panel"
        aria-labelledby={`detail-tab-${tab}`}
      >
        {tab === "overview" && (
          <>
            <div className="detail-section-title">
              <span>01</span> THE SYSTEM
            </div>
            <p className="full-description">{project.desc}</p>
            <div className="detail-problem">
              <small>THE ENGINEERING CHALLENGE</small>
              <p>{project.problem}</p>
            </div>
            <div className="detail-section-title">
              <span>02</span> ENGINEERING APPROACH
            </div>
            <div className="approach-list">
              {project.approach.map((a, i) => (
                <div key={a}>
                  <span>0{i + 1}</span>
                  <p>{a}</p>
                </div>
              ))}
            </div>
            <div className="detail-section-title">
              <span>03</span> TECHNOLOGY STACK
            </div>
            <div className="tech-tags detail-tech">
              {project.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {!hb && (
              <div className="detail-project-art">
                <ProjectArt project={project} />
              </div>
            )}
            {hb && (
              <div className="medical-note">
                <HeartPulse size={15} />
                <p>
                  A graduation project exploring AI-assisted healthcare.
                  Designed to support — not replace — clinical judgment.
                </p>
              </div>
            )}
          </>
        )}
        {tab === "architecture" && (
          <>
            <p className="full-description">
              From patient context to retrieved evidence, specialized agents,
              and structured outputs. A look at the connected workflow behind
              HealthBridge.
            </p>
            <div className="detail-architecture">
              <HealthArchitecture detailed />
            </div>
            <div className="architecture-notes">
              {content.hb.flow.map((step, i) => (
                <div key={step.text}>
                  <span>0{i + 1}</span>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
            <div className="architecture-observability">
              <Cpu size={16} />
              <span>
                Containerized microservices · Prometheus + Grafana observability
              </span>
            </div>
          </>
        )}
        {tab === "gallery" && (
          <>
            <div className="gallery-main">
              <img
                src={content.hb.gallery[image].localImage}
                alt={content.hb.gallery[image].label}
              />
              <div className="gallery-controls">
                <button
                  className="icon-button"
                  onClick={() =>
                    setImage(
                      (image + content.hb.gallery.length - 1) %
                        content.hb.gallery.length,
                    )
                  }
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={17} />
                </button>
                <span>
                  {content.hb.gallery[image].label}
                  <small>
                    {String(image + 1).padStart(2, "0")} /{" "}
                    {String(content.hb.gallery.length).padStart(2, "0")}
                  </small>
                </span>
                <button
                  className="icon-button"
                  onClick={() =>
                    setImage((image + 1) % content.hb.gallery.length)
                  }
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
            <div className="gallery-thumbs">
              {content.hb.gallery.map((g, i) => (
                <button
                  key={g.label}
                  onClick={() => setImage(i)}
                  className={image === i ? "active" : ""}
                  aria-label={`View ${g.label}`}
                  aria-pressed={image === i}
                >
                  <img src={g.localImage} alt="" />
                  <span>{g.tag}</span>
                </button>
              ))}
            </div>
          </>
        )}
        {tab === "demos" && (
          <>
            <p className="full-description">
              Two real product walkthroughs. Explore the patient intake flow and
              the clinician’s AI-assisted case review.
            </p>
            <div className="demo-list">
              {content.hb.videos.map((v, i) => (
                <article className="demo-card" key={v.src}>
                  {video === i ? (
                    <div className="video-frame">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${v.src.split("/").pop()}?autoplay=1`}
                        title={v.title}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <button
                      className="video-poster"
                      onClick={() => setVideo(i)}
                      aria-label={`Play ${v.title}`}
                    >
                      <img
                        src={
                          v.poster ||
                          content.hb.gallery[i === 0 ? 1 : 3]?.localImage ||
                          content.hb.gallery[0]?.localImage
                        }
                        alt=""
                      />
                      <span className="video-play">
                        <Play size={23} fill="currentColor" />
                      </span>
                      <span className="video-number">DEMO_0{i + 1}</span>
                    </button>
                  )}
                  <div className="demo-text">
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                    <External href={v.src} className="text-link">
                      Watch on YouTube <ArrowUpRight size={14} />
                    </External>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="dialog-actions">
        <External className="button button-primary" href={project.link}>
          <Github size={16} /> View source code <ArrowUpRight size={15} />
        </External>
        {project.demo && (
          <External className="button button-secondary" href={project.demo}>
            Launch live app <ExternalLink size={15} />
          </External>
        )}
        {hb && tab !== "demos" && (
          <button
            className="button button-secondary"
            onClick={() => setTab("demos")}
          >
            <Play size={13} /> Watch the demos
          </button>
        )}
      </div>
    </Dialog>
  );
}
function Workflow({ capability }) {
  return (
    <div className="capability-workflow">
      <div className="workflow-track" />
      {capability.stages.map((s, i) => (
        <div className="workflow-stage" key={s}>
          <span className="workflow-node">
            {i === 0 ? (
              <Database size={17} />
            ) : i === 1 ? (
              <Layers3 size={17} />
            ) : i === 2 ? (
              <Cpu size={17} />
            ) : (
              <Code2 size={17} />
            )}
          </span>
          <small>0{i + 1}</small>
          <strong>{s}</strong>
        </div>
      ))}
    </div>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("background");
  const [command, setCommand] = useState(false);
  const [filter, setFilter] = useState("All systems");
  const [expanded, setExpanded] = useState(false);
  const [project, setProject] = useState(null);
  const [initialTab, setInitialTab] = useState("overview");
  const [capability, setCapability] = useState(0);
  const [inventory, setInventory] = useState(false);
  const [journey, setJourney] = useState("experience");
  const [allCredentials, setAllCredentials] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [copied, setCopied] = useState(false);
  const progress = useRef(null);
  const copyTimer = useRef(null);
  const filtered =
    filter === "All systems"
      ? projects
      : projects.filter((p) => p.category === filter);
  const visible =
    filter === "All systems" && !expanded ? filtered.slice(0, 4) : filtered;
  const featured = visible.find((p) => p.id === "healthbridge");
  const cards = visible.filter((p) => p.id !== "healthbridge");
  const cap = capabilities[capability];
  const CapIcon = capabilityIcons[cap.id];
  const sortedCredentials = [...content.certs].sort(
    (a, b) => Number(b.date) - Number(a.date),
  );
  const selectedHighlights = (content.certHighlights || [])
    .map((id) => content.certs.find((c) => c.id === id))
    .filter(Boolean);
  const highlights = selectedHighlights.length
    ? selectedHighlights
    : sortedCredentials.slice(0, 4);
  const credentials = allCredentials ? sortedCredentials : highlights;
  const toolCount = content.skills.reduce(
    (n, s) => n + s.pills.split(",").length,
    0,
  );
  useEffect(() => {
    delete document.documentElement.dataset.theme;
    document.documentElement.style.colorScheme = "dark";
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { rootMargin: "-15% 0px -55% 0px" },
    );
    navigation.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    let ticking = false;
    function scroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (progress.current) {
            const max = document.documentElement.scrollHeight - innerHeight;
            progress.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    function key(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setProject(null);
        setCertificate(null);
        setCommand((v) => !v);
        setMenu(false);
      }
      if (e.key === "Escape") setMenu(false);
    }
    window.addEventListener("keydown", key);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", key);
      clearTimeout(copyTimer.current);
    };
  }, []);
  function openProject(p, tab = "overview") {
    setInitialTab(tab);
    setProject(p);
  }
  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(email);
      else {
        const el = document.createElement("textarea");
        el.value = email;
        document.body.appendChild(el);
        el.select();
        const success = document.execCommand("copy");
        el.remove();
        if (!success) return;
      }
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="scroll-progress" ref={progress} />
        <div className="container header-inner">
          <Brand />
          <nav
            className={`main-nav ${menu ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            {navigation.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setMenu(false)}
              >
                {label}
                <span />
              </a>
            ))}
            <a
              className="nav-mobile-contact"
              href="#contact"
              onClick={() => setMenu(false)}
            >
              Get in touch <ArrowUpRight size={14} />
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="command-trigger"
              onClick={() => setCommand(true)}
              aria-label="Open command palette"
            >
              <Search size={15} />
              <kbd>⌘ K</kbd>
            </button>
            <a className="button button-primary header-contact" href="#contact">
              Let’s talk <ArrowUpRight size={14} />
            </a>
            <button
              className="menu-trigger icon-button"
              onClick={() => setMenu(!menu)}
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
            >
              {menu ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <section
          className="hero container"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-role">
                <span className="live-dot" /> {content.config.heroRole}
              </div>
              <div className="hero-intro">
                <span className="intro-rule" /> {fullName.toUpperCase()}
              </div>
              <h1 id="hero-title">
                {content.config.heroTitle}
                <br />
                <span>{content.config.heroAccent}</span>
              </h1>
              <p className="hero-description">
                {content.config.heroDescription.lead}
                <br />
                {content.config.heroDescription.beforeFocus}{" "}
                <strong>{content.config.heroDescription.focus}</strong>{" "}
                {content.config.heroDescription.afterFocus}
              </p>
              <div className="hero-actions">
                <a href="#systems" className="button button-primary">
                  Explore my systems <ArrowDown size={17} />
                </a>
                <a
                  href="/Eyad-Eldokany-Resume.pdf"
                  target="_blank"
                  rel="noopener"
                  className="button button-secondary"
                >
                  <FileText size={15} /> Résumé <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="hero-availability">
                <span className="availability-signal" />
                <span>{content.config.badge}</span>
                <i />
                <External
                  href={profiles.github}
                  aria-label={`${content.config.firstname} on GitHub`}
                >
                  <Github size={16} />
                </External>
                <External
                  href={profiles.linkedin}
                  aria-label={`${content.config.firstname} on LinkedIn`}
                >
                  <Linkedin size={16} />
                </External>
              </div>
            </div>
            <NeuralScene />
          </div>
          <div className="hero-stats">
            <div>
              <StatNumber value={content.config.stat1n} />
              <span>{content.config.stat1l}</span>
            </div>
            <div>
              <strong>{projects.length}</strong>
              <span>{content.config.stat2l}</span>
            </div>
            <div>
              <StatNumber value={content.config.stat3n} />
              <span>{content.config.stat3l}</span>
            </div>
            <div className="hero-stat-education">
              <GraduationCap size={25} />
              <span>
                <strong>{content.config.heroEducation.degree}</strong>
                <small>
                  {content.config.heroEducation.school} · CLASS OF{" "}
                  {content.config.heroEducation.classOf}
                </small>
              </span>
            </div>
          </div>
          <div className="stack-signal">
            <span>FROM RESEARCH TO REALITY</span>
            <div>
              <Cpu size={15} /> PyTorch
            </div>
            <div>
              <Network size={15} /> LangChain
            </div>
            <div>
              <Code2 size={15} /> FastAPI
            </div>
            <div>
              <Boxes size={15} /> Docker
            </div>
            <div>
              <Layers3 size={15} /> AWS Bedrock
            </div>
            <div>
              <Braces size={15} /> Python
            </div>
          </div>
        </section>
        <section
          className="background-section section container"
          id="background"
          aria-labelledby="background-title"
        >
          <div className="section-heading">
            <div>
              <SectionLabel number="01">
                THE ENGINEER BEHIND THE SYSTEMS
              </SectionLabel>
              <h2 id="background-title">
                Research-minded.<span> Production-focused.</span>
              </h2>
            </div>
          </div>
          <div className="background-grid">
            <div className="engineer-card">
              <div className="profile-heading">
                <div className="engineer-portrait">
                  <img
                    src={content.config.portrait}
                    alt={fullName}
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="profile-kicker">HUMAN IN THE LOOP</div>
                  <h3>{fullName}</h3>
                  <span>
                    {content.config.primaryRole} <i /> {content.config.loc}
                  </span>
                </div>
              </div>
              {[
                content.config.aboutp1,
                content.config.aboutp2,
                content.config.aboutp3,
              ]
                .filter(Boolean)
                .map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              <div className="profile-facts">
                <div>
                  <GraduationCap size={16} />
                  <span>{content.config.profileEducation}</span>
                  <small>{content.config.graduationYear}</small>
                </div>
                <div>
                  <MapPin size={16} />
                  <span>Based in {content.config.loc}</span>
                  <small>{content.config.countryCode}</small>
                </div>
              </div>
              <a
                className="button button-secondary profile-resume"
                href="/Eyad-Eldokany-Resume.pdf"
                download="Eyad-Eldokany-Resume.pdf"
              >
                Download résumé <Download size={15} />
              </a>
              <div className="profile-bottom">
                <span className="live-dot" /> {content.config.profileStatus}{" "}
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="trajectory">
              <div className="trajectory-header">
                <span>THE TRAJECTORY</span>
                <div
                  className="journey-tabs"
                  role="tablist"
                  aria-label="Professional journey"
                  onKeyDown={tabNavigation}
                >
                  {[
                    ["experience", "Experience", BriefcaseBusiness],
                    ["education", "Education", GraduationCap],
                  ].map(([id, label, Icon]) => (
                    <button
                      key={id}
                      role="tab"
                      aria-selected={journey === id}
                      tabIndex={journey === id ? 0 : -1}
                      aria-controls="trajectory-panel"
                      id={`journey-tab-${id}`}
                      onClick={() => setJourney(id)}
                    >
                      <Icon size={13} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div
                id="trajectory-panel"
                role="tabpanel"
                aria-labelledby={`journey-tab-${journey}`}
                className="timeline"
              >
                {(journey === "experience" ? content.exp : content.edu).map(
                  (e, i) => (
                    <article className="timeline-entry" key={e.id}>
                      <div className="timeline-dot">
                        <span />
                        {i <
                          (journey === "experience" ? content.exp : content.edu)
                            .length -
                            1 && <i />}
                      </div>
                      <div className="timeline-entry-content">
                        <div className="timeline-date">
                          {e.date.replace(
                            "September 2022- June 2026",
                            "SEP 2022 — JUN 2026",
                          )}
                          {e.current && journey === "experience" && (
                            <span>CURRENT</span>
                          )}
                        </div>
                        <h3>
                          {e.title
                            .replace(
                              " (Freelancer - Independent)",
                              " · Independent",
                            )
                            .trim()}
                        </h3>
                        <div className="timeline-organization">{e.org}</div>
                        <p>{e.desc.trim()}</p>
                        {e.gpa && (
                          <div className="timeline-gpa">
                            <span>GPA</span>
                            <strong>{e.gpa}</strong>
                          </div>
                        )}
                      </div>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
        <section
          className="systems-section section container"
          id="systems"
          aria-labelledby="systems-title"
        >
          <div className="section-heading">
            <div>
              <SectionLabel number="02">SELECTED SYSTEMS</SectionLabel>
              <h2 id="systems-title">
                Built to solve.<span> Engineered to ship.</span>
              </h2>
            </div>
            <p>
              Real problems. Thoughtful architecture.
              <br />
              Explore the systems, not just the screenshots.
            </p>
          </div>
          <div className="systems-toolbar">
            <div className="system-filters" aria-label="Filter systems">
              {categories.map((c) => (
                <button
                  key={c}
                  className={filter === c ? "active" : ""}
                  aria-pressed={filter === c}
                  onClick={() => {
                    setFilter(c);
                    setExpanded(false);
                  }}
                >
                  {c}
                  {c === "All systems" && <span>{projects.length}</span>}
                </button>
              ))}
            </div>
            <span className="systems-result-count" aria-live="polite">
              <SlidersHorizontal size={12} />
              {visible.length} / {filtered.length} SYSTEMS
            </span>
          </div>
          {featured && (
            <FeaturedSystem project={featured} onOpen={openProject} />
          )}
          <div className="systems-grid">
            {cards.map((p) => (
              <SystemCard project={p} onOpen={openProject} key={p.id} />
            ))}
          </div>
          {filter === "All systems" && (
            <div className="more-systems">
              <span>
                {expanded
                  ? "THE FULL PROJECT INDEX"
                  : "MORE EXPERIMENTS. MORE ENGINEERING."}
              </span>
              <button
                className="button button-secondary"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded
                  ? "Show selected systems"
                  : `Explore all ${projects.length} systems`}
                {expanded ? <ArrowUp size={15} /> : <ArrowDown size={15} />}
              </button>
              <External className="text-link" href={profiles.github}>
                View GitHub <ArrowUpRight size={14} />
              </External>
            </div>
          )}
        </section>
        <section
          className="expertise-section section"
          id="expertise"
          aria-labelledby="expertise-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <SectionLabel number="03">
                  ENGINEERING CAPABILITIES
                </SectionLabel>
                <h2 id="expertise-title">
                  More than a model.<span> A complete system.</span>
                </h2>
              </div>
              <p>
                Four connected disciplines.
                <br />
                One end-to-end engineering mindset.
              </p>
            </div>
            <div className="capabilities-grid">
              <div
                className="capability-tabs"
                role="tablist"
                aria-label="Engineering capabilities"
                aria-orientation="vertical"
                onKeyDown={tabNavigation}
              >
                {capabilities.map((c, i) => {
                  const Icon = capabilityIcons[c.id];
                  return (
                    <button
                      key={c.id}
                      role="tab"
                      aria-selected={capability === i}
                      tabIndex={capability === i ? 0 : -1}
                      aria-controls="capability-panel"
                      id={`capability-tab-${c.id}`}
                      onClick={() => setCapability(i)}
                      className={capability === i ? "active" : ""}
                    >
                      <span className="capability-tab-icon">
                        <Icon size={20} />
                      </span>
                      <span>
                        <strong>{c.title}</strong>
                        <small>{c.description}</small>
                      </span>
                      <ArrowUpRight size={15} />
                    </button>
                  );
                })}
              </div>
              <div
                className="capability-panel"
                id="capability-panel"
                role="tabpanel"
                aria-labelledby={`capability-tab-${cap.id}`}
              >
                <div className="capability-panel-header">
                  <span>
                    <CapIcon size={18} /> {cap.short.toUpperCase()}
                  </span>
                  <span>0{capability + 1} / 04</span>
                </div>
                <Workflow capability={cap} />
                <h3>{cap.title}</h3>
                <p>{cap.detail}</p>
                <div className="tech-tags capability-tools">
                  {cap.tools.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="capability-projects">
                  <span>IN PRACTICE</span>
                  <div>
                    {cap.projectIds
                      .filter((id) => projects.some((p) => p.id === id))
                      .map((id) => {
                        const p = projects.find((x) => x.id === id);
                        return (
                          <button key={id} onClick={() => openProject(p)}>
                            {p.title}
                            <ArrowUpRight size={12} />
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="inventory">
              <button
                className="inventory-toggle"
                aria-expanded={inventory}
                onClick={() => setInventory(!inventory)}
              >
                <span>
                  <Terminal size={16} /> THE FULL ENGINEERING STACK
                </span>
                <span>
                  {content.skills.length} CATEGORIES · {toolCount} TOOLS{" "}
                  <ChevronDown
                    size={16}
                    className={inventory ? "rotated" : ""}
                  />
                </span>
              </button>
              {inventory && (
                <div className="inventory-grid">
                  {content.skills.map((s, i) => {
                    const Icon = skillIcons[i] || Cpu;
                    return (
                      <article key={s.name}>
                        <h3>
                          <Icon size={16} />
                          {s.name}
                        </h3>
                        <div className="tech-tags">
                          {s.pills.split(",").map((t) => (
                            <span key={t}>{t.trim()}</span>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
        <section
          className="credentials-section section"
          id="credentials"
          aria-labelledby="credentials-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <SectionLabel number="04">CONTINUOUS LEARNING</SectionLabel>
                <h2 id="credentials-title">
                  Learning,<span> with evidence.</span>
                </h2>
              </div>
              <button
                className="text-link"
                aria-expanded={allCredentials}
                onClick={() => setAllCredentials(!allCredentials)}
              >
                {allCredentials
                  ? "Show highlights"
                  : `View all ${content.certs.length} credentials`}
                {allCredentials ? (
                  <ArrowUp size={15} />
                ) : (
                  <ArrowDown size={15} />
                )}
              </button>
            </div>
            <div className="credentials-grid">
              {credentials.map((c) => (
                <button
                  className="credential-row"
                  key={c.id}
                  onClick={() => setCertificate(c)}
                >
                  <span
                    className={`credential-brand vendor-${c.issuer.toLowerCase().split(" ")[0]}`}
                  >
                    {c.issuer === "IBM" ? (
                      "IBM"
                    ) : c.issuer === "NVIDIA" ? (
                      <Cpu size={24} />
                    ) : c.issuer === "Cisco" ? (
                      <Network size={24} />
                    ) : (
                      <GraduationCap size={24} />
                    )}
                  </span>
                  <span className="credential-copy">
                    <strong>{c.title.trim()}</strong>
                    <small>
                      {c.issuer}
                      <i />
                      {c.date}
                    </small>
                  </span>
                  <span className="credential-arrow">
                    <ArrowUpRight size={17} />
                  </span>
                </button>
              ))}
            </div>
            <div className="credentials-note">
              <BadgeCheck size={14} /> Credential images and available
              verification links from my original portfolio.
            </div>
          </div>
        </section>
        <section
          className="contact-section section container"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-panel">
            <div className="contact-grid-art" />
            <div className="contact-eyebrow">
              <SectionLabel number="05">
                BUILD SOMETHING THAT MATTERS
              </SectionLabel>
              <span>
                <span className="availability-signal" /> AVAILABLE FOR
                OPPORTUNITIES
              </span>
            </div>
            <div className="contact-main">
              <div>
                <h2 id="contact-title">
                  Let’s put
                  <br />
                  <span>intelligence to work.</span>
                </h2>
                <p>
                  Open to AI/ML engineering roles, research collaborations,
                  <br />
                  and ambitious freelance projects.
                </p>
              </div>
              <a
                className="contact-orbit-button"
                href={`mailto:${email}`}
                aria-label="Start an email to Eyad"
              >
                <ArrowUpRight size={40} />
              </a>
            </div>
            <div className="contact-actions">
              <a className="button button-primary" href={`mailto:${email}`}>
                Start a conversation <ArrowUpRight size={16} />
              </a>
              <div className="email-copy">
                <a href={`mailto:${email}`}>{email}</a>
                <button
                  className="icon-button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  title="Copy email address"
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                </button>
                <span className="copy-feedback" aria-live="polite">
                  {copied ? "Email copied" : ""}
                </span>
              </div>
            </div>
            <div className="contact-bottom">
              <div>
                <External href={profiles.github}>
                  <Github size={16} /> GitHub <ArrowUpRight size={12} />
                </External>
                <External href={profiles.linkedin}>
                  <Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} />
                </External>
              </div>
              <div className="freelance-links">
                <span>ALSO ON</span>
                {[
                  ["Upwork", "upwork"],
                  ["Freelancer", "freelancer"],
                  ["Mostaql", "mostaqel"],
                  ["Khamsat", "khamsat"],
                ]
                  .filter(([, k]) => profiles[k])
                  .map(([label, key]) => (
                    <External href={profiles[key]} key={key}>
                      {label}
                      <ArrowUpRight size={11} />
                    </External>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <Brand small />
        <p>© {new Date().getFullYear()} Eyad Eldokany</p>
        <span>DESIGNED AS A SYSTEM. BUILT BY A HUMAN.</span>
        <a href="#top">
          Back to top <ArrowUp size={13} />
        </a>
      </footer>
      {command && (
        <CommandPalette
          onClose={() => setCommand(false)}
          onProject={openProject}
          onCapability={setCapability}
        />
      )}
      {project && (
        <SystemDialog
          key={`${project.id}-${initialTab}`}
          project={project}
          initialTab={initialTab}
          onClose={() => setProject(null)}
        />
      )}
      {certificate && (
        <Dialog
          title={certificate.title}
          onClose={() => setCertificate(null)}
          className="credential-dialog"
        >
          <div className="credential-dialog-heading">
            <div className="dialog-path">
              <BadgeCheck size={14} />
              {certificate.issuer.toUpperCase()}
              <i>/</i>
              {certificate.date}
            </div>
            <h2>{certificate.title.trim()}</h2>
            {certificate.desc && <p>{certificate.desc}</p>}
          </div>
          <div className="certificate-image">
            <img
              src={certificate.localImage}
              alt={`${certificate.title} certificate from the original portfolio`}
            />
          </div>
          <div className="dialog-actions">
            {certificate.link ? (
              <External
                href={certificate.link}
                className="button button-primary"
              >
                Verify credential <ArrowUpRight size={15} />
              </External>
            ) : (
              <a
                href={certificate.localImage}
                className="button button-primary"
                target="_blank"
                rel="noopener"
              >
                Open certificate <ExternalLink size={15} />
              </a>
            )}
            <button
              className="button button-secondary"
              onClick={() => setCertificate(null)}
            >
              Back to portfolio
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}
export default App;
