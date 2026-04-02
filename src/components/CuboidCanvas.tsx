import { useEffect, useRef } from "react";

const CuboidCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const rsz = () => {
      const r = cv.parentElement!.getBoundingClientRect();
      cv.width = r.width;
      cv.height = r.height;
    };
    rsz();
    window.addEventListener("resize", rsz);

    const AX = Math.cos(Math.PI / 6);
    const AY = Math.sin(Math.PI / 6);
    const iso = (x: number, y: number, z: number, cx: number, cy: number, S: number) => ({
      x: cx + (x - z) * AX * S,
      y: cy - y * S + (x + z) * AY * S,
    });

    const BOXES = [
      { gx: -4.6, gy: 0, gz: 0, w: 2, h: 3.2, d: 2 },
      { gx: -2.4, gy: 0, gz: 0, w: 2, h: 5.8, d: 2 },
      { gx: 0.6, gy: 0, gz: 0, w: 2, h: 2.2, d: 2 },
      { gx: 2.8, gy: 0, gz: 0, w: 2, h: 1.4, d: 2 },
    ];

    const rng = (a: number, b: number) => a + Math.random() * (b - a);
    const OFF = BOXES.map(() => ({ ox: rng(-6, 6), oy: rng(3, 8), oz: rng(-6, 6) }));
    const CYCLE = 3800, A = 1500, H = 1000;
    const st = performance.now();
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    function box(gx: number, gy: number, gz: number, w: number, h: number, d: number, al: number, cx: number, cy: number, S: number) {
      const p = [
        iso(gx, gy, gz, cx, cy, S), iso(gx + w, gy, gz, cx, cy, S),
        iso(gx + w, gy, gz + d, cx, cy, S), iso(gx, gy, gz + d, cx, cy, S),
        iso(gx, gy + h, gz, cx, cy, S), iso(gx + w, gy + h, gz, cx, cy, S),
        iso(gx + w, gy + h, gz + d, cx, cy, S), iso(gx, gy + h, gz + d, cx, cy, S),
      ];
      const drawEdges = (edges: number[][], a: number) => {
        edges.forEach(([ea, eb]) => {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${a})`;
          ctx.lineWidth = 1.6;
          ctx.moveTo(p[ea].x, p[ea].y);
          ctx.lineTo(p[eb].x, p[eb].y);
          ctx.stroke();
        });
      };
      drawEdges([[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],[1,2],[2,3]], al);
      drawEdges([[0,1],[0,3]], al * 0.3);
    }

    let raf: number;
    function draw(now: number) {
      const W = cv.width, Ht = cv.height;
      ctx.clearRect(0, 0, W, Ht);
      const cx = W * 0.5, cy = Ht * 0.56, S = Math.min(W, Ht) * 0.082;
      const el = (now - st) % CYCLE;
      const t = el < A ? ease(el / A) : el < A + H ? 1 : 1 - ease((el - A - H) / (CYCLE - A - H));
      BOXES.forEach((b, i) => {
        const o = OFF[i];
        box(b.gx + o.ox * (1 - t), b.gy + o.oy * (1 - t), b.gz + o.oz * (1 - t), b.w, b.h, b.d, 0.45 + t * 0.45, cx, cy, S);
        if (t < 0.9) box(b.gx, b.gy, b.gz, b.w, b.h, b.d, (1 - t) * 0.12, cx, cy, S);
      });
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", rsz); };
  }, []);

  return <canvas ref={ref} id="cuboidCanvas" />;
};

export default CuboidCanvas;
