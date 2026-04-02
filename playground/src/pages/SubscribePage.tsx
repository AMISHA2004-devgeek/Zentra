import { useState, useEffect } from "react";
import Receipt from "@/components/Receipt";
import zentraLogo from "@/assets/logo.png";   // ← adjust extension if needed (.png / .svg / .jpg)

// ─── Audio ───────────────────────────────────────────────────────────────────
function playPrinterSound() {
  try {
    const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
    for (let i = 0; i < 20; i++) {
      const o = ac.createOscillator(), g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = "sawtooth"; o.frequency.value = 70 + Math.random() * 80;
      const t = ac.currentTime + i * 0.11;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.07, t + 0.04);
      g.gain.linearRampToValueAtTime(0, t + 0.1);
      o.start(t); o.stop(t + 0.11);
    }
  } catch (_) { /* silent */ }
}

// ─── Processing Overlay ──────────────────────────────────────────────────────
const ProcessingOverlay = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(iv); return 100; } return p + 2; }), 100);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (progress >= 100 && phase === 0) {
      setTimeout(() => setPhase(1), 300);
      setTimeout(() => onDone(), 1200);
    }
  }, [progress, phase, onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(10,10,18,0.75)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "linear-gradient(145deg,#0f1117,#1a1d2e)",
        border: "1px solid rgba(232,120,90,0.25)",
        borderRadius: 28, padding: "48px 56px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
        minWidth: 320, boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
      }}>
        {/* Pulsing rings */}
        <div style={{ position: "relative", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {[1,2,3].map(i => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%",
              border: `2px solid rgba(232,120,90,${0.5 - i * 0.13})`,
              width: 40 + i * 22, height: 40 + i * 22,
              animation: `ringPulse 1.6s ease-out ${i * 0.25}s infinite`,
            }} />
          ))}
          {phase === 0 ? (
            <div style={{ animation: "spinSlow 2s linear infinite" }}>
              <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
                <path d="M20 4v6M20 30v6M4 20h6M30 20h6M8.9 8.9l4.2 4.2M26.9 26.9l4.2 4.2M8.9 31.1l4.2-4.2M26.9 13.1l4.2-4.2"
                  stroke="#e8785a" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          ) : (
            <div style={{ animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="#e8785a"/>
                <path d="M12 20l6 6 10-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        <div style={{ color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.01em" }}>
          {phase === 0 ? "Processing Payment…" : "Payment Verified!"}
        </div>

        {/* Progress track */}
        <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 50, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 50,
            background: "linear-gradient(90deg,#e8785a,#f2b531)",
            width: `${progress}%`, transition: "width 0.12s linear",
          }} />
        </div>

        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", fontFamily: "'DM Sans',sans-serif" }}>
          {Math.round(progress)}% complete
        </div>
      </div>

      <style>{`
        @keyframes ringPulse { 0%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(1.5)} }
        @keyframes spinSlow  { to{transform:rotate(360deg)} }
        @keyframes popIn     { from{transform:scale(0)} to{transform:scale(1)} }
      `}</style>
    </div>
  );
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const Label = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#6b7280", marginBottom: 7 }}>
    {children}
  </div>
);

const inputBase: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 10,
  border: "1.5px solid #e5e7eb", background: "#fafafa",
  fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#111",
  outline: "none", transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const Field = ({ placeholder, value, onChange, type = "text", icon }: {
  placeholder: string; value: string; onChange: (v: string) => void;
  type?: string; icon?: string;
}) => (
  <div style={{ position: "relative", marginBottom: 10 }}>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ ...inputBase, paddingRight: icon ? 42 : 14 }}
      onFocus={e => (e.target.style.borderColor = "#e8785a")}
      onBlur={e  => (e.target.style.borderColor = "#e5e7eb")}
    />
    {icon && <span style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", fontSize: "1rem" }}>{icon}</span>}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const SubscribePage = () => {
  const [card,    setCard]    = useState({ number: "", expiry: "", cvc: "", name: "", country: "India" });
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [code,    setCode]    = useState("");
  const [agreed,  setAgreed]  = useState(false);
  const [stage,   setStage]   = useState<"form" | "processing" | "receipt">("form");
  const [err,     setErr]     = useState("");
  const [codeApplied, setCodeApplied] = useState(false);

  const plan = { name: "Zentra Pro", sub: 9, app: 20, total: codeApplied ? 24 : 29, discount: codeApplied ? 5 : 0 };

  const fc = (set: any, k: string, v: string) => set((p: any) => ({ ...p, [k]: v }));

  const applyCode = () => {
    if (code.trim().toUpperCase() === "ZENTRA10") { setCodeApplied(true); setErr(""); }
    else setErr("Invalid discount code.");
  };

  const pay = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!agreed) { setErr("Please agree to the Terms & Conditions first."); return; }
    setErr(""); setStage("processing");
  };

  const onProcessingDone = () => {
    playPrinterSound();
    setTimeout(() => setStage("receipt"), 350);
  };

  // ── Styles ──────────────────────────────────────────────────────────────
  const S = {
    page: {
      minHeight: "100vh", background: "#f5f0e8",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column" as const,
    } as React.CSSProperties,

    header: {
      background: "rgba(245,240,232,0.85)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(0,0,0,0.07)",
      padding: "0 40px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky" as const, top: 0, zIndex: 50,
    } as React.CSSProperties,

    body: {
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 20px",
    } as React.CSSProperties,

    wrapper: {
      width: "100%", maxWidth: 900,
      display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24,
      alignItems: "start",
    } as React.CSSProperties,

    card: {
      background: "white", borderRadius: 24, padding: 36,
      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      border: "1px solid rgba(0,0,0,0.06)",
    } as React.CSSProperties,

    summaryCard: {
      background: "#1a1d2e", borderRadius: 24, padding: 32,
      boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
      border: "1px solid rgba(232,120,90,0.15)",
      color: "white",
    } as React.CSSProperties,
  };

  return (
    <div style={S.page}>
      {/* ── Global fonts ── */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Overlays */}
      {stage === "processing" && <ProcessingOverlay onDone={onProcessingDone} />}
      {stage === "receipt"    && <Receipt plan={plan} onClose={() => setStage("form")} />}

      {/* ── Header ───────────────────────────────────────────────── */}
      <header style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={zentraLogo} alt="Zentra" style={{ height: 32, objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: "#6b7280" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", borderRadius: 50, padding: "4px 12px", fontWeight: 600 }}>
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#16a34a"/></svg>
            SSL Secured
          </span>
          <span style={{ color: "#d1d5db" }}>·</span>
          <span>Step 3 of 3</span>
        </div>
      </header>

      {/* ── Hero band ─────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #1a1d2e 0%, #2d1f3d 100%)",
        padding: "28px 40px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(232,120,90,0.15)", border: "1px solid rgba(232,120,90,0.3)",
            borderRadius: 50, padding: "5px 14px", marginBottom: 12,
          }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e8785a" }}>✦ Complete Your Subscription</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,3vw,2rem)",
            fontWeight: 900, color: "white", lineHeight: 1.2, margin: 0,
          }}>
            One step away from <em style={{ color: "#e8785a", fontStyle: "normal" }}>smarter travel</em>
          </h1>
        </div>
      </div>

      {/* ── Main body ────────────────────────────────────────────── */}
      <main style={S.body}>
        <div style={S.wrapper}>

          {/* LEFT — Payment form */}
          <div style={S.card}>
            {/* Stripe header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0 }}>💳 Pay with Card</h2>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                background: "#f0f0ff", border: "1px solid #c7d2fe",
                borderRadius: 8, padding: "4px 10px", fontSize: "0.75rem",
                color: "#4f46e5", fontWeight: 600,
              }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <rect width="14" height="14" rx="3" fill="#635BFF"/>
                  <path d="M6.1 5.7c0-.4.3-.6.8-.6.7 0 1.4.2 2 .5V4c-.6-.2-1.3-.4-2-.4-1.7 0-2.8.9-2.8 2.3 0 2.2 3 1.9 3 2.8 0 .4-.4.7-.9.7-.8 0-1.6-.3-2.2-.7v1.7c.7.3 1.4.5 2.2.5 1.7 0 2.9-.9 2.9-2.3 0-2.3-3-2-3-2.9z" fill="#fff"/>
                </svg>
                Powered by Stripe
              </div>
            </div>

            <Label>Card Information</Label>
            <Field
              placeholder="0000 0000 0000 0000"
              value={card.number}
              onChange={v => fc(setCard, "number", v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim())}
              icon="💳"
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <Field placeholder="MM / YY" value={card.expiry} onChange={v => fc(setCard,"expiry",v)} />
              <Field placeholder="CVC" value={card.cvc} onChange={v => fc(setCard,"cvc",v.slice(0,4))} icon="🔑" />
            </div>
            <Field placeholder="Name on Card" value={card.name} onChange={v => fc(setCard,"name",v)} />

            <Label>Country or Region</Label>
            <div style={{ marginBottom: 20 }}>
              <select
                value={card.country}
                onChange={e => fc(setCard,"country",e.target.value)}
                style={{ ...inputBase, cursor: "pointer" }}
                onFocus={e => (e.target.style.borderColor = "#e8785a")}
                onBlur={e  => (e.target.style.borderColor = "#e5e7eb")}
              >
                {["India","Australia","United States","United Kingdom","Canada","Singapore","Germany","Japan"].map(c =>
                  <option key={c}>{c}</option>
                )}
              </select>
            </div>

            <div style={{ width: "100%", height: 1, background: "#f3f4f6", margin: "4px 0 20px" }} />

            <Label>Contact Information</Label>
            <Field placeholder="Full Name" value={contact.name} onChange={v => fc(setContact,"name",v)} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Field placeholder="Email address" type="email" value={contact.email} onChange={v => fc(setContact,"email",v)} />
              <Field placeholder="Phone number" value={contact.phone} onChange={v => fc(setContact,"phone",v)} />
            </div>
          </div>

          {/* RIGHT — Summary */}
          <div style={S.summaryCard}>
            {/* Plan badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 14,
                background: "linear-gradient(135deg,#e8785a,#f2b531)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.3rem",
              }}>✈</div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600 }}>Subscribe to</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "white" }}>{plan.name}</div>
              </div>
            </div>

            {/* Line items */}
            {[
              { label: "Subscription", sub: "Billed yearly", price: plan.sub },
              { label: "Application fee", sub: "Once only", price: plan.app },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "white" }}>{item.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{item.sub}</div>
                </div>
                <div style={{ fontWeight: 700, color: "white", fontSize: "0.95rem" }}>${item.price} AUD</div>
              </div>
            ))}

            {codeApplied && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: "0.85rem", color: "#4ade80", fontWeight: 600 }}>🎉 Discount (ZENTRA10)</div>
                <div style={{ fontWeight: 700, color: "#4ade80" }}>−$5 AUD</div>
              </div>
            )}

            {/* Discount code */}
            <div style={{ margin: "18px 0 20px" }}>
              <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600, marginBottom: 8 }}>
                Discount Code
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  placeholder="Enter code"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && applyCode()}
                  style={{
                    flex: 1, ...inputBase, marginBottom: 0,
                    background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)",
                    color: "white",
                  }}
                />
                <button
                  type="button"
                  onClick={applyCode}
                  style={{
                    background: "rgba(232,120,90,0.2)", border: "1.5px solid rgba(232,120,90,0.35)",
                    borderRadius: 10, padding: "0 16px", color: "#e8785a",
                    fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap",
                    transition: "background 0.2s",
                  }}
                >Apply</button>
              </div>
              <div style={{ marginTop: 6, fontSize: "0.73rem", color: "rgba(255,255,255,0.3)" }}>
                Try <strong style={{ color: "rgba(255,255,255,0.5)" }}>ZENTRA10</strong> for ₹5 off
              </div>
            </div>

            {/* Total */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "rgba(232,120,90,0.1)", border: "1px solid rgba(232,120,90,0.2)",
              borderRadius: 14, padding: "14px 18px", marginBottom: 20,
            }}>
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "white" }}>Total Due</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#e8785a" }}>${plan.total} AUD</span>
            </div>

            {/* Terms */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 16 }}>
              <div
                onClick={() => setAgreed(a => !a)}
                style={{
                  width: 18, height: 18, borderRadius: 5, marginTop: 1, flexShrink: 0,
                  border: `2px solid ${agreed ? "#e8785a" : "rgba(255,255,255,0.25)"}`,
                  background: agreed ? "#e8785a" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s", cursor: "pointer",
                }}
              >
                {agreed && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                I agree to the{" "}
                <a href="#" style={{ color: "#e8785a", textDecoration: "none" }}>Terms and Conditions</a>
                {" "}and the{" "}
                <a href="#" style={{ color: "#e8785a", textDecoration: "none" }}>Automatic Renewal Terms</a>
              </span>
            </label>

            {/* Error */}
            {err && (
              <div style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: 10, padding: "10px 14px", color: "#f87171", fontSize: "0.8rem", marginBottom: 14 }}>
                ⚠️ {err}
              </div>
            )}

            {/* CTA */}
            <button
              type="button"
              onClick={pay}
              style={{
                width: "100%", padding: "15px",
                background: "linear-gradient(135deg,#e8785a 0%,#d4543a 100%)",
                border: "none", borderRadius: 14,
                color: "white", fontSize: "0.95rem", fontWeight: 700,
                fontFamily: "'DM Sans',sans-serif", cursor: "pointer",
                letterSpacing: "0.04em", textTransform: "uppercase",
                boxShadow: "0 8px 24px rgba(232,120,90,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = "translateY(-2px)"; (e.target as HTMLElement).style.boxShadow = "0 12px 32px rgba(232,120,90,0.5)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = ""; (e.target as HTMLElement).style.boxShadow = "0 8px 24px rgba(232,120,90,0.35)"; }}
            >
              ✦ Subscribe Now
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14, color: "rgba(255,255,255,0.3)", fontSize: "0.73rem" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Secured by 256-bit SSL encryption
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SubscribePage;