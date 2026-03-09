"use client";
import { useState } from "react";
import {
  ArrowLeft, Download, Clock, Check, BarChart2,
  ChevronDown, ChevronUp, Home, Dumbbell,
  RefreshCw, Zap, Target, Flame, BookOpen,
  Layers, Thermometer, Wind
} from "lucide-react";
import type { Program, Exercise, Phase } from "../data/programs";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function SectionBar({ title, tag }: { title: string; tag?: string }) {
  return (
    <div className="section-divider">
      <div className="dot" />
      <div className="line" />
      <span className="t-display print-h2" style={{ fontSize: 26, flexShrink: 0 }}>{title}</span>
      {tag && <span className="t-label" style={{ color: "var(--text-faint)", fontSize: 10, flexShrink: 0 }}>{tag}</span>}
      <div className="line" />
    </div>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div style={{ width: 22, height: 22, border: `1.5px solid ${checked ? "var(--orange)" : "var(--border-bright)"}`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", background: checked ? "var(--orange)" : "transparent", transition: "all 0.2s", flexShrink: 0 }}>
      {checked && <Check size={12} color="white" />}
    </div>
  );
}

// ─── PROGRESSION RAIL ────────────────────────────────────────────────────────

function ProgressionRail({ steps }: { steps: { label: string; emoji: string; hold?: string; active?: boolean }[] }) {
  return (
    <div className="progression-rail" style={{ display: "flex", alignItems: "flex-end", gap: 0, padding: "8px 0 4px", overflowX: "auto" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-end", gap: 0, flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: step.active ? "var(--orange)" : "var(--text-faint)", letterSpacing: 1, textTransform: "uppercase", textAlign: "center", maxWidth: 64, lineHeight: 1.3 }}>
              {step.hold && <div style={{ color: step.active ? "var(--orange)" : "var(--text-faint)", marginBottom: 2 }}>{step.hold}</div>}
              {step.label}
            </div>
            <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: `2px solid ${step.active ? "var(--orange)" : "var(--border-bright)"}`, background: step.active ? "var(--orange-dim)" : "var(--bg-card)", boxShadow: step.active ? "0 0 18px rgba(255,69,0,0.3)" : "none", transition: "all 0.2s" }}>
              {step.emoji}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 28, height: 2, background: step.active ? "var(--orange)" : "var(--border)", marginBottom: 26, flexShrink: 0 }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── EXERCISE CARD ────────────────────────────────────────────────────────────

function ExerciseCard({ ex, index }: { ex: Exercise; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="surface-2 print-avoid-break ex-card-print" style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }}>

      {/* Header */}
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--orange-dim)", border: "1px solid var(--orange-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span className="t-label" style={{ color: "var(--orange)", fontSize: 10 }}>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div className="t-display" style={{ fontSize: 17, color: "var(--text)" }}>{ex.title}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
            {[
              { label: "Sets", val: ex.sets },
              { label: "Reps", val: ex.reps },
              { label: "Rest", val: ex.rest },
            ].map(({ label, val }) => (
              <span key={label} className="t-body" style={{ fontSize: 12, color: "var(--text-faint)" }}>
                <span style={{ color: "var(--orange)" }}>{val}</span> {label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span className="badge" style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-faint)", border: "1px solid var(--border)", fontSize: 9 }}>{ex.intensity}</span>
          {open ? <ChevronUp size={14} style={{ color: "var(--text-faint)" }} /> : <ChevronDown size={14} style={{ color: "var(--text-faint)" }} />}
        </div>
      </button>

      {/* Body */}
      {open && (
        <div style={{ padding: "0 20px 20px" }}>
          {/* Progression rail */}
          {ex.progression && ex.progression.length > 0 && (
            <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 10 }}>PROGRESSION PATH</div>
              <ProgressionRail steps={ex.progression} />
            </div>
          )}

          {/* Technical Cues */}
          <div style={{ marginBottom: 14 }}>
            <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 10 }}>TECHNICAL CUES</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {ex.cues.map((cue, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 2, background: "var(--orange-dim)", border: "1px solid var(--orange-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span className="t-label" style={{ color: "var(--orange)", fontSize: 9 }}>{i + 1}</span>
                  </div>
                  <p className="t-body" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{cue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="orange-border-left" style={{ background: "rgba(255,69,0,0.04)", borderLeft: "3px solid var(--orange)", borderRadius: "0 4px 4px 0", padding: "12px 14px" }}>
            <div className="t-label" style={{ color: "var(--orange)", fontSize: 9, marginBottom: 6 }}>💡 PRO TIP</div>
            <p className="t-body print-body" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, fontStyle: "italic" }}>{ex.proTip}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PHASE BLOCK ──────────────────────────────────────────────────────────────

function PhaseBlock({ phase, index }: { phase: Phase; index: number }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="surface print-break-before print-avoid-break" style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 24 }}>
      {/* Phase header */}
      <button onClick={() => setCollapsed(!collapsed)} style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer" }}>
        <div className="phase-header" style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 24px", background: "linear-gradient(90deg, rgba(255,69,0,0.08) 0%, transparent 100%)", borderBottom: collapsed ? "none" : "1px solid var(--border)", textAlign: "left" }}>
          <div style={{ fontSize: 24, flexShrink: 0 }}>{phase.icon}</div>
          <div style={{ flex: 1 }}>
            <div className="t-display print-h3" style={{ fontSize: 20, color: "var(--text)" }}>{phase.name}</div>
            <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
              <span className="badge" style={{ background: "var(--orange-dim)", color: "var(--orange)", border: "1px solid var(--orange-border)", fontSize: 9 }}>{phase.tag}</span>
              <span className="t-label" style={{ color: "var(--text-faint)", fontSize: 9 }}>{phase.duration} · {phase.exercises.length} exercises</span>
            </div>
          </div>
          {collapsed ? <ChevronDown size={16} style={{ color: "var(--text-faint)", flexShrink: 0 }} /> : <ChevronUp size={16} style={{ color: "var(--text-faint)", flexShrink: 0 }} />}
        </div>
      </button>

      {!collapsed && (
        <div style={{ padding: "20px 24px" }}>
          <p className="t-body print-body" style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 24, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>{phase.description}</p>

          <div className="ex-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
            {phase.exercises.map((ex, i) => (
              <ExerciseCard key={i} ex={ex} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WARMUP / COOLDOWN ────────────────────────────────────────────────────────

function WarmupCooldown({ items, title, icon, tag }: { items: { name: string; duration: string; notes: string }[]; title: string; icon: React.ReactNode; tag: string }) {
  const [checkedMap, setCheckedMap] = useState<Record<number, boolean>>({});

  return (
    <div style={{ marginBottom: 40 }}>
      <SectionBar title={title} tag={tag} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} className="surface check-row" onClick={() => setCheckedMap(prev => ({ ...prev, [i]: !prev[i] }))}
            style={{ borderRadius: 6, padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", opacity: checkedMap[i] ? 0.4 : 1, border: `1px solid ${checkedMap[i] ? "var(--orange-border)" : "var(--border)"}`, transition: "all 0.2s" }}>
            <div style={{ marginTop: 2 }}><Checkbox checked={!!checkedMap[i]} /></div>
            <div style={{ flex: 1 }}>
              <div className="t-display" style={{ fontSize: 15, textDecoration: checkedMap[i] ? "line-through" : "none", color: "var(--text)" }}>{item.name}</div>
              <p className="t-body" style={{ fontSize: 12, color: "var(--text-faint)", lineHeight: 1.45, marginTop: 3 }}>{item.notes}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <Clock size={11} style={{ color: "var(--orange)" }} />
              <span className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, whiteSpace: "nowrap" }}>{item.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRINT COVER ──────────────────────────────────────────────────────────────

function PrintCover({ program }: { program: Program }) {
  return (
    <div className="print-cover" style={{ display: "none", pageBreakAfter: "always" }}>
      <div className="print-cover-accent" />
      <div className="t-label" style={{ color: "var(--orange)", fontSize: 11, letterSpacing: 3, marginBottom: 16 }}>GRAVITYLAB — ELITE TRAINING MANUAL</div>
      <h1 className="print-title t-serif" style={{ fontSize: 52, lineHeight: 1.05, marginBottom: 16 }}>{program.title}</h1>
      <p className="t-serif" style={{ fontSize: 20, color: "#555", marginBottom: 48, fontStyle: "italic" }}>{program.tagline}</p>
      <div style={{ borderTop: "1px solid #ddd", paddingTop: 20 }}>
        <p className="t-body print-body" style={{ fontSize: 12, color: "#888" }}>© 2025 GravityLab · Lifetime Access · gravitylab.com</p>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function Dashboard({ program, onBack }: { program: Program; onBack: () => void }) {
  const [activeTrack, setActiveTrack] = useState<0 | 1>(0);
  const [progressWeek] = useState(3);
  const totalWeeks = 8;

  const phases: Phase[] = program.dualTrack && activeTrack === 1
    ? (program.gymPhases ?? program.phases)
    : program.phases;

  const handlePrint = () => window.print();

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      {/* Print cover (only visible in print) */}
      <PrintCover program={program} />

      {/* Sticky Nav */}
      <div className="no-print" style={{ background: "rgba(10,10,10,0.94)", backdropFilter: "blur(24px)", borderBottom: "1px solid var(--border)", padding: "16px 24px", position: "sticky", top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }} className="dash-head">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button className="btn-ghost" onClick={onBack}><ArrowLeft size={13} /> Programs</button>
            <div style={{ borderLeft: "1px solid var(--border-bright)", paddingLeft: 16 }}>
              <div className="t-display" style={{ fontSize: 19, lineHeight: 1 }}>{program.title}</div>
              <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginTop: 3 }}>{program.subtitle}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            {program.dualTrack && program.trackLabels && (
              <div className="track-toggle">
                {program.trackLabels.map((label, idx) => (
                  <button key={label} className={`track-btn ${activeTrack === idx ? "active" : ""}`}
                    onClick={() => setActiveTrack(idx as 0 | 1)}>
                    {idx === 0 ? <Home size={12} /> : <Dumbbell size={12} />}
                    {label}
                  </button>
                ))}
              </div>
            )}
            <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 12 }} onClick={handlePrint}>
              <Download size={12} /> Download Manual
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

        {/* ── Introduction ──────────────────────────────────────── */}
        <section style={{ marginBottom: 56 }} className="print-break-before">
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
            <div style={{ flex: 2, minWidth: 260 }}>
              <div className="badge" style={{ background: "var(--orange-dim)", color: "var(--orange)", border: "1px solid var(--orange-border)", marginBottom: 16 }}>
                <BookOpen size={10} /> INTRODUCTION
              </div>
              <h1 className="t-display print-title" style={{ fontSize: "clamp(36px,5vw,56px)", lineHeight: 0.95, marginBottom: 12 }}>{program.title}</h1>
              <p className="t-serif" style={{ fontSize: 19, color: "var(--text-dim)", lineHeight: 1.5, marginBottom: 20, fontStyle: "italic" }}>{program.tagline}</p>
              <p className="t-body print-body" style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7, maxWidth: 580 }}>{program.mindset}</p>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              {/* Goals */}
              <div className="surface" style={{ padding: "20px", borderRadius: 8, marginBottom: 16 }}>
                <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 12 }}>
                  <Target size={10} style={{ display: "inline", marginRight: 5, color: "var(--orange)" }} />PROGRAM GOALS
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {program.goals.map((g, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <Check size={11} style={{ color: "var(--orange)", marginTop: 3, flexShrink: 0 }} />
                      <span className="t-body" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.45 }}>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Week structure */}
              <div className="surface" style={{ padding: "16px 20px", borderRadius: 8 }}>
                <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 8 }}>
                  <Layers size={10} style={{ display: "inline", marginRight: 5, color: "var(--orange)" }} />STRUCTURE
                </div>
                <p className="t-body" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{program.weekStructure}</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="no-print glass" style={{ padding: "18px 22px", borderRadius: 8, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 8 }}>YOUR PROGRESS</div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${(progressWeek / totalWeeks) * 100}%` }} /></div>
            </div>
            <div className="t-display" style={{ fontSize: 28, color: "var(--orange)" }}>{Math.round((progressWeek / totalWeeks) * 100)}%</div>
            <div className="t-body" style={{ fontSize: 13, color: "var(--text-faint)" }}>Week {progressWeek} / {totalWeeks}</div>
          </div>
        </section>

        {/* ── Dual Track Banner ──────────────────────────────────── */}
        {program.dualTrack && program.trackLabels && (
          <div className="no-print" style={{ background: "linear-gradient(135deg, rgba(255,69,0,0.07), rgba(255,69,0,0.03))", border: "1px solid var(--orange-border)", borderRadius: 8, padding: "18px 22px", marginBottom: 40, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <RefreshCw size={18} style={{ color: "var(--orange)", flexShrink: 0 }} />
            <div>
              <div className="t-display" style={{ fontSize: 16, marginBottom: 3 }}>Dual-Track Program Active</div>
              <p className="t-body" style={{ fontSize: 13, color: "var(--text-dim)" }}>
                Currently viewing: <strong style={{ color: "var(--orange)" }}>{program.trackLabels[activeTrack]}</strong> — Switch between tracks using the toggle above. Same progressions, different equipment.
              </p>
            </div>
          </div>
        )}

        {/* ── Warm-Up ────────────────────────────────────────────── */}
        <WarmupCooldown items={program.warmup} title="WARM-UP & MOBILITY" icon={<Thermometer size={16} />} tag={`${program.warmup.length} exercises · ~15 min`} />

        {/* ── Core Program ──────────────────────────────────────── */}
        <section style={{ marginBottom: 52 }}>
          <SectionBar title="CORE PROGRAM" tag={`${phases.length} phases · ${phases.reduce((acc, p) => acc + p.exercises.length, 0)} exercises`} />
          {phases.map((phase, i) => (
            <PhaseBlock key={i} phase={phase} index={i} />
          ))}
        </section>

        {/* ── Cool Down ─────────────────────────────────────────── */}
        <WarmupCooldown items={program.cooldown} title="COOL DOWN & RECOVERY" icon={<Wind size={16} />} tag={`${program.cooldown.length} exercises · ~12 min`} />

        {/* ── Footer ────────────────────────────────────────────── */}
        <div className="no-print" style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <button className="btn-ghost" onClick={onBack}><ArrowLeft size={13} /> Back to Programs</button>
          <button className="btn-primary" onClick={handlePrint}><Download size={13} /> Download Full Manual</button>
        </div>
      </div>
    </div>
  );
}
