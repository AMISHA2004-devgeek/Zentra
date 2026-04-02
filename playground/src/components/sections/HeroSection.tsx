import FairyLights from "@/components/FairyLights";

const polaroids: [string, string, string][] = [
  ["ph1", "👧🏽", "#ef4444"],
  ["ph2", "👩‍🏫", "#22c55e"],
  ["ph3", "🧒🏻🧒🏿", "#3b82f6"],
  ["ph4", "📱🏫", "#22c55e"],
  ["ph5", "🌟", "#ef4444"],
];

const HeroSection = () => (
  <section className="hero">
    <div className="clothesline-wrap">
      <div className="rope" />
      <FairyLights />
      <div className="cards-row">
        {polaroids.map(([cls, icon, pegColor], i) => (
          <div className="polaroid" key={i}>
            <div className="peg" style={{ background: pegColor }} />
            <div className={`ph ${cls}`}>{icon}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="hero-text">
      <h1 className="hero-h1">Helping child care providers thrive &amp; shine</h1>
      <span className="hero-tagline">Making excellent child care accessible to all</span>
    </div>
  </section>
);

export default HeroSection;
