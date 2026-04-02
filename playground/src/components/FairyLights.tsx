const bulbs: [number, number, number, number, string][] = [
  [60,32,44,50,"#ffd700"],[120,32,48,54,"#ff6b6b"],[190,30,44,50,"#ffd700"],[255,30,46,52,"#4fc3f7"],
  [320,28,42,48,"#ffd700"],[390,27,41,47,"#f9a8d4"],[455,26,40,46,"#ffd700"],[520,25,39,45,"#86efac"],
  [590,26,40,46,"#ffd700"],[660,28,42,48,"#c4b5fd"],[720,30,44,50,"#ffd700"],[790,32,46,52,"#ff6b6b"],
  [855,30,44,50,"#ffd700"],[920,28,42,48,"#4fc3f7"],[990,26,40,46,"#ffd700"],[1060,26,40,46,"#86efac"],
  [1130,28,42,48,"#ffd700"],[1200,30,44,50,"#f9a8d4"],[1270,25,39,45,"#ffd700"],[1380,32,46,52,"#c4b5fd"],
];

const FairyLights = () => (
  <div className="fairy-lights">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 32 Q180 38 360 30 Q540 22 720 30 Q900 38 1080 28 Q1260 20 1440 32" fill="none" stroke="#8b7355" strokeWidth="1.5" />
      {bulbs.map(([x, y1, y2, cy, fill], i) => (
        <g key={i}>
          <line x1={x} y1={y1} x2={x} y2={y2} stroke="#8b7355" strokeWidth="1" />
          <ellipse className="bulb" cx={x} cy={cy} rx="5" ry="6.5" fill={fill} style={{ animationDelay: `${(i * 0.3) % 2.5}s` }} />
        </g>
      ))}
    </svg>
  </div>
);

export default FairyLights;
