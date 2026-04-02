const testimonials = [
  { rev: false, bg: "linear-gradient(135deg,#5bc8af,#2d9a8a)", text: "Playground gives our team back hours every week. The billing automation alone paid for itself in the first month.", handle: "@Eoffrey, San Francisco" },
  { rev: true, bg: "linear-gradient(135deg,#7b9fd4,#4a6fa5)", text: "Testimonial goes here fermentum sed pharetra in, aliquet sodales quam. Ut sed turpis quis orci viverra.", handle: "@LisaWhite, London" },
  { rev: false, bg: "linear-gradient(135deg,#e89f7a,#c0674a)", text: "Testimonial goes here vestibulum non hendrerit lorem, luctus tincidunt erat. Sed phareta euismos posuere.", handle: "@Walter, Berlin" },
  { rev: true, bg: "linear-gradient(135deg,#a87fd4,#7450a8)", text: "Testimonial goes here lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula.", handle: "@RyanW, Paris" },
];

const TestimonialsSection = () => (
  <section className="ct-section">
    <h2 className="ct-heading">Know Your Customers</h2>
    <div className="ct-list">
      {testimonials.map((t, i) => (
        <div className={`ct-row${t.rev ? " rev" : ""}`} key={i}>
          <div className="ct-avatar" style={{ background: t.bg }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <circle cx="17" cy="13" r="7" fill="rgba(255,255,255,0.8)" />
              <ellipse cx="17" cy="30" rx="12" ry="7" fill="rgba(255,255,255,0.8)" />
            </svg>
          </div>
          <div className="ct-card">
            <p className="ct-text">{t.text}</p>
            <div className="ct-handle">{t.handle}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
