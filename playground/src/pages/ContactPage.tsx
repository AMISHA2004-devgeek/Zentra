import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", company: "", message: "", how: "" });
  const [sent, setSent] = useState(false);
  const f = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const send = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3500); };

  return (
    <div className="contact-page">
      {[[8, 20, "70px"], [85, 35, "40px"], [15, 65, "25px"], [90, 60, "55px"], [50, 10, "35px"], [5, 45, "50px"], [70, 75, "30px"]].map(([l, t, s], i) => (
        <div className="contact-bubble" key={i} style={{ left: `${l}%`, top: `${t}%`, width: s as string, height: s as string }} />
      ))}
      <div className="contact-box">
        <div className="contact-form-side">
          <h2>Contact us</h2>
          {sent && <div style={{ background: "#d1fae5", color: "#065f46", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: "0.88rem", fontWeight: 600 }}>✅ Your message was sent! We'll reply soon.</div>}
          <form onSubmit={send}>
            <div className="cfield">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
              <input placeholder="Name" value={form.name} onChange={(e) => f("name", e.target.value)} required />
            </div>
            <div className="cfield">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 4 10 9 10-9" /></svg>
              <input type="email" placeholder="Email" value={form.email} onChange={(e) => f("email", e.target.value)} required />
            </div>
            <div className="cfield">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 5.18 2 2 0 015.09 3h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              <input placeholder="Phone Number" value={form.phone} onChange={(e) => f("phone", e.target.value)} />
            </div>
            <div className="cfield">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
              <input placeholder="Subject" value={form.subject} onChange={(e) => f("subject", e.target.value)} />
            </div>
            <div className="cfield">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
              <input placeholder="Company (optional)" value={form.company} onChange={(e) => f("company", e.target.value)} />
            </div>
            <div className="cfield">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" /></svg>
              <select value={form.how} onChange={(e) => f("how", e.target.value)} style={{ background: "transparent", border: "none", outline: "none", width: "100%", fontSize: "0.9rem", fontFamily: "'DM Sans',sans-serif", color: form.how ? "#374151" : "#9ca3af" }}>
                <option value="" disabled>How did you hear about us?</option>
                <option>Social Media</option><option>Search Engine</option><option>Friend / Referral</option><option>Advertisement</option><option>Other</option>
              </select>
            </div>
            <div className="cfield cfield-tall">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" style={{ marginTop: 2, flexShrink: 0 }}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
              <textarea placeholder="Your message…" rows={4} value={form.message} onChange={(e) => f("message", e.target.value)} required />
            </div>
            <button className="btn-send" type="submit">Send Message</button>
          </form>
        </div>
        <div className="contact-illus">
          <div className="illus-nav"><div className="illus-nav-pill" /><div className="illus-nav-pill" /><div className="illus-nav-pill" /></div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
            <div style={{ fontSize: "7rem", filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.08))" }}>🧍‍♂️</div>
            <div style={{ position: "absolute", top: 28, left: -28, background: "#fff", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.1)", fontSize: "1.3rem" }}>📞</div>
            <div style={{ position: "absolute", top: 56, right: -16, background: "#ffd700", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.1)", fontSize: "1.2rem" }}>💬</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
