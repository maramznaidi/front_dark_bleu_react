import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
/* ─── PARTICLE BACKGROUND ─────────────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(58,143,220,${p.alpha})`;
        ctx.fill();
      });
      // subtle connecting lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(58,143,220,${0.07 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --blue: #3a8fdc;
    --blue-dim: rgba(58,143,220,0.18);
    --blue-soft: rgba(58,143,220,0.08);
    --gold: #5aaae8;
    --gold-dim: rgba(58,143,220,0.12);
    --bg: #04080f;
    --surface: rgba(10,17,28,0.85);
    --border: rgba(58,143,220,0.14);
    --border-hover: rgba(58,143,220,0.38);
    --text: #e8f0fc;
    --muted: #4a647e;
    --subtle: #1e2e40;
  }

  body {
    background: var(--bg);
    font-family: 'DM Sans', system-ui, sans-serif;
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── Fullscreen wrapper ── */
  .lp-root {
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
  }

  /* ── Background layers ── */
  .lp-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }
  .lp-bg-radial {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% -10%, rgba(58,143,220,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 80% 90%, rgba(58,143,220,0.07) 0%, transparent 60%),
      radial-gradient(circle at 20% 50%, rgba(10,20,40,0.9) 0%, transparent 50%),
      linear-gradient(180deg, #04080f 0%, #060c18 100%);
  }
  .lp-bg-line {
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, transparent, rgba(58,143,220,0.15) 30%, rgba(58,143,220,0.06) 70%, transparent);
  }
  .lp-bg-hline {
    position: absolute;
    top: 50%; left: 0;
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(58,143,220,0.08) 30%, rgba(58,143,220,0.08) 70%, transparent);
  }

  /* ── Header ── */
  .lp-header {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 1100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3.5rem;
  }
  .lp-logo {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    text-decoration: none;
  }
  .lp-logo-icon {
    width: 36px; height: 36px;
    border: 1px solid rgba(58,143,220,0.35);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(58,143,220,0.08);
  }
  .lp-logo-name {
    font-family: 'Syne', system-ui, sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.5px;
  }
  .lp-logo-name em {
    font-style: normal;
    color: var(--blue);
  }
  .lp-nav {
    display: flex;
    list-style: none;
    gap: 2.5rem;
  }
  .lp-nav a {
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--muted);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .lp-nav a:hover { color: var(--text); }
  .lp-nav-register {
    background: transparent;
    border: 1px solid rgba(58,143,220,0.4);
    color: var(--blue) !important;
    padding: 0.35rem 1rem;
    border-radius: 6px;
    transition: background 0.2s, border-color 0.2s !important;
  }
  .lp-nav-register:hover {
    background: rgba(58,143,220,0.12) !important;
    border-color: rgba(58,143,220,0.7) !important;
  }

  /* ── Card ── */
  .lp-card-wrap {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 460px;
  }

  /* corner ornaments */
  .lp-corner {
    position: absolute;
    width: 22px; height: 22px;
    border-color: rgba(58,143,220,0.45);
    border-style: solid;
    z-index: 2;
  }
  .lp-corner-tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; border-radius: 4px 0 0 0; }
  .lp-corner-tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; border-radius: 0 4px 0 0; }
  .lp-corner-bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; border-radius: 0 0 0 4px; }
  .lp-corner-br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; border-radius: 0 0 4px 0; }

  .lp-card {
    background: var(--surface);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 3rem 2.8rem;
    position: relative;
    overflow: hidden;
  }

  /* inner glow top */
  .lp-card::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(58,143,220,0.6), transparent);
  }

  .lp-card-glow {
    position: absolute;
    top: -60px; left: 50%;
    transform: translateX(-50%);
    width: 240px; height: 120px;
    background: radial-gradient(ellipse, rgba(58,143,220,0.12), transparent 70%);
    pointer-events: none;
  }

  /* ── Card header ── */
  .lp-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(58,143,220,0.1);
    border: 1px solid rgba(58,143,220,0.25);
    border-radius: 30px;
    padding: 4px 12px;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: #5aaae8;
    margin-bottom: 1.4rem;
  }
  .lp-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--blue);
    box-shadow: 0 0 6px var(--blue);
    animation: pulseDot 2s ease-in-out infinite;
  }
  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }

  .lp-title {
    font-family: 'Syne', system-ui, sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--text);
    line-height: 1.15;
    margin-bottom: 0.4rem;
    letter-spacing: -0.8px;
  }
  .lp-title span {
    color: var(--blue);
  }
  .lp-subtitle {
    font-size: 0.83rem;
    color: var(--muted);
    margin-bottom: 2.4rem;
    font-weight: 300;
    letter-spacing: 0.2px;
  }

  /* ── Inputs ── */
  .lp-field {
    margin-bottom: 1.2rem;
  }
  .lp-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.55rem;
  }
  .lp-label-line {
    flex: 1;
    height: 1px;
    background: var(--subtle);
  }
  .lp-input-wrap {
    position: relative;
  }
  .lp-input {
    width: 100%;
    background: rgba(4,8,15,0.7);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.85rem 1rem 0.85rem 3rem;
    font-size: 0.88rem;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    outline: none;
    transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
    letter-spacing: 0.2px;
  }
  .lp-input::placeholder { color: #233040; }
  .lp-input:focus {
    border-color: rgba(58,143,220,0.5);
    box-shadow: 0 0 0 3px rgba(58,143,220,0.08), inset 0 1px 2px rgba(0,0,0,0.3);
    background: rgba(8,16,28,0.9);
  }
  .lp-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
    transition: color 0.2s;
  }
  .lp-input-wrap:focus-within .lp-input-icon {
    color: var(--blue);
  }
  .lp-eye {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--muted);
    padding: 4px;
    transition: color 0.2s;
    display: flex;
    align-items: center;
  }
  .lp-eye:hover { color: var(--text); }

  /* ── Options row ── */
  .lp-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.6rem 0 2rem;
  }
  .lp-check {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.78rem;
    color: var(--muted);
    font-weight: 300;
    user-select: none;
  }
  .lp-check input[type="checkbox"] {
    appearance: none;
    width: 15px; height: 15px;
    border: 1px solid var(--subtle);
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    position: relative;
    transition: border-color 0.2s, background 0.2s;
    flex-shrink: 0;
  }
  .lp-check input[type="checkbox"]:checked {
    background: var(--blue);
    border-color: var(--blue);
  }
  .lp-check input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    top: 2px; left: 5px;
    width: 4px; height: 7px;
    border: 1.5px solid white;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
  }
  .lp-forgot {
    font-size: 0.75rem;
    color: rgba(58,143,220,0.7);
    text-decoration: none;
    font-weight: 400;
    letter-spacing: 0.2px;
    transition: color 0.2s;
  }
  .lp-forgot:hover { color: var(--blue); }

  /* ── Submit button ── */
  .lp-submit {
    width: 100%;
    position: relative;
    background: linear-gradient(135deg, #1a4a7a, #3a8fdc);
    border: none;
    border-radius: 10px;
    padding: 0.95rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(58,143,220,0.25);
  }
  .lp-submit::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }
  .lp-submit:hover::before { left: 100%; }
  .lp-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(58,143,220,0.4);
  }
  .lp-submit:active { transform: translateY(0); }

  /* ── Divider ── */
  .lp-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.8rem 0;
  }
  .lp-divider-line {
    flex: 1;
    height: 1px;
    background: var(--subtle);
  }
  .lp-divider-text {
    font-size: 0.68rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #2a3d52;
    white-space: nowrap;
  }

  /* ── OAuth buttons ── */
  .lp-oauth-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .lp-oauth-btn {
    background: rgba(4,8,15,0.6);
    border: 1px solid var(--border);
    border-radius: 9px;
    padding: 0.65rem 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 400;
    color: var(--muted);
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    letter-spacing: 0.3px;
  }
  .lp-oauth-btn:hover {
    border-color: var(--border-hover);
    color: var(--text);
    background: rgba(58,143,220,0.05);
  }

  /* ── Footer ── */
  .lp-card-footer {
    text-align: center;
    margin-top: 2rem;
    font-size: 0.78rem;
    color: #2a3d52;
    font-weight: 300;
  }
  .lp-card-footer a {
    color: #5aaae8;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  .lp-card-footer a:hover { color: var(--blue); }

  /* ── Bottom brand line ── */
  .lp-bottom {
    position: relative;
    z-index: 10;
    margin-top: 2.5rem;
    font-size: 0.68rem;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #1a2a38;
    text-align: center;
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .lp-header   { animation: fadeUp 0.6s ease both; }
  .lp-card-wrap { animation: fadeUp 0.7s 0.1s ease both; }
  .lp-bottom    { animation: fadeUp 0.6s 0.25s ease both; }

  /* ── Responsive ── */
  @media (max-width: 680px) {
    .lp-nav { display: none; }
    .lp-card { padding: 2rem 1.6rem; }
    .lp-title { font-size: 1.9rem; }
    .lp-oauth-grid { grid-template-columns: 1fr; }
  }
`;

/* ─── LOGIN PAGE ──────────────────────────────────────────────────────────── */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const styleRef = useRef(false);

  useEffect(() => {
    if (styleRef.current) return;
    styleRef.current = true;
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    alert(`Bienvenue, ${email}`);
  };

  return (
    <div className="lp-root">
      {/* Background */}
      <div className="lp-bg">
        <div className="lp-bg-radial" />
        <div className="lp-bg-line" />
        <div className="lp-bg-hline" />
        <ParticleField />
      </div>

      {/* Header */}
      <header className="lp-header">
               <Link to="/" className="lp-logo">
                <div className="lp-logo-icon">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#5aaae8" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                </div>
                <span className="lp-logo-name">Biblio<em>thèque</em></span>
                </Link>
        <nav>
          <ul className="lp-nav">
            <li><a href="#">Catalogue</a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">Auteurs</a></li>
            <li><Link to="/register" className="lp-nav-register">S'inscrire</Link></li>
          </ul>
        </nav>

      </header>

      {/* Card */}
      <div className="lp-card-wrap">
        {/* corner ornaments */}
        <div className="lp-corner lp-corner-tl" />
        <div className="lp-corner lp-corner-tr" />
        <div className="lp-corner lp-corner-bl" />
        <div className="lp-corner lp-corner-br" />

        <div className="lp-card">
          <div className="lp-card-glow" />

          <div className="lp-badge">
            <span className="lp-badge-dot" />
            Espace privé
          </div>

          <h1 className="lp-title">
            Bon<br />retour <span>parmi</span><br />les livres.
          </h1>
          <p className="lp-subtitle">Connectez-vous à votre bibliothèque numérique</p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="lp-field">
              <label className="lp-label">
                E-mail
                <span className="lp-label-line" />
              </label>
              <div className="lp-input-wrap">
                <span className="lp-input-icon">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <input
                  type="email"
                  className="lp-input"
                  placeholder="votre@email.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="lp-field">
              <label className="lp-label">
                Mot de passe
                <span className="lp-label-line" />
              </label>
              <div className="lp-input-wrap">
                <span className="lp-input-icon">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  type={showPwd ? "text" : "password"}
                  className="lp-input"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="lp-eye"
                  onClick={() => setShowPwd(!showPwd)}
                  tabIndex={-1}
                >
                  {showPwd ? (
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="lp-options">
              <label className="lp-check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Se souvenir de moi
              </label>
              <a href="#" className="lp-forgot">Mot de passe oublié ?</a>
            </div>

            <button type="submit" className="lp-submit" disabled={loading}>
              {loading ? "Connexion en cours…" : "Accéder à ma bibliothèque"}
            </button>
          </form>

          <div className="lp-divider">
            <span className="lp-divider-line" />
            <span className="lp-divider-text">ou</span>
            <span className="lp-divider-line" />
          </div>

          <div className="lp-oauth-grid">
            <button className="lp-oauth-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="lp-oauth-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p className="lp-card-footer">
            Pas encore de compte ?{" "}
            <a href="#">Créer un accès gratuit</a>
          </p>
        </div>
      </div>

      <p className="lp-bottom">Bibliothèque Numérique &nbsp;·&nbsp; © 2025</p>
    </div>
  );
}