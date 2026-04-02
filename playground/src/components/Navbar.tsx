import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png"; // ✅ ADD THIS

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
      
      {/* 🔥 LOGO */}
      <div className="logo flex items-center gap-2 cursor-pointer" onClick={() => nav("home")}>
        <img src={logo} alt="Zentra Logo" className="w-8 h-8 object-contain" />
        <span className="font-bold text-lg">Zentra</span>
      </div>

      {/* Hamburger */}
      <button
        className={`hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>

      <ul className={`nav-links${menuOpen ? " nav-links-open" : ""}`}>
        <li><a className={page === "home" ? "active" : ""} onClick={() => nav("home")}>Platform ▾</a></li>
        <li><a className={page === "featured" ? "active" : ""} onClick={() => nav("featured")}>Featured</a></li>
        <li><a className={page === "zen-planner" ? "active" : ""} onClick={() => nav("zen-planner")}>Zen-Planner</a></li>
        <li><a className={page === "about" ? "active" : ""} onClick={() => nav("about")}>About Us</a></li>
        <li><a className={page === "contact" ? "active" : ""} onClick={() => nav("contact")}>Contact Us</a></li>
        <li>
          <a
            className={page === "subscribe" ? "active" : ""}
            onClick={() => nav("subscribe")}
            style={{ color: "#e91e8c", fontWeight: 700 }}
          >
            Subscribe ✦
          </a>
        </li>

        {/* Mobile Auth */}
        <li className="nav-auth-mobile">
          <SignedOut>
            <div className="nav-auth-mobile-row">
              <Link to="/sign-in" className="btn-nav-auth" onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
              <Link to="/sign-up" className="btn-nav-auth btn-nav-auth-primary" onClick={() => setMenuOpen(false)}>
                Sign up
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </li>
      </ul>

      {/* Desktop Right */}
      <div className="nav-right">
        <SignedOut>
          <Link to="/sign-in" className="btn-nav-auth">Sign in</Link>
          <Link to="/sign-up" className="btn-nav-auth btn-nav-auth-primary">Sign up</Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <button className="btn-demo" onClick={() => nav("subscribe")}>
          Get demo
        </button>
      </div>
    </nav>
  );
};

export default Navbar;