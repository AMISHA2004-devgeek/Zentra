import polaroid1 from "@/assets/polaroid1.jpg";
import polaroid2 from "@/assets/polaroid2.jpg";
import polaroid3 from "@/assets/polaroid3.jpg";
import polaroid4 from "@/assets/polaroid4.jpg";
import polaroid5 from "@/assets/polaroid5.jpg";
import polaroid6 from "@/assets/polaroid6.jpg";

const bulbs: [number, number, number, number, string][] = [
  [60,32,44,50,"#ffd700"],[120,32,48,54,"#ff6b6b"],[190,30,44,50,"#ffd700"],[255,30,46,52,"#4fc3f7"],
  [320,28,42,48,"#ffd700"],[390,27,41,47,"#f9a8d4"],[455,26,40,46,"#ffd700"],[520,25,39,45,"#86efac"],
  [590,26,40,46,"#ffd700"],[660,28,42,48,"#c4b5fd"],[720,30,44,50,"#ffd700"],[790,32,46,52,"#ff6b6b"],
  [855,30,44,50,"#ffd700"],[920,28,42,48,"#4fc3f7"],[990,26,40,46,"#ffd700"],[1060,26,40,46,"#86efac"],
  [1130,28,42,48,"#ffd700"],[1200,30,44,50,"#f9a8d4"],[1270,25,39,45,"#ffd700"],[1380,32,46,52,"#c4b5fd"],
];

// 👉 shifted all X positions slightly RIGHT (+40)
const polaroids = [
  { x: 180, rot: -6, img: polaroid1, pegColor: "#ef4444", w: 130 },
  { x: 380, rot: 3, img: polaroid2, pegColor: "#22c55e", w: 140 },
  { x: 580, rot: -2, img: polaroid3, pegColor: "#3b82f6", w: 150 },
  { x: 780, rot: 4, img: polaroid4, pegColor: "#f59e0b", w: 135 },
  { x: 980, rot: -4, img: polaroid5, pegColor: "#22c55e", w: 130 },
  { x: 1180, rot: 3, img: polaroid6, pegColor: "#ef4444", w: 135 },
];

function ropeY(x: number): number {
  const t = x / 1440;
  if (t < 0.25) return 32 + (30 - 32) * (t / 0.25);
  if (t < 0.5) return 30;
  if (t < 0.75) return 30 + (28 - 30) * ((t - 0.5) / 0.25);
  return 28 + (32 - 28) * ((t - 0.75) / 0.25);
}

const FairyLightsWithPolaroids = () => (
  <div className="fl-polaroid-section">
    <svg
      className="fl-svg"
      viewBox="0 0 1440 500"
      preserveAspectRatio="xMidYMin slice"
    >
      {/* Rope */}
      <path
        d="M0 32 Q180 38 360 30 Q540 22 720 30 Q900 38 1080 28 Q1260 20 1440 32"
        fill="none"
        stroke="#8b7355"
        strokeWidth="2.5"
      />

      {/* Lights */}
      {bulbs.map(([x, y1, y2, cy, fill], i) => (
        <g key={`b${i}`}>
          <line x1={x} y1={y1} x2={x} y2={y2} stroke="#8b7355" strokeWidth="1" />
          <ellipse cx={x} cy={cy} rx="5" ry="6.5" fill={fill} />
        </g>
      ))}

      {/* Polaroids */}
      {polaroids.map((p, i) => {
        const ry = ropeY(p.x);
        const stringLen = 25 + (i % 3) * 6;
        const cardTop = ry + stringLen;
        const cardH = p.w * 1.25;
        const cardW = p.w;
        const photoH = p.w * 0.78;

        return (
          <g key={`p${i}`} transform={`rotate(${p.rot}, ${p.x}, ${cardTop + cardH / 2})`}>
            <line x1={p.x} y1={ry} x2={p.x} y2={cardTop} stroke="#8b7355" strokeWidth="1" />

            <rect x={p.x - 5} y={cardTop - 6} width={10} height={16} rx={2} fill={p.pegColor} />

            <rect
              x={p.x - cardW / 2}
              y={cardTop}
              width={cardW}
              height={cardH}
              rx={3}
              fill="#fff"
              filter="url(#polaroidShadow)"
            />

            <image
              href={p.img}
              x={p.x - cardW / 2 + 6}
              y={cardTop + 6}
              width={cardW - 12}
              height={photoH}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        );
      })}

      {/* ✨ CURVE FIXED (VISIBLE NOW) */}
      <defs>
  <path id="curve" d="M 260 400 Q 720 450 1180 400" fill="transparent"/>
</defs>
<text fontSize="46" fontWeight="900" fontFamily="Fraunces, serif" letterSpacing="1.5" fill="#2d4a2d">
  <textPath href="#curve" startOffset="50%" textAnchor="middle">
    Happy Memories made with us
  </textPath>
</text>
    </svg>
  </div>
);

export default FairyLightsWithPolaroids;