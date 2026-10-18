import {
  Code2,
  ArrowRight,
  ScanFace,
  BrainCircuit,
  Orbit,
  Crosshair,
  ChartNoAxesCombined,
  Grid2X2,
  Terminal,
  FileCode2,
  Check,
  Cpu,
  Database,
  Stethoscope,
  FileText,
  HeartPulse,
} from "lucide-react";

export function HealthArchitecture({ detailed = false }) {
  return (
    <div className={`health-architecture ${detailed ? "detailed" : ""}`}>
      <div className="architecture-caption">
        <span>
          <span className="live-dot" /> MULTI-AGENT SYSTEM
        </span>
        <span>ACE PIPELINE</span>
      </div>
      <div className="architecture-source">
        <span />
        <span>PATIENT CONTEXT</span>
        <span />
      </div>
      <div className="architecture-pair">
        <div className="architecture-node">
          <Stethoscope />
          <span>
            <small>01 / INTAKE</small>
            <strong>IntakeBot</strong>
            <em>Patient conversations</em>
          </span>
        </div>
        <div className="architecture-node">
          <Database />
          <span>
            <small>02 / RETRIEVAL</small>
            <strong>Medical RAG</strong>
            <em>27 sources · pgvector</em>
          </span>
        </div>
      </div>
      <div className="architecture-join">
        <i />
        <i />
      </div>
      <div className="ace-core">
        <div className="ace-core-label">
          <BrainCircuit size={18} />
          <span>AGENTIC CONTEXT ENGINEERING</span>
          <Cpu size={15} />
        </div>
        <div className="ace-chain">
          <span>Generator</span>
          <ArrowRight />
          <span>Reflector</span>
          <ArrowRight />
          <span>Curator</span>
        </div>
      </div>
      <div className="architecture-split">
        <i />
        <i />
      </div>
      <div className="architecture-pair output-pair">
        <div className="architecture-node">
          <HeartPulse />
          <span>
            <small>03 / REASONING</small>
            <strong>DoctorBot</strong>
            <em>Clinical assistance</em>
          </span>
        </div>
        <div className="architecture-node">
          <FileText />
          <span>
            <small>04 / SUMMARY</small>
            <strong>SummaryBot</strong>
            <em>Structured reports</em>
          </span>
        </div>
      </div>
      <div className="architecture-infra">
        <span>FASTAPI</span>
        <i />
        <span>AWS BEDROCK</span>
        <i />
        <span>DOCKER</span>
      </div>
    </div>
  );
}
function WindowHeader({ children }) {
  return (
    <div className="art-window-header">
      <span>
        <i />
        <i />
        <i />
      </span>
      <small>{children}</small>
      <span>↗</span>
    </div>
  );
}
export default function ProjectArt({ project }) {
  if (project.art === "healthbridge")
    return (
      <div className="project-art art-health">
        <HealthArchitecture />
      </div>
    );
  if (project.art === "code")
    return (
      <div className="project-art art-code">
        <div className="art-grid" />
        <div className="coding-window">
          <WindowHeader>codenova / agent workspace</WindowHeader>
          <div className="coding-layout">
            <div className="coding-nav">
              <Code2 />
              <FileCode2 />
              <Terminal />
              <Database />
            </div>
            <div className="coding-editor">
              <div className="coding-title">
                <Code2 size={15} />
                <span>CodeNova</span>
                <small>AGENTIC DEVELOPMENT</small>
              </div>
              <div className="code-source">
                <span>
                  <b>01</b>
                  <em>async def</em> <strong>build</strong>(idea):
                </span>
                <span>
                  <b>02</b> context = <i>await</i> agent.reason(idea)
                </span>
                <span>
                  <b>03</b> result = <i>await</i> tools.execute(context)
                </span>
                <span>
                  <b>04</b> <em>return</em> result
                </span>
              </div>
              <div className="coding-runtime">
                <span>
                  <Check size={9} /> FILES
                </span>
                <span>
                  <Check size={9} /> EXECUTION
                </span>
                <span>
                  <Check size={9} /> TESTING
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="art-caption">
          <span>15 TOOLS</span>
          <i />
          <span>ISOLATED WORKSPACES</span>
          <i />
          <span>SSE STREAMING</span>
        </div>
      </div>
    );
  if (project.art === "edge")
    return (
      <div className="project-art art-edge">
        <div className="art-grid" />
        <div className="vision-window">
          <WindowHeader>edge vision / pipeline schematic</WindowHeader>
          <svg
            className="vision-scene"
            viewBox="0 0 520 220"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="cvgrid"
                width="25"
                height="25"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M25 0H0V25"
                  fill="none"
                  stroke="#75a8d2"
                  strokeOpacity=".09"
                />
              </pattern>
            </defs>
            <rect width="520" height="220" fill="url(#cvgrid)" />
            <path
              d="M20 220V98l79-45 87 45v122M340 220V80l60-28 80 28v140"
              fill="none"
              stroke="#31506c"
              strokeWidth="1"
            />
            <path d="M0 174H520" stroke="#638fae" strokeDasharray="5 5" />
            <g fill="#536a84" fillOpacity=".35">
              <circle cx="182" cy="76" r="24" />
              <path d="M143 174v-50c0-33 78-33 78 0v50Z" />
              <circle cx="353" cy="95" r="20" />
              <path d="M318 187v-47c0-27 70-27 70 0v47Z" />
            </g>
            <g fill="none" stroke="#6bdcf2" strokeWidth="1.6">
              <rect x="145" y="39" width="76" height="147" rx="3" />
              <rect x="318" y="62" width="70" height="138" rx="3" />
              <path d="M157 51h13m-13 0v13m52-13h-13m13 0v13m-39 46h25m-12-33v18" />
              <path d="m330 75 12 0m-12 0v12m46-12h-12m12 0v12" />
            </g>
            <g fontFamily="monospace" fontSize="9" fill="#a3e8f4">
              <rect x="145" y="24" width="76" height="16" fill="#15384b" />
              <text x="151" y="35">
                PERSON / 01
              </text>
              <rect x="318" y="47" width="70" height="16" fill="#15384b" />
              <text x="323" y="58">
                PERSON / 02
              </text>
            </g>
            <path
              d="M260 145v51m0 0-5-8m5 8 5-8"
              stroke="#a6bdfb"
              fill="none"
            />
            <text
              x="238"
              y="132"
              fill="#7e99b6"
              fontSize="8"
              fontFamily="monospace"
            >
              TRACKING
            </text>
          </svg>
          <div className="vision-runtime">
            <span>DETECT</span>
            <ArrowRight size={9} />
            <span>TRACK</span>
            <ArrowRight size={9} />
            <span>RECOGNIZE</span>
            <ArrowRight size={9} />
            <span>LOG</span>
          </div>
        </div>
      </div>
    );
  if (project.art === "traffic")
    return (
      <div className="project-art art-traffic">
        <div className="art-grid" />
        <div className="traffic-window">
          <WindowHeader>yolov11 / detection schematic</WindowHeader>
          <svg viewBox="0 0 520 245" className="road-scene" aria-hidden="true">
            <defs>
              <linearGradient id="roaddepth" x2="0" y2="1">
                <stop stopColor="#0e1d32" />
                <stop offset="1" stopColor="#1c304b" />
              </linearGradient>
            </defs>
            <path
              d="M0 134 82 87l77 37 87-65 85 61 97-45 92 51v119H0Z"
              fill="#101e31"
            />
            <path d="m193 245 57-127h35l96 127Z" fill="url(#roaddepth)" />
            <path
              d="m266 133 7 16m6 14 9 22m8 19 15 41"
              stroke="#718fae"
              strokeWidth="3"
            />
            <path d="M109 113v107" stroke="#4d647e" strokeWidth="4" />
            <path
              d="m91 63 31-1 20 21v29l-21 20-31-1-20-21V83Z"
              fill="#723f57"
              stroke="#d488a3"
              strokeWidth="2"
            />
            <text
              x="106"
              y="103"
              fill="#ffe5ed"
              fontFamily="monospace"
              fontSize="14"
              textAnchor="middle"
            >
              STOP
            </text>
            <rect
              x="57"
              y="47"
              width="98"
              height="98"
              fill="none"
              stroke="#78c8ef"
              strokeWidth="1.3"
              strokeDasharray="4 3"
            />
            <rect x="57" y="31" width="98" height="16" fill="#16394f" />
            <text
              x="65"
              y="42"
              fontSize="8"
              fontFamily="monospace"
              fill="#8bdef5"
            >
              TRAFFIC_SIGN
            </text>
            <path
              d="m407 122 23 41h-46Z"
              fill="#243751"
              stroke="#8eb1e5"
              strokeWidth="2"
            />
            <path d="M407 165v65" stroke="#4d647e" strokeWidth="4" />
            <rect
              x="374"
              y="112"
              width="67"
              height="63"
              stroke="#78c8ef"
              fill="none"
              strokeDasharray="4 3"
            />
            <g stroke="#29445f" fill="none">
              <path d="m0 245 250-127M84 245l166-127M441 245 285-127M520 245 285-127" />
              <path d="M165 221h252M178 190h212M192 165h164" />
            </g>
          </svg>
        </div>
      </div>
    );
  const Icon =
    {
      face: ScanFace,
      mri: BrainCircuit,
      neo: Orbit,
      clamp: Crosshair,
      speed: ChartNoAxesCombined,
      connect: Grid2X2,
    }[project.art] || BrainCircuit;
  return (
    <div className={`project-art art-generic art-${project.art}`}>
      <div className="art-grid" />
      <div className="art-orbits">
        <i />
        <i />
        <i />
        <span>
          <Icon size={65} strokeWidth={1} />
        </span>
      </div>
      <div className="generic-art-label">{project.type.toUpperCase()}</div>
      <div className="art-caption">MODEL → PIPELINE → APPLICATION</div>
    </div>
  );
}
