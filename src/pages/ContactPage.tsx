import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    company: "",
    message: "",
    how: "",
  });

  const [sent, setSent] = useState(false);

  const f = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  // ✅ FIXED SEND FUNCTION (NO CORS ISSUE)
  const send = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const query = new URLSearchParams(form).toString();

      await fetch(
        `https://script.google.com/macros/s/AKfycbwxyK2s3AdNBRRHii5e3sHaMT7mdP-HbnirRKJOLoVbdAbsaeotOT6eOnbYrZFjgktn_A/exec?${query}`
      );

      setSent(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        company: "",
        message: "",
        how: "",
      });

      setTimeout(() => setSent(false), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="contact-page">
      {[
        [8, 20, "70px"],
        [85, 35, "40px"],
        [15, 65, "25px"],
        [90, 60, "55px"],
        [50, 10, "35px"],
        [5, 45, "50px"],
        [70, 75, "30px"],
      ].map(([l, t, s], i) => (
        <div
          className="contact-bubble"
          key={i}
          style={{
            left: `${l}%`,
            top: `${t}%`,
            width: s as string,
            height: s as string,
          }}
        />
      ))}

      <div className="contact-box">
        <div className="contact-form-side">
          <h2>Contact us</h2>

          {sent && (
            <div
              style={{
                background: "#d1fae5",
                color: "#065f46",
                borderRadius: 10,
                padding: "10px 16px",
                marginBottom: 16,
                fontSize: "0.88rem",
                fontWeight: 600,
              }}
            >
              ✅ Your message was sent! We'll reply soon.
            </div>
          )}

          <form onSubmit={send}>
            <div className="cfield">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => f("name", e.target.value)}
                required
              />
            </div>

            <div className="cfield">
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => f("email", e.target.value)}
                required
              />
            </div>

            <div className="cfield">
              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => f("phone", e.target.value)}
              />
            </div>

            <div className="cfield">
              <input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => f("subject", e.target.value)}
              />
            </div>

            <div className="cfield">
              <input
                placeholder="Company (optional)"
                value={form.company}
                onChange={(e) => f("company", e.target.value)}
              />
            </div>

            <div className="cfield">
              <select
                value={form.how}
                onChange={(e) => f("how", e.target.value)}
              >
                <option value="" disabled>
                  How did you hear about us?
                </option>
                <option>Social Media</option>
                <option>Search Engine</option>
                <option>Friend / Referral</option>
                <option>Advertisement</option>
                <option>Other</option>
              </select>
            </div>

            <div className="cfield cfield-tall">
              <textarea
                placeholder="Your message…"
                rows={4}
                value={form.message}
                onChange={(e) => f("message", e.target.value)}
                required
              />
            </div>

            <button className="btn-send" type="submit">
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT SIDE UI (UNCHANGED) */}
        <div className="contact-illus">
          <div className="illus-nav">
            <div className="illus-nav-pill" />
            <div className="illus-nav-pill" />
            <div className="illus-nav-pill" />
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <div
              style={{
                fontSize: "7rem",
                filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.08))",
              }}
            >
              🧍‍♂️
            </div>

            <div
              style={{
                position: "absolute",
                top: 28,
                left: -28,
                background: "#fff",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                fontSize: "1.3rem",
              }}
            >
              📞
            </div>

            <div
              style={{
                position: "absolute",
                top: 56,
                right: -16,
                background: "#ffd700",
                borderRadius: "50%",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                fontSize: "1.2rem",
              }}
            >
              💬
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;