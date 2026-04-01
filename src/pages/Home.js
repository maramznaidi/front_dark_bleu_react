import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─── CSS ────────────────────────────────────────────────────────────────── */


const CATEGORIES = [
  "Tout", "Roman", "Science", "Histoire", "Poésie", "Philosophie", "Technologie", "Art"
];

function Skeleton() {
  return (
    <div className="lb-skel">
      <div className="lb-skel-img" />
      <div className="lb-skel-body">
        <div className="lb-skel-line" />
        <div className="lb-skel-line sh" />
      </div>
    </div>
  );
}

/* ── Animated Book ────────────────────────────────────────────────────────── */
function AnimatedBook() {
  const PAGE_LINES = [130,143,156,169,182,195,208,221];
  const STARS = [[82,118],[322,148],[90,282],[314,275]];

  return (
    <div className="lb-book-widget">
      <svg className="lb-book-svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* ── Nebula glow behind book ── */}
        <ellipse cx="200" cy="200" rx="145" ry="145" fill="url(#nebula)" opacity=".18" />
        <defs>
          <radialGradient id="nebula" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#3a8fdc" />
            <stop offset="100%" stopColor="#3a8fdc" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="coverGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0d1e35" />
          </radialGradient>
        </defs>

        {/* ── Orbital rings ── */}
        <ellipse cx="200" cy="200" rx="162" ry="162" stroke="#3a8fdc" strokeWidth="1"  strokeDasharray="5 7"  opacity=".22" />
        <ellipse cx="200" cy="200" rx="118" ry="118" stroke="#3a8fdc" strokeWidth=".5" strokeDasharray="2 9"  opacity=".15" />

        {/* ── Orbit dots ── */}
        <g className="lb-orb-a">
          <circle cx="200" cy="200" r="7"   fill="#3a8fdc" opacity=".8" />
          <circle cx="200" cy="200" r="3"   fill="#b8dcf8" />
          <circle cx="200" cy="200" r="10"  fill="#3a8fdc" opacity=".15" />
        </g>
        <g className="lb-orb-b">
          <circle cx="200" cy="200" r="5"   fill="#5aaae8" opacity=".6" />
          <circle cx="200" cy="200" r="8"   fill="#5aaae8" opacity=".12" />
        </g>

        {/* ── Glow halo ── */}
        <ellipse cx="200" cy="222" rx="90" ry="16" fill="#3a8fdc" className="lb-glow" />

        {/* ── Floating book ── */}
        <g className="lb-float">

          {/* Book cover */}
          <rect x="100" y="110" width="96"  height="134" rx="7" fill="#0d1e35" />
          <rect x="100" y="110" width="96"  height="134" rx="7" fill="url(#coverGrad)" />
          {/* Spine */}
          <rect x="100" y="110" width="11"  height="134" rx="4" fill="#091629" />
          <rect x="111" y="110" width="1"   height="134" fill="rgba(58,143,220,.25)" />
          {/* Cover decoration */}
          <rect x="120" y="132" width="58"  height="2.5" rx="1.2" fill="rgba(58,143,220,.4)" />
          <rect x="120" y="141" width="40"  height="2.5" rx="1.2" fill="rgba(58,143,220,.22)" />
          <rect x="120" y="165" width="58"  height="2"   rx="1"   fill="rgba(58,143,220,.15)" />
          <rect x="120" y="180" width="50"  height="36"  rx="5"   fill="rgba(58,143,220,.08)" stroke="rgba(58,143,220,.2)" strokeWidth=".5" />
          {/* Shimmer line on cover */}
          <rect className="lb-shline" x="120" y="133" width="58" height="1" rx=".5" fill="rgba(180,220,255,.5)" />

          {/* Pages block */}
          <rect x="196" y="114" width="86"  height="126" rx="4" fill="#0f1c2c" />
          <rect x="196" y="114" width="86"  height="126" rx="4" fill="rgba(30,60,100,.4)" />
          {PAGE_LINES.map((y, i) => (
            <rect key={i} x="202" y={y} width={44+(i%3)*9} height="2" rx="1"
              fill={i%2===0 ? "rgba(58,143,220,.22)" : "rgba(58,143,220,.13)"} />
          ))}
          {/* Pages right edge shadow */}
          <rect x="274" y="114" width="8"   height="126" rx="2" fill="rgba(0,0,0,.3)" />

          {/* Flutter pages */}
          <g className="lb-fl1" style={{transformOrigin:"196px 177px"}}>
            <rect x="152" y="114" width="46" height="126" rx="2" fill="#0e1e34" opacity=".88" />
          </g>
          <g className="lb-fl2" style={{transformOrigin:"196px 177px"}}>
            <rect x="158" y="116" width="40" height="122" rx="2" fill="#0c1a2e" opacity=".82" />
          </g>
          <g className="lb-fl3" style={{transformOrigin:"196px 177px"}}>
            <rect x="164" y="118" width="34" height="118" rx="2" fill="#0a1626" opacity=".75" />
          </g>

          {/* Title on cover */}
          <text x="148" y="160" textAnchor="middle"
            fontFamily="'Libre Baskerville', Georgia, serif"
            fontSize="9" fontStyle="italic"
            fill="rgba(90,170,232,.75)" letterSpacing=".6">
            Bibliothèque
          </text>
          <text x="148" y="173" textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="7" fill="rgba(58,143,220,.45)" letterSpacing="1.5">
            NUMÉRIQUE
          </text>

          {/* Bookmark ribbon */}
          <rect x="264" y="110" width="10" height="54" rx="2" fill="#e8a23a" />
          <polygon points="264,164 274,164 269,177" fill="#e8a23a" />
          <rect x="266" y="116" width="6"  height="24" rx="1" fill="rgba(255,255,255,.15)" />

          {/* Ground shadow */}
          <ellipse cx="198" cy="248" rx="72" ry="7" fill="#3a8fdc" opacity=".06" />
        </g>

        {/* ── Particles ── */}
        <circle className="lb-p1" cx="138" cy="158" r="3.5" fill="#3a8fdc" opacity=".6"  />
        <circle className="lb-p2" cx="278" cy="148" r="2.5" fill="#5aaae8" opacity=".5"  />
        <circle className="lb-p3" cx="152" cy="240" r="2"   fill="#7abcee" opacity=".45" />
        <circle className="lb-p4" cx="292" cy="232" r="3"   fill="#3a8fdc" opacity=".4"  />

        {/* ── Stars ── */}
        {STARS.map(([x,y],i) => (
          <g key={i} className="lb-star" style={{animationDelay:`${i*.5}s`}}>
            <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="#5aaae8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1={x-5} y1={y}  x2={x+5} y2={y} stroke="#5aaae8" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── Home ─────────────────────────────────────────────────────────────────── */

function Home() {
  const [books, setBooks]             = useState([]);
  const [search, setSearch]           = useState("");
  const [activeCategory, setCategory] = useState("Tout");
  const [loading, setLoading]         = useState(true);
  const styleRef = useRef(false);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLoginClick2 = () => {
    navigate("/Register");
  };
  useEffect(() => {
    if (styleRef.current) return;
    styleRef.current = true;
    const tag = document.createElement("style");
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => { setBooks([]); setLoading(false); }, 1500);
    return () => clearTimeout(t);
  }, []);

  const filtered = books.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch = !search || b.title?.toLowerCase().includes(q) || b.author?.toLowerCase().includes(q);
    const matchCat = activeCategory === "Tout" || b.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="lb-page">

      {/* ── En-tête ── */}
      <header className="lb-header">
        <a href="#" className="lb-logo">
          <div className="lb-logo-mark">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span className="lb-logo-text">Biblio<span>thèque</span></span>
        </a>

        <nav>
          <ul className="lb-nav">
            <li><a href="#">Catalogue</a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">Auteurs</a></li>
          </ul>
        </nav>

        <div className="lb-auth">
          <button className="lb-btn-login"  onClick={handleLoginClick}>Connexion</button>
          <button className="lb-btn-register" onClick={handleLoginClick2}>S'inscrire</button>
        </div>
      </header>

      {/* ── Héros ── */}
      <section className="lb-hero">
        <div>
          <p className="lb-hero-tag">
            <span className="lb-tag-dot" />
            Bibliothèque Numérique · Fondée en 2024
          </p>
          <h1 className="lb-hero-title">
            Découvrez votre<br />
            prochaine <em>grande</em> lecture.
          </h1>
          <p className="lb-hero-sub">
            Des milliers d'ouvrages soigneusement sélectionnés dans tous les genres — votre bibliothèque, partout avec vous.
          </p>
          <div className="lb-hero-ctas">
            <button className="lb-cta-primary">Parcourir le catalogue</button>
            <button className="lb-cta-secondary">En savoir plus</button>
          </div>
          <div className="lb-stats-row">
            {[["12 000+","Livres"],["340","Auteurs"],["48","Genres"]].map(([v,l]) => (
              <div key={l} className="lb-stat">
                <div className="lb-stat-val">{v}</div>
                <div className="lb-stat-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <AnimatedBook />
      </section>

      {/* ── Recherche ── */}
      <div className="lb-search-section">
        <div className="lb-search-box">
          <span className="lb-search-icon">
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <input
            className="lb-search-input"
            placeholder="Rechercher par titre, auteur ou genre…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="lb-search-submit">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            Rechercher
          </button>
        </div>
      </div>

      {/* ── Filtres ── */}
      <div className="lb-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`lb-chip${activeCategory === cat ? " on" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── En-tête de section ── */}
      <div className="lb-section-head">
        <h2 className="lb-section-title">
          {activeCategory === "Tout" ? "Tous les livres" : activeCategory}
        </h2>
        <span className="lb-section-meta">
          {loading ? "Chargement…" : `${filtered.length} titre${filtered.length !== 1 ? "s" : ""} trouvé${filtered.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      {/* ── Grille ── */}
      <div className="lb-grid">
        {loading
          ? Array.from({length:8}).map((_,i) => <Skeleton key={i} />)
          : filtered.length === 0
            ? (
              <div className="lb-empty">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#3a8fdc" strokeWidth="1.1" opacity=".5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <p className="lb-empty-title">
                  {search ? `Aucun résultat pour « ${search} »` : "Aucun livre trouvé"}
                </p>
                <p style={{fontSize:".85rem"}}>Essayez un autre mot-clé ou parcourez par catégorie.</p>
              </div>
            )
            : filtered.map((book, i) => (
              <div key={book._id} className="lb-book-item" style={{animationDelay:`${i*55}ms`}}>
                {/* <BookCard book={book} /> */}
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default Home;