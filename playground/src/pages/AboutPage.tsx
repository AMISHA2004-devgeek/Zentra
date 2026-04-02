const AboutPage = () => (
  <div className="about-page">
    {/* Hero Banner */}
    <div style={{ position: "relative", width: "100%", height: 300, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a3a8f,#2563eb,#1e40af)", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,20,80,0.52)", zIndex: 2 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-around", fontSize: "6rem", opacity: 0.16, filter: "blur(1px)" }}>
        <span>👥</span><span>💻</span><span>🤝</span>
      </div>
      <div style={{ position: "relative", zIndex: 3, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
        <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, color: "#fff" }}>About Us</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem" }}>
          <span style={{ background: "rgba(255,255,255,0.14)", color: "#fff", padding: "4px 16px", borderRadius: 4, cursor: "pointer" }}>Home</span>
          <span style={{ color: "rgba(255,255,255,0.45)" }}>›</span>
          <span style={{ background: "#2563eb", color: "#fff", padding: "4px 16px", borderRadius: 4 }}>About Us</span>
        </div>
      </div>
    </div>

    {/* Stats + Spinning badge */}
    <div style={{ background: "#fff", padding: "60px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {[{ val: "20.5k", label: "Successfully Trained" }, { val: "450+", label: "Students Community" }, { val: "20.5k", label: "Successfully Trained" }].map((s, i) => (
          <div key={i}><div style={{ fontFamily: "'Fraunces',serif", fontSize: "2.4rem", fontWeight: 900, color: "#111827", lineHeight: 1 }}>{s.val}</div><div style={{ fontSize: "0.82rem", color: "#9ca3af", marginTop: 4, fontWeight: 500 }}>{s.label}</div></div>
        ))}
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 300, height: 340, background: "linear-gradient(160deg,#c8d8e8,#a0b8cc,#7898b0)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5.5rem", boxShadow: "0 20px 60px rgba(0,0,0,0.14)", overflow: "hidden" }}>
          <span>👩🏽‍💻</span>
        </div>
        <div style={{ position: "absolute", left: -32, top: "50%", transform: "translateY(-50%)", width: 72, height: 72, zIndex: 10 }}>
          <svg className="spin-badge" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="36" cy="36" r="34" fill="white" stroke="#e5e7eb" strokeWidth="1" />
            <defs><path id="ct" d="M 36,36 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0" /></defs>
            <text fontSize="7.5" fontWeight="600" fill="#2563eb" letterSpacing="2" fontFamily="'DM Sans',sans-serif"><textPath href="#ct">✦ ABOUT COMPANY  ✦ ABOUT COMPANY  </textPath></text>
            <circle cx="36" cy="36" r="8" fill="#2563eb" /><circle cx="36" cy="36" r="4" fill="white" />
          </svg>
        </div>
      </div>
      <div style={{ paddingLeft: 16 }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: ".16em", color: "#2563eb", textTransform: "uppercase", marginBottom: 14 }}>✦ About Company</div>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 900, color: "#111827", lineHeight: 1.15, marginBottom: 18 }}>Creative agency &amp; their best solutions</h2>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#6b7280", marginBottom: 26 }}>Ultrices gravida dictum fusce id placer at orci nulla pellentesque. Aliquet port titor lacus luctus accumsan tortor.</p>
        <button style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>Read More →</button>
      </div>
    </div>

    {/* Hero Grid */}
    <div className="ab-hero">
      <div className="ab-hero-left">
        <h1>We're designing a new way to do business</h1>
        <p>Our eSignature solution helps connect businesses with their clients, companies with their employees, and move their business forward.</p>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: 6, background: "#f4a58a", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: 60, right: -30, width: 50, height: 50, borderRadius: 4, background: "#b8d4e8", zIndex: 0 }} />
        <div className="ab-hero-img" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: "5rem" }}>👨🏿‍💼</span>
          <div className="ab-congrats"><span style={{ color: "#f97316" }}>Congratulations!</span> You signed the document<br /><span style={{ color: "#f97316", fontSize: "0.7rem" }}>Subscription Warrant</span></div>
        </div>
      </div>
    </div>

    {/* Feature Row */}
    <div className="ab-feature-row" style={{ background: "#faf9f6" }}>
      <div className="ab-feat-right" style={{ order: 1 }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", minHeight: 500 }}>
          <div style={{ position: "absolute", top: 40, left: 40, width: 160, height: 200, background: "#f4a58a", borderRadius: 8 }} />
          <div style={{ position: "absolute", bottom: 40, right: 40, width: 120, height: 140, background: "#f4a58a", borderRadius: 8 }} />
          <div style={{ position: "relative", zIndex: 2, width: 220, height: 300, background: "linear-gradient(160deg,#b8cce0,#7fa8c8)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", boxShadow: "0 16px 48px rgba(0,0,0,0.15)" }}>👩🏻</div>
          <div style={{ position: "absolute", bottom: 60, left: 40, background: "#fff", borderRadius: 10, padding: "10px 16px", fontSize: "0.75rem", fontWeight: 600, color: "#1a2e1a", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", zIndex: 3, border: "1.5px dashed #e5e7eb" }}>
            <span style={{ color: "#f97316", fontWeight: 700 }}>Congratulations!</span> You signed the document
          </div>
        </div>
      </div>
      <div className="ab-feat-left" style={{ order: 2 }}>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#1a2e1a", marginBottom: 20, lineHeight: 1.15 }}>Making it easy to say <strong>"yes"</strong></h2>
        <p>Millions of forward-thinking businesses choose Yousign to power their agreements. Our platform streamlines their approval flows, secures their agreements, and allows them to offer a superior experience.</p>
        <div className="ab-feat-arrows" style={{ marginTop: 16 }}><button className="ab-arr">←</button><button className="ab-arr">→</button></div>
      </div>
    </div>

    {/* Security */}
    <div className="ab-security">
      <div className="ab-sec-left">
        <div style={{ position: "absolute", top: 30, left: 30, width: 60, height: 60, background: "#b8d4e8", borderRadius: 6 }} />
        <div style={{ position: "absolute", bottom: 40, right: 40, width: 80, height: 40, background: "#f4a58a", borderRadius: 6 }} />
        <div className="ab-sec-phones" style={{ position: "relative", zIndex: 2 }}>
          <div className="ab-mini-phone">
            <div className="ab-mini-screen">
              <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.7)", marginBottom: 8, fontWeight: 700 }}>Signed contract</div>
              <div className="ab-mini-row a" /><div className="ab-mini-row b" /><div className="ab-mini-row c" /><div className="ab-mini-row b" />
              <div style={{ marginTop: "auto", paddingTop: 8 }}>
                {["Approve", "Review", "Sign"].map((l) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(34,197,94,0.6)" }} />
                    <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.6)" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ab-receipt-block">
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#1a2e1a", marginBottom: 8 }}>Security Code</div>
            <div style={{ fontSize: "0.7rem", color: "#9ca3af", marginBottom: 8 }}>Verify your identity</div>
            {[1, 2, 3].map((i) => <div key={i} style={{ height: 4, background: "#e5e7eb", borderRadius: 2, marginBottom: 4, width: i === 2 ? "60%" : "80%" }} />)}
            <div style={{ fontSize: "0.6rem", color: "#9ca3af", textAlign: "center", marginTop: 8, letterSpacing: ".05em" }}>CONFIRMED ✓</div>
          </div>
        </div>
      </div>
      <div className="ab-sec-right">
        <h2>Solutions based on security and simplicity</h2>
        <p>We're committed to delivering a seamless experience with compliance at its core. Our signatures are eIDAS compliant and legally-binding by default.</p>
      </div>
    </div>

    {/* Team */}
    <div className="ab-team">
      <div className="ab-team-left">
        <div className="ab-team-img">
          <div className="ab-team-grid">
            {Array.from({ length: 20 }).map((_, i) => (
              <div className="ab-person" key={i}>{["👨🏿‍💼", "👩🏻‍💼", "👨🏼‍💼", "👩🏾‍💼", "🧑🏻‍💼", "👨🏽‍💼"][i % 6]}</div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 8, background: "#f97316" }} />
        <div style={{ position: "absolute", top: 40, right: 40, width: 60, height: 60, background: "#f5c842", borderRadius: 6 }} />
      </div>
      <div className="ab-team-right">
        <h2>Our team is always growing</h2>
        <p>Yousign was founded in 2013. Headquartered in Caen and Paris, France, we power agreements for millions of businesses worldwide. Our team of 40 is growing!</p>
        <a className="ab-team-link">Come work with us</a>
        <button className="btn-team-cta">View current openings →</button>
      </div>
    </div>
  </div>
);

export default AboutPage;
