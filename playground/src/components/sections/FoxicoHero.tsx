import { useState, useEffect, useCallback } from "react";

const DESTINATIONS = [
  { title: "INDONESIA", desc: "As the largest archipelagic country in the world, Indonesia is blessed with so many different people, cultures, customs, traditions, artworks, food, animals, plants, landscapes, and everything.", watermark: "Thailand", cardName: "Buddha temple, Thailand", icon: "🛕", bg: "linear-gradient(180deg,#87ceeb 0%,#fff8dc 40%,#c8e6c9 100%)", slideBg: "linear-gradient(160deg,#0d1b3e 0%,#1a3a5c 30%,#0f4c3a 70%,#0a2e1a 100%)" },
  { title: "THAILAND", desc: "Thailand, the Land of Smiles, enchants visitors with ornate temples, turquoise waters, and vibrant street food markets.", watermark: "Bali", cardName: "Broken Beach, Bali", icon: "🏖️", bg: "linear-gradient(180deg,#006994 0%,#20b2aa 50%,#8fbc8f 100%)", slideBg: "linear-gradient(160deg,#1a0a2e 0%,#3b1a5c 40%,#0a1a3e 100%)" },
  { title: "KERALA", desc: "God's Own Country — Kerala's serene backwaters, spice-scented hills, and golden beaches offer an unmatched tropical escape.", watermark: "Morocco", cardName: "Kerala", icon: "🌴", bg: "linear-gradient(180deg,#228b22 0%,#32cd32 40%,#00ced1 100%)", slideBg: "linear-gradient(160deg,#0a2e1a 0%,#1a5c3b 40%,#3ea870 100%)" },
  { title: "MOROCCO", desc: "A sensory tapestry of saffron-dusted souks, Saharan dunes, and ancient medinas. Morocco bridges continents and centuries.", watermark: "Indonesia", cardName: "Sahara, Morocco", icon: "🏜️", bg: "linear-gradient(180deg,#ff6b35 0%,#f7931e 50%,#ffcd3c 100%)", slideBg: "linear-gradient(160deg,#2e1a0a 0%,#5c3b1a 40%,#a8703e 100%)" },
];

const FoxicoHero = () => {
  const [cur, setCur] = useState(0);
  const total = DESTINATIONS.length;
  const d = DESTINATIONS[cur];

  const goTo = useCallback((idx: number) => {
    setCur(((idx % total) + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(() => goTo(cur + 1), 5000);
    return () => clearInterval(timer);
  }, [cur, goTo]);

  return (
    <section className="foxico-hero">
      {/* BG Slides */}
      <div className="fx-bg-slides">
        {DESTINATIONS.map((dest, i) => (
          <div key={i} className={`fx-slide${i === cur ? " fx-slide-active" : ""}`} style={{ background: dest.slideBg }}>
            {i === 0 && (
              <svg className="fx-mountain" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice">
                <defs><linearGradient id="mtnG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.6" /><stop offset="100%" stopColor="#0a1a0e" stopOpacity="0.9" /></linearGradient></defs>
                <polygon points="400,700 720,80 1040,700" fill="url(#mtnG)" />
                <polygon points="250,700 620,180 900,700" fill="rgba(15,30,50,0.55)" />
                <polygon points="600,700 780,220 960,700" fill="rgba(10,20,15,0.4)" />
                <rect x="0" y="580" width="1440" height="120" fill="rgba(5,25,10,0.7)" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Nav */}
      <nav className="fx-nav">
        <div className="fx-logo">
          <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#f97316" /><path d="M8 20 Q12 8 20 10 Q26 12 22 22 Q18 28 12 26 Z" fill="#fbbf24" /><circle cx="20" cy="11" r="3" fill="#fff" opacity=".7" /></svg>
          <span>Foxico</span>
        </div>
        <ul className="fx-links">
          <li><a href="#">News</a></li>
          <li><a href="#">Destinations</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="fx-right">
          <button className="fx-search-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          </button>
          <span className="fx-hello">Hello , Anney !</span>
        </div>
      </nav>

      {/* Stepper */}
      <div className="fx-stepper">
        <div className="fx-step-line" />
        {DESTINATIONS.map((_, i) => (
          <div key={i} className={`fx-step${i === cur ? " active" : ""}`} onClick={() => goTo(i)} />
        ))}
      </div>

      {/* Counter */}
      <div className="fx-counter">
        <span className="fx-counter-val">{String(cur + 1).padStart(2, "0")}</span>/04
      </div>

      {/* Text Block */}
      <div className="fx-text-block">
        <h1 className="fx-title" key={d.title}>{d.title}</h1>
        <p className="fx-desc">{d.desc}</p>
        <button className="fx-explore-btn">Explore <span>→</span></button>
      </div>

      {/* Watermark */}
      <div className="fx-watermark">{d.watermark}</div>

      {/* Cards Strip */}
      <div className="fx-cards-strip">
        {DESTINATIONS.map((dest, i) => {
          const rel = ((i - cur + total) % total);
          return (
            <div key={i} className={`fx-dest-card${rel === 0 ? " fx-card-active" : ""}`} style={{ order: rel }} onClick={() => goTo(i)}>
              <div className="fx-card-img" style={{ background: dest.bg }}>
                <div className="fx-card-img-inner">{dest.icon}</div>
              </div>
              <div className="fx-card-info">
                <div className="fx-card-name">{dest.cardName}</div>
                <div className="fx-card-dots">
                  {[0, 1, 2, 3, 4].map((j) => (
                    <span key={j} className={`fx-cdot${j === 0 ? " active" : ""}`} />
                  ))}
                </div>
              </div>
              <button className="fx-bookmark">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="white" strokeWidth="2"><path d="M1 1h12v16l-6-4-6 4V1z" /></svg>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      <div className="fx-bottom-bar">
        <div className="fx-arrows">
          <button className="fx-arrow-btn" onClick={() => goTo(cur - 1)}>‹</button>
          <button className="fx-arrow-btn" onClick={() => goTo(cur + 1)}>›</button>
        </div>
        <div className="fx-progress-bar">
          <span className="fx-pg-num">01</span>
          <div className="fx-pg-track">
            <div className="fx-pg-fill" style={{ width: `${((cur + 1) / 9) * 100}%` }} />
          </div>
          <span className="fx-pg-num">09</span>
        </div>
      </div>
    </section>
  );
};

export default FoxicoHero;
