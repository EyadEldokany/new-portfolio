import { useRef, useState } from "react";
import { ArrowUpRight, Pause, Play, Crosshair } from "lucide-react";
import { heroModes } from "./portfolio";

export default function NeuralScene() {
  const [mode, setMode] = useState(0);
  const [node, setNode] = useState(1);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const active = heroModes[mode];
  function move(event) {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty("--parallax-x", `${x * 12}px`);
    ref.current.style.setProperty("--parallax-y", `${y * 12}px`);
  }
  function reset() {
    ref.current?.style.setProperty("--parallax-x", "0px");
    ref.current?.style.setProperty("--parallax-y", "0px");
  }
  return (
    <div
      className={`neural-scene ${paused ? "is-paused" : ""} mode-${active.id}`}
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className="scene-label">
        <span className="live-dot" /> INTERACTIVE SYSTEM MAP
        <span className="scene-label-index">FIG. 001</span>
      </div>
      <div className="neural-canvas">
        <div className="neural-glow" />
        <img
          src="/images/neural-core.webp"
          className="neural-core"
          alt="Abstract blue neural lattice representing connected AI systems"
          fetchPriority="high"
        />
        <div className="core-focus-ring" />
        <svg
          className="neural-connections"
          viewBox="0 0 600 480"
          fill="none"
          aria-hidden="true"
        >
          <path d="M119 126h52l77 80M480 126h-40l-81 76M117 360h59l70-74M484 360h-45l-78-77" />
          <path
            className="signal-line"
            d="M119 126h52l77 80M480 126h-40l-81 76M117 360h59l70-74M484 360h-45l-78-77"
          />
          <circle cx="250" cy="207" r="3" />
          <circle cx="357" cy="202" r="3" />
          <circle cx="246" cy="286" r="3" />
          <circle cx="361" cy="283" r="3" />
        </svg>
        {active.nodes.map((n, i) => (
          <button
            className={`map-node map-node-${i} ${node === i ? "active" : ""}`}
            key={n.title}
            onClick={() => setNode(i)}
            aria-pressed={node === i}
            aria-label={`Explore ${n.title.toLowerCase()}: ${n.value}`}
          >
            <span>
              <i />
              {n.title}
              <ArrowUpRight size={10} />
            </span>
            <strong>{n.value}</strong>
          </button>
        ))}
        <span className="scene-coordinate coordinate-left">
          x: intelligence
        </span>
        <span className="scene-coordinate coordinate-right">
          y: real-world impact
        </span>
      </div>
      <div className="scene-controls">
        <div className="scene-modes" aria-label="Explore engineering focus">
          {heroModes.map((m, i) => (
            <button
              className={mode === i ? "active" : ""}
              key={m.id}
              aria-pressed={mode === i}
              onClick={() => {
                setMode(i);
                setNode(1);
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
        <button
          className="scene-pause"
          aria-label={
            paused ? "Resume visual animation" : "Pause visual animation"
          }
          aria-pressed={paused}
          onClick={() => {
            setPaused((value) => !value);
            reset();
          }}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>
      </div>
      <div className="scene-detail" aria-live="polite">
        <Crosshair size={13} />
        <p>{active.nodes[node].detail}</p>
      </div>
    </div>
  );
}
