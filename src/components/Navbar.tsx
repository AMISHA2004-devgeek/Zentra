import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  page: string;
  onNavigate: (page: string) => void;
}

const Navbar = ({ page, onNavigate }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = (p: string) => {
    onNavigate(p);
    setMenuOpen(false);
  };

  return (
    <nav className={`main-nav${scrolled ? " nav-scrolled" : ""}`}>
      <div className="logo" onClick={() => nav("home")}>
        <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
          <path d="M8 28 Q12 10 20 14 Q28 18 32 8" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
          <circle cx="8" cy="28" r="4" fill="#2563eb" />
        </svg>
        playground
      </div>

      {/* Hamburger */}
      <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>

      <ul className={`nav-links${menuOpen ? " nav-links-open" : ""}`}>
        <li><a className={page === "home" ? "active" : ""} onClick={() => nav("home")}>Platform ▾</a></li>
        <li><a className={page === "featured" ? "active" : ""} onClick={() => nav("featured")}>Featured</a></li>
        <li><a className={page === "about" ? "active" : ""} onClick={() => nav("about")}>About Us</a></li>
        <li><a className={page === "contact" ? "active" : ""} onClick={() => nav("contact")}>Contact Us</a></li>
        <li><a className={page === "subscribe" ? "active" : ""} onClick={() => nav("subscribe")} style={{ color: "#e91e8c", fontWeight: 700 }}>Subscribe ✦</a></li>
        <li className="nav-auth-mobile">
          <SignedOut>
            <div className="nav-auth-mobile-row">
              <Link to="/sign-in" className="btn-nav-auth" onClick={() => setMenuOpen(false)}>Sign in</Link>
              <Link to="/sign-up" className="btn-nav-auth btn-nav-auth-primary" onClick={() => setMenuOpen(false)}>Sign up</Link>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </li>
      </ul>
      <div className="nav-right">
        <SignedOut>
          <Link to="/sign-in" className="btn-nav-auth">Sign in</Link>
          <Link to="/sign-up" className="btn-nav-auth btn-nav-auth-primary">Sign up</Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <button className="btn-demo" onClick={() => nav("subscribe")}>Get demo</button>
      </div>
    </nav>
  );
};

export default Navbar;
