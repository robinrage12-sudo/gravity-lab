"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft, Download, Clock, Check,
  ChevronDown, ChevronUp, Home, Dumbbell,
  RefreshCw, Target, BookOpen, Layers, Package,
  Thermometer, Wind, Star, AlertCircle
} from "lucide-react";

// ═══════════════════════════════════════════════════════
// TYPES & DATA (inlined from programs.ts)
// ═══════════════════════════════════════════════════════

interface ProgressionStep {
  label: string;
  emoji: string;
  hold?: string;
  active?: boolean;
}

interface Exercise {
  title: string;
  sets: string;
  reps: string;
  rest: string;
  cues: string[];
  proTip: string;
  progression?: ProgressionStep[];
  intensity: string;
}

interface Phase {
  name: string;
  tag: string;
  duration: string;
  icon: string;
  description: string;
  exercises: Exercise[];
}

interface WarmupExercise {
  name: string;
  duration: string;
  notes: string;
}

interface CooldownExercise {
  name: string;
  duration: string;
  notes: string;
}

interface Program {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  level: string;
  levelColor: string;
  category: "skill" | "hybrid" | "hypertrophy" | "bundle";
  categoryGroup: "STRENGTH & SKILLS" | "HYBRID" | "HYPERTROPHY" | "BUNDLE";
  price: string;
  originalPrice?: string;
  icon: string;
  glowColor: string;
  badge?: string;
  dualTrack?: boolean;
  trackLabels?: [string, string];
  goals: string[];
  mindset: string;
  weekStructure: string;
  warmup: WarmupExercise[];
  phases: Phase[];
  gymPhases?: Phase[];
  cooldown: CooldownExercise[];
  benefits: string[];
  bundlePrograms?: Program[];
  stripeUrl?: string;
}

// ─── SHARED DATA ──────────────────────────────────────────────────────────────

const sharedWarmup: WarmupExercise[] = [
  { name: "Wrist Circles & Flexor Stretch", duration: "2 min", notes: "Both directions, 10 reps each way. Critical for planche longevity." },
  { name: "Shoulder CARs (Controlled Articular Rotations)", duration: "90s each side", notes: "Slow, full-range motion. Feel every degree of the joint." },
  { name: "Dead Hang + Scapular Pulls", duration: "3×20s", notes: "Engage lats, then actively depress and retract scapulas." },
  { name: "Pike Compression Hold", duration: "3×15s", notes: "Seated, push legs down with straight arms. Activate hip flexors." },
  { name: "Planche Lean Warm-up (30% effort)", duration: "3×5s", notes: "Just activate the pattern — do NOT push hard here." },
];

const sharedCooldown: CooldownExercise[] = [
  { name: "Wrist Extensor Stretch", duration: "2 min", notes: "Knuckles on floor, gently lean back. Hold 30s, release, repeat." },
  { name: "Doorframe Chest Opener", duration: "90s", notes: "Arms at 90°. Gently press chest forward. Breathe into the stretch." },
  { name: "Child's Pose with Lat Stretch", duration: "2 min", notes: "Walk hands to each side. Full spinal decompression." },
  { name: "Supine Shoulder External Rotation", duration: "2 min each", notes: "Lying down, arm at 90°. Slowly lower forearm toward floor." },
  { name: "Diaphragmatic Breathing", duration: "3 min", notes: "4s inhale, 4s hold, 6s exhale. Activates parasympathetic recovery." },
];

const leverCooldown: CooldownExercise[] = [
  { name: "Thoracic Spine Foam Roll", duration: "3 min", notes: "Roll from T1 to T12 slowly. Pause on tender spots for 20s." },
  { name: "Lat Hang Stretch", duration: "2×30s", notes: "Hang from bar, slightly tuck one shoulder to feel the lat decompressing." },
  { name: "Bicep & Forearm Wall Stretch", duration: "90s each", notes: "Palm on wall, fingers pointing down. Gently turn away." },
  { name: "Prone Back Extension (Cobra)", duration: "2 min", notes: "Elbows under shoulders. Let the spine passively extend. No forcing." },
  { name: "Deep Breathing + Mental Debrief", duration: "3 min", notes: "Visualize your best rep. Reinforce the motor pattern while calm." },
];

// ─── PLANCHE FOUNDATION ───────────────────────────────────────────────────────

const plancheFoundation: Program = {
  id: "planche-foundation",
  title: "Planche Foundation",
  subtitle: "From Zero to Full Planche — No Prerequisites, Start From Scratch",
  tagline: "Zero to full planche — no prerequisites, no gym needed. Built for anyone starting from scratch.",
  level: "Beginner / Intermediate",
  levelColor: "#22c55e",
  category: "skill",
  categoryGroup: "STRENGTH & SKILLS",
  price: "37",
  icon: "🤸",
  glowColor: "rgba(34,197,94,0.12)",
  goals: [
    "Develop bulletproof scapular depression & protraction",
    "Build shoulder blade control from scratch",
    "Achieve a clean 5-second tuck planche hold",
    "Lay the structural foundation for advanced planche variants",
  ],
  mindset: "Zero prerequisites. Zero experience needed. If you have never trained a day in your life, this is your starting point. The planche is not built in a session — it is carved over months. In the first phase, your only job is to own every rep, own every second, and build the connective tissue strength that will protect you for years. Ego has no place here. Perfect technique over everything. Track every session: hold time, quality rating /10, and one thing to improve next time.",
  weekStructure: "3 sessions/week (Mon · Wed · Fri). Each session: 60–75 min. Rest days are training days for your nervous system — sleep, eat, recover.",
  warmup: [
    { name: "Wrist Circles & Flexion/Extension", duration: "2 min", notes: "30 reps each direction. This is non-negotiable. Wrists take the most stress." },
    { name: "Scapular Elevation & Depression", duration: "3×12", notes: "Hanging from bar. Feel the full range — do not shortcut." },
    { name: "Hollow Body Hold", duration: "3×20s", notes: "Lower back pressed to floor. This is the planche body position." },
    { name: "Straight-Arm Plank", duration: "3×20s", notes: "Push floor away aggressively. Protract those scapulas." },
    { name: "Cat-Cow with Protraction Focus", duration: "90s", notes: "On all fours. On 'round', maximize the upper back push." },
  ],
  phases: [
    {
      name: "Phase 1 — Structural Foundation",
      tag: "Weeks 1–3",
      duration: "3 weeks",
      icon: "🏗️",
      description: "Build the connective tissue and neuromuscular patterns. Do not rush. These weeks are the difference between long-term progress and injury.",
      exercises: [
        {
          title: "Scapular Push-Ups",
          sets: "4",
          reps: "12 reps",
          rest: "60s",
          intensity: "Controlled",
          cues: [
            "Start in straight-arm plank — arms fully locked, no bend at elbows",
            "Phase 1 (descent): let chest drop ONLY by pinching scapulas together — elbows stay locked",
            "Phase 2 (ascent): push floor away aggressively to protract and round upper back",
            "Top position: your upper back should visibly dome upward — feel the serratus anterior fire",
            "Common mistake: bending elbows. If elbows bend, you are doing a regular push-up, not a scapular push-up",
            "Tempo: 2s down, 1s hold at bottom, 2s up, 1s squeeze at top",
          ],
          proTip: "Record from the side. You should see your upper back rising noticeably in the protracted position. If the movement looks flat, you are not protracting enough — the range is small but critical.",
          progression: [
            { label: "Knees", emoji: "🦵", active: false },
            { label: "Standard", emoji: "📐", active: true },
            { label: "Elevated Feet", emoji: "⬆️", active: false },
            { label: "Weighted", emoji: "🏋️", active: false },
          ],
        },
        {
          title: "Planche Lean (Rings or Parallettes)",
          sets: "5",
          reps: "5×3s hold",
          rest: "90s",
          intensity: "Technical",
          cues: [
            "Setup: hands on parallettes shoulder-width apart, arms fully locked",
            "Lean forward until shoulders are clearly anterior to wrists — measure this with camera",
            "Posterior pelvic tilt throughout: tuck tailbone, engage core like a hollow body",
            "Arms stay at 0° bend — any elbow bend reduces the training stimulus significantly",
            "Gaze: floor 10–15cm in front of hands — not straight down",
            "Variation 1 (easier): toes on floor for balance — focus on lean angle only",
            "Variation 2 (harder): feet together, full bodyweight through hands",
            "Week 1 target: shoulders 5cm in front of hands. Week 4 target: 15cm+",
          ],
          proTip: "The lean angle is everything. Use a mirror or film from the side every session. Your shoulders should be 10–15cm in front of your hands by Week 3. If you cannot lean this far, do not rush — wrist and shoulder preparation takes time.",
          progression: [
            { label: "Slight Lean", emoji: "📏", active: true },
            { label: "45° Lean", emoji: "📐", active: false },
            { label: "Full Lean", emoji: "⚡", active: false },
          ],
        },
        {
          title: "Pseudo Planche Push-Ups",
          sets: "4",
          reps: "8 reps",
          rest: "90s",
          intensity: "Moderate",
          cues: [
            "Hand setup: fingers pointing out 45°–90° — the more rotation, the harder",
            "Lean forward: shoulders must be over or in front of wrists before lowering",
            "Phase 1 (negative): lower chest to floor over 3 seconds — control every millimeter",
            "Bottom position: chest nearly touching floor, maintain forward lean throughout",
            "Phase 2 (press): push back up explosively while keeping lean angle",
            "Variation A (easier): hands at 45°, slight lean — beginner version",
            "Variation B (moderate): hands at 90°, shoulders over wrists — standard",
            "Variation C (harder): hands turned back, shoulders past wrists — advanced",
            "Common mistake: losing the lean during the push. Fix: think 'push forward, not up'",
          ],
          proTip: "The hand rotation and forward lean are what make this exercise planche-specific. A pseudo planche push-up with hands straight and no lean is just a regular push-up. Start conservative and increase lean angle as strength improves.",
        },
      ],
    },
    {
      name: "Phase 2 — Tuck Compression",
      tag: "Weeks 4–6",
      duration: "3 weeks",
      icon: "🔧",
      description: "Now we introduce the actual tuck position. Hip flexor strength and compression are the limiting factors for most athletes at this stage.",
      exercises: [
        {
          title: "Tuck L-Sit Progression",
          sets: "5",
          reps: "5×4s hold",
          rest: "90s",
          intensity: "Max Effort",
          cues: [
            "On parallettes or floor (parallel bars preferred)",
            "Pull knees as close to chest as possible",
            "Push down hard — think 'anti-gravity'",
            "Keep arms straight and locked — no bending",
          ],
          proTip: "This is 80% hip flexor strength. If you struggle, add 3 sets of 12 lying leg raises to your accessory work daily.",
          progression: [
            { label: "Foot-Assisted", emoji: "👣", active: false },
            { label: "Tuck L-Sit", emoji: "🧘", active: true },
            { label: "Half-Lay", emoji: "📐", active: false },
            { label: "L-Sit", emoji: "🎯", active: false },
          ],
        },
        {
          title: "Tuck Planche Hold",
          sets: "6",
          reps: "6×3–5s",
          rest: "2 min",
          intensity: "Maximum",
          cues: [
            "Entry: from tuck L-sit, lean forward progressively until feet lift off",
            "Hip position: hips must be parallel to floor — sagging hips = failed rep, do not count it",
            "Scapular state: maximum protraction throughout — upper back rounded and pushing",
            "Knee position: knees tight to chest, not hanging loosely",
            "Breathing: short shallow breaths — do not exhale fully (it collapses position)",
            "Every second of a clean hold is worth more than 5 seconds of a sloppy one",
            "Assisted variation: place one foot lightly on a stool to reduce load while learning position",
            "Self-assessment: film from side — hips should be at the same height as shoulders",
            "Rest quality: between sets, shake out wrists and reset completely — this is CNS-intensive",
          ],
          proTip: "Film every single session from the side. The moment hips drop below shoulder level, the hold is over — stop the timer. Most beginners are shocked to see how different their hold looks vs how it feels. The camera is your most honest coach.",
          progression: [
            { label: "Assisted", emoji: "🤝", active: false },
            { label: "Tuck Planche", emoji: "🤸", active: true },
            { label: "Adv. Tuck", emoji: "⚡", active: false },
            { label: "Straddle", emoji: "🌟", active: false },
          ],
        },
        {
          title: "Tuck Planche Push-Ups",
          sets: "4",
          reps: "4×2–3 reps",
          rest: "2 min",
          intensity: "High",
          cues: [
            "Start in tuck planche hold",
            "Lower body 5cm while maintaining lean and tuck",
            "Press back to start — every rep is a victory",
            "Zero tolerance for hip sag",
          ],
          proTip: "Even 1 clean rep is better than 5 ugly ones. This exercise builds the specific strength no other movement can replicate.",
        },
        {
          title: "Advanced Tuck Planche Push-Ups — Technique",
          sets: "4",
          reps: "2–4 reps",
          rest: "2 min",
          intensity: "High",
          cues: [
            "Hips extended to 180° — thighs parallel to floor (advanced tuck position)",
            "Lower chest toward floor 3–5cm while maintaining hip extension",
            "This is significantly harder than the tuck push-up — treat it with respect",
            "Slow 3-second negative, explosive press back up",
            "If hips sag during the push-up, you are not ready — return to tuck PU",
          ],
          proTip: "The advanced tuck push-up bridges the gap between tuck and straddle. Master 3 clean reps before attempting straddle push-ups.",
          progression: [
            { label: "Tuck PU", emoji: "🤸", active: false },
            { label: "Adv. Tuck PU", emoji: "⚡", active: true },
            { label: "Straddle PU", emoji: "🌟", active: false },
            { label: "Full PU", emoji: "👑", active: false },
          ],
        },
        {
          title: "Straddle Planche Push-Ups — Intro Technique",
          sets: "3",
          reps: "1–3 reps",
          rest: "3 min",
          intensity: "Max Effort",
          cues: [
            "Legs wide — the wider the straddle, the more accessible this becomes",
            "Enter straddle planche hold, then initiate the descent",
            "Lower only 3–5cm — range of motion is minimal at this level",
            "Elbows track slightly back, not flared",
            "Press back up — even a partial rep builds elite-level strength",
            "This is one of the hardest push movements in calisthenics",
          ],
          proTip: "If you can manage 1 straddle push-up at the end of this program, you are ahead of 99% of athletes. This is an intro — full mastery comes in Planche Elite.",
          progression: [
            { label: "Wide Straddle", emoji: "↔️", active: true },
            { label: "Mid Straddle", emoji: "📐", active: false },
            { label: "Narrow", emoji: "⚡", active: false },
            { label: "Full PU", emoji: "👑", active: false },
          ],
        },
        {
          title: "Straddle Planche Press — Negative Intro",
          sets: "3",
          reps: "3×3s negative",
          rest: "2 min",
          intensity: "Technique",
          cues: [
            "From straddle planche, lower slowly toward floor over 3 seconds",
            "This is the press negative — different mechanics from the push-up",
            "Keep legs wide and hips level throughout",
            "Use band assistance if needed — quality over everything",
            "This is an introduction — full press development is in Planche Elite",
          ],
          proTip: "The straddle press negative is the foundation of all planche press work. 4 weeks of consistent negatives will build more pressing strength than most people accumulate in a year.",
        },
      ],
    },
    {
      name: "Phase 3 — Integration & Testing",
      tag: "Weeks 7–8",
      duration: "2 weeks",
      icon: "🚀",
      description: "Peak your strength and test your tuck planche max hold. This week is about expression of what you've built, not adding new stimulus.",
      exercises: [
        {
          title: "Max Tuck Planche Hold Test",
          sets: "3",
          reps: "Max hold (target: 5+ sec)",
          rest: "3 min",
          intensity: "Max Effort",
          cues: [
            "Full warm-up completed",
            "Film every attempt",
            "Rest fully between attempts — this is a strength test",
            "Celebrate progress: even 3s is elite for 8 weeks",
          ],
          proTip: "Comparing Week 1 to Week 8 is the most motivating thing you'll ever see. Save both videos side by side.",
        },
        {
          title: "Planche Lean Endurance",
          sets: "5",
          reps: "5×8s",
          rest: "90s",
          intensity: "High Volume",
          cues: [
            "Max lean angle you can maintain",
            "Focus on holding the protraction throughout",
            "Breathe — don't hold your breath",
          ],
          proTip: "Building endurance in the lean builds the tendon and joint resilience that protects you as you progress to harder variants.",
        },
        {
          title: "Pseudo Planche Push-Up Variations",
          sets: "4",
          reps: "6–10 reps",
          rest: "90s",
          intensity: "Technique Focus",
          cues: [
            "Hands turned out 45°+, shoulders over or in front of wrists",
            "Variation 1 — Wide stance: easier, builds initial strength",
            "Variation 2 — Narrow stance: harder, more planche-specific",
            "Slow 3-second negative on every rep — this is where strength is built",
            "Full lockout at the top — squeeze scapulas into protraction",
          ],
          proTip: "These push-up variations are the bridge between a lean and a real tuck planche. Master 3 sets of 10 clean reps before moving to tuck push-ups.",
          progression: [
            { label: "Wide Stance", emoji: "↔️", active: true },
            { label: "Narrow Stance", emoji: "📐", active: false },
            { label: "Tuck PU", emoji: "🤸", active: false },
            { label: "Straddle PU", emoji: "⚡", active: false },
          ],
        },
        {
          title: "Tuck Planche Press (Intro)",
          sets: "3",
          reps: "3–5 reps",
          rest: "2 min",
          intensity: "Technique",
          cues: [
            "From tuck planche, lower slowly to floor (3 seconds)",
            "This is a NEGATIVE press — the concentric will come later",
            "Keep hips level with shoulders throughout",
            "Arms stay completely straight — this is the non-negotiable",
            "Reset to tuck planche between each rep",
          ],
          proTip: "The press negative is one of the most underused exercises in calisthenics. 4 weeks of negatives will build more pressing strength than 4 months of random training.",
        },
      ],
    },
    {
      name: "⭐ BONUS — One Arm Handstand Progression",
      tag: "Optional / Ongoing",
      duration: "Ongoing",
      icon: "🌟",
      description: "Included as a bonus with this program. The one arm handstand complements your planche work — both require the same wrist strength, protraction control, and total body tension.",
      exercises: [
        {
          title: "Handstand Hold Mastery (prerequisite)",
          sets: "5",
          reps: "5×15–20s",
          rest: "90s",
          intensity: "Foundation",
          cues: [
            "You need a solid 30s+ freestanding handstand before starting OAH",
            "Work on this during your off days — not in place of planche sessions",
            "Straight body alignment: ears between arms, hollow body position",
            "Practice pirouette exits for safety at all times",
          ],
          proTip: "The one arm handstand requires an extremely stable two-arm handstand. If you wobble in a two-arm HS, you are not ready. Build the base first.",
        },
        {
          title: "One Arm Handstand — Full Progression",
          sets: "4",
          reps: "3–5 attempts each side",
          rest: "2 min",
          intensity: "Bonus Skill",
          cues: [
            "Step 1 — Straddle OAH: wide leg split reduces balance demand significantly",
            "Step 2 — Tuck OAH: one leg tucked, more centered mass",
            "Step 3 — OAH with finger assist: other hand touches floor with fingertips only",
            "Step 4 — OAH negative: kick into two-arm HS, slowly shift weight to one arm",
            "Step 5 — Free OAH: full balance on one arm, other arm tucked or extended",
            "Full technique breakdown with exact hand position and body alignment cues included",
          ],
          proTip: "The OAH is a 6–18 month journey. Do not rush the steps — each one builds the balance and strength needed for the next. The straddle OAH alone takes most athletes 2–3 months.",
          progression: [
            { label: "Straddle OAH", emoji: "↔️", active: true },
            { label: "Tuck OAH", emoji: "🧘", active: false },
            { label: "Finger Assist", emoji: "👆", active: false },
            { label: "Free OAH", emoji: "👑", active: false },
          ],
        },
      ],
    },
  ],
  cooldown: sharedCooldown,
  benefits: [
    "Zero prerequisite — designed for complete beginners",
    "Complete roadmap: tuck → advanced tuck → straddle → full planche",
    "Every push-up & press variation — tuck, straddle, full — with full technique",
    "Bulletproof wrist & shoulder preparation from day one",
    "🌟 Bonus: One arm handstand progression",
  ],
  stripeUrl: "https://buy.stripe.com/14A7sNgHv9ix3R14d73ZK0h",
};

const plancheElite: Program = {
  id: "planche-elite",
  title: "Planche Elite",
  subtitle: "Master the Full Planche — Maltese & Finger Planche Included",
  tagline: "The program where the full planche is just the beginning — Maltese, finger planche & beyond.",
  level: "Advanced",
  levelColor: "#f97316",
  category: "skill",
  categoryGroup: "STRENGTH & SKILLS",
  price: "57",
  icon: "⚡",
  glowColor: "rgba(249,115,22,0.15)",
  goals: [
    "Achieve a clean 3-second straddle planche hold",
    "Build the strength base for full planche attempts",
    "Master the advanced tuck → straddle transition",
    "Develop ring planche stability for elite carryover",
  ],
  mindset: "You are no longer a beginner. This is where true separation happens. The athletes who reach this stage and fail are those who let ego push volume before quality. Your job is to be precise, patient, and relentless. The full planche is not a trick — it is a year or more of perfect training distilled into one moment. Every session: film your best set, compare to last week, find one technical improvement. Progress here is measured in millimeters and milliseconds — both matter.",
  weekStructure: "4 sessions/week (Mon · Tue · Thu · Fri). Tue/Fri are accessory & volume days. Mon/Thu are max effort skill days.",
  warmup: sharedWarmup,
  phases: [
    {
      name: "Phase 1 — Advanced Tuck Mastery",
      tag: "Weeks 1–3",
      duration: "3 weeks",
      icon: "🔩",
      description: "The advanced tuck (hips extended, legs parallel) is the true gateway to straddle. Own it for 8+ seconds before moving on.",
      exercises: [
        {
          title: "Advanced Tuck Planche Hold",
          sets: "6",
          reps: "6×6–8s",
          rest: "2.5 min",
          intensity: "Maximum",
          cues: [
            "Hips fully extended — thighs parallel to floor",
            "Knees tucked but hips 180° open",
            "Lean is aggressive — wrists are heavily loaded",
            "Squeeze glutes to maintain hip position",
          ],
          proTip: "The difference between tuck and advanced tuck is about 2–3× the difficulty. Do not rush. Film from the side every session to measure hip extension.",
          progression: [
            { label: "Tuck", emoji: "🤸", active: false },
            { label: "Adv. Tuck", emoji: "⚡", active: true },
            { label: "Straddle", emoji: "🌟", active: false },
            { label: "Full", emoji: "👑", active: false },
          ],
        },
        {
          title: "Straddle Planche Negatives",
          sets: "5",
          reps: "5×4s negative",
          rest: "3 min",
          intensity: "High Eccentric",
          cues: [
            "Start in straddle planche (use bands or partner if needed)",
            "Lower hips down over 4 full seconds",
            "Fight gravity every millimeter",
            "Use bands to assist the concentric only",
          ],
          proTip: "Eccentric strength is your fastest path to concentric planche. The negative builds 3× more specific strength than the hold.",
        },
      ],
    },
    {
      name: "Phase 2 — Straddle Development",
      tag: "Weeks 4–7",
      duration: "4 weeks",
      icon: "🌟",
      description: "The straddle planche is 60-70% of the full planche in terms of difficulty. Own it before even attempting full.",
      exercises: [
        {
          title: "Straddle Planche Hold",
          sets: "5",
          reps: "5×3–5s",
          rest: "3 min",
          intensity: "Maximum",
          cues: [
            "Legs spread to maximum width — the wider, the easier",
            "Point toes. Squeeze entire lower body",
            "Shoulder blades in maximum protraction",
            "Breathe shallow — don't let the exhale collapse your position",
          ],
          proTip: "Using parallettes vs floor changes the difficulty significantly. Start on parallettes (more wrist clearance). Graduate to floor.",
          progression: [
            { label: "Wide Straddle", emoji: "↔️", active: true },
            { label: "Mid Straddle", emoji: "📐", active: false },
            { label: "Narrow Straddle", emoji: "⚡", active: false },
            { label: "Full Planche", emoji: "👑", active: false },
          ],
        },
        {
          title: "Straddle Planche Push-Ups — Technique Breakdown",
          sets: "4",
          reps: "4×2–4 reps",
          rest: "3 min",
          intensity: "Elite",
          cues: [
            "One of the hardest push movements in calisthenics — respect it",
            "Setup: enter straddle planche hold first, then initiate descent",
            "Lower only 3–5cm — the range of motion is minimal at this level",
            "Elbows track slightly back — not flared out",
            "Press back up explosively — even if range is small, intent matters",
            "Even 1 clean rep is elite-level output",
          ],
          proTip: "Most athletes at this level manage 1–2 partial reps. That is perfectly normal. Film from the side — you will be surprised by how much range you actually have.",
        },
        {
          title: "Advanced Tuck Planche Press — Negative",
          sets: "4",
          reps: "4×3s negative",
          rest: "2.5 min",
          intensity: "Strength",
          cues: [
            "From advanced tuck planche, lower chest toward floor over 3 full seconds",
            "Hips must stay level — any drop ends the rep",
            "This builds the pressing strength needed for straddle and full planche press",
            "Concentric (pressing up) comes after mastering the negative",
          ],
          proTip: "The planche press negative is arguably the most efficient strength builder in the entire planche progression. 3 sessions per week of this alone will transform your pressing capacity.",
        },
      ],
    },
    {
      name: "Phase 3 — Full Planche Approach",
      tag: "Weeks 8–10",
      duration: "3 weeks",
      icon: "👑",
      description: "First true full planche attempts. Use band assistance to feel the position. Your goal is 1 unassisted second.",
      exercises: [
        {
          title: "Banded Full Planche Hold",
          sets: "5",
          reps: "5×5s",
          rest: "3 min",
          intensity: "Maximum",
          cues: [
            "Band around hips provides just enough assistance",
            "Legs together and fully extended — perfect alignment",
            "This is a full-body isometric contraction",
            "Record every attempt. Progress is measured in millimeters.",
          ],
          proTip: "Reduce band thickness every 2 weeks as you get stronger. The goal is 3 bands → 2 bands → 1 band → free.",
          progression: [
            { label: "3 Bands", emoji: "🟢", active: true },
            { label: "2 Bands", emoji: "🟡", active: false },
            { label: "1 Band", emoji: "🟠", active: false },
            { label: "Free", emoji: "👑", active: false },
          ],
        },
        {
          title: "Full Planche Push-Up — Banded Technique",
          sets: "4",
          reps: "3–5 reps (banded)",
          rest: "3 min",
          intensity: "Elite",
          cues: [
            "Use same band setup as your holds",
            "Enter full planche position, then lower 3–5cm",
            "Elbows bend slightly backward — not to the sides",
            "Press back up — full lockout, maximum protraction",
            "This is the rarest push movement in calisthenics — every rep counts",
          ],
          proTip: "Full planche push-ups are the final boss of pushing strength. Even banded reps at this level place you in the top 0.5% of athletes worldwide. Technique over everything.",
          progression: [
            { label: "3 Bands", emoji: "🟢", active: true },
            { label: "2 Bands", emoji: "🟡", active: false },
            { label: "1 Band", emoji: "🟠", active: false },
            { label: "Free PU", emoji: "👑", active: false },
          ],
        },
        {
          title: "Full Planche Press — Negative",
          sets: "3",
          reps: "3×4s negative",
          rest: "3 min",
          intensity: "Maximum",
          cues: [
            "Start in full planche, lower chest toward floor over 4 seconds",
            "Body remains perfectly horizontal — hips cannot drop",
            "This is the planche press negative — different from the push-up",
            "The press path is slightly different: elbows flare more outward",
            "Use band assistance as needed — quality over everything",
          ],
          proTip: "The full planche press and push-up are two separate skills. The press is harder. Master the negative over 4+ weeks before attempting the full concentric.",
        },
        {
          title: "⭐ Maltese — Introduction & Progression",
          sets: "5",
          reps: "5×3–5s hold",
          rest: "3 min",
          intensity: "Elite — Beyond Planche",
          cues: [
            "The maltese is the hardest static skill in calisthenics — harder than the full planche",
            "Arms extended to the sides (like a cross) while holding a planche position",
            "Requires full planche strength + extreme shoulder external rotation mobility",
            "Step 1 — Wide arm planche lean: hands further apart than shoulder width",
            "Step 2 — Banded maltese: band support around hips, arms progressively wider",
            "Step 3 — Rings maltese: rings allow natural wrist rotation, easier on joints",
            "Step 4 — Full maltese: arms at 90° from body, full horizontal hold",
          ],
          proTip: "The maltese is the elite goal beyond the full planche. Professional gymnasts train it for years. Approach it with patience — even a banded hold with arms slightly wider than planche is elite-level output.",
          progression: [
            { label: "Wide Planche", emoji: "↔️", active: true },
            { label: "Banded Maltese", emoji: "🟢", active: false },
            { label: "Rings Maltese", emoji: "💍", active: false },
            { label: "Full Maltese", emoji: "👑", active: false },
          ],
        },
        {
          title: "⭐ Maltese Press — Technique",
          sets: "3",
          reps: "3×3s negative",
          rest: "3 min",
          intensity: "Beyond Elite",
          cues: [
            "The maltese press is arguably the hardest dynamic movement in calisthenics",
            "From maltese hold, lower chest toward floor — arms remain wide",
            "Work only with band assistance — ego has no place here",
            "The negative alone will build exceptional shoulder and chest strength",
            "Full concentric press may take 12–24 months of dedicated work",
            "Technique: elbows track back and slightly outward during the press",
          ],
          proTip: "The maltese press places you at the absolute peak of human pressing strength. Even professional gymnasts rarely achieve a clean rep. The journey toward it will build more strength than most athletes accumulate in a lifetime.",
        },
      ],
    },
    {
      name: "⭐ Finger Planche — Full Technique & Progression",
      tag: "Optional / Elite",
      duration: "Ongoing",
      icon: "☝️",
      description: "The finger planche is one of the rarest skills in calisthenics — a full planche performed on the fingertips. It requires extreme finger tendon strength built over months of progressive loading. Never rush this — tendon injuries here are serious.",
      exercises: [
        {
          title: "Finger Planche — Step by Step Progression",
          sets: "4",
          reps: "3–5s holds",
          rest: "3 min",
          intensity: "Elite — Extreme Caution",
          cues: [
            "⚠️ MANDATORY: only attempt after 6+ months of consistent full planche training",
            "Step 1 — Fingertip push-ups: build tendon strength from scratch (4 fingers, then 3, then 2)",
            "Step 2 — Fingertip planche lean: shift weight onto fingertips in planche lean position",
            "Step 3 — Knuckle planche: planche on knuckles — bridges between flat hand and finger",
            "Step 4 — 4-finger planche: full planche on 4 fingers (index to pinky)",
            "Step 5 — 3-finger planche: remove the pinky — major difficulty increase",
            "Step 6 — 2-finger planche: index + middle only — world-class level",
            "Progression rule: spend minimum 8 weeks at each step before advancing",
            "Pain protocol: any finger joint pain = stop immediately. Do NOT push through",
            "Full technique breakdown with exact finger position and weight distribution cues",
          ],
          proTip: "The finger planche is a 1–3 year journey from a solid full planche. The limiting factor is always tendon strength, not muscle. Tendons adapt 3× slower than muscles — patience is not optional here.",
          progression: [
            { label: "Fingertip PU", emoji: "✋", active: true },
            { label: "4-Finger", emoji: "🖐️", active: false },
            { label: "3-Finger", emoji: "🤟", active: false },
            { label: "2-Finger", emoji: "✌️", active: false },
          ],
        },
        {
          title: "Finger Planche Push-Up & Press",
          sets: "3",
          reps: "1–3 reps",
          rest: "3 min",
          intensity: "Beyond Elite",
          cues: [
            "Only attempt after holding 5s+ finger planche consistently",
            "Push-up: same mechanics as full planche push-up — just on fingertips",
            "Range of motion is minimal — 3–5cm is a full rep at this level",
            "Press: lower slowly over 4 seconds — the negative builds the most tendon strength",
            "Even 1 clean finger planche push-up places you among the world's elite",
          ],
          proTip: "The finger planche push-up and press are among the rarest movements in calisthenics. Fewer than 100 people worldwide can perform them consistently. The journey toward them will build more strength than most athletes ever achieve.",
        },
      ],
    },
    {
      name: "⭐ BONUS — One Arm Handstand Progression",
      tag: "Optional / Ongoing",
      duration: "Ongoing",
      icon: "🌟",
      description: "Included as a bonus. At this level of planche training, your wrist and shoulder strength is elite. The OAH builds on this foundation — same protraction, same straight-arm control.",
      exercises: [
        {
          title: "Handstand Hold Mastery (prerequisite)",
          sets: "5",
          reps: "5×20–30s",
          rest: "90s",
          intensity: "Foundation",
          cues: [
            "You need a solid 30s+ freestanding handstand before starting OAH",
            "At this program level, your pressing strength already exceeds most handstand athletes",
            "Focus on balance and body alignment — not strength",
            "Practice pirouette exits for safety",
          ],
          proTip: "Your planche training has given you more than enough pressing and wrist strength for the OAH. What you need to develop now is balance — a completely different skill.",
        },
        {
          title: "One Arm Handstand — Full Progression",
          sets: "4",
          reps: "3–5 attempts each side",
          rest: "2 min",
          intensity: "Bonus Skill",
          cues: [
            "Step 1 — Straddle OAH: wide leg split reduces balance demand significantly",
            "Step 2 — Tuck OAH: one leg tucked, more centered mass",
            "Step 3 — OAH with finger assist: other hand touches floor with fingertips only",
            "Step 4 — OAH negative: kick into two-arm HS, slowly shift weight to one arm",
            "Step 5 — Free OAH: full balance on one arm, other arm tucked or extended",
            "Full technique breakdown with exact hand position and alignment cues",
          ],
          proTip: "With your planche foundation, the one arm handstand is achievable within 6–12 months of focused work. The strength is already there — it is now purely a balance and coordination skill.",
          progression: [
            { label: "Straddle OAH", emoji: "↔️", active: true },
            { label: "Tuck OAH", emoji: "🧘", active: false },
            { label: "Finger Assist", emoji: "👆", active: false },
            { label: "Free OAH", emoji: "👑", active: false },
          ],
        },
      ],
    },
  ],
  cooldown: sharedCooldown,
  benefits: [
    "Full planche mastered — technique breakdown at every stage",
    "Full planche push-ups & planche press progression",
    "Maltese & maltese press — elite progression",
    "Finger planche — full technique & progression",
    "Ring planche stability",
    "🌟 Bonus: One arm handstand progression",
  ],
  stripeUrl: "https://buy.stripe.com/dRm4gBeznamBgDN3933ZK0f",
};

const frontLeverMastery: Program = {
  id: "front-lever",
  title: "Front Lever Mastery",
  subtitle: "Full Front Lever + OAP Bonus — Zero Prerequisite",
  tagline: "From zero to full front lever — no prerequisites. Master every variation, pull-up & OAP progression.",
  level: "All Levels",
  levelColor: "#3b82f6",
  category: "skill",
  categoryGroup: "STRENGTH & SKILLS",
  price: "39",
  icon: "🎯",
  glowColor: "rgba(59,130,246,0.15)",
  goals: [
    "Achieve a clean 5-second full front lever hold",
    "Build elite-level lat and posterior chain strength",
    "Master the tuck → straddle → full progression",
    "Develop pulling strength applicable to muscle-ups and rows",
  ],
  mindset: "Zero prerequisites. This program is built for athletes who have never touched a pull-up bar, all the way to those who already have their tuck front lever. The front lever is the ultimate test of pulling strength and body tension — it is not a lat exercise, it is a full-body isometric. Every single muscle from feet to hands must be contracted simultaneously. Think of it as a horizontal plank in the air. The program gives you every variation, every progression step, and every technique cue to get there regardless of your starting level.",
  weekStructure: "3 sessions/week (Mon · Wed · Sat). Can be combined with pull day in any program. Front lever work always comes FIRST in the session when fresh.",
  warmup: [
    { name: "Band Pull-Aparts", duration: "3×20", notes: "Light band. Targets rear delts and external rotators. Critical for lever shoulder health." },
    { name: "Scapular Pull-Ups", duration: "3×10", notes: "Dead hang. Without bending arms, depress and retract scapulas. Pause 1s at top." },
    { name: "Hollow Body Hold", duration: "3×25s", notes: "This IS the front lever body position. Master it here first." },
    { name: "German Hang (gentle)", duration: "2×20s", notes: "Only if experienced. Opens the shoulder joint for lever positions." },
    { name: "Inverted Hang", duration: "3×15s", notes: "Pull up and hold horizontal. Feel the lat engagement." },
  ],
  phases: [
    {
      name: "Phase 1 — Tuck Front Lever",
      tag: "Weeks 1–4",
      duration: "4 weeks",
      icon: "🌱",
      description: "The foundation. If you cannot hold a tuck front lever for 10 seconds, nothing else matters yet.",
      exercises: [
        {
          title: "Tuck Front Lever Hold",
          sets: "6",
          reps: "6×8–10s",
          rest: "90s",
          intensity: "High",
          cues: [
            "Grip: overhand, shoulder-width. Hang completely relaxed first, then engage",
            "Step 1 — Pull knees tight to chest: the tighter the tuck, the easier the hold",
            "Step 2 — Depress scapulas: pull shoulder blades down and back simultaneously",
            "Step 3 — Engage core: hollow body position — lower back should not arch",
            "Step 4 — Raise hips to bar height: this is the key — hips at same level as bar",
            "Back flatness: the most common error is a rounded back. Must be perfectly flat",
            "Arms: any bend in the elbows means it is not a front lever — elbows must be fully locked",
            "Variation (easier): single leg tuck — one leg extended, one tucked",
            "Breathing: inhale before the hold, exhale slowly during — do not hold breath",
            "Readiness test: can you hold 10s clean? If yes, progress to advanced tuck",
          ],
          proTip: "Back flatness is the single most important cue. A rounded back is a compensated lever — it does not build the same strength. Film from the side every session. A flat back hold of 5s is worth more than a rounded hold of 15s.",
          progression: [
            { label: "Tuck", emoji: "🧘", active: true },
            { label: "Adv. Tuck", emoji: "📐", active: false },
            { label: "Straddle", emoji: "↔️", active: false },
            { label: "Full Lever", emoji: "🎯", active: false },
          ],
        },
        {
          title: "Front Lever Rows (Tuck)",
          sets: "4",
          reps: "6 reps",
          rest: "2 min",
          intensity: "Strength",
          cues: [
            "Start position: establish tuck front lever hang first — then initiate the row",
            "Pull path: bar moves toward lower chest — elbows drive straight back",
            "Maintain: tuck position throughout the entire pull — do not let hips drop",
            "Top position: chest touches bar — maximum lat contraction",
            "Negative: lower back to start over exactly 3 seconds — fight gravity every centimeter",
            "Variation A (easier): tuck rows from an incline — feet on floor, body at 45°",
            "Variation B (standard): full tuck front lever row as described",
            "Variation C (harder): advanced tuck rows — hips extended during the pull",
            "Common mistake: using momentum. Each rep must start from a dead stop in the hang",
            "Progression signal: 5 clean reps = ready to progress lever position",
          ],
          proTip: "Front lever rows are a stronger indicator of readiness than hold time. If you can do 5 clean tuck rows, your pulling strength is ready for the next lever position — regardless of what your hold time says.",
        },
      ],
    },
    {
      name: "Phase 2 — Advanced Tuck & Straddle",
      tag: "Weeks 5–8",
      duration: "4 weeks",
      icon: "⬆️",
      description: "Extending the hips changes the lever mechanics dramatically. Take the time you need here — most athletes spend 4–6 weeks.",
      exercises: [
        {
          title: "Advanced Tuck Front Lever",
          sets: "5",
          reps: "5×6–8s",
          rest: "2 min",
          intensity: "High",
          cues: [
            "Hips extended to 180° — thighs parallel to floor",
            "Knees still bent but body nearly horizontal",
            "Core engaged like a plank — not just the lats",
            "Posterior pelvic tilt to prevent hip drop",
          ],
          proTip: "Every 2 weeks, try straightening one leg while the other stays tucked (uneven lever). This bridges the gap to straddle effectively.",
          progression: [
            { label: "Tuck", emoji: "🧘", active: false },
            { label: "Adv. Tuck", emoji: "📐", active: true },
            { label: "1-Leg", emoji: "🦵", active: false },
            { label: "Straddle", emoji: "↔️", active: false },
          ],
        },
        {
          title: "Straddle Front Lever Hold",
          sets: "5",
          reps: "5×4–6s",
          rest: "2.5 min",
          intensity: "Maximum",
          cues: [
            "Wide leg split — wider is significantly easier",
            "Squeeze glutes and point toes",
            "Fight the pull of gravity with your entire posterior chain",
            "Eyes looking at ceiling — helps maintain horizontal position",
          ],
          proTip: "The straddle front lever is approximately 75% of the difficulty of the full lever. Own 8+ seconds here before attempting full.",
        },
      ],
    },
    {
      name: "Phase 3 — Full Front Lever",
      tag: "Weeks 9–12",
      duration: "4 weeks",
      icon: "🎯",
      description: "The summit. Most athletes will achieve their first 1–3 second full front lever in this phase. Approach it with respect.",
      exercises: [
        {
          title: "Full Front Lever Hold",
          sets: "5",
          reps: "5×1–3s (build to 5s)",
          rest: "3 min",
          intensity: "Maximum",
          cues: [
            "Entry: from straddle lever, slowly bring legs together — do not kick or swing",
            "Body alignment: perfectly horizontal — use a mirror or camera to verify",
            "Legs: fully extended, toes pointed, inner thighs squeezed together",
            "Core: hollow body — lower back flat, not arched. Think 'pelvis slightly tucked'",
            "Scapulas: depressed AND retracted simultaneously — never release this tension",
            "Lats: think 'pull the bar down into your hips' — this activates lats maximally",
            "Breathing: one breath in before the hold, then hold — do not breathe out mid-hold",
            "Tension cue: every single muscle from feet to hands must be contracted — steel rod",
            "Micro-progressions: even 0.5s improvement per session is elite-level progress",
            "Camera angle: film from the side — body must be perfectly horizontal, not angled",
          ],
          proTip: "Your first full front lever will likely be a surprise — one rep where everything clicks simultaneously. Keep your camera rolling during every attempt. Most athletes film 50+ sessions before that moment arrives. When it does, it is worth every rep.",
          progression: [
            { label: "Straddle", emoji: "↔️", active: false },
            { label: "1–2s", emoji: "⏱️", active: true },
            { label: "3–5s", emoji: "🎯", active: false },
            { label: "5s+", emoji: "👑", active: false },
          ],
        },
        {
          title: "Full Front Lever Rows",
          sets: "4",
          reps: "3–5 reps",
          rest: "3 min",
          intensity: "Elite",
          cues: [
            "The single hardest pulling movement in bodyweight training",
            "Maintain perfect body alignment through full range",
            "Even 1 rep is a milestone. Record it.",
          ],
          proTip: "Elite-level athletes do full front lever rows for 3–5 reps. If you can do this, you are in the top 0.1% of strength athletes worldwide.",
        },
      ],
    },
    {
      name: "Phase 4 — Pull-Ups, Raises & Bonus Skills",
      tag: "Weeks 13–16",
      duration: "4 weeks",
      icon: "🏆",
      description: "With your full front lever established, this phase adds the most powerful pulling variations and introduces the one arm pull-up progression — the ultimate upper body skill.",
      exercises: [
        {
          title: "Front Lever Pull-Ups — Technique Breakdown",
          sets: "5",
          reps: "4–6 reps",
          rest: "3 min",
          intensity: "Elite",
          cues: [
            "Enter full (or straddle) front lever hang",
            "Pull bar to chest while maintaining horizontal body position",
            "This is not a regular pull-up — the body stays parallel to floor",
            "Initiate with lat depression, then pull with elbows driving down",
            "Lower back to hang over 3 seconds — control is everything",
            "Even 1 clean rep means you are world-class level",
          ],
          proTip: "Front lever pull-ups are the most elite pulling movement in calisthenics. If you can do 3 clean reps, your pulling strength rivals professional gymnasts. Film every attempt.",
          progression: [
            { label: "Tuck FL Row", emoji: "🧘", active: false },
            { label: "Straddle FL PU", emoji: "↔️", active: true },
            { label: "Full FL PU", emoji: "🎯", active: false },
            { label: "Weighted", emoji: "👑", active: false },
          ],
        },
        {
          title: "Scapular Raises — Full Technique",
          sets: "4",
          reps: "12–15 reps",
          rest: "60s",
          intensity: "Accessory",
          cues: [
            "Dead hang from bar — start with full scapular elevation",
            "Without bending arms, depress scapulas (pull shoulder blades down)",
            "Hold 1 second at the bottom position — feel the lat engagement",
            "Return to full elevation slowly",
            "This movement directly strengthens the exact muscles used in front lever",
            "Add a 2-second hold at bottom as you progress",
          ],
          proTip: "Scapular raises are the most underrated exercise for front lever. 6 weeks of consistent scapular raises will add 3–5 seconds to your front lever hold. Never skip them.",
        },
        {
          title: "Australian Pull-Ups (Bodyweight Row) — Technique",
          sets: "4",
          reps: "10–12 reps",
          rest: "90s",
          intensity: "Strength",
          cues: [
            "Bar or rings at hip height — body straight as a plank",
            "Pull chest to bar — elbows drive back at 45° from body",
            "Elevation: feet higher = harder (closer to front lever angle)",
            "3-second negative on every rep — this is the money phase",
            "Squeeze shoulder blades together at the top",
          ],
          proTip: "Australian pull-ups at an elevated foot position simulate the front lever pulling angle better than any other exercise. Use these as accessory work on your off days.",
        },
        {
          title: "⭐ BONUS — One Arm Pull-Up Progression",
          sets: "5",
          reps: "3–5 reps each arm",
          rest: "3 min",
          intensity: "Bonus Skill",
          cues: [
            "Step 1 — Archer Pull-Ups: one arm pulls, one arm assists on wrist",
            "Step 2 — Towel Pull-Ups: pull with one arm, towel in other hand for minimal assist",
            "Step 3 — One Arm Negatives: jump to top, lower on one arm over 5 seconds",
            "Step 4 — Assisted One Arm PU: band or foot on bar for minimal support",
            "Step 5 — Full One Arm Pull-Up: dead hang, single explosive pull to chin over bar",
            "Full technique breakdown with video cues provided for each step",
          ],
          proTip: "The one arm pull-up requires a foundation of weighted pull-ups (bodyweight +40kg+) and front lever strength. If you have completed this program, you have the base. Expect 8–16 weeks to achieve your first clean rep.",
          progression: [
            { label: "Archer PU", emoji: "🏹", active: true },
            { label: "Towel PU", emoji: "🪢", active: false },
            { label: "Negatives", emoji: "⬇️", active: false },
            { label: "1-Arm PU", emoji: "👑", active: false },
          ],
        },
      ],
    },
  ],
  cooldown: leverCooldown,
  benefits: [
    "Master all front lever variations & progressions — full technique",
    "Front lever pull-ups — technique breakdown included",
    "Pull-up mastery — every grip, variation & loading method",
    "🌟 Bonus: One arm pull-up progression (full technique guide)",
    "Zero prerequisite — start from absolute zero",
  ],
  stripeUrl: "https://buy.stripe.com/8x2aEZ8aZamB5Z910V3ZK0g",
};

const hybridAthlete: Program = {
  id: "hybrid-athlete",
  title: "Hybrid Athlete",
  subtitle: "Gym-Based Strength + Calisthenics Skills",
  tagline: "Build serious muscle with barbells while mastering elite bodyweight skills.",
  level: "Intermediate",
  levelColor: "#a855f7",
  category: "hybrid",
  categoryGroup: "HYBRID",
  price: "57",
  icon: "💪",
  glowColor: "rgba(168,85,247,0.15)",
  dualTrack: false,
  goals: [
    "Fuse calisthenics skill work with barbell/dumbbell hypertrophy",
    "Build the 'athlete physique' — functional AND aesthetic",
    "Progress planche or front lever alongside strength gains",
    "4 structured training days with intelligent periodization",
  ],
  mindset: "The hybrid athlete doesn't choose between skill and strength — they pursue both. This requires more intelligent programming because the two systems can conflict. Skill work comes first, always. Fatigue is the enemy of skill acquisition. Treat your nervous system like the high-performance engine it is.",
  weekStructure: "4 sessions/week. Day 1 (Upper Skill + Push Strength) · Day 2 (Lower Power + Plyo) · Day 3 (Upper Pull + Lever Work) · Day 4 (Full Body Accessory + Hypertrophy Finish).",
  warmup: [
    { name: "Dynamic Wrist Protocol", duration: "3 min", notes: "Circles, push stretches, extension holds. Full protocol for barbell + skill combined load." },
    { name: "Shoulder Band Circuit", duration: "3×15 each", notes: "Pull-aparts, face pulls, Y-T-W. Primes the rotator cuff for heavy pressing." },
    { name: "Hollow Body + Arch Hold Alternating", duration: "4×20s each", notes: "Programs the core for both lever and barbell bracing patterns." },
    { name: "Planche/Lever 30% Activation", duration: "3×4s", notes: "Just activate the pattern. Not a working set — neural priming only." },
    { name: "Hip Flexor + Hamstring Flow", duration: "4 min", notes: "Lunge matrix into RDL stretch. Prepares for deadlift/squat carryover." },
  ],
  phases: [
    {
      name: "Block 1 — Skill Priority",
      tag: "Weeks 1–4",
      duration: "4 weeks",
      icon: "🎯",
      description: "Skills first, strength second. Your CNS is freshest at the start. Never reverse this order.",
      exercises: [
        {
          title: "Planche / Front Lever Skill Work",
          sets: "6",
          reps: "6×5s (max quality)",
          rest: "2.5 min",
          intensity: "Maximum Skill",
          cues: [
            "Rule #1: choose ONE skill per session — planche OR lever, never both",
            "Rule #2: this always comes FIRST in the session — before any weighted work",
            "Rule #3: if rep quality drops below 7/10, stop the set immediately",
            "Planche track: follow your current phase (lean → tuck → adv. tuck → straddle)",
            "Lever track: follow your current phase (tuck → adv. tuck → straddle → full)",
            "Log format: date | position | hold time | quality /10 | next session goal",
            "Rest quality: walk around between sets — do not sit down. Active recovery only",
            "Progression rule: 3 sessions at 7s+ quality = advance to next position",
            "Deload indicator: if quality drops 2 sessions in a row, take an extra rest day",
          ],
          proTip: "Film every skill session from the side. Compare Week 1 to Week 4 side by side. The visual feedback is worth more than any coaching cue — you will see things you cannot feel.",
        },
        {
          title: "Weighted Pull-Ups",
          sets: "5",
          reps: "5 reps @ 70–80% 1RM",
          rest: "2.5 min",
          intensity: "Strength",
          cues: [
            "Weight setup: belt is most stable, vest second, dumbbell between legs is least stable",
            "Starting position: full dead hang — scapulas elevated, arms fully extended",
            "Initiation: depress scapulas FIRST before bending elbows — this is the front lever pattern",
            "Pull path: lead with the chest, not the chin — elbows drive straight down",
            "Top position: chin clearly over bar — do not tilt head to cheat",
            "Descent: exactly 3 seconds, controlled — fight gravity the entire way down",
            "Bottom: return to full dead hang — do not bounce or use stretch reflex",
            "Variation A: neutral grip — easier on elbows, slightly different lat angle",
            "Variation B: wide overhand grip — more lat emphasis, closer to lever position",
            "Variation C: rings — hardest, builds stabilization strength that transfers to lever",
            "Progression: add 2.5kg every time you complete all 5 sets of 5 cleanly",
          ],
          proTip: "Weighted pull-up strength is the single best predictor of front lever progress outside of direct lever work. A +20% increase in your weighted pull-up max will produce a measurable improvement in your front lever hold time.",
        },
        {
          title: "Overhead Press (Barbell or DB)",
          sets: "4",
          reps: "6 reps @ 75% 1RM",
          rest: "2 min",
          intensity: "Strength",
          cues: [
            "Bar starts at collar bone, press in straight vertical line",
            "Brace core like a planche lean — same tension",
            "Lock out at top with shoulder blades squeezed",
            "Controlled descent — 2 seconds down",
          ],
          proTip: "The overhead press builds the anterior deltoid strength required for planche lean. These exercises are not separate — they reinforce each other.",
        },
      ],
    },
    {
      name: "Block 2 — Hybrid Power",
      tag: "Weeks 5–8",
      duration: "4 weeks",
      icon: "⚡",
      description: "Increase intensity across both skill and strength work simultaneously. This is where the hybrid athlete starts to emerge.",
      exercises: [
        {
          title: "Muscle-Up to Dip Combination",
          sets: "5",
          reps: "3–5 reps (quality)",
          rest: "3 min",
          intensity: "Power",
          cues: [
            "Explosive pull → transition → controlled dip",
            "This is a power-skill movement — rest fully",
            "On rings: more skill transfer, harder stabilization",
            "On bar: more power output, easier stabilization",
          ],
          proTip: "Muscle-ups on rings are arguably the most impressive bodyweight movement for an observer. If you don't have them yet, this program will get you there.",
        },
        {
          title: "Deadlift (Romanian variation)",
          sets: "4",
          reps: "5 reps @ 80% 1RM",
          rest: "2.5 min",
          intensity: "Heavy",
          cues: [
            "Hip hinge — push hips back first",
            "Bar stays in contact with legs throughout",
            "Neutral spine maintained — any rounding = stop",
            "Squeeze glutes at lockout — don't hyperextend",
          ],
          proTip: "The RDL builds posterior chain strength that directly translates to front lever holding power. This is not optional — it is synergistic.",
        },
      ],
    },
  ],
  gymPhases: [
    {
      name: "Gym Track — Block 1 (Strength Foundation)",
      tag: "Weeks 1–4",
      duration: "4 weeks",
      icon: "🏋️",
      description: "Full equipment available. Prioritize compound movements loaded progressively. Skills still come first.",
      exercises: [
        {
          title: "Barbell Bench Press",
          sets: "5",
          reps: "5 reps @ 75% 1RM",
          rest: "3 min",
          intensity: "Heavy",
          cues: [
            "Arch + retract scapulas — create a stable platform",
            "Bar touches sternum — not high chest",
            "Drive feet into floor throughout",
            "2-second pause at bottom optional for max chest activation",
          ],
          proTip: "The bench press and planche lean work the same anterior deltoid angle. Your planche lean will improve as your bench press increases.",
        },
        {
          title: "Weighted Ring Dips",
          sets: "4",
          reps: "6 reps",
          rest: "2.5 min",
          intensity: "Strength",
          cues: [
            "Rings turned out 30° at bottom",
            "Full range — chest between hands at bottom",
            "Control the rings — do not let them splay",
            "Lean forward slightly to engage chest more",
          ],
          proTip: "Ring dips are 3× harder than bar dips due to stabilization demand. The shoulder stability you build here directly transfers to all skills.",
        },
        {
          title: "Weighted Push-Ups",
          sets: "4",
          reps: "8–10 reps",
          rest: "90s",
          intensity: "Strength-Hypertrophy",
          cues: [
            "Add weight via plate on back, weighted vest, or partner resistance",
            "Hands shoulder-width, slight finger rotation outward (30°) — planche-specific angle",
            "Lower chest to floor over 2 seconds — full range mandatory",
            "Press up explosively — lock out at top with scapular protraction",
            "Progression: start with 10kg, add 2.5kg every session you complete all reps cleanly",
            "Advanced variation: weighted pseudo planche push-ups — hands rotated, forward lean",
          ],
          proTip: "Weighted push-ups with slight hand rotation directly transfer to planche lean strength. They build the specific anterior deltoid and serratus anterior pattern that no barbell exercise replicates.",
        },
        {
          title: "Weighted Pull-Ups",
          sets: "5",
          reps: "5 reps @ 70–80% 1RM",
          rest: "2.5 min",
          intensity: "Strength",
          cues: [
            "Add weight via belt (most stable), vest, or dumbbell between legs",
            "Start from dead hang — scapulas fully elevated, arms locked",
            "Initiate by depressing scapulas before bending elbows — this is the lever pattern",
            "Pull chest to bar — lead with chest, not chin",
            "3-second descent — fight gravity the entire way",
            "Variation: wide grip for lat width, neutral grip for lat thickness, rings for stabilization",
            "Progression: add 2.5kg every session you hit all 5 sets of 5 cleanly",
          ],
          proTip: "Weighted pull-up strength is the single best predictor of front lever progress. Every +10% on your weighted pull-up max produces a measurable improvement in lever hold time.",
        },
        {
          title: "Weighted Bar Dips",
          sets: "4",
          reps: "6–8 reps",
          rest: "2 min",
          intensity: "Strength",
          cues: [
            "Use parallel bars — add weight via belt or vest",
            "Lower until upper arms are parallel to floor — full range builds more chest",
            "Lean slightly forward (15°) to shift emphasis toward chest vs triceps",
            "Press up to full lockout — squeeze chest at top",
            "Variation: upright torso = more tricep. Forward lean = more chest/anterior delt",
            "Ring dips alternative: rings dips are significantly harder — use lighter weight",
          ],
          proTip: "Weighted dips are the most direct strength carryover to planche push-ups and maltese work. The forward lean at the bottom of a weighted dip mimics the planche push-up bottom position exactly.",
        },
        {
          title: "Cable Face Pull",
          sets: "4",
          reps: "15 reps",
          rest: "60s",
          intensity: "Accessory",
          cues: [
            "High pulley attachment at face height",
            "Pull to ear level — not face level",
            "External rotate at the top: thumbs point behind you",
            "This is shoulder armor — never skip it",
          ],
          proTip: "Every pushing-dominant calisthenics program needs pulling accessory work. Face pulls prevent the internal rotation imbalance that leads to shoulder impingement.",
        },
      ],
    },
    {
      name: "Gym Track — Block 2 (Hypertrophy Finish)",
      tag: "Weeks 5–8",
      duration: "4 weeks",
      icon: "💥",
      description: "Higher volume, shorter rest. The strength base from Block 1 now gets converted into visible muscle.",
      exercises: [
        {
          title: "Incline DB Press",
          sets: "4",
          reps: "10–12 reps",
          rest: "90s",
          intensity: "Hypertrophy",
          cues: [
            "30° incline — not 45° (reduces shoulder stress)",
            "Squeeze chest at top — elbows slightly in",
            "Full stretch at bottom with 2-second pause",
            "This hits the upper chest region critical for aesthetics",
          ],
          proTip: "Upper chest development is what creates the 'shelf' look. Combined with planche work, this builds the complete chest aesthetic.",
        },
        {
          title: "Lat Pulldown (V-Bar)",
          sets: "4",
          reps: "10–12 reps",
          rest: "90s",
          intensity: "Hypertrophy",
          cues: [
            "Pull to chest — elbows to sides, not behind",
            "Slight lean back (15°) to align with lat fiber direction",
            "Full extension at top — feel the lat stretch",
            "This is direct lever carryover in a controlled setting",
          ],
          proTip: "The V-bar creates a pulling angle very similar to front lever mechanics. Use this as supplementary lever work when your skill work volume is lower.",
        },
      ],
    },
    {
      name: "Phase — HSPU & 90° Push-Up Progression",
      tag: "Weeks 9–12",
      duration: "4 weeks",
      icon: "🔥",
      description: "Handstand push-ups and 90° push-ups are the pinnacle of overhead and horizontal pressing strength. This phase builds both skills systematically.",
      exercises: [
        {
          title: "Handstand Push-Up — Full Technique",
          sets: "4",
          reps: "4–6 reps",
          rest: "2 min",
          intensity: "Strength",
          cues: [
            "Wall HSPU: kick into handstand against wall, lower head to floor over 3 seconds",
            "Head position: slightly in front of hands — creates stable tripod base",
            "Lower until head touches floor — full range is mandatory for max shoulder development",
            "Press back up explosively — full lockout at top",
            "Freestanding HSPU: same mechanics but requires balance — train wall version first",
          ],
          proTip: "Wall HSPU builds more overhead pressing strength than any barbell exercise at the same relative intensity. 3 sets of 5 reps per week will transform your shoulder development.",
          progression: [
            { label: "Pike PU", emoji: "▽", active: false },
            { label: "Wall HSPU", emoji: "🤸", active: true },
            { label: "Free HSPU", emoji: "⚡", active: false },
            { label: "90° PU", emoji: "👑", active: false },
          ],
        },
        {
          title: "90° Push-Up — Full Technique & Progression",
          sets: "3",
          reps: "2–4 reps",
          rest: "3 min",
          intensity: "Elite",
          cues: [
            "The 90° push-up requires handstand pressing strength + planche-level lean simultaneously",
            "Step 1 — Pike push-ups: build shoulder strength at various angles",
            "Step 2 — Elevated pike push-ups: feet on chair, steeper angle",
            "Step 3 — Wall HSPU mastery: build full overhead pressing strength first",
            "Step 4 — 90° position hold: lean forward until shoulders are at 90° over hands",
            "Step 5 — 90° push-up: from the hold, lower and press — this is the full movement",
            "Full technique breakdown with exact body position and hand placement included",
          ],
          proTip: "The 90° push-up is where handstand strength meets planche lean. Even holding the 90° position for 3 seconds is elite-level output. Build the hold before attempting the push-up.",
          progression: [
            { label: "HSPU", emoji: "🤸", active: false },
            { label: "90° Hold", emoji: "📐", active: true },
            { label: "90° PU", emoji: "👑", active: false },
          ],
        },
      ],
    },
    {
      name: "Phase — One Arm Pull-Up Progression",
      tag: "Weeks 9–12 (parallel track)",
      duration: "4 weeks",
      icon: "🏹",
      description: "The one arm pull-up is one of the most elite upper body pulling movements. This phase runs in parallel with pressing work — train it on pull days.",
      exercises: [
        {
          title: "One Arm Pull-Up — Full Technique Progression",
          sets: "5",
          reps: "3–5 reps each arm",
          rest: "3 min",
          intensity: "Elite",
          cues: [
            "Prerequisite: comfortable with 8+ strict pull-ups minimum",
            "Step 1 — Archer pull-ups: one arm pulls, other arm straight on bar for balance",
            "Step 2 — Towel pull-ups: pull with one arm, other hand grips towel for minimal assist",
            "Step 3 — One arm negatives: jump to top position, lower on one arm over 5 seconds",
            "Step 4 — Assisted OA pull-up: band or foot on bar for minimal support",
            "Step 5 — Full one arm pull-up: dead hang, single explosive pull to chin over bar",
            "Full technique breakdown with grip position, elbow path, and lat engagement cues",
          ],
          proTip: "The one arm pull-up is 50% strength, 50% neuromuscular coordination. The negatives (step 3) are the most important step — 4 weeks of consistent negatives will build more OAP-specific strength than anything else.",
          progression: [
            { label: "Archer PU", emoji: "🏹", active: true },
            { label: "Towel PU", emoji: "🪢", active: false },
            { label: "Negatives", emoji: "⬇️", active: false },
            { label: "1-Arm PU", emoji: "👑", active: false },
          ],
        },
      ],
    },
        {
      name: "⭐ BONUS — One Arm Handstand Progression",
      tag: "Optional / Ongoing",
      duration: "Ongoing",
      icon: "🌟",
      description: "The one arm handstand is the pinnacle of balance and pressing strength. This bonus block gives you the full progression system to work toward it alongside your main program.",
      exercises: [
        {
          title: "Handstand Hold Mastery (prerequisite)",
          sets: "5",
          reps: "5×15–20s",
          rest: "90s",
          intensity: "Foundation",
          cues: [
            "You need a solid 30s+ freestanding handstand before starting OAH",
            "Work on this during your off days — not in place of skill work",
            "Focus on straight body alignment: ears between arms, hollow body",
            "Practice pirouette exits for safety",
          ],
          proTip: "The one arm handstand requires an extremely stable two-arm handstand. If you wobble in a two-arm HS, you are not ready. This is not a shortcut — it is a prerequisite.",
        },
        {
          title: "One Arm Handstand — Step by Step Progression",
          sets: "4",
          reps: "3–5 attempts each side",
          rest: "2 min",
          intensity: "Bonus Skill",
          cues: [
            "Step 1 — Straddle OAH: wide leg split reduces balance demand significantly",
            "Step 2 — Tuck OAH: one leg tucked, more centered mass",
            "Step 3 — OAH with finger assist: other hand touches floor lightly with fingertips",
            "Step 4 — OAH negative: kick into two-arm HS, slowly shift weight to one arm",
            "Step 5 — Free OAH: full balance on one arm, other arm tucked or extended",
            "Full technique breakdown with exact hand position, finger spread, and body alignment cues",
          ],
          proTip: "The one arm handstand is a 6–18 month journey depending on your starting level. Do not rush steps. The straddle OAH alone will take most athletes 2–3 months to stabilize.",
          progression: [
            { label: "Straddle OAH", emoji: "↔️", active: true },
            { label: "Tuck OAH", emoji: "🧘", active: false },
            { label: "Finger Assist", emoji: "👆", active: false },
            { label: "Free OAH", emoji: "👑", active: false },
          ],
        },
      ],
    },
  ],
  cooldown: [
    { name: "Hip Flexor Couch Stretch", duration: "2 min each", notes: "Essential after lower body gym work. Back foot on wall, front foot forward. Hold and breathe." },
    { name: "Thoracic Extension over Foam Roller", duration: "3 min", notes: "Roll from mid to upper back. Pause at each segment. Decompresses spine after heavy loading." },
    { name: "Shoulder Sleeper Stretch", duration: "90s each", notes: "Lying on side. Gently press forearm toward floor. Targets posterior capsule tightness." },
    ...sharedCooldown.slice(4),
  ],
  benefits: [
    "Gym-based strength + calisthenics skill fusion — no skill prerequisite",
    "HSPU (Handstand Push-Up) & 90° push-up — full technique",
    "One arm pull-up progression",
    "Progressive overload with barbells & skills",
    "🌟 Bonus: One arm handstand progression",
  ],
  stripeUrl: "https://buy.stripe.com/7sY7sNgHvamB3R1dNH3ZK0e",
};

const fullHypertrophy: Program = {
  id: "hypertrophy",
  title: "Full Hypertrophy",
  subtitle: "No Equipment — Bodyweight Muscle Building",
  tagline: "Build a complete aesthetic physique with zero equipment. No gym needed.",
  level: "Beginner / Intermediate",
  levelColor: "#ec4899",
  category: "hypertrophy",
  categoryGroup: "HYPERTROPHY",
  price: "57",
  icon: "🔥",
  glowColor: "rgba(236,72,153,0.15)",
  badge: "BEST-SELLER ⭐",
  dualTrack: false,
  goals: [
    "Maximize muscle size through evidence-based hypertrophy principles",
    "Build an aesthetic physique with balanced proportions",
    "Progressive overload — fully structured program",
    "Full access to both bodyweight and barbell/cable hypertrophy methods",
  ],
  mindset: "Hypertrophy is science. Mechanical tension × metabolic stress × muscle damage — that is the formula. This program removes the guesswork and replaces it with precision. Every set, every rep range, every rest period is chosen for a specific physiological reason. Your only job is to execute consistently and eat to grow.",
  weekStructure: "4 sessions/week. Push (Mon) · Pull (Tue) · Legs (Thu) · Upper Full (Sat). Each session 60–80 min. Progressive overload: add 1 rep or 2.5kg every session where possible.",
  warmup: [
    { name: "Full Body Joint Mobility Flow", duration: "5 min", notes: "Neck, shoulders, hips, knees, ankles. Every joint through full pain-free range." },
    { name: "Activation Circuit", duration: "2 rounds", notes: "10 band pull-aparts + 10 glute bridges + 10 bodyweight squats. Primes all major groups." },
    { name: "First Working Set at 50% Weight", duration: "1 set", notes: "Always do a warm-up set before your first working set. Non-negotiable." },
  ],
  phases: [
    {
      name: "Phase 1 — Foundation Volume",
      tag: "Weeks 1–4",
      duration: "4 weeks",
      icon: "📦",
      description: "Establish movement patterns and baseline volume. Do not test your maximum — build work capacity.",
      exercises: [
        {
          title: "Pike Push-Ups (No-Equipment)",
          sets: "4",
          reps: "10–12 reps",
          rest: "90s",
          intensity: "Moderate",
          cues: [
            "Start position: inverted V — hips as high as possible, heels on floor",
            "Head position: head between arms, looking toward feet — not at the floor in front",
            "Descent: lower head toward floor over 3 seconds — head nearly touches between hands",
            "Bottom pause: 1 second with head at floor level — eliminates elastic energy",
            "Press: push back up explosively to full lockout",
            "Angle adjustment: the more vertical your torso, the more deltoid. The more horizontal, the more chest/tricep",
            "Variation A (easier): standard pike, wide feet for stability",
            "Variation B (moderate): feet elevated on chair — steeper angle, more deltoid",
            "Variation C (hard): feet on table, nearly vertical — approaches HSPU mechanics",
            "Variation D (hardest): pseudo-handstand pike — lean forward, maximum deltoid",
            "Week 4 goal: 4 sets of 12 with feet elevated — then move to Variation C",
          ],
          proTip: "Pike push-ups with a 3-second negative and 1-second bottom pause build as much deltoid mass as a barbell overhead press at the same rep range. The pause is the key — most people skip it and lose 40% of the stimulus.",
          progression: [
            { label: "Standard Pike", emoji: "▽", active: true },
            { label: "Feet Elevated", emoji: "⬆️", active: false },
            { label: "Pseudo-HS", emoji: "🤸", active: false },
            { label: "Wall HSPU", emoji: "👑", active: false },
          ],
        },
        {
          title: "Archer Push-Ups",
          sets: "4",
          reps: "8 reps each side",
          rest: "90s",
          intensity: "Moderate-High",
          cues: [
            "Setup: wide hand position — working arm at shoulder width, other arm extended fully to side",
            "Extended arm: stays fully locked — provides balance, not pushing assistance",
            "Descent: lower toward the working (bent) arm — deep stretch at the bottom",
            "Bottom position: chest at floor level on the working side — full range mandatory",
            "Press: push back to center through the working arm only",
            "Key cue: keep hips square throughout — do not rotate toward the working arm",
            "Variation A (easier): extended hand on fist — slightly bent extended arm is OK",
            "Variation B (standard): extended arm fully locked, flat on floor",
            "Variation C (harder): extended arm elevated on a book — increases range on working side",
            "Variation D (hardest): feet elevated archer push-ups — adds bodyweight",
            "Progression toward OAP: as extended arm bends less and less, you approach one-arm push-up",
          ],
          proTip: "Archer push-ups provide the same deep pectoral stretch as a cable fly with the pressing strength demand of a weighted push-up. The unilateral loading is ~40% harder than regular push-ups. Master these before attempting one-arm push-ups.",
        },
        {
          title: "Australian Pull-Ups (Bodyweight Row)",
          sets: "4",
          reps: "12–15 reps",
          rest: "90s",
          intensity: "Moderate",
          cues: [
            "Table, barbell in rack, or rings at hip height",
            "Body straight as a plank throughout",
            "Pull chest to bar — elbows at 45° from body",
            "Slow negative builds the most mass here",
          ],
          proTip: "Elevate feet to make harder. Add a backpack with books to make harder. The progression path is almost unlimited with this movement.",
        },
      ],
    },
    {
      name: "Phase 2 — Intensity Ramp",
      tag: "Weeks 5–8",
      duration: "4 weeks",
      icon: "📈",
      description: "Increase load, add intensification techniques (rest-pause, drop sets). This is where visible changes happen.",
      exercises: [
        {
          title: "One-Arm Push-Up Progression",
          sets: "5",
          reps: "5–8 each side",
          rest: "2 min",
          intensity: "High",
          cues: [
            "Feet wide for balance, hand centered under chest",
            "Descend slowly — do not let hip rotate",
            "Use a low surface (sofa height) to make accessible",
            "Full lockout at top, full depth at bottom",
          ],
          proTip: "The one-arm push-up is a strength test, not just a chest exercise. The core anti-rotation demand makes this a full-body movement.",
        },
      ],
    },
    {
      name: "Phase 3 — Peak & Deload",
      tag: "Weeks 9–12",
      duration: "4 weeks",
      icon: "🏆",
      description: "Peak volume week (Week 9–10), then structured deload (Week 11), then test week (Week 12).",
      exercises: [
        {
          title: "Pseudo Planche Push-Ups (Max Reps)",
          sets: "3",
          reps: "Max clean reps",
          rest: "3 min",
          intensity: "Max Effort",
          cues: [
            "This test measures your upper body strength/endurance total",
            "Hands turned out, lean forward as far as your strength allows",
            "Record this number to compare to Week 1",
          ],
          proTip: "Compare your Week 1 max to Week 12. A 50–100% improvement in reps is normal with this program. This is your proof of progress.",
        },
      ],
    },
    {
      name: "⭐ BONUS — 90° Push-Up Progression",
      tag: "Optional / Ongoing",
      duration: "Ongoing",
      icon: "🔥",
      description: "The 90° push-up is one of the most impressive bodyweight pushing skills — combining handstand pressing strength with planche-level lean. Full technique breakdown included.",
      exercises: [
        {
          title: "90° Push-Up — Full Technique & Progression",
          sets: "4",
          reps: "3–5 reps",
          rest: "2.5 min",
          intensity: "Bonus Skill",
          cues: [
            "Step 1 — Pike push-ups: build shoulder strength at various angles",
            "Step 2 — Elevated pike push-ups: feet on chair, steeper angle",
            "Step 3 — Wall handstand push-ups: full overhead pressing strength",
            "Step 4 — Freestanding HSPU negatives: lower slowly from HS over 5 seconds",
            "Step 5 — 90° position hold: lean forward to bring shoulders over hands at 90°",
            "Step 6 — 90° push-up: from the hold, press — this is the full movement",
            "Full technique breakdown with exact body position and hand placement cues",
          ],
          proTip: "The 90° push-up requires both handstand pressing strength AND planche-level lean. It is the intersection of two elite skills. Approach it only after mastering both independently.",
          progression: [
            { label: "Pike PU", emoji: "▽", active: true },
            { label: "HSPU", emoji: "🤸", active: false },
            { label: "90° Hold", emoji: "📐", active: false },
            { label: "90° PU", emoji: "👑", active: false },
          ],
        },
      ],
    },
    {
      name: "⭐ BONUS — One Arm Push-Up Progression",
      tag: "Optional / Ongoing",
      duration: "Ongoing",
      icon: "💪",
      description: "The one arm push-up is a classic strength milestone that perfectly complements your hypertrophy training. Full step-by-step technique guide included.",
      exercises: [
        {
          title: "One Arm Push-Up — Step by Step Technique",
          sets: "4",
          reps: "4–6 reps each side",
          rest: "2 min",
          intensity: "Bonus Skill",
          cues: [
            "Step 1 — Elevated OA push-up: hand on bench or sofa, feet wide for balance",
            "Step 2 — Standard OA push-up with wide feet: floor level, feet shoulder-width apart",
            "Step 3 — Archer push-ups: one arm extended, other arm does the push-up",
            "Step 4 — OA push-up negatives: lower on one arm over 4 seconds, push back with two",
            "Step 5 — Full OA push-up: one hand centered under chest, feet close together",
            "Key cue: anti-rotation — your hips must stay square throughout the movement",
            "Full technique breakdown with hand position, foot placement, and core tension cues",
          ],
          proTip: "The one arm push-up is 60% technique and 40% strength. Most people fail because of hip rotation, not lack of pressing power. Film from behind to check hip alignment on every rep.",
          progression: [
            { label: "Elevated", emoji: "🪑", active: true },
            { label: "Wide Feet", emoji: "↔️", active: false },
            { label: "Negative", emoji: "⬇️", active: false },
            { label: "Full OA PU", emoji: "👑", active: false },
          ],
        },
      ],
    },
    {
      name: "⭐ BONUS — One Arm Pull-Up Progression",
      tag: "Optional / Ongoing",
      duration: "Ongoing",
      icon: "🏹",
      description: "The one arm pull-up is one of the most elite upper body pulling movements. Full 5-step technique progression included to take you from zero to your first clean rep.",
      exercises: [
        {
          title: "One Arm Pull-Up — Full Technique Progression",
          sets: "5",
          reps: "3–5 reps each arm",
          rest: "3 min",
          intensity: "Bonus Skill",
          cues: [
            "Prerequisite: comfortable with pull-ups at +20kg bodyweight minimum",
            "Step 1 — Archer pull-ups: one arm pulls, other arm straight on bar for balance",
            "Step 2 — Towel pull-ups: pull with one arm, other hand grips towel for minimal assist",
            "Step 3 — One arm negatives: jump to top position, lower on one arm over 5 seconds",
            "Step 4 — Assisted OA pull-up: band around wrist or foot on bar for minimal support",
            "Step 5 — Full one arm pull-up: dead hang, single explosive pull to chin over bar",
            "Full technique breakdown with grip position, elbow path, and shoulder engagement cues",
          ],
          proTip: "The one arm pull-up requires a combination of absolute strength and neuromuscular coordination. Expect 6–12 months of focused training from a strong base. Every negative rep counts.",
          progression: [
            { label: "Archer PU", emoji: "🏹", active: true },
            { label: "Towel PU", emoji: "🪢", active: false },
            { label: "Negatives", emoji: "⬇️", active: false },
            { label: "1-Arm PU", emoji: "👑", active: false },
          ],
        },
      ],
    },
    {
      name: "Phase — HSPU & 90° Push-Up Progression",
      tag: "Weeks 9–12",
      duration: "4 weeks",
      icon: "🔥",
      description: "Handstand push-ups and 90° push-ups are the pinnacle of overhead and horizontal pressing strength. This phase builds both skills systematically.",
      exercises: [
        {
          title: "Handstand Push-Up — Full Technique",
          sets: "4",
          reps: "4–6 reps",
          rest: "2 min",
          intensity: "Strength",
          cues: [
            "Wall HSPU: kick into handstand against wall, lower head to floor over 3 seconds",
            "Head position: slightly in front of hands — creates stable tripod base",
            "Lower until head touches floor — full range is mandatory for max shoulder development",
            "Press back up explosively — full lockout at top",
            "Freestanding HSPU: same mechanics but requires balance — train wall version first",
          ],
          proTip: "Wall HSPU builds more overhead pressing strength than any barbell exercise at the same relative intensity. 3 sets of 5 reps per week will transform your shoulder development.",
          progression: [
            { label: "Pike PU", emoji: "▽", active: false },
            { label: "Wall HSPU", emoji: "🤸", active: true },
            { label: "Free HSPU", emoji: "⚡", active: false },
            { label: "90° PU", emoji: "👑", active: false },
          ],
        },
        {
          title: "90° Push-Up — Full Technique & Progression",
          sets: "3",
          reps: "2–4 reps",
          rest: "3 min",
          intensity: "Elite",
          cues: [
            "The 90° push-up requires handstand pressing strength + planche-level lean simultaneously",
            "Step 1 — Pike push-ups: build shoulder strength at various angles",
            "Step 2 — Elevated pike push-ups: feet on chair, steeper angle",
            "Step 3 — Wall HSPU mastery: build full overhead pressing strength first",
            "Step 4 — 90° position hold: lean forward until shoulders are at 90° over hands",
            "Step 5 — 90° push-up: from the hold, lower and press — this is the full movement",
            "Full technique breakdown with exact body position and hand placement included",
          ],
          proTip: "The 90° push-up is where handstand strength meets planche lean. Even holding the 90° position for 3 seconds is elite-level output. Build the hold before attempting the push-up.",
          progression: [
            { label: "HSPU", emoji: "🤸", active: false },
            { label: "90° Hold", emoji: "📐", active: true },
            { label: "90° PU", emoji: "👑", active: false },
          ],
        },
      ],
    },
    {
      name: "Phase — One Arm Pull-Up Progression",
      tag: "Weeks 9–12 (parallel track)",
      duration: "4 weeks",
      icon: "🏹",
      description: "The one arm pull-up is one of the most elite upper body pulling movements. This phase runs in parallel with pressing work — train it on pull days.",
      exercises: [
        {
          title: "One Arm Pull-Up — Full Technique Progression",
          sets: "5",
          reps: "3–5 reps each arm",
          rest: "3 min",
          intensity: "Elite",
          cues: [
            "Prerequisite: comfortable with 8+ strict pull-ups minimum",
            "Step 1 — Archer pull-ups: one arm pulls, other arm straight on bar for balance",
            "Step 2 — Towel pull-ups: pull with one arm, other hand grips towel for minimal assist",
            "Step 3 — One arm negatives: jump to top position, lower on one arm over 5 seconds",
            "Step 4 — Assisted OA pull-up: band or foot on bar for minimal support",
            "Step 5 — Full one arm pull-up: dead hang, single explosive pull to chin over bar",
            "Full technique breakdown with grip position, elbow path, and lat engagement cues",
          ],
          proTip: "The one arm pull-up is 50% strength, 50% neuromuscular coordination. The negatives (step 3) are the most important step — 4 weeks of consistent negatives will build more OAP-specific strength than anything else.",
          progression: [
            { label: "Archer PU", emoji: "🏹", active: true },
            { label: "Towel PU", emoji: "🪢", active: false },
            { label: "Negatives", emoji: "⬇️", active: false },
            { label: "1-Arm PU", emoji: "👑", active: false },
          ],
        },
      ],
    },
        {
      name: "⭐ BONUS — One Arm Handstand Progression",
      tag: "Optional / Ongoing",
      duration: "Ongoing",
      icon: "🌟",
      description: "Included as a bonus with this program. The OAH is a skill that complements your physique work — it builds pressing strength, balance, and creates the kind of body control that transforms your entire training.",
      exercises: [
        {
          title: "Handstand Hold Mastery (prerequisite)",
          sets: "5",
          reps: "5×15–20s",
          rest: "90s",
          intensity: "Foundation",
          cues: [
            "You need a solid 30s+ freestanding handstand before starting OAH",
            "Work on this during your off days — not in place of hypertrophy sessions",
            "Focus on straight body alignment: ears between arms, hollow body",
            "Practice pirouette exits for safety",
          ],
          proTip: "The one arm handstand requires an extremely stable two-arm handstand. If you wobble in a two-arm HS, you are not ready. This is not a shortcut — it is a prerequisite.",
        },
        {
          title: "One Arm Handstand — Full Technique Progression",
          sets: "4",
          reps: "3–5 attempts each side",
          rest: "2 min",
          intensity: "Bonus Skill",
          cues: [
            "Step 1 — Straddle OAH: wide leg split reduces balance demand significantly",
            "Step 2 — Tuck OAH: one leg tucked, more centered mass",
            "Step 3 — OAH with finger assist: other hand touches floor with fingertips only",
            "Step 4 — OAH negative: kick into two-arm HS, slowly shift weight to one arm",
            "Step 5 — Free OAH: full balance on one arm, other arm tucked or extended",
            "Full technique breakdown with exact hand position, finger spread, and body alignment",
          ],
          proTip: "The OAH is a 6–18 month journey. The straddle OAH alone takes most athletes 2–3 months to stabilize. Do not rush steps — each one has a purpose.",
          progression: [
            { label: "Straddle OAH", emoji: "↔️", active: true },
            { label: "Tuck OAH", emoji: "🧘", active: false },
            { label: "Finger Assist", emoji: "👆", active: false },
            { label: "Free OAH", emoji: "👑", active: false },
          ],
        },
      ],
    },
  ],
  gymPhases: [
    {
      name: "Gym Track — Push Day",
      tag: "Day 1 (Monday)",
      duration: "60–75 min",
      icon: "💥",
      description: "Chest, anterior delts, triceps. Compound movement first, isolation last.",
      exercises: [
        {
          title: "Flat Barbell Bench Press",
          sets: "4",
          reps: "8 reps @ 75% 1RM",
          rest: "2 min",
          intensity: "Strength-Hypertrophy",
          cues: [
            "Arch and retract — create maximum stability",
            "Bar path slightly diagonal to lower sternum",
            "Pause 1 second at chest — kills the bounce, maximizes tension",
            "Explosive press up while maintaining control",
          ],
          proTip: "The 1-second pause at the bottom eliminates elastic energy and forces the pec to actually contract from a dead stop. This is the secret to chest development.",
        },
        {
          title: "Cable Lateral Raise",
          sets: "4",
          reps: "15–20 reps",
          rest: "60s",
          intensity: "Isolation",
          cues: [
            "Single-arm cable, start with cable crossing in front of body",
            "Raise until arm parallel to floor — no higher",
            "Lead with the elbow — not the hand",
            "Cable maintains tension throughout vs dumbbells (which drop off at bottom)",
          ],
          proTip: "Cable laterals are 2–3× more effective than dumbbell laterals for medial delt hypertrophy due to constant tension. This is the most important isolation exercise for shoulder width.",
        },
        {
          title: "Tricep Rope Pushdown",
          sets: "3",
          reps: "15 reps",
          rest: "60s",
          intensity: "Isolation",
          cues: [
            "Split the rope at the bottom — externally rotate",
            "Elbows stay pinned to sides throughout",
            "Full extension at bottom — squeeze tricep hard",
            "2-second contraction at bottom",
          ],
          proTip: "The lateral head of the tricep creates the 'horseshoe' appearance. Rope pushdowns are its most targeted exercise. Never skip the split-and-rotate at the bottom.",
        },
      ],
    },
    {
      name: "Gym Track — Pull Day",
      tag: "Day 2 (Tuesday)",
      duration: "60–75 min",
      icon: "🔁",
      description: "Lats, rhomboids, rear delts, biceps. The aesthetic back that makes every other muscle look better.",
      exercises: [
        {
          title: "Wide-Grip Lat Pulldown",
          sets: "4",
          reps: "10–12 reps",
          rest: "90s",
          intensity: "Hypertrophy",
          cues: [
            "Slight lean back (15–20°) before pulling",
            "Pull to upper chest — not chin",
            "Full stretch at top — let shoulder blades rise",
            "This full range is non-negotiable for lat length",
          ],
          proTip: "The full stretch at the top (letting scapulas elevate) is what builds lat length and that dramatic V-taper. Most people cut this short — don't.",
        },
        {
          title: "Seated Cable Row (Neutral Grip)",
          sets: "4",
          reps: "12 reps",
          rest: "90s",
          intensity: "Hypertrophy",
          cues: [
            "Pull to lower sternum — not belly button",
            "Lead with the elbows pulling behind you",
            "Squeeze rhomboids at the top — pause 1s",
            "Control the return — 3-second negative",
          ],
          proTip: "Back thickness is built by heavy compound rows. Width is built by pulldowns. You need both for the complete aesthetic back.",
        },
        {
          title: "EZ-Bar Curl (Slow Negative)",
          sets: "3",
          reps: "10 reps (4-second negative)",
          rest: "90s",
          intensity: "Hypertrophy",
          cues: [
            "Elbows stay at sides — no swinging",
            "Curl to nose level for maximum bicep peak",
            "4-second controlled descent — maximize eccentric",
            "Supinate at the top for peak contraction",
          ],
          proTip: "The 4-second negative (eccentric) is the primary driver of bicep hypertrophy. Researchers consistently find eccentric-focused protocols produce 25–40% more growth.",
        },
      ],
    },
  ],
  cooldown: [
    { name: "Pec Doorframe Stretch", duration: "90s each side", notes: "Arm at 90° on doorframe, gently rotate away. Holds post-pressing are critical for anterior shoulder health." },
    { name: "Lying Glute Figure-4 Stretch", duration: "2 min each", notes: "After leg day. Cross ankle over opposite knee. Pull the knee toward chest." },
    { name: "Cat-Cow Spinal Flow", duration: "2 min", notes: "10 reps slow, then hold the round position for 30s. Decompresses lumbar spine after squatting/deadlifting." },
    { name: "Standing Quad Stretch", duration: "60s each", notes: "Hold ankle behind you. Keep knees together. This also stretches hip flexors if you add forward lean." },
    { name: "Final Breathing Protocol", duration: "3 min", notes: "Box breathing: 4s in, 4s hold, 4s out, 4s hold. Activates rest-and-digest for optimal recovery." },
  ],
  benefits: [
    "Complete aesthetic physique — zero equipment, no prerequisites needed",
    "Elite skills: HSPU (Handstand Push-Up), 90° push-up, one arm push-up",
    "One arm pull-up — full progression",
    "Scientific hypertrophy protocol",
    "🌟 Bonus: One arm handstand progression",
  ],
  stripeUrl: "https://buy.stripe.com/fZu6oJeznamB87hbFz3ZK0d",
};

// ─── PLANCHE + FRONT LEVER COMBO ─────────────────────────────────────────────

const plancheLeverCombo: Program = {
  id: "combo-planche-lever",
  title: "Planche & Front Lever Combo",
  subtitle: "Foundation + Front Lever Mastery",
  tagline: "The two most iconic calisthenics skills — one package, one price.",
  level: "Beginner / Intermediate",
  levelColor: "#06b6d4",
  category: "skill",
  categoryGroup: "STRENGTH & SKILLS",
  price: "59",
  originalPrice: "76",
  icon: "🔥",
  glowColor: "rgba(6,182,212,0.15)",
  badge: "BEST DUO",
  goals: [
    "Complete Planche Foundation — from zero to full planche roadmap",
    "Complete Front Lever Mastery — all variations & progressions",
    "Master all push-up & press variations for both skills",
    "Pull-up mastery + One Arm Pull-Up bonus",
    "One Arm Handstand bonus from both programs",
  ],
  mindset: "The planche and front lever are the two pillars of calisthenics. One tests your pushing strength, the other your pulling. Train them together and they reinforce each other — the body tension from the lever improves your planche, the protraction from the planche improves your lever. This combo is the most efficient path to mastering both.",
  weekStructure: "Run both programs simultaneously or sequentially. Recommended: alternate push days (planche) and pull days (lever) for maximum efficiency with minimum fatigue.",
  warmup: plancheFoundation.warmup,
  phases: plancheFoundation.phases,
  cooldown: sharedCooldown,
  benefits: [
    "Zero prerequisite — start from absolute zero, no sport background needed",
    "Full Planche roadmap — every step with technique",
    "Full Front Lever — all variations & progressions",
    "Pull-up mastery — from first rep to front lever pull-ups",
    "Save $17 vs buying separately",
    "🌟 Bonus: One arm pull-up + One arm handstand",
  ],
  bundlePrograms: [plancheFoundation, frontLeverMastery],
  stripeUrl: "https://buy.stripe.com/3cI8wRfDreCR3R19xr3ZK0i",
};

const ultimateBundle: Program = {
  id: "bundle",
  title: "Ultimate Gravity Bundle",
  subtitle: "Access to ALL 5 Programs",
  tagline: "The complete calisthenics & physique library — one price, lifetime access.",
  level: "All Levels",
  levelColor: "#FF4500",
  category: "bundle",
  categoryGroup: "BUNDLE",
  price: "127",
  originalPrice: "285",
  icon: "👑",
  glowColor: "rgba(255,69,0,0.2)",
  badge: "BEST VALUE",
  goals: [
    "Complete access to all 5 programs",
    "Planche Foundation + Planche Elite + Front Lever Mastery",
    "Hybrid Athlete (Home & Gym tracks)",
    "Full Hypertrophy (No-Equipment & Full Gym tracks)",
  ],
  mindset: "The bundle athlete has no ceiling. Every program in this library is designed to complement the others. Build your planche while growing your physique. Develop your front lever while building hybrid strength. The programs are interconnected — the whole is greater than the sum of its parts.",
  weekStructure: "Self-directed. Choose your primary focus program and use others as supplementary. Recommended: Start with Foundation if new to planche. Start with Hypertrophy if physique is primary goal.",
  warmup: sharedWarmup,
  phases: plancheFoundation.phases,
  cooldown: sharedCooldown,
  benefits: [
    "All 5 programs — no prerequisites, start from zero",
    "Save $158 vs individual purchase",
    "Future program updates included",
  ],
  stripeUrl: "https://buy.stripe.com/7sYbJ3gHvgKZcnx6lf3ZK0c",
};

const allPrograms: Program[] = [
  plancheFoundation,
  frontLeverMastery,
  plancheLeverCombo,
  plancheElite,
  fullHypertrophy,
  hybridAthlete,
  ultimateBundle,
];

ultimateBundle.bundlePrograms = [
  plancheFoundation,
  plancheElite,
  frontLeverMastery,
  hybridAthlete,
  fullHypertrophy,
];

plancheLeverCombo.bundlePrograms = [plancheFoundation, frontLeverMastery];

const PROGRAMS = allPrograms;
const strengthSkillsGroup = [plancheFoundation, plancheElite, frontLeverMastery];
const hybridGroup = [hybridAthlete];
const hypertrophyGroup = [fullHypertrophy];
const comboGroup = [plancheLeverCombo];

// ═══════════════════════════════════════════════════════
// TESTIMONIALS DATA
// ═══════════════════════════════════════════════════════

const testimonials = [
  {
    name: "Marcus T.",
    handle: "@marcus_cali",
    program: "Planche Foundation",
    avatar: "MT",
    avatarColor: "#22c55e",
    rating: 5,
    weeks: "8 weeks in",
    result: "Hit my first clean tuck planche hold this morning. 6 seconds. I've been trying on my own for 4 months with zero progress. The warm-up protocol alone changed everything — my wrists stopped hurting after week 2.",
  },
  {
    name: "Jordan K.",
    handle: "@jk_strength",
    program: "Hybrid Athlete",
    avatar: "JK",
    avatarColor: "#a855f7",
    rating: 5,
    weeks: "12 weeks in",
    result: "I was skeptical about combining barbell and calisthenics. Gained 4kg of muscle while actually improving my advanced tuck hold. The dual-track format is genius — gym days and home days both programmed.",
  },
  {
    name: "Alex R.",
    handle: "@alex_levers",
    program: "Front Lever Mastery",
    avatar: "AR",
    avatarColor: "#3b82f6",
    rating: 5,
    weeks: "10 weeks in",
    result: "Week 10 and I held my first straddle front lever for 5 seconds. The progression from tuck to advanced tuck to straddle is perfectly structured. No guesswork. Every session tells you exactly what to do.",
  },
  {
    name: "Sam W.",
    handle: "@sw_aesthetics",
    program: "Full Hypertrophy",
    avatar: "SW",
    avatarColor: "#ec4899",
    rating: 5,
    weeks: "12 weeks in",
    result: "No gym? No problem. The bodyweight track alone gave me more muscle than a year of random gym sessions. The progressive overload is real — I went from 8 archer push-ups to 15 clean reps each side.",
  },
  {
    name: "Tom B.",
    handle: "@tombfit_cali",
    program: "Planche Elite",
    avatar: "TB",
    avatarColor: "#f97316",
    rating: 5,
    weeks: "7 weeks in",
    result: "Went from a shaky advanced tuck to a stable 4-second straddle hold. The eccentric negatives are brutal but they work. My strength jumped faster in 7 weeks than in the previous 6 months of self-programming.",
  },
  {
    name: "Lena M.",
    handle: "@lena.moves",
    program: "Ultimate Bundle",
    avatar: "LM",
    avatarColor: "#FF4500",
    rating: 5,
    weeks: "16 weeks in",
    result: "Got the bundle and I'm alternating between Hypertrophy and Front Lever. The programs complement each other perfectly. Best $127 I've ever spent on fitness — this replaced a $80/month PT I was paying for.",
  },
];

// ═══════════════════════════════════════════════════════
// FAQ DATA
// ═══════════════════════════════════════════════════════

const faqs = [
  {
    q: "What format are the programs? PDF, video, app?",
    a: "Programs are delivered as a structured digital manual (PDF + web access). Every exercise includes written cues, progression paths, and pro tips. No app subscription needed — lifetime access means you own it forever.",
  },
  {
    q: "I have zero experience with calisthenics. Where do I start?",
    a: "Start with Planche Foundation. It's designed from absolute zero — the first 3 weeks build the connective tissue and scapular control you need before attempting any skill. If physique is your main goal with no skill focus, start with Full Hypertrophy instead.",
  },
  {
    q: "Do I need a gym or special equipment?",
    a: "For skill programs (Planche, Front Lever), you need parallettes or a pull-up bar — both under $50. For Hybrid Athlete and Full Hypertrophy, there are dual tracks: one fully bodyweight (floor only), one for gym access. You pick what fits your setup.",
  },
  {
    q: "How long until I see real results?",
    a: "Most athletes notice strength changes within 2–3 weeks and visible skill progression by Week 4–6. The programs are designed for measurable results at every phase — you'll be testing and recording holds so you can see the exact progress over time.",
  },
  {
    q: "What if the program is too hard or too easy?",
    a: "Every exercise includes a progression path (easier and harder variants). If the main exercise is too hard, the previous progression step is listed. If too easy, the next step is there. The program adapts to where you actually are — not where you think you should be.",
  },
  {
    q: "Is there any support if I have questions?",
    a: "Yes — you get direct access via email. Questions about form, programming adjustments, or exercise substitutions are answered personally. This isn't an automated bot response system.",
  },
  {
    q: "Can I run multiple programs at the same time?",
    a: "Generally no — one primary program at a time. The exception is the Hybrid Athlete, which is specifically designed to combine skill and strength work. The Bundle includes guidance on how to sequence programs intelligently over a 6–12 month period.",
  },
  {
    q: "What's the refund policy?",
    a: "If you complete the first 2 weeks of the program and aren't seeing any progress or finding value, reach out within 30 days for a full refund. The program works if you work it — that's the only condition.",
  },
];

// ═══════════════════════════════════════════════════════
// COUNTDOWN TIMER HOOK
// ═══════════════════════════════════════════════════════

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 47, m: 59, s: 59 });

  useEffect(() => {
    // Safe to access localStorage here (client only)
    const getTargetTime = () => {
      try {
        const stored = localStorage.getItem("gl_bundle_deadline");
        if (stored) {
          const t = parseInt(stored);
          if (!isNaN(t) && t > Date.now()) return t;
        }
        const deadline = Date.now() + 48 * 60 * 60 * 1000;
        localStorage.setItem("gl_bundle_deadline", deadline.toString());
        return deadline;
      } catch {
        return Date.now() + 48 * 60 * 60 * 1000;
      }
    };

    const target = getTargetTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ h: 0, m: 0, s: 0 });
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

// ═══════════════════════════════════════════════════════
// DASHBOARD (inlined)
// ═══════════════════════════════════════════════════════

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

function ExerciseCard({ ex, index }: { ex: Exercise; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="surface-2 print-avoid-break ex-card-print" style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--orange-dim)", border: "1px solid var(--orange-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span className="t-label" style={{ color: "var(--orange)", fontSize: 10 }}>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div className="t-display" style={{ fontSize: 17, color: "var(--text)" }}>{ex.title}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
            {[{ label: "Sets", val: ex.sets }, { label: "Reps", val: ex.reps }, { label: "Rest", val: ex.rest }].map(({ label, val }) => (
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
      {open && (
        <div style={{ padding: "0 20px 20px" }}>
          {ex.progression && ex.progression.length > 0 && (
            <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 10 }}>PROGRESSION PATH</div>
              <ProgressionRail steps={ex.progression} />
            </div>
          )}
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
          <div style={{ background: "rgba(255,69,0,0.04)", borderLeft: "3px solid var(--orange)", borderRadius: "0 4px 4px 0", padding: "12px 14px", marginBottom: 14 }}>
            <div className="t-label" style={{ color: "var(--orange)", fontSize: 9, marginBottom: 6 }}>💡 PRO TIP</div>
            <p className="t-body print-body" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, fontStyle: "italic" }}>{ex.proTip}</p>
          </div>

          {/* Interactive Set Tracker */}
          <SetTracker totalSets={parseInt(ex.sets) || 3} reps={ex.reps} rest={ex.rest} />
        </div>
      )}
    </div>
  );
}

// ─── SET TRACKER ─────────────────────────────────────────────────────────────

function SetTracker({ totalSets, reps, rest }: { totalSets: number; reps: string; rest: string }) {
  const [completed, setCompleted] = useState<boolean[]>(Array(totalSets).fill(false));
  const [resting, setResting] = useState(false);
  const [restLeft, setRestLeft] = useState(0);
  const restSeconds = parseInt(rest) || (rest.includes("min") ? parseInt(rest) * 60 : 90);

  const toggleSet = (i: number) => {
    const newCompleted = [...completed];
    newCompleted[i] = !newCompleted[i];
    setCompleted(newCompleted);
    // Start rest timer when a set is completed
    if (!newCompleted[i] === false && newCompleted[i]) {
      const secs = rest.includes("min") ? parseFloat(rest) * 60 : parseInt(rest) || 90;
      setRestLeft(Math.round(secs));
      setResting(true);
    }
  };

  useEffect(() => {
    if (!resting || restLeft <= 0) { if (restLeft <= 0) setResting(false); return; }
    const id = setInterval(() => setRestLeft(t => { if (t <= 1) { setResting(false); return 0; } return t - 1; }), 1000);
    return () => clearInterval(id);
  }, [resting, restLeft]);

  const done = completed.filter(Boolean).length;
  const allDone = done === totalSets;

  return (
    <div className="no-print" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 6, padding: "12px 14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9 }}>📋 SET TRACKER</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {resting && (
            <div style={{ fontFamily: "var(--fd)", fontSize: 13, color: "var(--orange)", fontWeight: 900 }}>
              ⏱ {Math.floor(restLeft / 60)}:{String(restLeft % 60).padStart(2, "0")}
            </div>
          )}
          {allDone && <span style={{ fontFamily: "var(--fb)", fontSize: 11, color: "#22c55e" }}>✅ Done!</span>}
          <button onClick={() => { setCompleted(Array(totalSets).fill(false)); setResting(false); }}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-faint)", fontSize: 10, fontFamily: "var(--fb)" }}>reset</button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {completed.map((done, i) => (
          <button key={i} onClick={() => toggleSet(i)}
            style={{ width: 40, height: 40, borderRadius: 6, border: `2px solid ${done ? "#22c55e" : "var(--border-bright)"}`, background: done ? "rgba(34,197,94,0.15)" : "transparent", cursor: "pointer", fontFamily: "var(--fd)", fontWeight: 900, fontSize: 13, color: done ? "#22c55e" : "var(--text-faint)", transition: "all .2s" }}>
            {done ? "✓" : i + 1}
          </button>
        ))}
        <div style={{ display: "flex", alignItems: "center", marginLeft: 4 }}>
          <span style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--text-faint)" }}>{done}/{totalSets} sets · {reps}</span>
        </div>
      </div>
      {!resting && !allDone && done > 0 && done < totalSets && (
        <button onClick={() => {
          const secs = rest.includes("2 min") ? 120 : rest.includes("3 min") ? 180 : rest.includes("90") ? 90 : rest.includes("60") ? 60 : 90;
          setRestLeft(secs); setResting(true);
        }} style={{ marginTop: 8, background: "var(--orange-dim)", border: "1px solid var(--orange-border)", color: "var(--orange)", padding: "5px 12px", borderRadius: 4, cursor: "pointer", fontFamily: "var(--fd)", fontSize: 11, letterSpacing: 1 }}>
          ▶ Start rest ({rest})
        </button>
      )}
    </div>
  );
}

function PhaseBlock({ phase, index }: { phase: Phase; index: number }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="surface print-break-before print-avoid-break" style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 24 }}>
      <button onClick={() => setCollapsed(!collapsed)} style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 24px", background: "linear-gradient(90deg, rgba(255,69,0,0.08) 0%, transparent 100%)", borderBottom: collapsed ? "none" : "1px solid var(--border)", textAlign: "left" }}>
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
            {phase.exercises.map((ex, i) => <ExerciseCard key={i} ex={ex} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}

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

function BundleDashboard({ program, onBack }: { program: Program; onBack: () => void }) {
  const bundleProgs = program.bundlePrograms ?? [];
  const [activeProg, setActiveProg] = useState<Program>(bundleProgs[0]);
  const [activeTrack, setActiveTrack] = useState<0 | 1>(0);
  const phases: Phase[] = activeProg.dualTrack && activeTrack === 1 ? (activeProg.gymPhases ?? activeProg.phases) : activeProg.phases;

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <PrintCover program={program} />
      <div className="no-print" style={{ background: "rgba(10,10,10,0.94)", backdropFilter: "blur(24px)", borderBottom: "1px solid var(--border)", padding: "16px 24px", position: "sticky", top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }} className="dash-head">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button className="btn-ghost" onClick={onBack}><ArrowLeft size={13} /> Programs</button>
            <div style={{ borderLeft: "1px solid var(--border-bright)", paddingLeft: 16 }}>
              <div className="t-display" style={{ fontSize: 19, lineHeight: 1 }}>👑 Ultimate Gravity Bundle</div>
              <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginTop: 3 }}>ALL 5 PROGRAMS — LIFETIME ACCESS</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {program.stripeUrl && (
              <a href={program.stripeUrl} target="_blank" rel="noopener noreferrer">
                <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 12, background: "linear-gradient(135deg,var(--orange),#ff8c00)" }}>
                  Get Bundle — ${program.price}
                </button>
              </a>
            )}
            <button className="btn-ghost" style={{ padding: "10px 20px", fontSize: 12 }} onClick={() => window.print()}>
              <Download size={12} /> Download Manual
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(255,69,0,0.1), rgba(255,69,0,0.03))", border: "1px solid var(--orange-border)", borderRadius: 12, padding: "32px 36px", marginBottom: 36, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, fontSize: 120, opacity: 0.06, pointerEvents: "none" }}>👑</div>
          <div className="badge" style={{ background: "var(--orange-dim)", color: "var(--orange)", border: "1px solid var(--orange-border)", marginBottom: 14 }}>BUNDLE — ALL 5 PROGRAMS</div>
          <h2 className="t-display" style={{ fontSize: "clamp(26px,4vw,44px)", marginBottom: 10 }}>Your Complete Training Library</h2>
          <p className="t-body" style={{ fontSize: 14, color: "var(--text-dim)", maxWidth: 640, lineHeight: 1.65, marginBottom: 20 }}>{program.mindset}</p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {program.benefits.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Check size={12} style={{ color: "var(--orange)" }} />
                <span className="t-body" style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, letterSpacing: 2, marginBottom: 12 }}>SELECT PROGRAM</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {bundleProgs.map(p => (
              <button key={p.id} onClick={() => { setActiveProg(p); setActiveTrack(0); }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 6, border: `1px solid ${activeProg.id === p.id ? "var(--orange)" : "var(--border)"}`, background: activeProg.id === p.id ? "var(--orange-dim)" : "var(--bg-card)", color: activeProg.id === p.id ? "var(--orange)" : "var(--text-dim)", cursor: "pointer", transition: "all .2s", fontFamily: "var(--fd)", fontWeight: 700, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
                <span style={{ fontSize: 16 }}>{p.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div>{p.title}</div>
                  <div style={{ fontSize: 9, fontFamily: "var(--fb)", fontWeight: 300, color: activeProg.id === p.id ? "var(--orange)" : "var(--text-faint)", marginTop: 1 }}>{p.level}</div>
                </div>
                {activeProg.id === p.id && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)", marginLeft: 4 }} />}
              </button>
            ))}
          </div>
        </div>

        <div className="surface" style={{ padding: "18px 22px", borderRadius: 8, marginBottom: 32, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", borderLeft: `3px solid ${activeProg.levelColor}` }}>
          <div style={{ fontSize: 32 }}>{activeProg.icon}</div>
          <div style={{ flex: 1 }}>
            <div className="t-display" style={{ fontSize: 20 }}>{activeProg.title} <span style={{ fontSize: 12, fontFamily: "var(--fb)", color: activeProg.levelColor }}>— {activeProg.level}</span></div>
            <p className="t-body" style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 4 }}>{activeProg.tagline}</p>
          </div>
          {activeProg.dualTrack && activeProg.trackLabels && (
            <div className="track-toggle">
              {activeProg.trackLabels.map((label, idx) => (
                <button key={label} className={`track-btn ${activeTrack === idx ? "active" : ""}`} onClick={() => setActiveTrack(idx as 0 | 1)}>
                  {idx === 0 ? <Home size={12} /> : <Dumbbell size={12} />}
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ display: "flex", gap: 20, marginBottom: 40, flexWrap: "wrap" }}>
          <div className="surface" style={{ flex: 2, minWidth: 260, padding: "20px", borderRadius: 8 }}>
            <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 12 }}><Target size={10} style={{ display: "inline", marginRight: 5, color: "var(--orange)" }} />PROGRAM GOALS</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {activeProg.goals.map((g, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <Check size={11} style={{ color: "var(--orange)", marginTop: 3, flexShrink: 0 }} />
                  <span className="t-body" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.45 }}>{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface" style={{ flex: 1, minWidth: 220, padding: "20px", borderRadius: 8 }}>
            <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 8 }}><Layers size={10} style={{ display: "inline", marginRight: 5, color: "var(--orange)" }} />STRUCTURE</div>
            <p className="t-body" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{activeProg.weekStructure}</p>
          </div>
        </div>

        <WarmupCooldown items={activeProg.warmup} title="WARM-UP & MOBILITY" icon={<Thermometer size={16} />} tag={`${activeProg.warmup.length} exercises · ~15 min`} />
        <section style={{ marginBottom: 52 }}>
          <SectionBar title="CORE PROGRAM" tag={`${phases.length} phases · ${phases.reduce((acc, p) => acc + p.exercises.length, 0)} exercises`} />
          {phases.map((phase, i) => <PhaseBlock key={`${activeProg.id}-${i}`} phase={phase} index={i} />)}
        </section>
        <WarmupCooldown items={activeProg.cooldown} title="COOL DOWN & RECOVERY" icon={<Wind size={16} />} tag={`${activeProg.cooldown.length} exercises · ~12 min`} />

        <div className="no-print" style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <button className="btn-ghost" onClick={onBack}><ArrowLeft size={13} /> Back to Programs</button>
          <button className="btn-primary" onClick={() => window.print()}><Download size={13} /> Download Full Manual</button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ program, onBack }: { program: Program; onBack: () => void }) {
  const [activeTrack, setActiveTrack] = useState<0 | 1>(0);
  const [progressWeek] = useState(3);
  const totalWeeks = 8;
  const phases: Phase[] = program.dualTrack && activeTrack === 1 ? (program.gymPhases ?? program.phases) : program.phases;

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <PrintCover program={program} />
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
                  <button key={label} className={`track-btn ${activeTrack === idx ? "active" : ""}`} onClick={() => setActiveTrack(idx as 0 | 1)}>
                    {idx === 0 ? <Home size={12} /> : <Dumbbell size={12} />}
                    {label}
                  </button>
                ))}
              </div>
            )}
            {program.stripeUrl && (
              <a href={program.stripeUrl} target="_blank" rel="noopener noreferrer">
                <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 12 }}>Get Access — ${program.price}</button>
              </a>
            )}
            <button className="btn-ghost" style={{ padding: "10px 20px", fontSize: 12 }} onClick={() => window.print()}>
              <Download size={12} /> Download Manual
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
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
              <div className="surface" style={{ padding: "16px 20px", borderRadius: 8 }}>
                <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 8 }}>
                  <Layers size={10} style={{ display: "inline", marginRight: 5, color: "var(--orange)" }} />STRUCTURE
                </div>
                <p className="t-body" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{program.weekStructure}</p>
              </div>
            </div>
          </div>
          <div className="no-print glass" style={{ padding: "18px 22px", borderRadius: 8, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 8 }}>YOUR PROGRESS</div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${(progressWeek / totalWeeks) * 100}%` }} /></div>
            </div>
            <div className="t-display" style={{ fontSize: 28, color: "var(--orange)" }}>{Math.round((progressWeek / totalWeeks) * 100)}%</div>
            <div className="t-body" style={{ fontSize: 13, color: "var(--text-faint)" }}>Week {progressWeek} / {totalWeeks}</div>
          </div>
        </section>

        {program.dualTrack && program.trackLabels && (
          <div className="no-print" style={{ background: "linear-gradient(135deg, rgba(255,69,0,0.07), rgba(255,69,0,0.03))", border: "1px solid var(--orange-border)", borderRadius: 8, padding: "18px 22px", marginBottom: 40, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <RefreshCw size={18} style={{ color: "var(--orange)", flexShrink: 0 }} />
            <div>
              <div className="t-display" style={{ fontSize: 16, marginBottom: 3 }}>Dual-Track Program Active</div>
              <p className="t-body" style={{ fontSize: 13, color: "var(--text-dim)" }}>Currently viewing: <strong style={{ color: "var(--orange)" }}>{program.trackLabels[activeTrack]}</strong> — Switch between tracks using the toggle above.</p>
            </div>
          </div>
        )}

        <WarmupCooldown items={program.warmup} title="WARM-UP & MOBILITY" icon={<Thermometer size={16} />} tag={`${program.warmup.length} exercises · ~15 min`} />
        <section style={{ marginBottom: 52 }}>
          <SectionBar title="CORE PROGRAM" tag={`${phases.length} phases · ${phases.reduce((acc, p) => acc + p.exercises.length, 0)} exercises`} />
          {phases.map((phase, i) => <PhaseBlock key={i} phase={phase} index={i} />)}
        </section>
        <WarmupCooldown items={program.cooldown} title="COOL DOWN & RECOVERY" icon={<Wind size={16} />} tag={`${program.cooldown.length} exercises · ~12 min`} />

        <div className="no-print" style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <button className="btn-ghost" onClick={onBack}><ArrowLeft size={13} /> Back to Programs</button>
          <button className="btn-primary" onClick={() => window.print()}><Download size={13} /> Download Full Manual</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PROGRAM CARD
// ═══════════════════════════════════════════════════════

function ProgramCard({ program: p, onOpen }: { program: Program; onOpen: (p: Program) => void }) {
  return (
    <div className="surface card-lift" style={{ borderRadius: 8, padding: "24px", display: "flex", flexDirection: "column", position: "relative", overflow: "visible" }} onClick={() => p.stripeUrl ? window.open(p.stripeUrl, "_blank") : onOpen(p)}>
      {/* Clip inner content but allow badge to overflow */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at top left, ${p.glowColor}, transparent 60%)` }} />
      </div>
      {p.badge && (
        <div style={{
          position: "absolute", top: -1, right: -1,
          background: p.badge === "BEST DUO" ? "linear-gradient(135deg,#06b6d4,#0891b2)"
            : p.category === "bundle" ? "linear-gradient(135deg,var(--orange),#ff8c00)"
            : "var(--orange)",
          color: "#fff",
          fontSize: 9, fontWeight: 800, letterSpacing: 2, fontFamily: "var(--fb)",
          padding: "5px 12px", borderRadius: "0 8px 0 8px",
          whiteSpace: "nowrap", zIndex: 10,
          animation: "badgePop 2s ease-in-out infinite",
        }}>{p.badge}</div>
      )}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 30, marginBottom: 10 }}>{p.icon}</div>
        <span className="badge" style={{ background: `${p.levelColor}18`, color: p.levelColor, border: `1px solid ${p.levelColor}30`, marginBottom: 10, alignSelf: "flex-start" }}>{p.level}</span>
        <h3 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 21, textTransform: "uppercase", marginBottom: 3, lineHeight: 1.05, color: "var(--text)" }}>{p.title}</h3>
        <p style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--text-dim)", marginBottom: 12, lineHeight: 1.4 }}>{p.subtitle}</p>
        {p.dualTrack && p.trackLabels && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--orange-dim)", border: "1px solid var(--orange-border)", borderRadius: 3, padding: "4px 10px", marginBottom: 12, alignSelf: "flex-start" }}>
            <RefreshCw size={10} style={{ color: "var(--orange)" }} />
            <span style={{ fontFamily: "var(--fb)", fontSize: 9, fontWeight: 700, color: "var(--orange)", letterSpacing: 1.5, textTransform: "uppercase" }}>2 Tracks:</span>
            <span style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--text-dim)" }}>{p.trackLabels[0]}</span>
            <span style={{ color: "var(--text-faint)" }}>|</span>
            <span style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--text-dim)" }}>{p.trackLabels[1]}</span>
          </div>
        )}
        {p.category === "bundle" && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,69,0,.07)", border: "1px solid var(--orange-border)", borderRadius: 3, padding: "4px 10px", marginBottom: 12, alignSelf: "flex-start" }}>
            <Package size={10} style={{ color: "var(--orange)" }} />
            <span style={{ fontFamily: "var(--fb)", fontSize: 9, fontWeight: 700, color: "var(--orange)", letterSpacing: 1.5, textTransform: "uppercase" }}>All 5 Programs Included</span>
          </div>
        )}
        <ul style={{ listStyle: "none", marginBottom: 18, display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
          {p.benefits.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Check size={11} style={{ color: "var(--orange)", marginTop: 3, flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--fb)", fontSize: 13, color: "rgba(255,255,255,.62)", lineHeight: 1.4 }}>{b}</span>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--border)", marginTop: "auto" }}>
          <div>
            <span className={p.category === "bundle" || p.id === "combo-planche-lever" ? "shimmer-text" : ""} style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 36, color: p.category === "bundle" || p.id === "combo-planche-lever" ? undefined : "var(--text)", lineHeight: 1 }}>${p.price}</span>
            {p.originalPrice && <span style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--text-faint)", marginLeft: 7, textDecoration: "line-through" }}>${p.originalPrice}</span>}
            <div style={{ fontFamily: "var(--fb)", fontSize: 10, color: "var(--text-faint)", marginTop: 1 }}>lifetime access</div>
            {p.id === "combo-planche-lever" && (
              <div style={{ fontFamily: "var(--fb)", fontSize: 10, color: "#06b6d4", marginTop: 4 }}>
                🔗 Includes both programs
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
            {p.stripeUrl ? (
              <a href={p.stripeUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                <button className={`btn-primary ${p.category === "bundle" || p.id === "combo-planche-lever" ? "cta-pulse" : ""}`} style={{ padding: "9px 17px", fontSize: 12 }}>Get Access →</button>
              </a>
            ) : (
              <button className="btn-primary" style={{ padding: "9px 17px", fontSize: 12 }} onClick={(e) => { e.stopPropagation(); onOpen(p); }}>Get Access →</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TESTIMONIALS SECTION
// ═══════════════════════════════════════════════════════

const beforeAfterData = [
  {
    name: "Marcus",
    age: 18,
    program: "Full Hypertrophy",
    programColor: "#ec4899",
    duration: "3 months",
    before: "/Marcus_Before.png",
    after: "/Marcus_After.png",
    quote: "I had never trained seriously before. 3 months in, I have visible abs, my chest actually exists now, and I'm stronger than I've ever been. The no-equipment track is no joke.",
    stats: [{ label: "Duration", val: "3 months" }, { label: "Program", val: "Full Hypertrophy" }, { label: "Track", val: "No Equipment" }],
  },
  {
    name: "Léo",
    age: 23,
    program: "Hybrid Athlete",
    programColor: "#a855f7",
    duration: "9 months",
    before: "/Leo_Before.png",
    after: "/Leo_After.png",
    quote: "9 months of Hybrid Athlete. I went from a skinny guy with zero skill to a straddle planche hold and a physique I'm actually proud of. The dual-track format kept me consistent — gym days and home days both planned.",
    stats: [{ label: "Duration", val: "9 months" }, { label: "Program", val: "Hybrid Athlete" }, { label: "Skill reached", val: "Straddle Planche" }],
  },
  {
    name: "Jordan",
    age: 20,
    program: "Full Hypertrophy + Front Lever",
    programColor: "#3b82f6",
    duration: "7 months",
    before: "/Jordan_Before.png",
    after: "/Jordan_After.png",
    quote: "4 months of Full Hypertrophy bodyweight, then 3 months of Front Lever Mastery on top. Ended up with both — a physique transformation AND a full front lever. Didn't think both were possible at the same time.",
    stats: [{ label: "Duration", val: "7 months" }, { label: "Programs", val: "2 programs" }, { label: "Skill reached", val: "Full Front Lever" }],
  },
];

function BeforeAfterCard({ data }: { data: typeof beforeAfterData[0] }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="surface" style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", transition: "border-color .2s" }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--orange-border)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>

      {/* Photo toggle */}
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#0a0a0a" }}>
        <img
          src={showAfter ? data.after : data.before}
          alt={`${data.name} ${showAfter ? "after" : "before"}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "opacity .3s" }}
        />
        {/* Before/After toggle buttons */}
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
          <button onClick={() => setShowAfter(false)}
            style={{ padding: "7px 18px", border: "none", cursor: "pointer", fontFamily: "var(--fd)", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, transition: "all .2s", background: !showAfter ? "var(--orange)" : "transparent", color: !showAfter ? "#fff" : "rgba(255,255,255,0.5)" }}>
            BEFORE
          </button>
          <button onClick={() => setShowAfter(true)}
            style={{ padding: "7px 18px", border: "none", cursor: "pointer", fontFamily: "var(--fd)", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, transition: "all .2s", background: showAfter ? "var(--orange)" : "transparent", color: showAfter ? "#fff" : "rgba(255,255,255,0.5)" }}>
            AFTER
          </button>
        </div>
        {/* Program badge */}
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span className="badge" style={{ background: `${data.programColor}22`, color: data.programColor, border: `1px solid ${data.programColor}44`, backdropFilter: "blur(8px)", fontSize: 9 }}>
            {data.program}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "20px" }}>
        {/* Stars */}
        <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
          {Array(5).fill(0).map((_, i) => <Star key={i} size={11} fill="var(--orange)" stroke="none" />)}
        </div>
        {/* Name + age */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 20, color: "var(--text)" }}>{data.name}</div>
          <span style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--text-faint)" }}>{data.age} y.o. · {data.duration}</span>
        </div>
        {/* Quote */}
        <p style={{ fontFamily: "var(--fb)", fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 16, fontStyle: "italic" }}>
          "{data.quote}"
        </p>
        {/* Stats */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
          {data.stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 4, padding: "6px 10px" }}>
              <div style={{ fontFamily: "var(--fb)", fontSize: 9, color: "var(--text-faint)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontFamily: "var(--fd)", fontSize: 13, color: "var(--text)", fontWeight: 700 }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section style={{ padding: "90px 22px", position: "relative", zIndex: 1, borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="badge" style={{ background: "rgba(255,255,255,.04)", color: "var(--text-dim)", border: "1px solid var(--border-bright)", marginBottom: 14 }}>RESULTS</div>
          <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(28px,4vw,52px)", textTransform: "uppercase", marginBottom: 12 }}>
            Real athletes.<br /><span style={{ WebkitTextStroke: "2px var(--orange)", WebkitTextFillColor: "transparent" }}>Real results.</span>
          </h2>
          <p style={{ fontFamily: "var(--fb)", fontSize: 14, color: "var(--text-dim)", maxWidth: 480, margin: "0 auto" }}>
            Click BEFORE / AFTER to see the transformation. No filters, no editing.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="testimonial-grid">
          {beforeAfterData.map((d, i) => <BeforeAfterCard key={i} data={d} />)}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// FAQ SECTION
// ═══════════════════════════════════════════════════════

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ padding: "90px 22px", position: "relative", zIndex: 1, borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="badge" style={{ background: "rgba(255,255,255,.04)", color: "var(--text-dim)", border: "1px solid var(--border-bright)", marginBottom: 14 }}>FAQ</div>
          <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(28px,4vw,52px)", textTransform: "uppercase" }}>
            Every question.<br />Answered honestly.
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {faqs.map((faq, i) => (
            <div key={i} className="surface" style={{ borderRadius: 6, overflow: "hidden", border: `1px solid ${open === i ? "var(--orange-border)" : "var(--border)"}`, transition: "border-color .2s" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" }}>
                <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 16, color: open === i ? "var(--orange)" : "var(--text)", transition: "color .2s", lineHeight: 1.3 }}>{faq.q}</span>
                <div style={{ width: 24, height: 24, borderRadius: "50%", border: `1.5px solid ${open === i ? "var(--orange)" : "var(--border-bright)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s", background: open === i ? "var(--orange-dim)" : "transparent" }}>
                  {open === i ? <ChevronUp size={12} style={{ color: "var(--orange)" }} /> : <ChevronDown size={12} style={{ color: "var(--text-faint)" }} />}
                </div>
              </button>
              {open === i && (
                <div style={{ padding: "0 20px 20px" }}>
                  <div style={{ width: "100%", height: 1, background: "var(--border)", marginBottom: 16 }} />
                  <p style={{ fontFamily: "var(--fb)", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still unsure CTA */}
        <div style={{ marginTop: 40, textAlign: "center", padding: "28px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 8 }}>
          <AlertCircle size={20} style={{ color: "var(--orange)", marginBottom: 10 }} />
          <p style={{ fontFamily: "var(--fb)", fontSize: 14, color: "var(--text-dim)", marginBottom: 16 }}>Still not sure which program is right for you?</p>
          <a href="mailto:contact@gravitylab.com">
            <button className="btn-secondary">Ask directly →</button>
          </a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// BUNDLE COUNTDOWN + PRICE BREAKDOWN
// ═══════════════════════════════════════════════════════

function BundleSection({ onOpen }: { onOpen: (p: Program) => void }) {
  const { h, m, s } = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");
  const priceItems = [
    { label: "Planche Foundation", price: 37 },
    { label: "Planche Elite", price: 57 },
    { label: "Front Lever Mastery", price: 39 },
    { label: "Hybrid Athlete", price: 57 },
    { label: "Full Hypertrophy", price: 57 },
  ];
  const total = priceItems.reduce((a, b) => a + b.price, 0);

  return (
    <section style={{ padding: "90px 22px", position: "relative", zIndex: 1, background: "rgba(255,69,0,0.02)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="pg2">
          {/* Left — value breakdown */}
          <div>
            <div className="badge" style={{ background: "var(--orange-dim)", color: "var(--orange)", border: "1px solid var(--orange-border)", marginBottom: 18 }}>BUNDLE — BEST VALUE</div>
            <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(32px,4vw,52px)", textTransform: "uppercase", lineHeight: .9, marginBottom: 28 }}>
              Everything.<br /><span style={{ WebkitTextStroke: "2px var(--orange)", WebkitTextFillColor: "transparent" }}>One price.</span>
            </h2>
            {/* Price breakdown */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", marginBottom: 20 }}>
              {priceItems.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--text-dim)" }}>
                    <Check size={11} style={{ color: "var(--orange)", marginRight: 8, display: "inline" }} />
                    {item.label}
                  </span>
                  <span style={{ fontFamily: "var(--fd)", fontSize: 15, color: "var(--text-faint)", textDecoration: "line-through" }}>${item.price}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "rgba(255,69,0,0.06)", borderTop: "2px solid var(--orange-border)" }}>
                <span style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 14, color: "var(--text)", letterSpacing: 1, textTransform: "uppercase" }}>If bought separately</span>
                <span style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 20, color: "var(--text-faint)", textDecoration: "line-through" }}>${total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "linear-gradient(90deg,rgba(255,69,0,0.12),rgba(255,69,0,0.04))" }}>
                <div>
                  <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 14, color: "var(--orange)", letterSpacing: 1, textTransform: "uppercase" }}>Bundle Price</div>
                  <div style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--text-faint)", marginTop: 2 }}>You save ${total - 127}</div>
                </div>
                <span style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 32, color: "var(--orange)" }}>$127</span>
              </div>
            </div>
          </div>

          {/* Right — countdown + CTA */}
          <div>
            {/* Countdown */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--orange-border)", borderRadius: 10, padding: "24px", marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--orange)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>⏰ Launch price expires in</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 14 }}>
                {[{ label: "HRS", val: pad(h) }, { label: "MIN", val: pad(m) }, { label: "SEC", val: pad(s) }].map((unit, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ background: "rgba(255,69,0,0.1)", border: "1px solid var(--orange-border)", borderRadius: 6, padding: "10px 14px", minWidth: 58 }}>
                      <span style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 36, color: "var(--orange)", lineHeight: 1 }}>{unit.val}</span>
                    </div>
                    <span style={{ fontFamily: "var(--fb)", fontSize: 9, letterSpacing: 2, color: "var(--text-faint)" }}>{unit.label}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "var(--fb)", fontSize: 12, color: "var(--text-faint)", lineHeight: 1.55 }}>
                After the timer runs out, the bundle returns to full price.
              </p>
            </div>

            {/* CTA */}
            <a href={ultimateBundle.stripeUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
              <button className="btn-primary pulse-glow cta-pulse" style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: 15, letterSpacing: 2 }}>
                Get the Bundle — $127
              </button>
            </a>
            <div style={{ display: "flex", gap: 16, marginTop: 14, justifyContent: "center", flexWrap: "wrap" }}>
              {["Lifetime access", "30-day guarantee", "Instant delivery"].map((t, i) => (
                <span key={i} style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--text-faint)", display: "flex", alignItems: "center", gap: 5 }}>
                  <Check size={10} style={{ color: "var(--orange)" }} />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// CATEGORY SECTION
// ═══════════════════════════════════════════════════════

function CatSection({ label, sublabel, progs, onOpen }: { label: string; sublabel: string; progs: Program[]; onOpen: (p: Program) => void }) {
  return (
    <div style={{ marginBottom: 64 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
          <div style={{ width: 4, height: 28, background: "var(--orange)", borderRadius: 2, flexShrink: 0 }} />
          <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(26px,3.5vw,40px)", textTransform: "uppercase", color: "var(--text)" }}>{label}</h2>
        </div>
        <p style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--text-faint)", marginLeft: 18 }}>{sublabel}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(progs.length, 3)}, 1fr)`, gap: 18 }} className="pg3">
        {progs.map(p => <ProgramCard key={p.id} program={p} onOpen={onOpen} />)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// QUIZ SECTION (with urgency result page)
// ═══════════════════════════════════════════════════════

function QuizSection({ onOpen }: { onOpen: (p: Program) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Program | null>(null);
  const [quizTimer, setQuizTimer] = useState(900); // 15 min countdown on result
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (!timerStarted || quizTimer <= 0) return;
    const id = setInterval(() => setQuizTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timerStarted, quizTimer]);

  const questions = [
    {
      q: "What is your current physical level?",
      opts: [
        "Beginner — just starting out with training",
        "Intermediate — a few months of consistent training",
        "Advanced — training for over a year",
        "Expert — I already have some skills (tuck planche, tuck front lever...)",
      ],
    },
    {
      q: "What is your main goal?",
      opts: [
        "Learn calisthenics skills (planche, front lever...)",
        "Build an aesthetic, muscular physique",
        "Both — skills AND physique",
        "Everything — the complete package",
      ],
    },
    {
      q: "What equipment do you have access to?",
      opts: [
        "Nothing — just the floor and my bodyweight",
        "Pull-up bar + parallettes",
        "Full gym access",
        "Everything — home setup AND gym",
      ],
    },
  ];

  const getRecommendation = (ans: number[]): Program => {
    const [level, goal, equip] = ans;
    if (goal === 3 || equip === 3) return ultimateBundle;
    if (goal === 0) {
      if (level <= 1) return plancheFoundation;
      if (level === 2) return frontLeverMastery;
      return plancheElite;
    }
    if (goal === 1) return fullHypertrophy;
    if (goal === 2) return hybridAthlete;
    return plancheFoundation;
  };

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    if (step < questions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      const rec = getRecommendation(newAnswers);
      setResult(rec);
      setTimerStarted(true);
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); setQuizTimer(900); setTimerStarted(false); };

  const pad = (n: number) => String(n).padStart(2, "0");
  const timerMin = Math.floor(quizTimer / 60);
  const timerSec = quizTimer % 60;
  const timerExpired = quizTimer <= 0;

  return (
    <section style={{ padding: "80px 22px", position: "relative", zIndex: 1, background: "rgba(255,69,0,0.02)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div className="badge" style={{ background: "rgba(255,255,255,.04)", color: "var(--text-dim)", border: "1px solid var(--border-bright)", marginBottom: 14 }}>🎯 FIND YOUR PROGRAM</div>
          <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(28px,4vw,50px)", textTransform: "uppercase" }}>Which program<br />is right for you?</h2>
          <p style={{ fontFamily: "var(--fb)", fontSize: 14, color: "var(--text-dim)", marginTop: 12 }}>Answer 3 questions — we'll guide you to the right starting point.</p>
        </div>

        {result ? (
          <div>
            {/* Urgency timer banner */}
            {!timerExpired ? (
              <div style={{ background: "rgba(255,69,0,0.1)", border: "1px solid var(--orange-border)", borderRadius: 6, padding: "12px 18px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <span style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--text-dim)" }}>
                  🔥 <strong style={{ color: "var(--text)" }}>Personal offer active</strong> — discounted price reserved for <strong style={{ color: "var(--orange)" }}>{pad(timerMin)}:{pad(timerSec)}</strong>
                </span>
                <span className="badge" style={{ background: "var(--orange-dim)", color: "var(--orange)", border: "1px solid var(--orange-border)", fontSize: 9 }}>LIMITED</span>
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 6, padding: "12px 18px", marginBottom: 20 }}>
                <span style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--text-faint)" }}>Offer expired — standard pricing applies.</span>
              </div>
            )}

            <div style={{ marginBottom: 8, fontFamily: "var(--fd)", fontSize: 13, letterSpacing: 2, color: "var(--text-faint)", textTransform: "uppercase", textAlign: "center" }}>Your perfect match</div>
            <div className="surface" style={{ borderRadius: 12, padding: "32px", border: `2px solid ${result.levelColor}40`, background: `${result.glowColor}`, marginBottom: 24, textAlign: "left", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, fontSize: 100, opacity: 0.07 }}>{result.icon}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 40 }}>{result.icon}</span>
                <div>
                  <div className="t-display" style={{ fontSize: 26 }}>{result.title}</div>
                  <div style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--text-dim)", marginTop: 3 }}>{result.subtitle}</div>
                </div>
                <span className="badge" style={{ marginLeft: "auto", background: `${result.levelColor}20`, color: result.levelColor, border: `1px solid ${result.levelColor}40`, fontSize: 10 }}>{result.level}</span>
              </div>
              <p style={{ fontFamily: "var(--fb)", fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 20 }}>{result.tagline}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                {result.goals.slice(0, 3).map((g, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Check size={11} style={{ color: "var(--orange)", marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--fb)", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{g}</span>
                  </div>
                ))}
              </div>

              {/* Price + urgency */}
              <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "16px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <span style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 38, color: "var(--orange)" }}>${result.price}</span>
                  {result.originalPrice && <span style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--text-faint)", marginLeft: 8, textDecoration: "line-through" }}>${result.originalPrice}</span>}
                  <div style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--text-faint)", marginTop: 2 }}>one-time · lifetime access</div>
                </div>
                {!timerExpired && (
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 22, color: "var(--orange)", fontVariantNumeric: "tabular-nums" }}>{pad(timerMin)}:{pad(timerSec)}</div>
                    <div style={{ fontFamily: "var(--fb)", fontSize: 10, color: "var(--text-faint)", letterSpacing: 1 }}>OFFER EXPIRES</div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {result.stripeUrl ? (
                  <a href={result.stripeUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                    <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                      Get Access — ${result.price} →
                    </button>
                  </a>
                ) : (
                  <button className="btn-primary" style={{ flex: 1 }} onClick={() => onOpen(result)}>
                    View Program — ${result.price}
                  </button>
                )}
                <button className="btn-ghost" onClick={reset}>← Retake</button>
              </div>
            </div>

            {/* Also consider */}
            {result.category !== "bundle" && (
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--text-faint)", marginBottom: 12 }}>Want everything for the best value?</p>
                <a href={ultimateBundle.stripeUrl} target="_blank" rel="noopener noreferrer">
                  <button className="btn-secondary">👑 Get the Bundle — $127 (save $158)</button>
                </a>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32 }}>
              {questions.map((_, i) => (
                <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 4, background: i < step ? "var(--orange)" : i === step ? "var(--orange)" : "var(--border)", transition: "all .3s" }} />
              ))}
            </div>
            <div className="surface" style={{ borderRadius: 12, padding: "32px 28px", border: "1px solid var(--border-bright)" }}>
              <div className="t-label" style={{ color: "var(--text-faint)", fontSize: 9, marginBottom: 10 }}>Question {step + 1} / {questions.length}</div>
              <h3 className="t-display" style={{ fontSize: "clamp(18px,3vw,26px)", marginBottom: 28, lineHeight: 1.2 }}>{questions[step].q}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {questions[step].opts.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)}
                    style={{ padding: "14px 18px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-dim)", cursor: "pointer", fontFamily: "var(--fb)", fontSize: 14, textAlign: "left", transition: "all .2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--orange)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-dim)"; }}>
                    <span style={{ color: "var(--orange)", fontFamily: "var(--fd)", marginRight: 10 }}>{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            {step > 0 && (
              <button className="btn-ghost" style={{ marginTop: 14, fontSize: 12 }} onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)); }}>
                ← Back
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@300;400;500;600&display=swap');
:root {
  --orange:#FF4500;--orange-dim:rgba(255,69,0,.1);--orange-border:rgba(255,69,0,.28);
  --bg:#0A0A0A;--bg-card:#111;--bg-card2:#141414;
  --border:rgba(255,255,255,.07);--border-bright:rgba(255,255,255,.14);
  --text:#FFF;--text-dim:rgba(255,255,255,.5);--text-faint:rgba(255,255,255,.25);
  --fd:'Barlow Condensed',Impact,sans-serif;--fb:'Barlow',sans-serif;--fs:'Cormorant Garamond',Georgia,serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--fb);overflow-x:hidden;-webkit-font-smoothing:antialiased}
.noise{position:fixed;inset:0;opacity:.02;pointer-events:none;z-index:500;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:180px}
.grid-bg{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.016) 1px,transparent 1px);background-size:64px 64px}
.glass{background:rgba(255,255,255,.03);backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:6px}
.surface{background:var(--bg-card);border:1px solid var(--border);border-radius:6px}
.surface-2{background:var(--bg-card2);border:1px solid var(--border);border-radius:6px}
.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;border-radius:2px;font-family:var(--fb);white-space:nowrap}
.btn-primary{background:var(--orange);color:#fff;border:none;padding:12px 26px;font-family:var(--fd);font-weight:700;font-size:13px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:2px;display:inline-flex;align-items:center;gap:8px}
.btn-primary:hover{background:#ff6030;transform:translateY(-1px);box-shadow:0 8px 24px rgba(255,69,0,.4)}
.btn-secondary{background:transparent;color:var(--orange);border:1px solid var(--orange-border);padding:11px 22px;font-family:var(--fd);font-weight:700;font-size:13px;letter-spacing:1.8px;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:2px;display:inline-flex;align-items:center;gap:7px}
.btn-secondary:hover{background:var(--orange-dim)}
.btn-ghost{background:transparent;color:var(--text-dim);border:1px solid var(--border-bright);padding:9px 16px;font-family:var(--fd);font-weight:600;font-size:12px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:2px;display:inline-flex;align-items:center;gap:7px}
.btn-ghost:hover{color:var(--text);border-color:rgba(255,255,255,.28)}
.card-lift{transition:transform .3s cubic-bezier(.4,0,.2,1),border-color .3s,box-shadow .3s;cursor:pointer}
.card-lift:hover{transform:translateY(-5px);border-color:var(--orange-border)!important;box-shadow:0 20px 56px rgba(255,69,0,.14)}
.progress-bar{height:3px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden}
.progress-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--orange),#ff8c00);transition:width .8s cubic-bezier(.4,0,.2,1)}
.track-toggle{display:flex;background:rgba(255,255,255,.04);border:1px solid var(--border-bright);border-radius:4px;overflow:hidden}
.track-btn{padding:9px 18px;font-family:var(--fd);font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border:none;transition:all .2s;display:flex;align-items:center;gap:6px;white-space:nowrap}
.track-btn.active{background:var(--orange);color:#fff}
.track-btn:not(.active){background:transparent;color:var(--text-dim)}
.track-btn:not(.active):hover{background:rgba(255,255,255,.05);color:var(--text)}
.check-row{transition:background .18s,border-color .18s;cursor:pointer}
.check-row:hover{background:rgba(255,69,0,.04)!important}
.data-table{width:100%;border-collapse:collapse;font-family:var(--fb);font-size:13px}
.data-table th{padding:11px 16px;text-align:left;font-size:10px;letter-spacing:2px;color:var(--text-faint);text-transform:uppercase;font-weight:600;border-bottom:1px solid var(--border);background:rgba(255,255,255,.02)}
.data-table td{padding:13px 16px;border-bottom:1px solid rgba(255,255,255,.04);color:rgba(255,255,255,.7);vertical-align:top}
.data-table tr:last-child td{border-bottom:none}
.data-table tr:hover td{background:rgba(255,69,0,.03)}
.section-line{display:flex;align-items:center;gap:16px;margin-bottom:28px}
.section-line .ln{flex:1;height:1px;background:var(--border)}
.section-line .dot{width:5px;height:5px;background:var(--orange);border-radius:50%;flex-shrink:0}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes flicker{0%,100%{opacity:1}91%{opacity:1}92%{opacity:.7}93%{opacity:1}97%{opacity:1}98%{opacity:.82}99%{opacity:1}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 20px rgba(255,69,0,.3)}50%{box-shadow:0 0 44px rgba(255,69,0,.6)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes badgeBounce{0%,100%{transform:rotate(35deg) scale(1)}50%{transform:rotate(35deg) scale(1.08)}}
@keyframes wiggle{0%,100%{transform:translateX(0)}20%{transform:translateX(-3px)}40%{transform:translateX(3px)}60%{transform:translateX(-2px)}80%{transform:translateX(2px)}}
@keyframes ctaPulse{0%,100%{transform:translateY(0);box-shadow:0 4px 20px rgba(255,69,0,.35)}50%{transform:translateY(-3px);box-shadow:0 12px 36px rgba(255,69,0,.6)}}
@keyframes borderGlow{0%,100%{border-color:rgba(255,69,0,.28)}50%{border-color:rgba(255,69,0,.7)}}
@keyframes priceReveal{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}
.shimmer-text{background:linear-gradient(90deg,var(--orange) 0%,#ffb347 40%,var(--orange) 60%,#ff8c00 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
.badge-bounce{animation:badgeBounce 2s ease-in-out infinite}
.cta-pulse{animation:ctaPulse 2.2s ease-in-out infinite}
.border-glow{animation:borderGlow 2.5s ease-in-out infinite}
.wiggle{animation:wiggle 3s ease-in-out infinite}
.fade-up{animation:fadeUp .5s ease both}
.flicker{animation:flicker 5s ease-in-out infinite}
.pulse-glow{animation:pulseGlow 2.6s ease-in-out infinite}
.t-display{font-family:var(--fd);font-weight:900;text-transform:uppercase;letter-spacing:-.02em}
.t-label{font-family:var(--fb);font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase}
.t-body{font-family:var(--fb);font-weight:400;line-height:1.65}
.t-serif{font-family:var(--fs)}
.section-divider{display:flex;align-items:center;gap:16px;margin-bottom:28px}
.section-divider .line{flex:1;height:1px;background:var(--border)}
.section-divider .dot{width:5px;height:5px;background:var(--orange);border-radius:50%;flex-shrink:0}
.bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:300;background:rgba(10,10,10,0.96);backdrop-filter:blur(24px);border-top:1px solid var(--border);padding:8px 0;justify-content:space-around;align-items:center}
.bottom-nav-btn{display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 16px;background:transparent;border:none;cursor:pointer;color:#ffffff;transition:color .2s;font-family:var(--fd);font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none}
.bottom-nav-btn.active,.bottom-nav-btn:hover{color:var(--orange)}
@media(min-width:769px){.bottom-nav{display:none!important}}
@media(max-width:768px){
  .pg3{grid-template-columns:1fr!important}
  .pg2{grid-template-columns:1fr!important}
  .ex-grid{grid-template-columns:1fr!important}
  .dash-head{flex-direction:column!important;align-items:flex-start!important;gap:14px!important}
  .hero-title{font-size:clamp(52px,14vw,90px)!important}
  .track-btn{padding:8px 12px!important;font-size:11px!important}
  .testimonial-grid{grid-template-columns:1fr!important}
  .bottom-nav{display:flex!important}
  .desktop-nav-links{display:none!important}
  .btn-primary{min-height:52px!important;font-size:14px!important}
  .btn-secondary{min-height:50px!important;font-size:14px!important}
  .hero-ctas{flex-direction:column!important;width:100%!important;align-items:stretch!important}
  .hero-ctas a{width:100%!important}
  .hero-ctas button{width:100%!important;justify-content:center!important}
  body{padding-bottom:80px}
}
@media print{
  .no-print,.noise,.grid-bg,nav,footer,.track-toggle,
  .btn-primary,.btn-secondary,.btn-ghost,.progress-bar{display:none!important}
  *{background:#fff!important;color:#111!important;box-shadow:none!important;animation:none!important;border-color:#ddd!important}
  html,body{font-size:11pt;line-height:1.55;font-family:Georgia,serif}
  @page{size:A4;margin:22mm 20mm}
  .print-cover{display:flex!important;flex-direction:column!important;justify-content:center!important;min-height:230mm!important;page-break-after:always!important}
  .print-h1{font-family:'Cormorant Garamond',Georgia,serif!important;font-size:40pt!important;font-weight:700!important}
  .print-h2{font-family:'Cormorant Garamond',Georgia,serif!important;font-size:20pt!important;border-bottom:2px solid #FF4500!important;padding-bottom:5px!important;margin-bottom:14pt!important}
}
`;

function AppInner() {
  const [page, setPage] = useState<"landing" | "dash">("landing");
  const [active, setActive] = useState<Program | null>(null);
  const [justPaid, setJustPaid] = useState(false);
  const searchParams = useSearchParams();

  // ── Read ?program= param on load (after Stripe redirect) ──
  useEffect(() => {
    const programId = searchParams.get("program");
    const paid = searchParams.get("paid");

    if (programId) {
      const found = PROGRAMS.find(p => p.id === programId);
      if (found) {
        setActive(found);
        setPage("dash");
        if (paid === "true") setJustPaid(true);
        // Clean URL without reload
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, [searchParams]);

  const openProg = (p: Program) => {
    setActive(p);
    setPage("dash");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "dash" && active) {
    return (
      <>
        <style>{CSS}</style>

        {/* ── Post-payment welcome banner ── */}
        {justPaid && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
            background: "linear-gradient(90deg, #22c55e, #16a34a)",
            padding: "14px 24px", display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 16, flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20 }}>🎉</span>
              <div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 15, color: "#fff", letterSpacing: 1 }}>
                  Payment confirmed — welcome to {active.title}!
                </div>
                <div style={{ fontFamily: "var(--fb)", fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
                  Your full program is unlocked below. Bookmark this page for future access.
                </div>
              </div>
            </div>
            <button onClick={() => setJustPaid(false)}
              style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "6px 14px", borderRadius: 4, cursor: "pointer", fontFamily: "var(--fd)", fontSize: 11, letterSpacing: 1 }}>
              ✕ Close
            </button>
          </div>
        )}

        {active.category === "bundle"
          ? <BundleDashboard program={active} onBack={() => { setPage("landing"); setJustPaid(false); window.scrollTo({ top: 0 }); }} />
          : <Dashboard program={active} onBack={() => { setPage("landing"); setJustPaid(false); window.scrollTo({ top: 0 }); }} />
        }
      </>
    );
  }

  const skillProgs = PROGRAMS.filter(p => p.category === "skill" && p.id !== "combo-planche-lever");
  const hybridProgs = PROGRAMS.filter(p => p.category === "hybrid");
  const hypertrophyProgs = PROGRAMS.filter(p => p.category === "hypertrophy");
  const bundleProg = PROGRAMS.find(p => p.category === "bundle")!;

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <style>{CSS}</style>
      <div className="noise" /><div className="grid-bg" />

      <nav className="no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "15px 26px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", background: "rgba(10,10,10,.92)", backdropFilter: "blur(24px)" }}>
        <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 19, letterSpacing: 4, color: "var(--orange)" }}>GRAVITY<span style={{ color: "var(--text)" }}>LAB</span></div>
        <div className="desktop-nav-links" style={{ display: "flex", gap: 22 }}>
          {["Programs", "Method", "Guide"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: "var(--fd)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-faint)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>{l}</a>
          ))}
        </div>
      </nav>

      {/* ── BOTTOM NAV (mobile only) ── */}
      <nav className="bottom-nav no-print">
        <a href="#programs" className="bottom-nav-btn">
          <span style={{ fontSize: 18 }}>🏋️</span>
          Programs
        </a>
        <a href="#results-section" className="bottom-nav-btn">
          <span style={{ fontSize: 18 }}>📸</span>
          Results
        </a>
        <a href="#quiz-section" className="bottom-nav-btn">
          <span style={{ fontSize: 18 }}>🎯</span>
          Quiz
        </a>
        <a href="#guide" className="bottom-nav-btn">
          <span style={{ fontSize: 18 }}>📋</span>
          Guide
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-section" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "130px 22px 70px", position: "relative", zIndex: 1, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 750, height: 750, background: "radial-gradient(circle,rgba(255,69,0,.08),transparent 60%)", pointerEvents: "none" }} />
        <div className="badge hero-badge" style={{ background: "rgba(255,69,0,.1)", color: "var(--orange)", border: "1px solid var(--orange-border)", marginBottom: 28, letterSpacing: 2, fontSize: 10, whiteSpace: "normal", textAlign: "center", maxWidth: "90vw", lineHeight: 1.5 }}>⚡ Elite Calisthenics Programs — Premium Digital Coaching</div>
        <h1 className="flicker hero-title" style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(68px,13vw,148px)", lineHeight: .87, letterSpacing: "-.02em", textTransform: "uppercase", marginBottom: 28 }}>
          DOMINATE<br /><span style={{ WebkitTextStroke: "2px var(--orange)", WebkitTextFillColor: "transparent" }}>GRAVITY</span>
        </h1>
        <p className="hero-subtitle" style={{ fontFamily: "var(--fb)", fontWeight: 300, fontSize: 17, color: "var(--text-dim)", maxWidth: 500, marginBottom: 32, lineHeight: 1.65 }}>Science-backed programs engineered to build elite skills and serious muscle. Planche. Front Lever. Hybrid. Aesthetics.</p>

        {/* Social proof line */}
        <div style={{ display: "flex", gap: 20, marginBottom: 40, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: "🤸", text: "Planche & Front Lever" },
            { icon: "💪", text: "Skill + Muscle" },
            { icon: "🌟", text: "OAH & OAP Bonuses" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span style={{ fontFamily: "var(--fb)", fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: 0.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="hero-ctas" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
          <a href="#programs"><button className="btn-primary pulse-glow" style={{ fontSize: 15, padding: "15px 42px", letterSpacing: 3 }}>Start Training <span className="wiggle" style={{display:"inline-block"}}><ChevronDown size={13} /></span></button></a>
          <a href="#results-section"><button className="btn-secondary">📸 Real Results</button></a>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.35 }}>
          <span style={{ fontFamily: "var(--fb)", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "var(--text-faint)" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--orange), transparent)" }} />
        </div>
      </section>

      {/* ── MANIFESTO ─────────────────────────────────────────── */}
      <section id="method" style={{ padding: "90px 22px", position: "relative", zIndex: 1, borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="pg2">
            <div>
              <div className="badge" style={{ background: "rgba(255,69,0,.08)", color: "var(--orange)", border: "1px solid var(--orange-border)", marginBottom: 22, letterSpacing: 2, fontSize: 9 }}>⚠️ THE HARD TRUTH</div>
              <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(32px,4.5vw,58px)", textTransform: "uppercase", lineHeight: .92, marginBottom: 28 }}>
                TikTok won't<br /><span style={{ WebkitTextStroke: "2px var(--orange)", WebkitTextFillColor: "transparent" }}>build your</span><br />body.
              </h2>
              <p style={{ fontFamily: "var(--fb)", fontSize: 15, color: "var(--text-dim)", lineHeight: 1.75, marginBottom: 20 }}>
                You spend hours scrolling physiques on TikTok. You watch "30 push-up challenge" videos. You try random exercises without understanding why, in what order, or how long to rest.
              </p>
              <p style={{ fontFamily: "var(--fb)", fontSize: 15, color: "var(--text-dim)", lineHeight: 1.75, marginBottom: 32 }}>
                <strong style={{ color: "var(--text)" }}>The result:</strong> you get injured, you plateau, you quit. That's not a lack of willpower — it's a lack of method.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["❌", "Copying an exercise without knowing its prerequisites"],
                  ["❌", "Training 7 days a week without understanding recovery"],
                  ["❌", "Skipping warm-ups — the fastest route to injury"],
                  ["❌", "Skipping intermediate progressions and jumping ahead"],
                  ["❌", "Ignoring rest times between sets"],
                ].map(([icon, text], i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                    <span style={{ fontFamily: "var(--fb)", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "linear-gradient(135deg, rgba(255,69,0,0.06), rgba(255,69,0,0.02))", border: "1px solid var(--orange-border)", borderRadius: 12, padding: "32px 30px" }}>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: 13, letterSpacing: 3, color: "var(--orange)", marginBottom: 20, textTransform: "uppercase" }}>✅ What you actually need</div>
                {[
                  { icon: "🗓️", title: "A structured multi-week plan", desc: "Every session is designed to prepare the next. No improvisation, no guesswork." },
                  { icon: "🔥", title: "A mandatory specific warm-up", desc: "Joints, tendons, nervous system — properly prepare your body before every effort." },
                  { icon: "⏱️", title: "Precise rest times between sets", desc: "Too short = accumulated fatigue. Too long = lost adaptation. Every second matters." },
                  { icon: "📈", title: "Progressive intermediate exercises", desc: "A full planche doesn't appear from nowhere. There are 6 progressions before it. Each one matters." },
                  { icon: "🛑", title: "Knowing when NOT to train", desc: "Rest days are adaptation days. Remove rest, you remove gains. Simple as that." },
                  { icon: "🧠", title: "Understanding the why, not just the what", desc: "Every exercise has biomechanical logic. Understand it and you multiply your results." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 5 ? 20 : 0, paddingBottom: i < 5 ? 20 : 0, borderBottom: i < 5 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                    <span style={{ fontSize: 20, flexShrink: 0, width: 32, textAlign: "center" }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 4 }}>{item.title}</div>
                      <p style={{ fontFamily: "var(--fb)", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUIZ ──────────────────────────────────────────────── */}
      <div id="quiz-section">
        <QuizSection onOpen={openProg} />
      </div>

      {/* ── PROGRAMS ──────────────────────────────────────────── */}
      <section id="programs" style={{ padding: "60px 22px 20px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1260, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ background: "var(--orange-dim)", color: "var(--orange)", border: "1px solid var(--orange-border)", marginBottom: 14 }}>PROGRAMS</div>
            <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(34px,5vw,66px)", textTransform: "uppercase" }}>CHOOSE YOUR PATH</h2>
          </div>
          <CatSection label="STRENGTH & SKILLS" sublabel="Master gravity — Planche & Front Lever from beginner to elite" progs={skillProgs} onOpen={openProg} />
          <CatSection label="COMBO — BEST DUO" sublabel="Planche Foundation + Front Lever — two iconic skills, one price" progs={comboGroup} onOpen={openProg} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 64 }} className="pg2">
            <CatSection label="HYPERTROPHY" sublabel="No equipment — bodyweight muscle & skills" progs={hypertrophyProgs} onOpen={openProg} />
            <CatSection label="HYBRID" sublabel="Gym-based strength + calisthenics skills" progs={hybridProgs} onOpen={openProg} />
          </div>
        </div>
      </section>

      {/* ── BUNDLE SECTION WITH COUNTDOWN ─────────────────────── */}
      <BundleSection onOpen={openProg} />

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <div id="results-section"><TestimonialsSection /></div>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── SELECTION GUIDE ───────────────────────────────────── */}
      <section id="guide" style={{ padding: "70px 22px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="badge" style={{ background: "rgba(255,255,255,.04)", color: "var(--text-dim)", border: "1px solid var(--border-bright)", marginBottom: 14 }}>SELECTION GUIDE</div>
            <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(28px,4.5vw,56px)", textTransform: "uppercase" }}>WHICH PROGRAM IS FOR YOU?</h2>
          </div>
          <div className="surface" style={{ borderRadius: 8, overflowX: "auto" }}>
            <table className="data-table">
              <thead><tr>{["Program", "Category", "Level", "Prerequisite", "Dual Track", "Price", ""].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {PROGRAMS.map(p => (
                  <tr key={p.id} style={{ cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,69,0,.04)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    onClick={() => p.stripeUrl ? window.open(p.stripeUrl, "_blank") : openProg(p)}>
                    <td style={{ fontWeight: 700, color: "var(--text)" }}>{p.title}</td>
                    <td><span className="badge" style={{ background: "rgba(255,255,255,.04)", color: "var(--text-dim)", border: "1px solid var(--border)", fontSize: 9 }}>{p.categoryGroup}</span></td>
                    <td><span className="badge" style={{ background: `${p.levelColor}15`, color: p.levelColor, border: `1px solid ${p.levelColor}28` }}>{p.level}</span></td>
                    <td style={{ fontSize: 12 }}>{(p as any).prereq ?? "—"}</td>
                    <td style={{ textAlign: "center" }}>{p.dualTrack ? <span style={{ color: "var(--orange)", fontWeight: 700 }}>✓</span> : <span style={{ color: "var(--text-faint)" }}>—</span>}</td>
                    <td>
                      <span style={{ fontFamily: "var(--fd)", fontSize: 18, fontWeight: 900, color: p.category === "bundle" ? "var(--orange)" : "var(--text)" }}>${p.price}</span>
                      {p.originalPrice && <span style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--text-faint)", marginLeft: 6, textDecoration: "line-through" }}>${p.originalPrice}</span>}
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      {p.stripeUrl && (
                        <a href={p.stripeUrl} target="_blank" rel="noopener noreferrer">
                          <button className="btn-primary" style={{ padding: "6px 14px", fontSize: 10, whiteSpace: "nowrap" }}>Buy Now</button>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section style={{ padding: "80px 22px", position: "relative", zIndex: 1, background: "linear-gradient(180deg, transparent, rgba(255,69,0,0.04))", borderTop: "1px solid var(--border)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(32px,5vw,56px)", textTransform: "uppercase", lineHeight: .9, marginBottom: 16 }}>
            Stop scrolling.<br /><span style={{ WebkitTextStroke: "2px var(--orange)", WebkitTextFillColor: "transparent" }}>Start training.</span>
          </h2>
          <p style={{ fontFamily: "var(--fb)", fontSize: 15, color: "var(--text-dim)", marginBottom: 32, lineHeight: 1.65 }}>
            Every day without a structured program is a day of spinning in place. Pick your program and start today.
          </p>
          <a href="#programs">
            <button className="btn-primary pulse-glow" style={{ fontSize: 15, padding: "16px 48px", letterSpacing: 3 }}>
              Choose Your Program →
            </button>
          </a>
        </div>
      </section>

      <footer className="no-print" style={{ borderTop: "1px solid var(--border)", padding: "28px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 14, flexWrap: "wrap" }}>
          {["Programs", "Results", "FAQ", "Guide"].map(l => (
            <a key={l} href={`#${l.toLowerCase() === "results" ? "results-section" : l.toLowerCase() === "faq" ? "faq" : l.toLowerCase()}`}
              style={{ fontFamily: "var(--fd)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-faint)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--orange)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>{l}</a>
          ))}
        </div>
        <p style={{ fontFamily: "var(--fb)", fontSize: 11, color: "var(--text-faint)", letterSpacing: 1 }}>© 2025 GRAVITYLAB — All rights reserved</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <AppInner />
    </Suspense>
  );
}
