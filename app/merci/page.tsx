"use client";

// ═══════════════════════════════════════════════════════
// L'ÉCOLE DU POIDS DU CORPS - Page de remerciement / téléchargement
//
// ⚠️ Placez le fichier PDF dans /public/ecole-du-poids-du-corps.pdf
// (renommez votre PDF en "ecole-du-poids-du-corps.pdf")
//
// Dans Stripe : Paramètres du lien de paiement → "Page de confirmation"
// → "Rediriger les clients vers votre site" → collez l'URL de cette page,
// par exemple : https://votresite.com/merci
// (ce fichier doit donc être placé dans app/merci/page.tsx)
// ═══════════════════════════════════════════════════════

const PDF_URL = "/ecole-du-poids-du-corps.pdf";

export default function Merci() {
  return (
    <div
      style={{
        background: "#FBF3E8",
        color: "#2b2420",
        fontFamily: "'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
        .display { font-family: 'Archivo Black','Archivo',sans-serif; }
        .btn-primary {
          display:inline-flex;align-items:center;gap:10px;
          background:#FF5E1A;color:#fff;
          font-weight:800;font-size:16px;letter-spacing:.5px;
          padding:18px 40px;border-radius:999px;
          text-decoration:none;border:none;cursor:pointer;
          box-shadow:0 10px 30px -10px rgba(255,94,26,.6);
          transition:transform .15s ease, box-shadow .2s ease, background .2s ease;
        }
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 36px -8px rgba(255,94,26,.7);background:#E0440A;}
        .btn-secondary {
          display:inline-flex;align-items:center;gap:8px;
          background:transparent;color:#2b2420;
          font-weight:700;font-size:14px;
          padding:14px 28px;border-radius:999px;
          text-decoration:none;border:1px solid #ECE0D2;
          transition:border-color .2s ease, background .2s ease;
        }
        .btn-secondary:hover{border-color:#FF5E1A;background:#FFE7D6;}
        @keyframes pop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .check-circle { animation: pop .5s cubic-bezier(.2,1.4,.4,1) both; }
        @media (max-width: 640px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .card { padding: 28px 22px !important; }
        }
      `}</style>

      {/* ───────── HEADER ───────── */}
      <header style={{ borderBottom: "1px solid #ECE0D2" }}>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 24px",
            maxWidth: 1120,
            margin: "0 auto",
          }}
        >
          <div className="display" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, letterSpacing: 1, flexWrap: "wrap" }}>
            L'ÉCOLE DU <span style={{ color: "#FF5E1A" }}>POIDS DU CORPS</span>
            <span style={{ color: "#bdb1a3", fontWeight: 400, fontSize: 12 }}>/ GravityLab</span>
          </div>
        </nav>
      </header>

      {/* ───────── CONTENU PRINCIPAL ───────── */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
          {/* Bloc succès */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div
              className="check-circle"
              style={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                background: "#FF5E1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                boxShadow: "0 14px 34px -10px rgba(255,94,26,.55)",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#FFE7D6",
                color: "#E0440A",
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: 2,
                padding: "7px 16px",
                borderRadius: 999,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Paiement confirmé
            </div>
            <h1
              className="display"
              style={{
                fontSize: "clamp(30px,6vw,52px)",
                textTransform: "uppercase",
                letterSpacing: "-0.5px",
                lineHeight: 1.05,
                marginBottom: 16,
              }}
            >
              Merci pour votre achat !
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#6f6258", maxWidth: 520, margin: "0 auto" }}>
              Votre guide <strong style={{ color: "#2b2420" }}>L'École du Poids du Corps</strong> est prêt.
              Téléchargez-le dès maintenant et conservez-le précieusement, il est à vous pour toujours.
            </p>
          </div>

          {/* Carte de téléchargement */}
          <div
            className="card"
            style={{
              background: "#FFFFFF",
              border: "1px solid #ECE0D2",
              borderRadius: 20,
              padding: "40px 44px",
              textAlign: "center",
              boxShadow: "0 20px 50px -25px rgba(22,19,17,.18)",
              marginBottom: 28,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cover.png"
              alt="Couverture du guide L'École du Poids du Corps"
              style={{
                width: 110,
                borderRadius: 10,
                boxShadow: "0 12px 30px -10px rgba(0,0,0,.25)",
                marginBottom: 22,
                border: "4px solid #fff",
              }}
            />
            <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 6 }}>
              L'École du Poids du Corps.pdf
            </h2>
            <p style={{ fontSize: 13, color: "#6f6258", marginBottom: 26 }}>
              6 modules · format PDF · environ 46 pages
            </p>
            <a href={PDF_URL} download className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Télécharger mon guide (PDF)
            </a>
            <p style={{ fontSize: 12, color: "#bdb1a3", marginTop: 16 }}>
              Le lien ouvre directement votre fichier. Pensez à le sauvegarder sur votre appareil.
            </p>
          </div>

          {/* Étapes suivantes */}
          <div
            style={{
              background: "#161311",
              color: "#fff",
              borderRadius: 20,
              padding: "36px 40px",
            }}
          >
            <h3
              className="display"
              style={{
                fontSize: 14,
                letterSpacing: 2,
                color: "#FF5E1A",
                textTransform: "uppercase",
                marginBottom: 22,
                textAlign: "center",
              }}
            >
              Vos prochaines étapes
            </h3>
            <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div
                  className="display"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #FF5E1A",
                    color: "#FF5E1A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                    fontSize: 16,
                  }}
                >
                  1
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>Lisez le module 1</h4>
                <p style={{ fontSize: 13, color: "#b9aea3", lineHeight: 1.6, margin: 0 }}>
                  Comprenez les fondations scientifiques avant de commencer à vous entraîner.
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  className="display"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #FF5E1A",
                    color: "#FF5E1A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                    fontSize: 16,
                  }}
                >
                  2
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>Choisissez votre programme</h4>
                <p style={{ fontSize: 13, color: "#b9aea3", lineHeight: 1.6, margin: 0 }}>
                  Débutant, intermédiaire ou avancé : testez votre niveau au module 4.
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  className="display"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #FF5E1A",
                    color: "#FF5E1A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                    fontSize: 16,
                  }}
                >
                  3
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>Faites votre première séance</h4>
                <p style={{ fontSize: 13, color: "#b9aea3", lineHeight: 1.6, margin: 0 }}>
                  Ne remettez pas à demain. Le corps que vous voulez commence aujourd'hui.
                </p>
              </div>
            </div>
          </div>

          {/* Retour à l'accueil */}
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <a href="/" className="btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Retour à l'accueil
            </a>
          </div>
        </div>
      </main>

      {/* ───────── FOOTER ───────── */}
      <footer style={{ borderTop: "1px solid #ECE0D2", padding: "28px 0", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#6f6258", letterSpacing: 0.5 }}>
          © 2026 L'École du Poids du Corps. Tous droits réservés · par cali_progression
        </p>
      </footer>
    </div>
  );
}
