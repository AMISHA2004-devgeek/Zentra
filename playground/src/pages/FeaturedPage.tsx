import { useState, useEffect } from "react";

// ── Hero images using dest- prefix ──────────────────────────────────────────
import destBali       from "@/assets/dest-bali.jpg";
import destSantorini  from "@/assets/dest-santorini.jpg";
import destTokyo      from "@/assets/dest-tokyo.jpg";
import destSwiss      from "@/assets/dest-swiss.jpg";
import destMarrakech  from "@/assets/dest-marrakech.jpg";
import destPatagonia  from "@/assets/dest-patagonia.jpg";

// ── Types ────────────────────────────────────────────────────────────────────
type Article = {
  id: string; category: string; tag: string; title: string;
  excerpt: string; content: string; author: string; date: string; color: string;
  dest: string; stat: string;
};

// ── Hero slides ──────────────────────────────────────────────────────────────
const heroSlides = [
  {
    img: destBali,
    dest: "Bali, Indonesia",
    title: "Where Spirits Meet the Sea",
    subtitle: "Ancient temples, terraced rice paddies, and sunsets that redefine golden — Bali is a universe in an island.",
    tag: "🌴 Beach & Spirituality",
    temp: "28°C",
    duration: "5–7 days ideal",
    accent: "#e8785a",
  },
  {
    img: destSantorini,
    dest: "Santorini, Greece",
    title: "Painted in Blue and White",
    subtitle: "Clifftop villages, volcanic beaches, and wine terraces overlooking the Aegean — luxury dressed as simplicity.",
    tag: "🏛️ Luxury & Romance",
    temp: "24°C",
    duration: "4–6 days ideal",
    accent: "#2d9cdb",
  },
  {
    img: destTokyo,
    dest: "Tokyo, Japan",
    title: "The Future Arrived Early Here",
    subtitle: "Neon-lit alleyways, cherry-blossom parks, and Michelin-starred ramen stalls — Tokyo lives on another timeline.",
    tag: "🏙️ Urban & Culture",
    temp: "18°C",
    duration: "6–9 days ideal",
    accent: "#e91e63",
  },
  {
    img: destSwiss,
    dest: "Swiss Alps, Switzerland",
    title: "Heaven Has an Altitude",
    subtitle: "Snow-dusted peaks, glacier trails, and mountain huts with fondue — the Alps are a postcard you can live in.",
    tag: "⛰️ Adventure & Nature",
    temp: "5°C",
    duration: "5–8 days ideal",
    accent: "#52c4b5",
  },
  {
    img: destMarrakech,
    dest: "Marrakech, Morocco",
    title: "A Spice Route for the Senses",
    subtitle: "Labyrinthine souks, rose-garden riads, and rooftop mint tea with the Atlas Mountains as your backdrop.",
    tag: "🕌 Culture & History",
    temp: "26°C",
    duration: "4–5 days ideal",
    accent: "#f2b531",
  },
  {
    img: destPatagonia,
    dest: "Patagonia, Argentina",
    title: "The Edge of the Civilised World",
    subtitle: "Glaciers that crack like thunder, condors riding thermals, and trails that end where maps do — raw, untamed, unforgettable.",
    tag: "🏔️ Wild & Remote",
    temp: "10°C",
    duration: "8–12 days ideal",
    accent: "#7c3aed",
  },
];

// ── Articles ─────────────────────────────────────────────────────────────────
const articles: Article[] = [
  {
    id: "bali-guide",
    category: "DESTINATION GUIDE",
    tag: "Travel Guide",
    title: "Bali Beyond the Clichés: Where Locals Actually Eat, Pray and Surf",
    excerpt: "Skip the overrated spots — we mapped the real Bali, from jungle waterfalls only scooter-riders find to the warung that charges ₹80 for a plate that tastes like ₹8000.",
    content: `Bali has been photographed to death, but it still surprises you. The trick is leaving Kuta thirty minutes after you land and never looking back.\n\nThe north is where the magic hides. Munduk's coffee plantations, Sekumpul's multi-tiered falls, and the black-sand beach at Lovina where dolphins jump at dawn — none of this appears on the average influencer itinerary.\n\nFood is the secret language of Bali. Nasi campur at a roadside warung beats any resort brunch. Babi guling — if you eat pork — is a ceremony on a plate. And the salak fruit, tasting somewhere between apple and pineapple, grows only here.\n\nThe Subak irrigation system, a UNESCO World Heritage water management network, still runs the rice fields the same way it has for a thousand years. Standing in those green terraces at Tegallalang or Jatiluwih at 7 AM, before the tour groups arrive, is a form of time travel.\n\nBali rewards slow travel. Budget two weeks. Rent a scooter. Get lost.`,
    author: "Zentra Travel Desk",
    date: "12 Mar 2026",
    color: "#e8785a",
    dest: "Bali",
    stat: "₹35K avg / week",
  },
  {
    id: "santorini-guide",
    category: "LUXURY TRAVEL",
    tag: "Luxury",
    title: "Santorini on a Real Budget: The Caldera Without the Credit Card Damage",
    excerpt: "Yes, you can do Santorini without spending a fortune on a cliffside infinity pool. Here's the Aegean as the fishermen still know it.",
    content: `Everyone sees the same Oia sunset photo. But Santorini has a second life that most tourists never access.\n\nFira's backstreets hide tavernas where a full grilled octopus costs less than a hotel cocktail. The black beach of Perissa is just as dramatic as the famous red one — and less crowded. And if you time the cable car wrong, the donkey path from the port is an unexpectedly meditative forty-minute walk.\n\nThe wine is the real secret. Santorini grows its own grape variety — Assyrtiko — in basket-woven vines that hug the volcanic soil. A wine tour to Santo Wines or Venetsanos costs less than you'd think and ends with panoramic views that justify the flight alone.\n\nStay in Fira instead of Oia: half the price, same caldera view, better food, and you're central to everything. Book a cave house rather than a hotel — the architecture is the room.\n\nVisit in May or October. The light is identical to August. The prices are not.`,
    author: "Priya Mehta, Zentra",
    date: "8 Feb 2026",
    color: "#2d9cdb",
    dest: "Santorini",
    stat: "₹65K avg / week",
  },
  {
    id: "tokyo-guide",
    category: "CITY DEEP DIVE",
    tag: "City Guide",
    title: "48 Hours in Tokyo: The Itinerary That Actually Works",
    excerpt: "Tokyo is overwhelming by design — so we built the cheat code. Two days, five neighbourhoods, zero jet-lag regrets.",
    content: `Tokyo's greatest trick is making infinite feel manageable. The metro is a miracle of signage. The convenience stores are better than most restaurants. And every neighbourhood is a different city.\n\nDay one should begin in Yanaka — old Tokyo, untouched by the shiny re-development elsewhere. Wooden temples, craft shops, a cemetery with cats. Then Ueno for the museums and the park. Akihabara in the evening for the controlled chaos.\n\nDay two: Shibuya crossing at 8 AM before the crowds, then walk north through Harajuku and up to Omotesando for the architecture alone. Shinjuku at night — specifically Golden Gai, a cluster of six-seat bars that have been serving the same regulars since 1960.\n\nFood rules: eat where there's a plastic model in the window. Queue wherever there's a queue. The best ramen costs ¥900. The best sushi costs ¥12,000 and is worth every yen. Your stomach will need to make strategic decisions.\n\nBuy a Suica card at the airport. Never think about transport again.`,
    author: "Rishi Anand, Zentra",
    date: "15 Jan 2026",
    color: "#e91e63",
    dest: "Tokyo",
    stat: "₹55K avg / week",
  },
  {
    id: "alps-guide",
    category: "ADVENTURE",
    tag: "Adventure",
    title: "The Swiss Alps in Summer: Why You're Missing the Best Season",
    excerpt: "August in the Alps means wildflower meadows, empty trails, and huts that serve hot chocolate at 3,000 metres. Winter has been hiding the truth from you.",
    content: `Switzerland in summer is a conspiracy that winter sports tourism has been running for decades. The Alps without snow are arguably more spectacular — and unquestionably more accessible.\n\nThe Haute Route between Chamonix and Zermatt is one of the world's great long-distance hikes, a two-week traverse that requires no technical climbing skills. But even a three-day section gives you the high alpine experience: moraines, ibex, and refuges serving cheese fondue at 2,500 metres.\n\nFor non-hikers: the Bernese Oberland is a cable car network disguised as a mountain range. Grindelwald, Mürren, Wengen — all car-free villages connected by gondolas and cog railways. The Schilthorn view (yes, the Bond one) costs exactly as much as a mediocre London lunch.\n\nCheaper than you think: the Swiss Travel Pass is expensive upfront but covers virtually all transport including mountain railways. Supermarkets Migros and Coop are the same quality as restaurants, half the price.\n\nCome in July. The alpenrosen are in bloom and the mountain huts haven't yet filled with the August rush.`,
    author: "Zentra Adventure Team",
    date: "5 Apr 2026",
    color: "#52c4b5",
    dest: "Swiss Alps",
    stat: "₹90K avg / week",
  },
  {
    id: "marrakech-guide",
    category: "CULTURE",
    tag: "Culture",
    title: "Marrakech in 72 Hours: A Structured Guide to Controlled Chaos",
    excerpt: "The medina will disorient you on purpose. Here's how to surrender to it — and what to find when you stop resisting.",
    content: `Marrakech operates on its own physics. Streets that seem to lead one way deposit you somewhere entirely different. Riads are invisible from the outside — fortress walls that open to paradise gardens. The city is teaching you to trust the disorientation.\n\nDjemaa el-Fna, the main square, is different at every hour. Dawn brings orange juice vendors and flour carts. Noon brings shade-seekers and pigeons. Dusk brings storytellers, snake charmers, and the smoke of a hundred tagine braziers. Midnight brings the locals.\n\nThe souks are organised by craft: leatherworkers near the tanneries, carpet sellers near the Bahia Palace, jewellers in the north-west. Prices are always negotiable. First offer is theatre, not economics. The price you agree is the one you both feel good about.\n\nEat: pastilla (pigeon pie with almonds and cinnamon), mechoui (whole roasted lamb), m'hanncha (almond snake pastry). Drink: argan oil smoothies, harira soup after dark, fresh-pressed pomegranate at 5 dirhams a glass.\n\nStay: a riad in the medina. The noise outside makes the silence of the courtyard feel sacred.`,
    author: "Lena Kovacs, Zentra",
    date: "22 Feb 2026",
    color: "#f2b531",
    dest: "Marrakech",
    stat: "₹28K avg / week",
  },
  {
    id: "patagonia-guide",
    category: "EXPEDITION",
    tag: "Expedition",
    title: "Patagonia W Trek: What Nobody Tells You Before You Book",
    excerpt: "It rained sideways for three hours, then the clouds split and Torres del Paine emerged like a hallucination. This is the full, honest guide.",
    content: `Patagonia will break you and rebuild you in the same afternoon. That is not a metaphor.\n\nThe W Trek in Torres del Paine covers 80 kilometres across glaciers, hanging forests, and ridge lines that look drawn by committee. The five-day route requires pre-booking refugios months in advance — the free camping spots fill faster than hostels in high season (December–February).\n\nThe infamous Patagonian wind isn't constant — it comes in 30-minute attacks that subside without warning. The experienced trekker learns to stop walking during gusts and to photograph with both hands. Your 50L pack will sail you off your feet if you're not careful.\n\nThe glacier is the centrepiece. Grey Glacier calves into a lagoon where you can kayak between icebergs the colour of frozen sky. At night, the sky is absolute — the Milky Way above Patagonia is one of the clearest on earth.\n\nPlan your gear seriously. Four seasons in a day is real here. Waterproof everything. Take one extra pair of socks beyond what you think you need, then take two more.`,
    author: "Marco de la Vega, Zentra",
    date: "1 Mar 2026",
    color: "#7c3aed",
    dest: "Patagonia",
    stat: "₹1.2L avg / week",
  },
];

// ── FeaturedPage ─────────────────────────────────────────────────────────────
const FeaturedPage = () => {
  const [idx,         setIdx]         = useState(0);
  const [animating,   setAnimating]   = useState(false);
  const [openArticle, setOpenArticle] = useState<string | null>(null);

  // Auto-advance hero
  useEffect(() => {
    const iv = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIdx(p => (p + 1) % heroSlides.length);
        setAnimating(false);
      }, 500);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const goTo = (i: number) => {
    if (i === idx) return;
    setAnimating(true);
    setTimeout(() => { setIdx(i); setAnimating(false); }, 400);
  };

  const slide = heroSlides[idx];

  // ── Article detail view ────────────────────────────────────────
  const article = openArticle ? articles.find(a => a.id === openArticle) : null;

  if (article) {
    const paras = article.content.split("\n\n");
    return (
      <div style={{ minHeight: "100vh", background: "#f5f0e8", paddingTop: 64, fontFamily: "'DM Sans',sans-serif" }}>
        {/* Masthead */}
        <div style={{ background: "#1a1d2e", padding: "32px 40px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{
                background: article.color, color: "white", fontSize: "0.7rem",
                fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "4px 12px", borderRadius: 50,
              }}>{article.category}</span>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>{article.date}</span>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>· {article.dest}</span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2.2rem)",
              fontWeight: 900, color: "white", lineHeight: 1.25, margin: "0 0 12px",
            }}>{article.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
              By <strong style={{ color: "white" }}>{article.author}</strong>
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 80px" }}>
          {paras.map((p, i) => (
            <p key={i} style={{
              fontSize: i === 0 ? "1.08rem" : "0.97rem",
              lineHeight: 1.85,
              color: i === 0 ? "#1a1d2e" : "#374151",
              marginBottom: 24,
              fontWeight: i === 0 ? 500 : 400,
              borderLeft: i === 0 ? `4px solid ${article.color}` : "none",
              paddingLeft: i === 0 ? 20 : 0,
            }}>{p}</p>
          ))}

          {/* Cost badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "white", border: `2px solid ${article.color}`,
            borderRadius: 14, padding: "12px 20px", marginTop: 8,
          }}>
            <span style={{ fontSize: "1.1rem" }}>💰</span>
            <div>
              <div style={{ fontSize: "0.72rem", color: "#6b7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Estimated Cost</div>
              <div style={{ fontWeight: 800, color: article.color, fontSize: "1.05rem" }}>{article.stat}</div>
            </div>
          </div>

          <button
            onClick={() => setOpenArticle(null)}
            style={{
              display: "block", marginTop: 40,
              background: "#1a1d2e", color: "white",
              border: "none", borderRadius: 12, padding: "13px 28px",
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem",
              fontWeight: 600, cursor: "pointer",
            }}
          >← Back to Destinations</button>
        </div>
      </div>
    );
  }

  // ── Main view ──────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f5f0e8", minHeight: "100vh", paddingTop: 64 }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes heroFadeIn  { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
        @keyframes heroFadeOut { from{opacity:1} to{opacity:0} }
        @keyframes slideUp     { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn      { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .hero-img { animation: heroFadeIn 0.8s ease forwards; }
        .hero-img.out { animation: heroFadeOut 0.4s ease forwards; }
        .hero-content { animation: slideUp 0.7s 0.2s ease both; }
        .feat-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(0,0,0,0.13) !important; }
        .feat-card { transition: transform 0.3s, box-shadow 0.3s; }
        .read-btn:hover { opacity: 0.85; transform: translateX(3px); }
        .read-btn { transition: opacity 0.2s, transform 0.2s; }
        .dot-btn { transition: all 0.25s; }
        .dot-btn:hover { transform: scale(1.3); }
      `}</style>

      {/* ── HERO — 100vh ──────────────────────────────────────── */}
      <div style={{ position: "relative", height: "calc(100vh - 64px)", overflow: "hidden" }}>

        {/* Background image */}
        <img
          key={idx}
          src={slide.img}
          alt={slide.dest}
          className={`hero-img${animating ? " out" : ""}`}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
          }}
        />

        {/* Gradient overlays */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(10,10,22,0.82) 0%, rgba(10,10,22,0.35) 60%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,10,22,0.7) 0%, transparent 50%)",
        }} />

        {/* Content */}
        <div
          key={`c-${idx}`}
          className="hero-content"
          style={{
            position: "absolute", left: "6%", bottom: "14%",
            maxWidth: 600, color: "white",
          }}
        >
          {/* Destination pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16,
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)", borderRadius: 50,
            padding: "7px 16px",
          }}>
            <span style={{ fontSize: "1rem" }}>📍</span>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {slide.dest}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(2rem,4.5vw,3.4rem)",
            fontWeight: 900, lineHeight: 1.15, margin: "0 0 16px",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}>{slide.title}</h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(0.9rem,1.5vw,1.05rem)",
            lineHeight: 1.7, opacity: 0.88, margin: "0 0 28px",
            maxWidth: 480,
          }}>{slide.subtitle}</p>

          {/* Meta chips */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
            {[slide.tag, `🌡️ ${slide.temp}`, `📅 ${slide.duration}`].map(chip => (
              <span key={chip} style={{
                background: "rgba(255,255,255,0.13)", backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 50, padding: "6px 14px",
                fontSize: "0.78rem", fontWeight: 600,
              }}>{chip}</span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setOpenArticle(articles[idx]?.id)}
            style={{
              background: slide.accent, color: "white",
              border: "none", borderRadius: 12,
              padding: "13px 28px", fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.92rem", fontWeight: 700, cursor: "pointer",
              boxShadow: `0 8px 24px ${slide.accent}55`,
              letterSpacing: "0.02em",
            }}
          >
            Read the Full Guide →
          </button>
        </div>

        {/* Slide counter top-right */}
        <div style={{
          position: "absolute", top: 28, right: 32,
          color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", fontWeight: 700,
          letterSpacing: "0.08em",
        }}>
          {String(idx + 1).padStart(2,"0")} / {String(heroSlides.length).padStart(2,"0")}
        </div>

        {/* Dot nav */}
        <div style={{
          position: "absolute", bottom: 32, right: 36,
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className="dot-btn"
              onClick={() => goTo(i)}
              style={{
                width: i === idx ? 4 : 4,
                height: i === idx ? 28 : 14,
                borderRadius: 50,
                background: i === idx ? slide.accent : "rgba(255,255,255,0.35)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* Destination thumbnail strip */}
        <div style={{
          position: "absolute", bottom: 28, left: "6%",
          display: "flex", gap: 10,
        }}>
          {heroSlides.map((s, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: 56, height: 42, borderRadius: 8,
                overflow: "hidden", cursor: "pointer",
                border: i === idx ? `2px solid ${slide.accent}` : "2px solid rgba(255,255,255,0.2)",
                opacity: i === idx ? 1 : 0.55,
                transition: "all 0.25s",
                flexShrink: 0,
              }}
            >
              <img src={s.img} alt={s.dest} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── ARTICLES GRID ─────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px 80px" }}>
        {/* Section header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: "inline-block", background: "rgba(232,120,90,0.12)",
            border: "1px solid rgba(232,120,90,0.25)", borderRadius: 50,
            padding: "5px 14px", marginBottom: 14,
          }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e8785a" }}>
              ✦ Destination Guides
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.4rem)",
            fontWeight: 900, color: "#1a1d2e", margin: "0 0 12px",
          }}>Stories from the road</h2>
          <p style={{ color: "#6b7280", fontSize: "1rem", lineHeight: 1.6, maxWidth: 480, margin: 0 }}>
            Honest travel writing from people who actually went — no press trips, no affiliate fluff.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
          gap: 24,
        }}>
          {articles.map((a, i) => {
            const hs = heroSlides[i % heroSlides.length];
            return (
              <div
                key={a.id}
                className="feat-card"
                style={{
                  background: "white", borderRadius: 22,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  cursor: "pointer",
                  animation: `cardIn 0.5s ${i * 0.07}s both`,
                }}
                onClick={() => setOpenArticle(a.id)}
              >
                {/* Card hero image */}
                <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                  <img
                    src={hs.img} alt={a.dest}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.transform = "scale(1.07)")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.transform = "")}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
                  }} />
                  {/* Category badge */}
                  <span style={{
                    position: "absolute", top: 14, left: 14,
                    background: a.color, color: "white",
                    fontSize: "0.68rem", fontWeight: 800,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    padding: "4px 10px", borderRadius: 50,
                  }}>{a.category}</span>
                  {/* Cost badge */}
                  <span style={{
                    position: "absolute", top: 14, right: 14,
                    background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
                    color: "white", fontSize: "0.75rem", fontWeight: 700,
                    padding: "4px 10px", borderRadius: 50,
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}>{a.stat}</span>
                  {/* Dest name bottom */}
                  <div style={{
                    position: "absolute", bottom: 12, left: 14,
                    color: "white", fontWeight: 700, fontSize: "0.82rem",
                    display: "flex", alignItems: "center", gap: 5,
                  }}>📍 {a.dest}</div>
                </div>

                {/* Card body */}
                <div style={{ padding: "22px 22px 24px" }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.08rem", fontWeight: 800,
                    color: "#1a1d2e", lineHeight: 1.4,
                    margin: "0 0 10px",
                  }}>{a.title}</h3>
                  <p style={{
                    color: "#6b7280", fontSize: "0.85rem",
                    lineHeight: 1.65, margin: "0 0 18px",
                    display: "-webkit-box", WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{a.excerpt}</p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      <span style={{ fontWeight: 600, color: "#374151" }}>{a.author}</span>
                      <span> · {a.date}</span>
                    </div>
                    <button
                      className="read-btn"
                      style={{
                        background: "none", border: "none",
                        color: a.color, fontWeight: 700,
                        fontSize: "0.82rem", cursor: "pointer",
                        fontFamily: "'DM Sans',sans-serif",
                        padding: 0,
                      }}
                    >Read →</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;