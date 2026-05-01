import { useState } from "react";

const SOCIALS = [
  { label: "X",        icon: "𝕏",  href: "https://x.com/adetiloye_john" },
  { label: "LinkedIn", icon: "in", href: "https://www.linkedin.com/in/john-adetiloye-ibukun/" },
  { label: "GitHub",   icon: "⌥",  href: "https://github.com/JohnTheCodist" },
];

const META = [
  { label: "Email",    value: "adetiloye40@gmail.com" },
  { label: "Based in", value: "Lagos, Nigeria"     },
  { label: "Open to",  value: "Remote & On-site"   },
];

export default function ContactForm({ standalone = false }) {
  const [form,      setForm]      = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors,    setErrors]    = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  const handleField = (field) => (ev) => {
    setForm((p) => ({ ...p, [field]: ev.target.value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  return (
    <section className={`bg-bg2 px-6 md:px-10 ${standalone ? "pt-32 pb-20" : "py-24"}`}>
      <div className="max-w-7xl mx-auto">

        {standalone && (
          <div className="mb-12 text-center max-w-xl mx-auto">
            <p className="section-label mb-2">Let's Talk</p>
            <h1
              className="font-display font-extrabold text-text"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              Start a Conversation
            </h1>
            <p className="text-muted mt-3 leading-7">
              Collaboration, consulting, or just a conversation about healthcare data — I'm listening.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: info */}
          <div>
            {!standalone && (
              <>
                <p className="section-label mb-2">Get In Touch</p>
                <h2
                  className="font-display font-extrabold text-text mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
                >
                  Let's Build Something <span className="text-cyan">Meaningful</span>
                </h2>
                <p className="text-muted text-base leading-8 mb-8">
                  Looking to collaborate on health data projects, research partnerships, or
                  product consulting? I'm interested in work that moves the needle on
                  healthcare access in Africa.
                </p>
              </>
            )}

            <div className="flex flex-col gap-4 mb-8">
              {META.map((m) => (
                <div key={m.label} className="flex items-center gap-5">
                  <span className="section-label w-16 flex-shrink-0">{m.label}</span>
                  <span className="text-text text-sm">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <a href={s.href} className="social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                  <span className="font-mono text-muted uppercase tracking-widest" style={{ fontSize: "0.55rem" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-card p-8" style={{ border: "1px solid var(--border-c)" }}>
            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{ background: "rgba(0,255,213,0.1)", border: "2px solid var(--cyan)", color: "var(--cyan)" }}
                >
                  ✓
                </div>
                <h3 className="font-display font-extrabold text-2xl text-cyan">Message Sent!</h3>
                <p className="text-muted text-sm">I'll get back to you within 48 hours.</p>
                <button
                  className="btn-outline mt-4"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div>
                  <label className="section-label block mb-2">Full Name</label>
                  <input
                    className="form-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleField("name")}
                  />
                  {errors.name && <p className="text-red-accent text-xs font-mono mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="section-label block mb-2">Email Address</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleField("email")}
                  />
                  {errors.email && <p className="text-red-accent text-xs font-mono mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="section-label block mb-2">Message</label>
                  <textarea
                    className="form-input"
                    rows={5}
                    placeholder="Tell me about your project or collaboration idea..."
                    value={form.message}
                    onChange={handleField("message")}
                    style={{ resize: "vertical" }}
                  />
                  {errors.message && <p className="text-red-accent text-xs font-mono mt-1">{errors.message}</p>}
                </div>

                <button className="btn-primary w-full" onClick={handleSubmit}>
                  Send Message →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
