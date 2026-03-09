// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface ProgressionStep {
  label: string;
  emoji: string;
  hold?: string;
  active?: boolean;
}

export interface Exercise {
  title: string;
  sets: string;
  reps: string;
  rest: string;
  cues: string[];
  proTip: string;
  progression?: ProgressionStep[];
  intensity: string;
}

export interface Phase {
  name: string;
  tag: string;
  duration: string;
  icon: string;
  description: string;
  exercises: Exercise[];
}

export interface WarmupExercise {
  name: string;
  duration: string;
  notes: string;
}

export interface CooldownExercise {
  name: string;
  duration: string;
  notes: string;
}

export interface Program {
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

export const plancheFoundation: Program = {
  id: "planche-foundation",
  title: "Planche Foundation",
  subtitle: "From Zero to Tuck Planche",
  tagline: "The first 8 weeks that will define your calisthenics career.",
  level: "Beginner",
  levelColor: "#22c55e",
  category: "skill",
  categoryGroup: "STRENGTH & SKILLS",
  price: "27",
  icon: "🤸",
  glowColor: "rgba(34,197,94,0.12)",
  goals: [
    "Develop bulletproof scapular depression & protraction",
    "Build shoulder blade control from scratch",
    "Achieve a clean 5-second tuck planche hold",
    "Lay the structural foundation for advanced planche variants",
  ],
  mindset: "The planche is not built in a session — it is carved over months. In these first 8 weeks, your only job is to own every rep, own every second, and build connective tissue strength that will protect you for years. Ego has no place here. Perfect technique over everything.",
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
            "Start in straight-arm plank",
            "Let chest drop by pinching scapulas (don't bend elbows)",
            "Push floor away to 'round' and protract scapulas",
            "Top position: feel your upper back pushing to the ceiling",
          ],
          proTip: "Record from the side. You should see your upper back rising noticeably in the protracted position. If not, you're not protracting enough.",
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
            "Shoulders must be anterior to wrists — this is mandatory",
            "Posterior pelvic tilt (tuck your tailbone)",
            "Arms stay locked at 0° — any bend means less lean",
            "Gaze: floor 10 inches in front",
          ],
          proTip: "The lean angle is everything. Use a mirror or camera. Your shoulders should be 10–15cm in front of your hands by Week 3.",
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
            "Hands turned out 45° or more",
            "Weight forward over hands — shoulders above wrists",
            "Lower chest to floor slowly (3-second negative)",
            "Push back up while maintaining forward lean",
          ],
          proTip: "The further you rotate hands and lean forward, the harder this becomes. Start conservative. Quality reps only.",
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
            "From tuck L-sit, lean forward until feet lift",
            "Hips parallel to floor — do not let them sag",
            "Maximize scapular protraction throughout",
            "Every second counts — this is CNS-intensive",
          ],
          proTip: "Film every session from the side. You want hips level with shoulders. The moment hips drop, the hold ends — don't count dropped reps.",
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
      ],
    },
  ],
  cooldown: sharedCooldown,
  benefits: [
    "5-second tuck planche hold by Week 8",
    "Bulletproof wrist & shoulder preparation",
    "Correct motor patterns for all future planche work",
  ],
};

// ─── PLANCHE ELITE ────────────────────────────────────────────────────────────

export const plancheElite: Program = {
  id: "planche-elite",
  title: "Planche Elite",
  subtitle: "From Straddle to Full Planche",
  tagline: "The advanced protocol that separates athletes from artists.",
  level: "Intermediate / Advanced",
  levelColor: "#f97316",
  category: "skill",
  categoryGroup: "STRENGTH & SKILLS",
  price: "39",
  icon: "⚡",
  glowColor: "rgba(249,115,22,0.15)",
  goals: [
    "Achieve a clean 3-second straddle planche hold",
    "Build the strength base for full planche attempts",
    "Master the advanced tuck → straddle transition",
    "Develop ring planche stability for elite carryover",
  ],
  mindset: "You are no longer a beginner. This is where true separation happens. The athletes who reach this stage and fail are those who let ego push volume before quality. Your job is to be precise, patient, and relentless. The full planche is not a trick — it's a year or more of perfect training distilled into one moment.",
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
          title: "Straddle Planche Push-Ups",
          sets: "4",
          reps: "4×2–4 reps",
          rest: "3 min",
          intensity: "Elite",
          cues: [
            "One of the hardest exercises in calisthenics",
            "Maintain straddle throughout the movement",
            "Lower only 3–5cm — range of motion is minimal at this level",
            "Even 1 rep is meaningful progress",
          ],
          proTip: "Most athletes at this level manage 1–2 partial reps. That is perfectly normal. Do not compare your training to highlight reels.",
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
      ],
    },
  ],
  cooldown: sharedCooldown,
  benefits: [
    "Straddle planche in 10 weeks",
    "Ring planche stability",
    "Full planche approach within 6 months",
  ],
};

// ─── FRONT LEVER MASTERY ──────────────────────────────────────────────────────

export const frontLeverMastery: Program = {
  id: "front-lever",
  title: "Front Lever Mastery",
  subtitle: "Complete Guide to Full Front Lever",
  tagline: "Build the posterior chain of a gymnast.",
  level: "All Levels",
  levelColor: "#3b82f6",
  category: "skill",
  categoryGroup: "STRENGTH & SKILLS",
  price: "29",
  icon: "🎯",
  glowColor: "rgba(59,130,246,0.15)",
  goals: [
    "Achieve a clean 5-second full front lever hold",
    "Build elite-level lat and posterior chain strength",
    "Master the tuck → straddle → full progression",
    "Develop pulling strength applicable to muscle-ups and rows",
  ],
  mindset: "The front lever is the ultimate test of pulling strength and body tension. Unlike the planche, it is achievable for most dedicated athletes within 3–6 months. The key is total body tension — it is not a lat exercise, it's a full-body isometric. Every muscle from your feet to your hands must be engaged simultaneously.",
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
            "Knees to chest, back perfectly flat — no rounding",
            "Arms straight — the moment you bend, it's not a lever",
            "Depress AND retract scapulas simultaneously",
            "Hips at bar height — not below",
          ],
          proTip: "Back flatness is the single most important cue. A rounded back is a compensated lever, not a real one. Film from the side.",
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
            "Start in tuck front lever hang",
            "Pull bar to chest — maintain tuck throughout",
            "Slow negative (3 seconds down)",
            "This is the most strength-building exercise in this program",
          ],
          proTip: "If you can do 5+ clean reps, you are ready to progress the lever position. These rows are a stronger signal of readiness than hold time alone.",
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
            "Legs together, toes pointed, body rigid",
            "Think: 'steel rod from head to toe'",
            "Active shoulder depression is still required — don't disengage",
            "The hold lives and dies by your lats and core working as one",
          ],
          proTip: "Your first full front lever will likely be a surprise — one rep where everything clicks. Have your camera ready. That moment is worth documenting.",
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
  ],
  cooldown: leverCooldown,
  benefits: [
    "Full front lever in 12 weeks",
    "Elite posterior chain conditioning",
    "Pulling strength for muscle-ups and advanced rows",
  ],
};

// ─── HYBRID ATHLETE ───────────────────────────────────────────────────────────

export const hybridAthlete: Program = {
  id: "hybrid-athlete",
  title: "Hybrid Athlete",
  subtitle: "Bodyweight Skills + Weighted Lifts",
  tagline: "The physique of a gymnast. The strength of a powerlifter.",
  level: "Intermediate",
  levelColor: "#a855f7",
  category: "hybrid",
  categoryGroup: "HYBRID",
  price: "47",
  icon: "💪",
  glowColor: "rgba(168,85,247,0.15)",
  badge: "BEST-SELLER",
  dualTrack: true,
  trackLabels: ["Home Routine", "Gym Routine"],
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
            "Choose your skill: Planche OR Lever — not both in same session",
            "Every rep must be your best — not just completed",
            "If quality drops, stop the set immediately",
            "Log every session: position held, seconds, quality rating /10",
          ],
          proTip: "Film every skill session from the side. Compare Week 1 to Week 4. The visual feedback is more valuable than any coach cue.",
        },
        {
          title: "Weighted Pull-Ups",
          sets: "5",
          reps: "5 reps @ 70–80% 1RM",
          rest: "2.5 min",
          intensity: "Strength",
          cues: [
            "Add weight via belt, vest, or dumbbell between legs",
            "Full hang to chin over bar — no kipping",
            "3-second descent every rep",
            "Scapular engagement throughout — do not disengage at bottom",
          ],
          proTip: "Weighted pull-up strength directly transfers to front lever. If you increase your weighted pull-up max by 20%, your lever will improve measurably.",
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
  ],
  cooldown: [
    { name: "Hip Flexor Couch Stretch", duration: "2 min each", notes: "Essential after lower body gym work. Back foot on wall, front foot forward. Hold and breathe." },
    { name: "Thoracic Extension over Foam Roller", duration: "3 min", notes: "Roll from mid to upper back. Pause at each segment. Decompresses spine after heavy loading." },
    { name: "Shoulder Sleeper Stretch", duration: "90s each", notes: "Lying on side. Gently press forearm toward floor. Targets posterior capsule tightness." },
    ...sharedCooldown.slice(4),
  ],
  benefits: [
    "Skill + Hypertrophy fusion in 8 weeks",
    "Complete athlete physique",
    "Progressive overload across both tracks",
  ],
};

// ─── FULL HYPERTROPHY ─────────────────────────────────────────────────────────

export const fullHypertrophy: Program = {
  id: "hypertrophy",
  title: "Full Hypertrophy",
  subtitle: "Aesthetic-Focused Muscle Building",
  tagline: "12 weeks to your most aesthetic physique.",
  level: "Beginner / Intermediate",
  levelColor: "#ec4899",
  category: "hypertrophy",
  categoryGroup: "HYPERTROPHY",
  price: "47",
  icon: "🔥",
  glowColor: "rgba(236,72,153,0.15)",
  dualTrack: true,
  trackLabels: ["No-Equipment", "Full Gym Access"],
  goals: [
    "Maximize muscle size through evidence-based hypertrophy principles",
    "Build an aesthetic physique with balanced proportions",
    "Progressive overload across 12 structured weeks",
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
            "Hips high — inverted V position",
            "Lower until head touches floor",
            "The steeper your pike, the more deltoid activation",
            "Slow negative (3 seconds) for maximum time under tension",
          ],
          proTip: "Pike push-ups done with a 3-second negative and 1-second pause at bottom are as effective as overhead pressing for deltoid hypertrophy.",
          progression: [
            { label: "Standard Pike", emoji: "▽", active: true },
            { label: "Feet Elevated", emoji: "⬆️", active: false },
            { label: "Pseudo-Handstand", emoji: "🤸", active: false },
          ],
        },
        {
          title: "Archer Push-Ups",
          sets: "4",
          reps: "8 reps each side",
          rest: "90s",
          intensity: "Moderate-High",
          cues: [
            "One arm extended fully to the side — no bend",
            "Lower toward the bent arm (90° at elbow)",
            "The extended arm provides counterbalance only",
            "This is a unilateral chest exercise — feel the stretch deeply",
          ],
          proTip: "Archer push-ups provide similar pectoral stretch to a cable fly or dumbbell press. The unilateral loading increases difficulty by ~40% vs regular push-ups.",
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
    "Aesthetic physique in 12 weeks",
    "Progressive overload with both tracks",
    "Scientific hypertrophy protocol",
  ],
};

// ─── BUNDLE ───────────────────────────────────────────────────────────────────

export const ultimateBundle: Program = {
  id: "bundle",
  title: "Ultimate Gravity Bundle",
  subtitle: "Access to ALL 5 Programs",
  tagline: "The complete calisthenics & physique library — one price, lifetime access.",
  level: "All Levels",
  levelColor: "#FF4500",
  category: "bundle",
  categoryGroup: "BUNDLE",
  price: "97",
  originalPrice: "189",
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
    "All 5 programs — lifetime access",
    "Save $92 vs individual purchase",
    "Future program updates included",
  ],
};

// ─── ALL PROGRAMS REGISTRY ────────────────────────────────────────────────────

export const allPrograms: Program[] = [
  plancheFoundation,
  plancheElite,
  frontLeverMastery,
  hybridAthlete,
  fullHypertrophy,
  ultimateBundle,
];

export const strengthSkillsGroup = [plancheFoundation, plancheElite, frontLeverMastery];
export const hybridGroup = [hybridAthlete];
export const hypertrophyGroup = [fullHypertrophy];
