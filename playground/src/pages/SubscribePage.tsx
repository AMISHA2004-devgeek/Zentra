import { useState, useEffect, useRef } from "react";
import Receipt from "@/components/Receipt";

function playPrinterSound() {
  try {
    const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
    for (let i = 0; i < 20; i++) {
      const o = ac.createOscillator(), g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = "sawtooth"; o.frequency.value = 70 + Math.random() * 80;
      const t = ac.currentTime + i * 0.11;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.07, t + 0.04); g.gain.linearRampToValueAtTime(0, t + 0.1);
      o.start(t); o.stop(t + 0.11);
    }
  } catch (e) { /* silent */ }
}

/* Lottie-style CSS animation overlay while "processing" */
const ProcessingOverlay = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=processing, 1=success

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && phase === 0) {
      setTimeout(() => setPhase(1), 300);
      setTimeout(() => onDone(), 1200);
    }
  }, [progress, phase, onDone]);

  return (
    <div className="processing-overlay">
      <div className="processing-card">
        {/* Animated rings */}
        <div className="proc-rings">
          <div className="proc-ring proc-ring-1" />
          <div className="proc-ring proc-ring-2" />
          <div className="proc-ring proc-ring-3" />
          {phase === 0 ? (
            <div className="proc-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 4v6M20 30v6M4 20h6M30 20h6M8.9 8.9l4.2 4.2M26.9 26.9l4.2 4.2M8.9 31.1l4.2-4.2M26.9 13.1l4.2-4.2" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          ) : (
            <div className="proc-icon proc-success">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="#22c55e" />
                <path d="M12 20l6 6 10-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>

        <div className="proc-text">{phase === 0 ? "Processing Payment..." : "Payment Verified!"}</div>

        {/* Progress bar */}
        <div className="proc-bar-track">
          <div className="proc-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="proc-particle" style={{
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }} />
        ))}
      </div>
    </div>
  );
};

const SubscribePage = () => {
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "", country: "Australia" });
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [code, setCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [stage, setStage] = useState<"form" | "processing" | "receipt">("form");
  const [err, setErr] = useState("");
  const plan = { name: "Playground Pro", sub: 9, app: 20, total: 29 };

  const fc = (set: any, k: string, v: string) => set((p: any) => ({ ...p, [k]: v }));

  const pay = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!agreed) { setErr("Please check the Terms & Conditions box first."); return; }
    setErr("");
    setStage("processing");
  };

  const onProcessingDone = () => {
    playPrinterSound();
    setTimeout(() => setStage("receipt"), 350);
  };

  return (
    <div className="sub-page">
      {stage === "processing" && <ProcessingOverlay onDone={onProcessingDone} />}
      {stage === "receipt" && <Receipt plan={plan} onClose={() => setStage("form")} />}
      <div className="sub-header"><h1>Start Your Account</h1><p>Step 3 of 3</p></div>
      <form onSubmit={pay}>
        <div className="sub-body">
          <div className="sub-form-card">
            <div className="sub-stripe-row">
              <h3>Pay with card</h3>
              <div className="stripe-badge">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect width="14" height="14" rx="3" fill="#635BFF" /><path d="M6.1 5.7c0-.4.3-.6.8-.6.7 0 1.4.2 2 .5V4c-.6-.2-1.3-.4-2-.4-1.7 0-2.8.9-2.8 2.3 0 2.2 3 1.9 3 2.8 0 .4-.4.7-.9.7-.8 0-1.6-.3-2.2-.7v1.7c.7.3 1.4.5 2.2.5 1.7 0 2.9-.9 2.9-2.3 0-2.3-3-2-3-2.9z" fill="#fff" /></svg>
                Powered by stripe
              </div>
            </div>
            <div className="sub-field-label">Card Information</div>
            <div className="sub-input-wrap" style={{ marginBottom: 8 }}>
              <input className="sub-input" placeholder="0000 0000 0000 0000" value={card.number} onChange={(e) => fc(setCard, "number", e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())} />
              <span>💳</span>
            </div>
            <div className="sub-input-row" style={{ marginBottom: 8 }}>
              <input className="sub-input" placeholder="MM / YY" value={card.expiry} onChange={(e) => fc(setCard, "expiry", e.target.value)} />
              <div className="sub-input-wrap">
                <input className="sub-input" placeholder="CVC" value={card.cvc} onChange={(e) => fc(setCard, "cvc", e.target.value.slice(0, 4))} />
                <span>🔑</span>
              </div>
            </div>
            <input className="sub-input" placeholder="Name On Card" value={card.name} onChange={(e) => fc(setCard, "name", e.target.value)} style={{ marginBottom: 14 }} />
            <div className="sub-field-label">Country or Region</div>
            <select className="sub-input" value={card.country} onChange={(e) => fc(setCard, "country", e.target.value)} style={{ marginBottom: 14 }}>
              {["Australia", "India", "United States", "United Kingdom", "Canada", "Singapore"].map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="sub-field-label">Contact Information</div>
            <input className="sub-input" placeholder="Name" value={contact.name} onChange={(e) => fc(setContact, "name", e.target.value)} style={{ marginBottom: 8 }} />
            <div className="sub-input-row">
              <input className="sub-input" placeholder="Email" type="email" value={contact.email} onChange={(e) => fc(setContact, "email", e.target.value)} />
              <input className="sub-input" placeholder="Phone" value={contact.phone} onChange={(e) => fc(setContact, "phone", e.target.value)} />
            </div>
          </div>
          <div className="sub-summary">
            <div className="sub-sum-label">Subscribe to</div>
            <div className="sub-sum-title">{plan.name}</div>
            <div className="sub-line"><div className="sub-line-info"><div className="lbl">Subscription</div><div className="sub">Billed yearly</div></div><div className="sub-dots" /><div className="sub-price">${plan.sub} AUD</div></div>
            <div className="sub-line"><div className="sub-line-info"><div className="lbl">Application fee</div><div className="sub">Once Only</div></div><div className="sub-dots" /><div className="sub-price">${plan.app} AUD</div></div>
            <div style={{ marginTop: 18, marginBottom: 6, fontSize: "0.82rem", fontWeight: 600, color: "#374151" }}>Apply Discount Code</div>
            <div className="sub-code-row"><input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} /><span style={{ color: "#e91e8c", fontWeight: 700, fontSize: "1.1rem" }}>✓</span></div>
            <div className="sub-total"><span>Total</span><span>${plan.total} AUD</span></div>
            <label className="sub-terms">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span>I agree to the <a>Terms and Conditions</a> and the <a>Automatic Renewal Terms</a> above</span>
            </label>
            {err && <div style={{ color: "#dc2626", fontSize: "0.82rem", marginBottom: 10, padding: "8px 12px", background: "#fef2f2", borderRadius: 8, border: "1px solid #fecaca" }}>{err}</div>}
            <button className="btn-subscribe" type="button" onClick={pay}>SUBSCRIBE</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubscribePage;
