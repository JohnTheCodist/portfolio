import { Link } from "react-router-dom";

const FOCUS_AREAS = [
  "Drug Supply Chain",
  "Hospital Operations",
  "Health Data Infrastructure",
  "Product Strategy",
];

const SOCIALS = [
  { label: "Twitter / X", href: "https://x.com/adetiloye_john" },
  { label: "LinkedIn",    href: "https://www.linkedin.com/in/john-adetiloye-ibukun/" },
  { label: "GitHub",      href: "https://github.com/JohnTheCodist" },
];

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-card pt-14 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-display font-extrabold text-lg mb-3 text-text">
              John <span className="text-cyan">Adetiloye</span>
            </p>
            <p className="text-muted text-sm leading-7">
              Healthcare data strategist & product builder. Using data to fix broken
              medicine access systems in Nigeria.
            </p>
          </div>

          <div>
            <p className="section-label mb-5">Navigate</p>
            <ul className="space-y-3">
              {[
                { label: "Home",     href: "/" },
                { label: "Projects", href: "/projects" },
                { label: "Essays",   href: "/essays" },
                { label: "Contact",  href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-muted text-sm no-underline transition-colors duration-200 hover:text-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label mb-5">Focus Areas</p>
            <ul className="space-y-3">
              {FOCUS_AREAS.map((f) => (
                <li key={f} className="text-muted text-sm">{f}</li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span className="font-mono text-muted text-xs">
            © {new Date().getFullYear()} John Adetiloye — Built with data-driven intention.
          </span>
          <div className="flex gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="font-mono text-muted text-xs no-underline transition-colors duration-200 hover:text-cyan"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
