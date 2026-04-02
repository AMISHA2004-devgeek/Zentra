interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => (
  <footer className="site-footer">
    <div className="footer-inner">
      {/* Left: brand + socials */}
      <div className="footer-col footer-brand">
        <div className="footer-logo">
          <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
            <path d="M8 28 Q12 10 20 14 Q28 18 32 8" stroke="#a855f6" strokeWidth="3" strokeLinecap="round" />
            <circle cx="8" cy="28" r="4" fill="#a855f6" />
          </svg>
          <span>playground</span>
        </div>
        <div className="footer-socials">
          {["f", "📷", "⚙", "▶"].map((icon, i) => (
            <span className="footer-social-icon" key={i}>{icon}</span>
          ))}
        </div>
        <p className="footer-copy">© 2025 Built with Playground</p>
      </div>

      {/* Contact */}
      <div className="footer-col">
        <h4>Contact</h4>
        <p>info@playground.app</p>
        <p>+1 (646) 566-8590</p>
        <p style={{ marginTop: 12 }}>674 Oak Meadow Lane<br />South Ozone Park,<br />NY 11420</p>
      </div>

      {/* Sitemap */}
      <div className="footer-col">
        <h4>Sitemap</h4>
        <a onClick={() => onNavigate("about")}>About</a>
        <a onClick={() => onNavigate("home")}>Features</a>
        <a onClick={() => onNavigate("home")}>Platform</a>
        <a onClick={() => onNavigate("contact")}>Contact</a>
        <a onClick={() => onNavigate("subscribe")}>Subscribe</a>
      </div>

      {/* Google Map */}
      <div className="footer-col footer-map-col">
        <h4>Find Us</h4>
        <div className="footer-map">
          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.6!2d-73.82!3d40.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQwJzEyLjAiTiA3M8KwNDknMTIuMCJX!5e0!3m2!1sen!2sus!4v1600000000000"
            width="100%"
            height="180"
            style={{ border: 0, borderRadius: 12 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
