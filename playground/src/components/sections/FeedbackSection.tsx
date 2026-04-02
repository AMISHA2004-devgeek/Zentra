import { useState } from "react";

const existingReviews = [
  { name: "Edison Cooley", role: "Product Designer", text: "Lorem ipsum dolor sit amet, consect adipi scing elit, sed diam nonummy nibh tincidunt laoreet dolore.", rating: 5 },
  { name: "Jerrod Martin", role: "CEO & Web Developer", text: "Lorem ipsum dolor sit amet, consect adipi scing elit, sed diam nonummy nibh tincidunt laoreet dolore.", rating: 4 },
  { name: "Marc Carrillo", role: "Graphic Designer", text: "Lorem ipsum dolor sit amet, consect adipi scing elit, sed diam nonummy nibh tincidunt laoreet dolore.", rating: 3 },
];

const Stars = ({ count, interactive, onRate }: { count: number; interactive?: boolean; onRate?: (n: number) => void }) => (
  <div className="fb-stars">
    {[1, 2, 3, 4, 5].map((n) => (
      <span
        key={n}
        className={`fb-star${n <= count ? " active" : ""}${interactive ? " interactive" : ""}`}
        onClick={() => interactive && onRate?.(n)}
      >
        ★
      </span>
    ))}
  </div>
);

const FeedbackSection = () => {
  const [name, setName] = useState("");
  const [opinion, setOpinion] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !opinion.trim() || rating === 0) return;
    setSubmitted(true);
    setTimeout(() => setShowCard(true), 600);
  };

  const handleClose = () => {
    setSubmitted(false);
    setShowCard(false);
    setName("");
    setOpinion("");
    setRating(0);
  };

  return (
    <section className="fb-section">
      {/* Thank You Overlay */}
      {submitted && (
        <div className="fb-overlay" onClick={(e) => { if ((e.target as HTMLElement).className === "fb-overlay") handleClose(); }}>
          <div className="fb-envelope-wrap">
            {/* Envelope */}
            <div className="fb-envelope">
              <div className="fb-envelope-body" />
              <div className="fb-envelope-flap" />
              {/* Card popping out */}
              <div className={`fb-thankyou-card${showCard ? " pop" : ""}`}>
                <div className="fb-ty-sparkle fb-ty-s1">✦</div>
                <div className="fb-ty-sparkle fb-ty-s2">✦</div>
                <div className="fb-ty-sparkle fb-ty-s3">✧</div>
                <div className="fb-ty-text">Thank you</div>
                <div className="fb-ty-sub">for your feedback!</div>
              </div>
            </div>
            <button className="fb-ty-close" onClick={handleClose}>Back to page</button>
          </div>
        </div>
      )}

      <div className="fb-grid">
        {/* Left: Form */}
        <div className="fb-left">
          <h2 className="fb-heading">
            Submit <span className="fb-heading-accent">Your</span><br />Feedback
          </h2>
          <p className="fb-desc">Lorem ipsum dolor sit amet, conse ctetur adipi scing elit lonse setuer diam nonummy nibh euismod tincidunt.</p>
          <input
            className="fb-input"
            placeholder="Display Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Stars count={rating} interactive onRate={setRating} />
          <textarea
            className="fb-textarea"
            placeholder="Your Opinion"
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
            rows={4}
          />
          <button className="fb-submit" onClick={handleSubmit}>Submit Feedback</button>
        </div>

        {/* Right: Reviews */}
        <div className="fb-right">
          {existingReviews.map((r, i) => (
            <div key={i} className="fb-review-card" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="fb-review-avatar">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="22" fill="#e5e7eb" />
                  <circle cx="22" cy="17" r="8" fill="#9ca3af" />
                  <ellipse cx="22" cy="38" rx="14" ry="9" fill="#9ca3af" />
                </svg>
              </div>
              <div className="fb-review-content">
                <div className="fb-review-name">{r.name}</div>
                <div className="fb-review-role">{r.role}</div>
                <p className="fb-review-text">{r.text}</p>
                <Stars count={r.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
