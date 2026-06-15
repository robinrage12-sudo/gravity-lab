"use client";

import { useState } from "react";

// ═══════════════════════════════════════════════════════
// L'ÉCOLE DU POIDS DU CORPS — Page de vente
// Couleurs reprises de la couverture : crème, noir, orange brûlé
//
// ⚠️ IMPORTANT : placez l'image de couverture dans /public/cover.png
// (le fichier "Gemini_Generated_Image_mprsycmprsycmprs.png" renommé en cover.png)
// ═══════════════════════════════════════════════════════

const STRIPE_URL = "https://buy.stripe.com/8x2fZj3UJ8etbjtgZT3ZK0s";

const FAQS = [
  {
    q: "Ai-je besoin de matériel pour suivre ce programme ?",
    a: "Non. Tous les exercices et programmes du guide sont conçus pour être réalisés au poids du corps, avec un sol plat et éventuellement une barre de traction ou deux chaises robustes. Aucune salle de sport n'est nécessaire.",
  },
  {
    q: "Le guide est-il adapté aux débutants complets ?",
    a: "Oui. Le module 4 propose un programme débutant full body pensé pour toute personne n'ayant jamais pratiqué, avec une progression claire vers les niveaux intermédiaire et avancé.",
  },
  {
    q: "Sous quel format vais-je recevoir le guide ?",
    a: "Le guide est livré au format PDF, téléchargeable immédiatement après votre achat. Vous pouvez le lire sur votre téléphone, votre tablette ou votre ordinateur, et l'imprimer si vous le souhaitez.",
  },
  {
    q: "Le guide aborde-t-il des figures comme la planche ou le front lever ?",
    a: "Oui. Le module 5 est entièrement consacré aux figures de force avancées — planche, front lever, et autres mouvements de calisthénie statique — avec leurs prérequis et leur progression étape par étape.",
  },
  {
    q: "Combien de temps avant de voir des résultats ?",
    a: "Le guide explique une courbe de progression réaliste : les premiers résultats visibles apparaissent généralement après 4 à 6 semaines de pratique régulière, des résultats marquants après 3 à 6 mois.",
  },
  {
    q: "Puis-je accéder au guide sur plusieurs appareils ?",
    a: "Oui, une fois téléchargé, le fichier PDF vous appartient et est lisible sur tous vos appareils, sans limite de connexion ni abonnement.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #ECE0D2",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          fontSize: 15,
          fontWeight: 800,
          color: "#2b2420",
          fontFamily: "inherit",
        }}
      >
        {q}
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#FFE7D6",
            color: "#E0440A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 16,
            fontWeight: 900,
            transition: "transform .25s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 240 : 0,
          overflow: "hidden",
          transition: "max-height .3s ease",
        }}
      >
        <p
          style={{
            padding: "0 24px 22px",
            fontSize: 14,
            color: "#6f6258",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CheckOrange() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5E1A" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Home() {
  return (
    <div
      style={{
        background: "#FBF3E8",
        color: "#2b2420",
        fontFamily:
          "'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        .display { font-family: 'Archivo Black','Archivo',sans-serif; }
        .btn-primary {
          display:inline-flex;align-items:center;gap:10px;
          background:#FF5E1A;color:#fff;
          font-weight:800;font-size:15px;letter-spacing:.5px;
          padding:18px 36px;border-radius:999px;
          text-decoration:none;border:none;cursor:pointer;
          box-shadow:0 10px 30px -10px rgba(255,94,26,.6);
          transition:transform .15s ease, box-shadow .2s ease, background .2s ease;
        }
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 36px -8px rgba(255,94,26,.7);background:#E0440A;}
        .nav-cta {
          background:#161311;color:#FBF3E8;
          font-weight:800;font-size:13px;letter-spacing:.5px;
          padding:10px 22px;border-radius:999px;text-decoration:none;
          transition:transform .15s ease, background .2s ease;
          white-space:nowrap;
        }
        .nav-cta:hover{background:#FF5E1A;transform:translateY(-1px);}
        .eyebrow {
          display:inline-flex;align-items:center;gap:8px;
          background:#FFE7D6;color:#E0440A;
          font-weight:800;font-size:12px;letter-spacing:2px;
          padding:7px 16px;border-radius:999px;
          text-transform:uppercase;
        }
        .eyebrow::before{content:"";width:7px;height:7px;border-radius:50%;background:#FF5E1A;}
        .eyebrow-dark {
          background:rgba(255,94,26,.15);color:#FF5E1A;
        }
        .eyebrow-dark::before{background:#FF5E1A;}
        h1, h2 { text-transform: uppercase; letter-spacing: -0.5px; line-height: 1.05; font-family:'Archivo Black','Archivo',sans-serif; }
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .cover-wrap { order: -1; }
          .cover-card { max-width: 240px !important; }
          .problem-grid { grid-template-columns: 1fr !important; }
          .preview-grid { grid-template-columns: repeat(2,1fr) !important; }
          .module-row { grid-template-columns: 1fr !important; gap: 10px !important; }
          .module-num { font-size: 36px !important; }
          .included { grid-template-columns: 1fr !important; }
          .offer-grid { grid-template-columns: 1fr !important; text-align: center !important; }
          .offer h2 { text-align: center !important; }
          .offer-features { align-items: center !important; }
          .testi-grid { grid-template-columns: 1fr !important; }
          .offer { padding: 40px 24px !important; border-radius: 20px !important; }
          .nav-cta { padding: 9px 16px !important; font-size: 12px !important; }
        }
      `}</style>

      {/* ───────── NAV ───────── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(251,243,232,0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #ECE0D2",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            maxWidth: 1120,
            margin: "0 auto",
          }}
        >
          <div className="display" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, letterSpacing: 1 }}>
            L'ÉCOLE DU <span style={{ color: "#FF5E1A" }}>POIDS DU CORPS</span>
          </div>
          <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
            Obtenir le guide
          </a>
        </nav>
      </header>

      {/* ───────── HERO ───────── */}
      <section style={{ padding: "64px 0 80px", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            content: "",
            position: "absolute",
            top: -200,
            right: -200,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, #FFE7D6 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <div
          className="hero-grid"
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 56,
            alignItems: "center",
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 22 }}>
              Ebook PDF · 6 modules
            </div>
            <h1 style={{ fontSize: "clamp(38px,6vw,68px)", marginBottom: 22 }}>
              Construisez un physique <span style={{ color: "#FF5E1A" }}>d'élite</span> avec votre propre corps
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "#6f6258",
                maxWidth: 480,
                marginBottom: 34,
              }}
            >
              Le guide complet de calisthénie pour développer force, muscle, figures de gymnaste et contrôle
              total du corps — sans salle de sport, sans matériel, et sans deviner quoi faire.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginBottom: 28 }}>
              <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Télécharger le guide — 29,99 €
              </a>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", color: "#6f6258", fontSize: 13, fontWeight: 600 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckOrange /> Téléchargement instantané (PDF)
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckOrange /> Paiement sécurisé
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckOrange /> Aucun équipement requis
              </span>
            </div>
          </div>

          <div className="cover-wrap" style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center" }}>
            <div
              className="cover-card"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 340,
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 30px 70px -20px rgba(22,19,17,.35), 0 10px 30px -10px rgba(255,94,26,.25)",
                transform: "rotate(2deg)",
                border: "6px solid #fff",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/cover.png" alt="Couverture du guide L'École du Poids du Corps" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
            <div
              className="display"
              style={{
                position: "absolute",
                bottom: -18,
                left: -26,
                background: "#161311",
                color: "#FBF3E8",
                borderRadius: 14,
                padding: "14px 18px",
                fontSize: 13,
                lineHeight: 1.3,
                boxShadow: "0 16px 30px -12px rgba(0,0,0,.4)",
                transform: "rotate(-3deg)",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "#FF5E1A", fontSize: 22, display: "block" }}>6</span>
              modules complets
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PROBLEM ───────── */}
      <section style={{ padding: "80px 0", background: "#161311", color: "#FBF3E8" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
            <div className="eyebrow eyebrow-dark" style={{ marginBottom: 16 }}>
              Le problème
            </div>
            <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", marginBottom: 14, color: "#fff" }}>
              Pourquoi vous tournez en rond depuis des mois
            </h2>
            <p style={{ color: "#b9aea3", fontSize: 16, lineHeight: 1.6 }}>
              Vous faites des pompes et des squats régulièrement, mais votre corps ne change pas. Ce n'est pas
              un problème de motivation — c'est un problème de méthode.
            </p>
          </div>
          <div className="problem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            <div style={{ background: "#221d19", border: "1px solid #332b25", borderRadius: 16, padding: "28px 24px" }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "rgba(255,94,26,.12)",
                  color: "#FF5E1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>Vous stagnez après 3 semaines</h3>
              <p style={{ fontSize: 14, color: "#b9aea3", lineHeight: 1.6 }}>
                Faire les mêmes exercices, au même rythme, encore et encore : votre corps s'adapte et arrête de
                progresser. Sans surcharge progressive, vous développez seulement l'endurance.
              </p>
            </div>
            <div style={{ background: "#221d19", border: "1px solid #332b25", borderRadius: 16, padding: "28px 24px" }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "rgba(255,94,26,.12)",
                  color: "#FF5E1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                </svg>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>Vous improvisez chaque séance</h3>
              <p style={{ fontSize: 14, color: "#b9aea3", lineHeight: 1.6 }}>
                Sans programme structuré ni technique précise, vous gaspillez de l'énergie sur des mouvements mal
                exécutés — et vous risquez les blessures articulaires.
              </p>
            </div>
            <div style={{ background: "#221d19", border: "1px solid #332b25", borderRadius: 16, padding: "28px 24px" }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "rgba(255,94,26,.12)",
                  color: "#FF5E1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-3-3-4 4" />
                </svg>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>Vous ne savez pas quoi manger ni quand récupérer</h3>
              <p style={{ fontSize: 14, color: "#b9aea3", lineHeight: 1.6 }}>
                L'entraînement crée le stimulus, mais la croissance se passe dans votre assiette et dans votre
                sommeil. Sans ces repères, vous perdez l'essentiel de vos résultats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── MODULES ───────── */}
      <section id="contenu" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Ce que contient le guide
            </div>
            <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", marginBottom: 14 }}>
              6 modules progressifs, de zéro à la maîtrise totale
            </h2>
            <p style={{ color: "#6f6258", fontSize: 16, lineHeight: 1.6 }}>
              Chaque module s'appuie sur le précédent. Fondations scientifiques, technique parfaite des 9
              exercices piliers, méthode de progression, figures de force avancées, programmes complets et
              nutrition — tout est inclus.
            </p>
          </div>

          <div>
            {/* Module 1 */}
            <div className="module-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 28, alignItems: "start", padding: "32px 0", borderBottom: "1px solid #ECE0D2" }}>
              <div className="module-num display" style={{ fontSize: 54, lineHeight: 1, WebkitTextStroke: "2px #FF5E1A", color: "transparent" }}>01</div>
              <div>
                <h3 style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, letterSpacing: "-.2px" }}>Les fondations scientifiques de la calisthénie</h3>
                <p style={{ color: "#6f6258", fontSize: 15, lineHeight: 1.65, marginBottom: 14 }}>
                  Comprenez ce qui fait réellement grossir un muscle : tension mécanique, recrutement des unités
                  motrices, stress métabolique et adaptation tendineuse. La base théorique qui transforme chaque
                  répétition en progrès mesurable.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Tension mécanique</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Mécanismes de croissance</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Santé des tendons</span>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="module-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 28, alignItems: "start", padding: "32px 0", borderBottom: "1px solid #ECE0D2" }}>
              <div className="module-num display" style={{ fontSize: 54, lineHeight: 1, WebkitTextStroke: "2px #FF5E1A", color: "transparent" }}>02</div>
              <div>
                <h3 style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, letterSpacing: "-.2px" }}>L'anatomie des 9 exercices piliers</h3>
                <p style={{ color: "#6f6258", fontSize: 15, lineHeight: 1.65, marginBottom: 14 }}>
                  Pompes, dips, tractions, tractions australiennes, squats, squats sautés, levées de jambes,
                  planche latérale et hollow body : exécution technique détaillée, muscles ciblés, erreurs
                  courantes et tableaux de progression niveau par niveau.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Push · Pull · Legs · Abs</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Erreurs à corriger</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Progressions par niveau</span>
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className="module-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 28, alignItems: "start", padding: "32px 0", borderBottom: "1px solid #ECE0D2" }}>
              <div className="module-num display" style={{ fontSize: 54, lineHeight: 1, WebkitTextStroke: "2px #FF5E1A", color: "transparent" }}>03</div>
              <div>
                <h3 style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, letterSpacing: "-.2px" }}>La surcharge progressive sans fonte</h3>
                <p style={{ color: "#6f6258", fontSize: 15, lineHeight: 1.65, marginBottom: 14 }}>
                  La méthode pour continuer à progresser indéfiniment sans haltères : évolution des paramètres
                  d'entraînement, changement de levier, lest artificiel et tenue d'un journal d'entraînement
                  structuré.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Changement de levier</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Lest artificiel</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Training log</span>
                </div>
              </div>
            </div>

            {/* Module 4 */}
            <div className="module-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 28, alignItems: "start", padding: "32px 0", borderBottom: "1px solid #ECE0D2" }}>
              <div className="module-num display" style={{ fontSize: 54, lineHeight: 1, WebkitTextStroke: "2px #FF5E1A", color: "transparent" }}>04</div>
              <div>
                <h3 style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, letterSpacing: "-.2px" }}>Programmes d'entraînement clés en main</h3>
                <p style={{ color: "#6f6258", fontSize: 15, lineHeight: 1.65, marginBottom: 14 }}>
                  Trois programmes complets prêts à l'emploi — débutant full body, intermédiaire upper/lower et
                  avancé push/pull/legs — avec échauffement universel et stratégie de déload pour progresser sans
                  surentraînement.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Débutant → Avancé</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Échauffement & récupération</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Déload & périodisation</span>
                </div>
              </div>
            </div>

            {/* Module 5 */}
            <div className="module-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 28, alignItems: "start", padding: "32px 0", borderBottom: "1px solid #ECE0D2" }}>
              <div className="module-num display" style={{ fontSize: 54, lineHeight: 1, WebkitTextStroke: "2px #FF5E1A", color: "transparent" }}>05</div>
              <div>
                <h3 style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, letterSpacing: "-.2px" }}>Les figures de force : planche, front lever & autres skills</h3>
                <p style={{ color: "#6f6258", fontSize: 15, lineHeight: 1.65, marginBottom: 14 }}>
                  Apprenez les figures emblématiques de la calisthénie — la planche, le front lever et d'autres
                  mouvements de gymnastique avancés — avec leurs prérequis, leurs progressions étape par étape et
                  les erreurs à éviter pour ne pas vous blesser.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Planche</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Front Lever</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Progressions par étapes</span>
                </div>
              </div>
            </div>

            {/* Module 6 */}
            <div className="module-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 28, alignItems: "start", padding: "32px 0" }}>
              <div className="module-num display" style={{ fontSize: 54, lineHeight: 1, WebkitTextStroke: "2px #FF5E1A", color: "transparent" }}>06</div>
              <div>
                <h3 style={{ fontSize: 21, fontWeight: 800, marginBottom: 10, letterSpacing: "-.2px" }}>Nutrition, récupération & mindset</h3>
                <p style={{ color: "#6f6258", fontSize: 15, lineHeight: 1.65, marginBottom: 14 }}>
                  L'équation protéique, la sèche vs la prise de masse, le rôle du sommeil et de la
                  supplémentation, et les principes mentaux qui font la différence entre ceux qui réussissent et
                  ceux qui abandonnent.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Plan nutritionnel</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Sommeil & récupération</span>
                  <span style={{ background: "#FFE7D6", color: "#E0440A", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>Mindset & discipline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PREVIEW STRIP ───────── */}
      <section style={{ padding: "80px 0", background: "#161311", color: "#fff" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
            <div className="eyebrow eyebrow-dark" style={{ marginBottom: 16 }}>
              En chiffres
            </div>
            <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", marginBottom: 14, color: "#fff" }}>
              Un guide dense, structuré pour durer
            </h2>
            <p style={{ color: "#b9aea3", fontSize: 16, lineHeight: 1.6 }}>
              Pensé comme un compagnon de longue durée — pas un guide qu'on lit une fois et qu'on oublie.
            </p>
          </div>
          <div className="preview-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {[
              { big: "6", lbl: "Modules progressifs" },
              { big: "9", lbl: "Exercices piliers décortiqués" },
              { big: "3", lbl: "Programmes clés en main" },
              { big: "PDF", lbl: "Format, accès à vie" },
            ].map((item) => (
              <div key={item.lbl} style={{ background: "#221d19", border: "1px solid #332b25", borderRadius: 14, padding: "24px 18px", textAlign: "center" }}>
                <div className="display" style={{ fontSize: 38, color: "#FF5E1A", marginBottom: 6 }}>{item.big}</div>
                <div style={{ fontSize: 13, color: "#b9aea3", fontWeight: 600, lineHeight: 1.4 }}>{item.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── INCLUDED / VALUE ───────── */}
      <section id="inclus" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div className="included" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 46, alignItems: "center" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                Ce que vous obtenez
              </div>
              <h2 style={{ textAlign: "left", fontSize: "clamp(28px,4.5vw,46px)" }}>
                Tout ce qu'il faut pour passer à l'action dès aujourd'hui
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 24 }}>
                {[
                  {
                    title: "Tableaux de progression clairs",
                    text: "Pour chaque exercice, une échelle de difficulté du niveau débutant au niveau élite — vous savez toujours quelle est l'étape suivante.",
                  },
                  {
                    title: "3 programmes complets, semaine par semaine",
                    text: "Débutant, intermédiaire, avancé : séries, répétitions, tempo, temps de repos et planning hebdomadaire détaillés.",
                  },
                  {
                    title: "Les figures avancées expliquées pas à pas",
                    text: "Planche, front lever et autres skills de gymnastique : prérequis, étapes de progression et erreurs à éviter.",
                  },
                  {
                    title: "Plan nutritionnel chiffré",
                    text: "Calculs de protéines, exemples d'aliments, ratios sèche/prise de masse et guide de supplémentation basé sur la science.",
                  },
                  {
                    title: "Feuille de route avec checklist de démarrage",
                    text: "5 actions concrètes pour commencer dans les 48 heures — pas de théorie sans application.",
                  },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FF5E1A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <Check />
                    </div>
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{item.title}</h4>
                      <p style={{ fontSize: 14, color: "#6f6258", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #ECE0D2",
                borderRadius: 20,
                padding: 36,
                boxShadow: "0 20px 50px -25px rgba(22,19,17,.15)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/cover.png" alt="Aperçu du guide" style={{ width: 120, borderRadius: 10, boxShadow: "0 12px 30px -10px rgba(0,0,0,.25)", marginBottom: 20 }} />
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>L'École du Poids du Corps</h3>
              <p style={{ fontSize: 14, color: "#6f6258", lineHeight: 1.6, margin: 0 }}>
                Le guide ultime de la calisthénie : de zéro à la maîtrise totale, figures incluses. Format PDF,
                lisible sur tous vos appareils.
              </p>
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap", borderTop: "1px solid #ECE0D2", paddingTop: 20, marginTop: 20 }}>
                <div>
                  <div className="display" style={{ fontSize: 28, color: "#FF5E1A" }}>6</div>
                  <div style={{ fontSize: 12, color: "#6f6258", fontWeight: 600 }}>MODULES</div>
                </div>
                <div>
                  <div className="display" style={{ fontSize: 28, color: "#FF5E1A" }}>PDF</div>
                  <div style={{ fontSize: 12, color: "#6f6258", fontWeight: 600 }}>FORMAT</div>
                </div>
                <div>
                  <div className="display" style={{ fontSize: 28, color: "#FF5E1A" }}>∞</div>
                  <div style={{ fontSize: 12, color: "#6f6258", fontWeight: 600 }}>ACCÈS À VIE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section id="avis" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Avis
            </div>
            <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", marginBottom: 14 }}>
              Ils ont commencé. Ça a marché.
            </h2>
            <p style={{ color: "#6f6258", fontSize: 16, lineHeight: 1.6 }}>
              Des pratiquants de tous niveaux utilisent ce guide pour structurer leur entraînement au poids du
              corps.
            </p>
          </div>
          <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              {
                text: "« Je faisais des pompes et des squats sans plan depuis un an, sans résultat. Avec la méthode de surcharge progressive du module 3, j'ai enfin compris pourquoi je stagnais. »",
                name: "Mehdi",
                sub: "Débutant, 4 mois de pratique",
                initial: "M.",
              },
              {
                text: "« Les progressions vers la planche et le front lever sont incroyablement claires. Je sais exactement quelle étape travailler au lieu de me blesser à forcer trop tôt. »",
                name: "Léa",
                sub: "Niveau intermédiaire",
                initial: "L.",
              },
              {
                text: "« Le programme avancé PPL m'a permis de structurer mes 6 séances par semaine. La partie nutrition m'a aussi aidé à arrêter de deviner mes apports protéiques. »",
                name: "Thomas",
                sub: "Pratiquant avancé",
                initial: "T.",
              },
            ].map((t) => (
              <div key={t.name} style={{ background: "#FFFFFF", border: "1px solid #ECE0D2", borderRadius: 16, padding: 26, boxShadow: "0 10px 30px -20px rgba(22,19,17,.12)" }}>
                <div style={{ color: "#FF5E1A", fontSize: 14, marginBottom: 12, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#2b2420", marginBottom: 16 }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="display" style={{ width: 38, height: 38, borderRadius: "50%", background: "#FFE7D6", color: "#E0440A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{t.initial}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "#6f6258" }}>{t.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── OFFER ───────── */}
      <section id="offre" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div
            className="offer"
            style={{
              background: "linear-gradient(135deg, #161311 0%, #221d19 100%)",
              color: "#fff",
              borderRadius: 28,
              padding: "64px 48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                content: "",
                position: "absolute",
                bottom: -160,
                left: -120,
                width: 420,
                height: 420,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,94,26,.18) 0%, transparent 70%)",
              }}
            />
            <div className="offer-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center", position: "relative", zIndex: 1 }}>
              <div>
                <div className="eyebrow eyebrow-dark" style={{ marginBottom: 16 }}>
                  Offre de lancement
                </div>
                <h2 style={{ color: "#fff", textAlign: "left", fontSize: "clamp(28px,4.5vw,46px)" }}>
                  Le guide complet, pour le prix d'un repas
                </h2>
                <p style={{ color: "#cbbfb2", fontSize: 15, lineHeight: 1.6, maxWidth: 440, marginTop: 8 }}>
                  6 modules de méthode, de figures de force, de programmes et de plans nutritionnels — pour
                  construire un physique d'élite sans salle de sport, sans matériel, et sans tâtonner.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "24px 0 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#e5dcd1", fontWeight: 600 }}>
                    <CheckOrange /> Format PDF — lisible sur mobile, tablette, ordinateur
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#e5dcd1", fontWeight: 600 }}>
                    <CheckOrange /> Téléchargement immédiat après paiement
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#e5dcd1", fontWeight: 600 }}>
                    <CheckOrange /> Accès à vie, sans abonnement
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "#FFFFFF",
                  color: "#2b2420",
                  borderRadius: 20,
                  padding: 36,
                  textAlign: "center",
                  minWidth: 300,
                  boxShadow: "0 25px 60px -20px rgba(0,0,0,.5)",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: "#6f6258", textTransform: "uppercase", marginBottom: 12 }}>
                  Accès complet
                </div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 12, marginBottom: 6 }}>
                  <span className="display" style={{ fontSize: 54, color: "#FF5E1A" }}>29,99 €</span>
                </div>
                <div style={{ fontSize: 13, color: "#E0440A", fontWeight: 800, marginBottom: 24 }}>
                  Paiement unique · aucun abonnement
                </div>
                <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: 18 }}>
                  Obtenir le guide maintenant
                </a>
                <div style={{ fontSize: 12, color: "#6f6258", marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontWeight: 600 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Paiement sécurisé via Stripe
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              FAQ
            </div>
            <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)" }}>Vos questions, nos réponses</h2>
          </div>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section style={{ padding: "80px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Dernière étape
          </div>
          <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", marginBottom: 14 }}>
            Votre prochaine séance commence par cette page
          </h2>
          <p style={{ color: "#6f6258", fontSize: 16, maxWidth: 520, margin: "0 auto 30px", lineHeight: 1.6 }}>
            Chaque répétition propre vous rapproche de la maîtrise de votre corps. Le guide est prêt — il ne
            manque que vous.
          </p>
          <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Télécharger le guide — 29,99 €
          </a>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer style={{ borderTop: "1px solid #ECE0D2", padding: "32px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div className="display" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, fontSize: 15, letterSpacing: 1, marginBottom: 10 }}>
            L'ÉCOLE DU <span style={{ color: "#FF5E1A" }}>POIDS DU CORPS</span>
          </div>
          <p style={{ fontSize: 12, color: "#6f6258", letterSpacing: 0.5 }}>
            © 2026 L'École du Poids du Corps — Tous droits réservés · par cali_progression
          </p>
        </div>
      </footer>
    </div>
  );
}
