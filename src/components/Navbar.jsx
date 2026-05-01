import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Essays",   href: "/essays" },
  { label: "Dashboards", href: "/dashboards" },
  { label: "Contact",  href: "/contact" },
   
  
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 ${
          scrolled
            ? "bg-bg/95 backdrop-blur-xl border-b border-cyan-a"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group no-underline">
          <img
  src="/images/profile.jpeg"
  alt="JA"
  className="w-8 h-8 rounded-full object-cover"
/>
            <span className="font-display font-extrabold text-base tracking-tight text-text">
              John{" "}
              <span className="text-cyan transition-all duration-200 group-hover:glow-cyan-text">
                Adetiloye
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link no-underline ${isActive(link.href) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary no-underline" style={{ padding: "0.5rem 1.25rem" }}>
              Hire Me
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block transition-all duration-300"
                style={{
                  width: 24,
                  height: 2,
                  background: mobileOpen && i === 1 ? "transparent" : "var(--cyan)",
                  transform:
                    mobileOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)"
                    : mobileOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${mobileOpen ? "open" : ""}`} style={{ top: 64 }}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`nav-link no-underline text-lg ${isActive(link.href) ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/contact" className="btn-primary no-underline text-center mt-4">
          Hire Me
        </Link>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
