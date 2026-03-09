"use client";
import { useState } from "react";
import {
  ArrowLeft, Download, Clock, Check, BarChart2,
  ChevronDown, ChevronUp, Home, Dumbbell,
  RefreshCw, Zap, Target, Flame, BookOpen,
  Layers, Thermometer, Wind, Package, Filter
} from "lucide-react";
import {
  ChevronDown, Check, Filter, Zap, Star, Package,
  Home, Dumbbell, RefreshCw
} from "lucide-react";
import { allPrograms, strengthSkillsGroup, hybridGroup, hypertrophyGroup, ultimateBundle, type Program } from "../data/programs";
import Dashboard from "../components/Dashboard";

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ onViewPrograms }: { onViewPrograms: () => void }) {
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "140px 24px 80px", position: "relative", zIndex: 1, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, background: "radial-gradient(circle, rgba(255,69,0,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div className="badge" style={{ background: "rgba(255,69,0,0.1)", color: "var(--orange)", border: "1px solid var(--orange-border)", marginBottom: 32, fontSize: 10, letterSpacing: 3 }}>
        ⚡ Elite Calisthenics Programs — Premium Digital Coaching
      </div>

      <h1 className="flicker hero-title" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(72px,13vw,148px)", lineHeight: 0.86, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: 32 }}>
        DOMINATE<br />
        <span style={{ WebkitTextStroke: "2px var(--orange)", WebkitTextFillColor: "transparent", color: "transparent" }}>GRAVITY</span>
      </h1>

      <p className="t-body" style={{ fontSize: 17, color: "var(--text-dim)", maxWidth: 520, marginBottom: 52, letterSpacing: 0.3 }}>
        Science-backed programs engineered to build elite skills and serious muscle. Planche. Front Lever. Hybrid Strength. Aesthetic Physique. — We take you there.
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <button className="btn-primary pulse-glow" style={{ fontSize: 15, padding: "16px 44px", letterSpacing: 3 }} onClick={onViewPrograms}>
          View Programs <ChevronDown size={14} />
        </button>
        <a href="#guide">
          <button className="btn-secondary">Selection Guide</button>
        </a>
      </div>

      <div style={{ display: "flex", gap: 52, marginTop: 80, flexWrap: "wrap", justifyContent: "center" }}>
        {[["2,400+", "Athletes Trained"], ["6", "Programs"], ["98%", "Satisfaction"]].map(([val, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div className="t-display" style={{ fontSize: 40, color: "var(--orange)" }}>{val}</div>
            <div className="t-label" style={{ color: "var(--text-faint)", marginTop: 6 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROGRAM CARD ─────────────────────────────────────────────────────────────

function ProgramCard({ program: p, onOpen }: { program: Program; onOpen: (p: Program) => void }) {
  return (
    <div className="surface card-lift" style={{ borderRadius: 8, padding: "26px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }} onClick={() => onOpen(p)}>

      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at top left, ${p.glowColor}, transparent 60%)`, pointerEvents: "none", borderRadius: 8 }} />

      {p.badge && (
        <div style={{ position: "absolute", top: 13, right: -26, background: p.category === "bundle" ? "linear-gradient(135deg,var(--orange),#ff8c00)" : "var(--orange)", color: "#fff", fontSize: 9, fontWeight: 800, letterSpacing: 2, fontFamily: "var(--font-body)", padding: "4px 34px", transform: "rotate(35deg)", transformOrigin: "center", whiteSpace: "nowrap", zIndex: 2 }}>
          {p.badge}
        </div>
      )}

      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>{p.icon}</div>

        <span className="badge" style={{ background: `${p.levelColor}18`, color: p.levelColor, border: `1px solid ${p.levelColor}30`, marginBottom: 10, alignSelf: "flex-start" }}>{p.level}</span>

        <h3 className="t-display" style={{ fontSize: 22, marginBottom: 4, lineHeight: 1.1 }}>{p.title}</h3>
        <p className="t-body" style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 14, lineHeight: 1.4 }}>{p.subtitle}</p>

        {p.dualTrack && p.trackLabels && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--orange-dim)", border: "1px solid var(--orange-border)", borderRadius: 3, padding: "5px 10px", marginBottom: 14, alignSelf: "flex-start" }}>
            <RefreshCw size={10} style={{ color: "var(--orange)", flexShrink: 0 }} />
            <span className="t-label" style={{ color: "var(--orange)", fontSize: 9 }}>2 Tracks:</span>
            <span className="t-body" style={{ fontSize: 11, color: "var(--text-dim)" }}>{p.trackLabels[0]}</span>
            <span style={{ color: "var(--text-faint)", fontSize: 10 }}>|</span>
            <span className="t-body" style={{ fontSize: 11, color: "var(--text-dim)" }}>{p.trackLabels[1]}</span>
          </div>
        )}

        {p.category === "bundle" && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,69,0,0.07)", border: "1px solid var(--orange-border)", borderRadius: 3, padding: "5px 10px", marginBottom: 14, alignSelf: "flex-start" }}>
            <Package size={10} style={{ color: "var(--orange)" }} />
            <span className="t-label" style={{ color: "var(--orange)", fontSize: 9 }}>All 5 Programs Included</span>
          </div>
        )}

        <ul style={{ listStyle: "none", marginBottom: 20, display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
          {p.benefits.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Check size={11} style={{ color: "var(--orange)", marginTop: 3, flexShrink: 0 }} />
              <span className="t-body" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{b}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--border)", marginTop: "auto" }}>
          <div>
            <span className="t-display" style={{ fontSize: 38, color: p.category === "bundle" ? "var(--orange)" : "var(--text)", lineHeight: 1 }}>${p.price}</span>
            {p.originalPrice && <span className="t-body" style={{ fontSize: 13, color: "var(--text-faint)", marginLeft: 8, textDecoration: "line-through" }}>${p.originalPrice}</span>}
            <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginTop: 2 }}>lifetime access</div>
          </div>
          <button className="btn-primary" style={{ padding: "10px 18px", fontSize: 12 }} onClick={(e) => { e.stopPropagation(); onOpen(p); }}>
            Access Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CATEGORY SECTION ─────────────────────────────────────────────────────────

function CategorySection({ label, sublabel, programs, onOpen }: { label: string; sublabel: string; programs: Program[]; onOpen: (p: Program) => void }) {
  return (
    <div style={{ marginBottom: 72 }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
          <div style={{ width: 4, height: 32, background: "var(--orange)", borderRadius: 2, flexShrink: 0 }} />
          <h2 className="t-display" style={{ fontSize: "clamp(28px,4vw,44px)" }}>{label}</h2>
        </div>
        <p className="t-body" style={{ fontSize: 14, color: "var(--text-faint)", marginLeft: 20, letterSpacing: 0.5 }}>{sublabel}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(programs.length, 3)}, 1fr)`, gap: 20 }} className={programs.length === 3 ? "prog-grid-3" : programs.length === 1 ? "" : "prog-grid-2"}>
        {programs.map((p) => <ProgramCard key={p.id} program={p} onOpen={onOpen} />)}
      </div>
    </div>
  );
}

// ─── SELECTION GUIDE ──────────────────────────────────────────────────────────

function SelectionGuide({ onOpen }: { onOpen: (p: Program) => void }) {
  return (
    <section id="guide" style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="badge" style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-dim)", border: "1px solid var(--border-bright)", marginBottom: 16 }}>SELECTION GUIDE</div>
          <h2 className="t-display" style={{ fontSize: "clamp(30px,5vw,58px)", marginBottom: 12 }}>WHICH PROGRAM IS FOR YOU?</h2>
          <p className="t-body" style={{ fontSize: 15, color: "var(--text-faint)", maxWidth: 480, margin: "0 auto" }}>Click any row to open that program's dashboard.</p>
        </div>

        <div className="surface table-scroll" style={{ borderRadius: 8, overflow: "hidden" }}>
          <table className="data-table">
            <thead>
              <tr>
                {["Program", "Category", "Level", "Prerequisite", "Dual Track", "Price"].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPrograms.map((p, i) => (
                <tr key={p.id} style={{ cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,69,0,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  onClick={() => onOpen(p)}>
                  <td style={{ fontWeight: 700, color: "var(--text)" }}>{p.title}</td>
                  <td><span className="badge" style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-dim)", border: "1px solid var(--border)" }}>{p.categoryGroup}</span></td>
                  <td><span className="badge" style={{ background: `${p.levelColor}15`, color: p.levelColor, border: `1px solid ${p.levelColor}28` }}>{p.level}</span></td>
                  <td>{p.prereq}</td>
                  <td style={{ textAlign: "center" }}>{p.dualTrack ? <span style={{ color: "var(--orange)" }}>✓</span> : <span style={{ color: "var(--text-faint)" }}>—</span>}</td>
                  <td>
                    <span className="t-display" style={{ fontSize: 18, color: p.category === "bundle" ? "var(--orange)" : "var(--text)" }}>${p.price}</span>
                    {p.originalPrice && <span className="t-body" style={{ fontSize: 11, color: "var(--text-faint)", marginLeft: 6, textDecoration: "line-through" }}>${p.originalPrice}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<"landing" | "dashboard">("landing");
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);

  const openProgram = (program: Program) => {
    setActiveProgram(program);
    setPage("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "dashboard" && activeProgram) {
    return <Dashboard program={activeProgram} onBack={() => { setPage("landing"); window.scrollTo({ top: 0 }); }} />;
  }

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <div className="noise" />
      <div className="grid-bg" />

      {/* NAV */}
      <nav className="no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", background: "rgba(10,10,10,0.92)", backdropFilter: "blur(24px)" }}>
        <div className="t-display" style={{ fontSize: 20, color: "var(--orange)", letterSpacing: 4 }}>
          GRAVITY<span style={{ color: "var(--text)" }}>LAB</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Programs", "Guide"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="t-label" style={{ color: "var(--text-faint)", textDecoration: "none", fontSize: 11, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
              {l}
            </a>
          ))}
        </div>
      </nav>

      <Hero onViewPrograms={() => { document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" }); }} />

      {/* PROGRAMS */}
      <section id="programs" style={{ padding: "60px 24px 20px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge" style={{ background: "var(--orange-dim)", color: "var(--orange)", border: "1px solid var(--orange-border)", marginBottom: 16 }}>PROGRAMS</div>
            <h2 className="t-display" style={{ fontSize: "clamp(36px,5.5vw,68px)" }}>CHOOSE YOUR PATH</h2>
          </div>

          <CategorySection
            label="STRENGTH & SKILLS"
            sublabel="Master gravity — Planche & Front Lever progressions from beginner to elite"
            programs={strengthSkillsGroup}
            onOpen={openProgram}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 72 }} className="prog-grid-2">
            <CategorySection label="HYBRID" sublabel="Skill + Strength fused" programs={hybridGroup} onOpen={openProgram} />
            <CategorySection label="HYPERTROPHY" sublabel="Aesthetic physique focus" programs={hypertrophyGroup} onOpen={openProgram} />
          </div>

          {/* Bundle */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
                <div style={{ width: 4, height: 32, background: "var(--orange)", borderRadius: 2 }} />
                <h2 className="t-display" style={{ fontSize: "clamp(28px,4vw,44px)" }}>BUNDLE</h2>
              </div>
              <p className="t-body" style={{ fontSize: 14, color: "var(--text-faint)", marginLeft: 20 }}>Everything. One price. Lifetime access.</p>
            </div>
            <div style={{ maxWidth: 420 }}>
              <ProgramCard program={ultimateBundle} onOpen={openProgram} />
            </div>
          </div>

        </div>
      </section>

      <SelectionGuide onOpen={openProgram} />

      <footer className="no-print" style={{ borderTop: "1px solid var(--border)", padding: "28px 24px", textAlign: "center" }}>
        <p className="t-label" style={{ color: "var(--text-faint)", fontSize: 10 }}>© 2025 GRAVITYLAB — All rights reserved · Results may vary</p>
      </footer>
    </div>
  );
}
