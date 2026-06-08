import { useRef, useState, useEffect } from 'react';
import Beams from './components/Beams';

const logoPathsD = {
  consultancy: [
    "M202.49,85.31v-.05c0-5.3,3.97-9.65,9.59-9.65,3.46,0,5.54,1.2,7.33,2.9l-2.1,2.43c-1.52-1.39-3.09-2.29-5.25-2.29-3.52,0-6.13,2.9-6.13,6.56v.05c0,3.65,2.58,6.61,6.16,6.61,2.27,0,3.76-.91,5.36-2.4l2.1,2.13c-1.89,2.05-4.1,3.3-7.57,3.3-5.44,0-9.49-4.24-9.49-9.59Z",
    "M234.98,85.31v-.05c0-5.22,4.05-9.65,9.78-9.65s9.73,4.34,9.73,9.59v.05c0,5.22-4.05,9.65-9.78,9.65s-9.73-4.34-9.73-9.59ZM251.04,85.31v-.05c0-3.62-2.61-6.61-6.34-6.61s-6.29,2.93-6.29,6.56v.05c0,3.62,2.61,6.61,6.34,6.61s6.29-2.93,6.29-6.56Z",
    "M271.78,75.93h3.04l9.99,12.9v-12.9h3.22v18.65h-2.74l-10.29-13.27v13.27h-3.22v-18.65Z",
    "M304.9,91.87l1.97-2.34c1.81,1.57,3.57,2.42,5.89,2.42,2.02,0,3.3-.96,3.3-2.35v-.05c0-1.31-.75-2.08-4.21-2.85-3.97-.93-6.21-2.16-6.21-5.57v-.05c0-3.2,2.66-5.41,6.37-5.41,2.74,0,4.85.83,6.77,2.35l-1.76,2.48c-1.71-1.25-3.36-1.92-5.06-1.92-1.92,0-3.04.96-3.04,2.21v.05c0,1.44.85,2.08,4.45,2.93,3.92,1.01,5.97,2.35,5.97,5.46v.05c0,3.52-2.74,5.57-6.66,5.57-2.88,0-5.54-.96-7.78-2.99Z",
    "M336.24,86.67v-10.74h3.28v10.61c0,3.49,1.76,5.3,4.72,5.3s4.69-1.73,4.69-5.17v-10.74h3.28v10.58c0,5.57-3.14,8.37-8.02,8.37s-7.94-2.8-7.94-8.21Z",
    "M370.04,75.93h3.28v15.67h9.81v2.99h-13.08v-18.65Z",
    "M401.8,78.97h-5.94v-3.04h15.16v3.04h-5.94v15.62h-3.28v-15.62Z",
    "M432,75.8h3.04l8.21,18.79h-3.46l-1.89-4.5h-8.82l-1.92,4.5h-3.36l8.21-18.79ZM436.69,87.18l-3.22-7.46-3.2,7.46h6.42Z",
    "M459.76,75.93h3.04l9.99,12.9v-12.9h3.22v18.65h-2.74l-10.29-13.27v13.27h-3.22v-18.65Z",
    "M493.32,85.31v-.05c0-5.3,3.97-9.65,9.59-9.65,3.46,0,5.54,1.2,7.33,2.9l-2.1,2.43c-1.52-1.39-3.09-2.29-5.25-2.29-3.52,0-6.13,2.9-6.13,6.56v.05c0,3.65,2.58,6.61,6.16,6.61,2.27,0,3.76-.91,5.36-2.4l2.11,2.13c-1.89,2.05-4.1,3.3-7.57,3.3-5.44,0-9.49-4.24-9.49-9.59Z",
    "M532.38,87.23l-7.41-11.3h3.89l5.2,8.23,5.28-8.23h3.76l-7.41,11.22v7.43h-3.3v-7.36Z",
  ],
  wordmark: [
    "M125.9,55.48h30.31v8.57h-38.88V21.28h8.57v34.2Z",
    "M196.75,21.28h8.57v36.86l-6.98,5.9h-29.09l-6.98-5.9V21.28h8.57v32.9l1.51,1.3h22.82l1.58-1.3V21.28Z",
    "M257.81,21.21l.22,42.84h-8.57l-26.06-29.81v29.81h-8.57V21.28h8.64l25.92,29.66-.14-29.66,8.57-.07Z",
    "M299.35,21.28l22.18,42.77h-9.65l-5.11-9.79h-28.51l-5.11,9.79h-9.65l22.18-42.77h13.68ZM302.38,45.69l-8.28-15.84h-3.17l-8.21,15.84h19.66Z",
    "M360.27,52.03l10.66,12.02h-11.45l-10.58-12.02h-13.25v12.02h-8.57V21.28h36l7.06,6.41v18.43l-6.98,5.9h-2.88ZM360.05,43.46l1.51-1.3v-10.66l-1.8-1.66h-24.12v13.61h24.41Z",
    "M404.47,21.21l-18.94,42.84h-9.36l18.94-42.84h9.36Z",
    "M444.58,52.03l10.66,12.02h-11.45l-10.58-12.02h-13.25v12.02h-8.57V21.28h36l7.06,6.41v18.43l-6.98,5.9h-2.88ZM444.36,43.46l1.51-1.3v-10.66l-1.8-1.66h-24.12v13.61h24.41Z",
    "M494.98,21.28l22.18,42.77h-9.65l-5.11-9.79h-28.51l-5.11,9.79h-9.65l22.18-42.77h13.68ZM498,45.69l-8.28-15.84h-3.17l-8.21,15.84h19.66Z",
    "M522.84,64.05l-.14-42.77h8.64l.07,42.77h-8.57Z",
    "M549.7,55.48h30.31v8.57h-38.88V21.28h8.57v34.2Z",
    "M592.25,21.28h36v8.57h-32.69l-1.8,1.66v5.26l1.66,1.73,25.7-.14,7.13,6.55v13.25l-6.98,5.9h-36.07v-8.57h32.9l1.58-1.3v-5.54l-1.87-1.66-25.92.07-6.7-6.77v-12.6l7.06-6.41Z",
  ],
  mark: "M42.63,0C19.09,0,0,19.09,0,42.63s19.09,42.63,42.63,42.63,42.63-19.09,42.63-42.63S66.17,0,42.63,0ZM51.2,16.53c8.56,0,14.71,5.57,15.1,12.55.61,10.84-17.75,15.35-17.75,15.35l-3.07-3.36,4.58-4.58c.53-.53.83-1.25.83-2,0-1.56-1.27-2.83-2.83-2.83l-8.58-1.04c-2.01,0-11.51-6.3-12.93-7.72l-6.96-6.68,31.61.31ZM27.82,69.05c-5.63,0-10.19-4.57-10.2-10.2V18.17l6.86,6.87c1.48,1.48,7.97,10.87,7.97,12.97l.87,8.74c0,.67.27,1.32.74,1.79.99.99,2.6,1,3.59,0l4.76-4.71,25.21,25.21H27.82Z",
};

function LogoSVG({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 628.25 94.91"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
    >
      <g>
        <g>{logoPathsD.consultancy.map((d, i) => <path key={i} d={d} />)}</g>
        <g>{logoPathsD.wordmark.map((d, i) => <path key={i} d={d} />)}</g>
        <path d={logoPathsD.mark} />
      </g>
    </svg>
  );
}

export default function App() {
  const heroAreaRef = useRef(null);
  const [darkNav, setDarkNav] = useState(true);
  const [formSent, setFormSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-based nav theme
  useEffect(() => {
    const onScroll = () => {
      if (!heroAreaRef.current) return;
      const bottom = heroAreaRef.current.getBoundingClientRect().bottom;
      setDarkNav(bottom > 64);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal: observe all .reveal and .reveal-stagger elements
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function closeMobileMenu() { setMenuOpen(false); }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'contact',
        name: form.name.value,
        email: form.email.value,
        company: form.company.value,
        message: form.message.value,
      }).toString(),
    })
      .then(() => setFormSent(true))
      .catch(() => alert('Submission failed. Please try again.'));
  }

  return (
    <>
      {/* ─── NAV: sticky for the full page ─── */}
      <nav className={darkNav ? 'nav-dark' : 'nav-light'}>
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="logo" aria-label="Lunar Rails Consultancy">
              <LogoSVG className="logo-svg" />
            </a>
            <ul className="nav-links">
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#why-us">Why Us</a></li>
              <li><a href="#company">Company</a></li>
            </ul>
            <div className="nav-right">
              <button
                className={`hamburger${menuOpen ? ' open' : ''}`}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(o => !o)}
              >
                <span /><span /><span />
              </button>
              <a href="#contact" className="btn btn-primary" onClick={closeMobileMenu}>Contact Us</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <a href="#about"    onClick={closeMobileMenu}>About</a>
        <a href="#services" onClick={closeMobileMenu}>Services</a>
        <a href="#why-us"   onClick={closeMobileMenu}>Why Us</a>
        <a href="#company"  onClick={closeMobileMenu}>Company</a>
        <a href="#contact"  onClick={closeMobileMenu} className="mobile-menu-cta">Contact Us</a>
      </div>

      {/* ─── HERO AREA: Beams bg pulled up behind nav via margin-top ─── */}
      <div className="hero-area" ref={heroAreaRef}>

        {/* Beams canvas fills hero-area (extends visually behind nav) */}
        <div className="beams-bg" aria-hidden="true">
          <Beams
            beamWidth={2}
            beamHeight={40}
            beamNumber={12}
            lightColor="#ffffff"
            speed={1.8}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={45}
          />
        </div>

        <section className="hero" id="about">
          <div className="container">
            <div className="hero-content">
              <span className="eyebrow eyebrow-dark">Virtual Asset Consulting</span>
              <h1>Financial Clarity for Virtual Asset Operations</h1>
              <p className="hero-body">Compliance-first advisory for firms operating in digital assets. Regulatory guidance and cost intelligence, structured for action.</p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">Get in Touch</a>
                <a href="#services" className="btn btn-secondary-dark">Our Services</a>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ─── FOUNDATION ─── */}
      <section className="section-surface" id="foundation">
        <div className="container">
          <span className="eyebrow reveal">Our Foundation</span>
          <div className="section-header narrow reveal" style={{ transitionDelay: '0.1s' }}>
            <h2>Built Around Digital Finance Complexity</h2>
            <p>Lunar Rails Consultancy LTD is the advisory arm of the Lunar Rails group, licensed in Ras Al Khaimah under the RAK Digital Assets Oasis Authority.</p>
            <p>We work with virtual asset firms that need clear regulatory positioning and tighter operational cost control. No generalist advice. No ambiguity.</p>
          </div>
          <div className="cards-grid reveal-stagger">
            <div className="card">
              <span className="card-label">Mandate</span>
              <p className="card-body">Structured, actionable guidance for virtual asset businesses in regulated environments.</p>
            </div>
            <div className="card">
              <span className="card-label">Structure</span>
              <p className="card-body">A subsidiary of OTC Services DMCC, operating under RAK DAO License No. 07010347.</p>
            </div>
            <div className="card">
              <span className="card-label">Approach</span>
              <p className="card-body">Quantitative-first thinking applied to regulatory interpretation and operational efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section" id="services">
        <div className="container">
          <span className="eyebrow reveal">02 - What We Deliver</span>
          <div className="section-header narrow reveal" style={{ transitionDelay: '0.1s' }}>
            <h2>Two Service Domains</h2>
            <p>Regulatory compliance and cost control. Each discipline is data-driven and delivered as implementation-ready outputs.</p>
          </div>
          <div className="cards-grid cards-grid-2col reveal-stagger">
            <div className="card card-large">
              <span className="card-num">001</span>
              <p className="card-title">Regulatory &amp; Compliance</p>
              <p className="card-body">Jurisdiction mapping, licensing strategy, and compliance frameworks for virtual asset service providers. We translate regulatory requirements into operational structures.</p>
              <div className="card-divider" />
              <ul className="card-features">
                <li>Licensing and jurisdiction strategy</li>
                <li>AML/CFT program design</li>
                <li>Regulatory reporting support</li>
                <li>Policy documentation</li>
              </ul>
            </div>
            <div className="card card-large">
              <span className="card-num">002</span>
              <p className="card-title">Cost Control &amp; Financial Intelligence</p>
              <p className="card-body">Operational cost modelling, fee benchmarking, and data-driven reporting frameworks. We identify where capital leaks and build systems to measure and stop it.</p>
              <div className="card-divider" />
              <ul className="card-features">
                <li>Cost modelling and benchmarking</li>
                <li>KPI design and reporting frameworks</li>
                <li>Spend rationalization</li>
                <li>Financial dashboards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="section-surface" id="why-us">
        <div className="container">
          <span className="eyebrow reveal">Why Lunar Rails Consultancy</span>
          <div className="split-header reveal" style={{ transitionDelay: '0.1s' }}>
            <h2>Precision Over Generalism</h2>
            <p className="split-body">We do one thing: help virtual asset businesses operate with fewer surprises. Every engagement is scoped around measurable outcomes.</p>
          </div>
          <div className="cards-grid reveal-stagger">
            <div className="card">
              <span className="card-num">001</span>
              <p className="card-title">Data-Driven Methodology</p>
              <p className="card-body">Every recommendation is grounded in quantitative analysis. Outputs are measurable, repeatable, and auditable.</p>
            </div>
            <div className="card">
              <span className="card-num">002</span>
              <p className="card-title">Regulatory Depth</p>
              <p className="card-body">We operate within the UAE regulatory ecosystem with active RAK DAO licensing. Guidance reflects real jurisdictional knowledge.</p>
            </div>
            <div className="card">
              <span className="card-num">003</span>
              <p className="card-title">Implementation Focus</p>
              <p className="card-body">We deliver policy documents, operational frameworks, and reporting tools that work from day one, not just recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ENTITY ─── */}
      <section className="section" id="company">
        <div className="container">
          <span className="eyebrow reveal">The Entity</span>
          <div className="entity-grid">
            <div className="entity-left reveal" style={{ transitionDelay: '0.1s' }}>
              <h2>A Licensed UAE Entity</h2>
              <p>Registered under the RAK Digital Assets Oasis Authority, Lunar Rails Consultancy LTD operates as a subsidiary of OTC Services DMCC within the broader Lunar Rails group.</p>
              <p>All advisory work is carried out under active licensure and within UAE compliance standards.</p>
            </div>
            <div className="entity-cards reveal-stagger" style={{ transitionDelay: '0.15s' }}>
              <div className="entity-card">
                <span className="card-label">RAK Digital Assets Oasis</span>
                <p className="card-body">A specialist UAE free zone authority providing a clear regulatory path for virtual asset service providers and consultants.</p>
              </div>
              <div className="entity-card">
                <span className="card-label">Lunar Rails Group</span>
                <p className="card-body">A Bitcoin financial infrastructure group operating across OTC trading, custody, and advisory. Consultancy LTD extends that expertise into structured regulatory and cost advisory.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="section-surface" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-left reveal">
              <span className="eyebrow">Get in Touch</span>
              <h2>Start a conversation</h2>
              <p>Tell us what you are dealing with. We will scope a structured path forward.</p>
            </div>
            <form className="form-fields" name="contact" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <div className="form-field" style={{ display: 'none' }}>
                <label>Do not fill this out: <input name="bot-field" /></label>
              </div>
              <div className="form-field">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" autoComplete="name" required />
              </div>
              <div className="form-field">
                <label htmlFor="email">Work Email</label>
                <input type="email" id="email" name="email" autoComplete="email" required />
              </div>
              <div className="form-field">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" autoComplete="organization" required />
              </div>
              <div className="form-field">
                <label htmlFor="message">Message (Optional)</label>
                <textarea id="message" name="message" rows={4} />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={formSent}
                  style={formSent ? { opacity: 0.6, cursor: 'default' } : {}}
                >
                  {formSent ? 'Sent' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="container">
          {/* Desktop: logo left, nav center, Privacy/Terms right */}
          <div className="footer-top">
            <a href="#" className="logo" aria-label="Lunar Rails Consultancy">
              <LogoSVG className="logo-svg-footer" style={{ color: '#000000' }} />
            </a>
            <ul className="footer-nav">
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#why-us">Why Us</a></li>
              <li><a href="#company">Company</a></li>
            </ul>
            <ul className="footer-links">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>

          {/* Mobile: centered logo + all links stacked */}
          <div className="footer-mobile-logo">
            <a href="#" className="logo" aria-label="Lunar Rails Consultancy">
              <LogoSVG className="logo-svg-footer" style={{ color: '#000000' }} />
            </a>
          </div>
          <nav className="footer-mobile-nav">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#why-us">Why Us</a>
            <a href="#company">Company</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </nav>

          <div className="footer-bottom">
            <p>Lunar Rails Consultancy LTD</p>
            <p>License 07010347 | RAK DAO | A subsidiary of OTC Services DMCC | Copyright 2026</p>
          </div>
        </div>
      </footer>
    </>
  );
}
