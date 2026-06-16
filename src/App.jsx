import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Beams from './components/Beams';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

const logoPathsD = {
  mark: "M70.16,0C31.41,0,0,31.41,0,70.16s31.41,70.16,70.16,70.16,70.16-31.41,70.16-70.16S108.91,0,70.16,0ZM83.89,28.33c13.73,0,23.57,8.93,24.2,20.11.98,17.37-28.45,24.59-28.45,24.59l-4.91-5.38,7.34-7.34c.85-.85,1.33-2,1.33-3.2,0-2.5-2.03-4.54-4.53-4.54l-13.76-1.66c-3.22,0-18.45-10.09-20.72-12.37l-11.16-10.71,50.66.5ZM46.43,112.49c-9.02-.01-16.33-7.32-16.34-16.34V30.96l11,11c2.38,2.38,12.77,17.42,12.77,20.79l1.4,14.01c0,1.08.43,2.11,1.19,2.87,1.59,1.59,4.17,1.6,5.76,0l7.63-7.55,40.4,40.4h-63.8Z",
  wordmark: "M188.43,69.72V23.71h9.5v41.83h24.12v4.18h-33.62ZM236.66,23.71v27.43c0,2.02.17,3.88.5,5.58.34,1.7.92,3.17,1.76,4.39.84,1.22,1.96,2.17,3.35,2.84,1.39.67,3.12,1.01,5.18,1.01s3.9-.38,5.36-1.15c1.46-.77,2.65-1.8,3.56-3.1.91-1.3,1.58-2.83,2.02-4.61.43-1.78.65-3.67.65-5.69v-26.71h4.25v26.35c0,2.69-.28,5.26-.83,7.7-.55,2.45-1.5,4.61-2.84,6.48-1.34,1.87-3.13,3.36-5.36,4.46-2.23,1.1-5,1.66-8.32,1.66s-6.14-.52-8.5-1.55-4.28-2.45-5.8-4.25c-1.51-1.8-2.63-3.89-3.35-6.26-.72-2.38-1.08-4.88-1.08-7.52v-27.07h9.43ZM273.75,69.72V23.71h4.1l32.47,32.11V23.71h4.82v46.01h-4.1l-32.47-31.75v31.75h-4.82ZM352.08,58.41h-20.88l-5.18,11.3h-4.61l18.14-39.89-2.74-6.19h9.5l21.38,46.08h-10.01l-5.62-11.3ZM350.78,54.96l-8.86-19.87-9.14,19.87h18ZM403.2,69.72l-11.66-17.57h-7.92v17.57h-9.43V23.71h16.49c.72,0,1.79.01,3.2.04,1.42.03,2.96.14,4.64.36,1.68.22,3.38.59,5.11,1.12,1.73.53,3.28,1.29,4.64,2.3,1.37,1.01,2.46,2.3,3.28,3.89s1.15,3.55,1.01,5.9c-.14,2.21-.66,4.08-1.55,5.62-.89,1.54-2,2.82-3.35,3.85-1.34,1.03-2.83,1.86-4.46,2.48-1.63.62-3.22,1.13-4.75,1.51l15.41,18.94h-10.66ZM389.38,48.69c.77,0,1.87-.06,3.31-.18,1.44-.12,2.89-.53,4.36-1.22,1.46-.69,2.78-1.77,3.96-3.24,1.18-1.46,1.88-3.52,2.12-6.16.14-1.68-.07-3.1-.65-4.25s-1.33-2.09-2.27-2.81c-.94-.72-1.96-1.28-3.06-1.69-1.1-.41-2.15-.7-3.13-.86-.98-.17-2.15-.28-3.49-.32h-6.91v20.74h5.76ZM467.71,69.72l-11.66-17.57h-7.92v17.57h-9.43V23.71h16.49c.72,0,1.79.01,3.2.04,1.42.03,2.96.14,4.64.36,1.68.22,3.38.59,5.11,1.12,1.73.53,3.28,1.29,4.64,2.3,1.37,1.01,2.46,2.3,3.28,3.89s1.15,3.55,1.01,5.9c-.14,2.21-.66,4.08-1.55,5.62-.89,1.54-2,2.82-3.35,3.85-1.34,1.03-2.83,1.86-4.46,2.48-1.63.62-3.22,1.13-4.75,1.51l15.41,18.94h-10.66ZM453.89,48.69c.77,0,1.87-.06,3.31-.18,1.44-.12,2.89-.53,4.36-1.22,1.46-.69,2.78-1.77,3.96-3.24,1.18-1.46,1.88-3.52,2.12-6.16.14-1.68-.07-3.1-.65-4.25s-1.33-2.09-2.27-2.81c-.94-.72-1.96-1.28-3.06-1.69-1.1-.41-2.15-.7-3.13-.86-.98-.17-2.15-.28-3.49-.32h-6.91v20.74h5.76ZM511.92,58.41h-20.88l-5.18,11.3h-4.61l18.14-39.89-2.74-6.19h9.5l21.38,46.08h-10.01l-5.62-11.3ZM510.63,54.96l-8.86-19.87-9.14,19.87h18ZM534.03,69.72V23.71h9.5v46.01h-9.5ZM554.33,69.72V23.71h9.5v41.83h24.12v4.18h-33.62ZM591.48,66.26l1.44-2.88c1.68,1.06,3.54,1.88,5.58,2.48,2.04.6,4.12.95,6.23,1.04,1.39.1,2.85-.01,4.39-.32,1.54-.31,2.92-.83,4.14-1.55,1.22-.72,2.2-1.64,2.92-2.77.72-1.13.94-2.48.65-4.07-.24-1.68-1.04-3-2.41-3.96-1.37-.96-3.01-1.76-4.93-2.41-1.92-.65-3.96-1.27-6.12-1.87-2.16-.6-4.17-1.39-6.01-2.38-1.85-.98-3.37-2.27-4.57-3.85-1.2-1.58-1.8-3.72-1.8-6.41s.54-4.79,1.62-6.59c1.08-1.8,2.5-3.26,4.25-4.39,1.75-1.13,3.74-1.96,5.98-2.48,2.23-.53,4.47-.79,6.73-.79,2.45,0,4.93.32,7.45.97,2.52.65,4.81,1.52,6.88,2.63l-1.58,2.95c-1.87-.82-3.92-1.54-6.16-2.16-2.23-.62-4.5-.94-6.8-.94-1.06,0-2.12.16-3.2.47-1.08.31-2.05.77-2.92,1.37-.86.6-1.57,1.38-2.12,2.34s-.83,2.09-.83,3.38c0,1.82.64,3.26,1.91,4.32,1.27,1.06,2.87,1.97,4.79,2.74,1.92.77,4.01,1.48,6.26,2.12,2.26.65,4.34,1.49,6.26,2.52,1.92,1.03,3.52,2.34,4.79,3.92,1.27,1.58,1.91,3.7,1.91,6.34,0,2.78-.58,5.1-1.73,6.95s-2.64,3.31-4.46,4.39c-1.83,1.08-3.85,1.85-6.08,2.3-2.23.46-4.4.68-6.52.68-1.34,0-2.75-.1-4.21-.29-1.46-.19-2.9-.47-4.32-.83-1.42-.36-2.75-.79-4-1.3-1.25-.5-2.38-1.07-3.38-1.69Z",
  consultancy: [
    "M188.58,104.93v-.07c0-6.78,5.1-12.4,12.12-12.4,4.35,0,6.99,1.51,9.35,3.8l-1.85,1.99c-2.06-1.92-4.25-3.29-7.54-3.29-5.31,0-9.28,4.32-9.28,9.83v.07c0,5.55,3.97,9.9,9.28,9.9,3.29,0,5.45-1.27,7.74-3.46l1.78,1.75c-2.47,2.53-5.27,4.21-9.59,4.21-6.92,0-12.02-5.45-12.02-12.33Z",
    "M230.44,104.93v-.07c0-6.61,4.97-12.4,12.26-12.4s12.19,5.72,12.19,12.33v.07c0,6.61-4.97,12.4-12.26,12.4s-12.19-5.72-12.19-12.33ZM252.09,104.93v-.07c0-5.45-3.97-9.9-9.45-9.9s-9.38,4.38-9.38,9.83v.07c0,5.45,3.97,9.9,9.45,9.9s9.38-4.38,9.38-9.83Z",
    "M277.74,92.87h2.54l15.1,19.21v-19.21h2.64v23.97h-2.16l-15.48-19.66v19.66h-2.64v-23.97Z",
    "M320.35,113.35l1.68-1.99c2.5,2.3,4.9,3.39,8.22,3.39s5.34-1.71,5.34-4.08v-.07c0-2.23-1.2-3.46-6.23-4.56-5.51-1.2-8.05-2.98-8.05-6.92v-.07c0-3.73,3.32-6.54,7.88-6.54,3.53,0,5.96.99,8.43,2.95l-1.58,2.09c-2.23-1.82-4.45-2.6-6.92-2.6-3.15,0-5.1,1.68-5.1,3.87v.07c0,2.26,1.2,3.56,6.51,4.66,5.34,1.2,7.81,3.12,7.81,6.78v.07c0,4.11-3.43,6.78-8.19,6.78-3.84,0-6.92-1.23-9.8-3.84Z",
    "M360.6,106.81v-13.94h2.71v13.77c0,5.21,2.71,8.08,7.33,8.08s7.23-2.67,7.23-7.91v-13.94h2.71v13.73c0,7.02-4.01,10.62-10,10.62s-9.97-3.63-9.97-10.41Z",
    "M404.1,92.87h2.71v21.47h13.49v2.5h-16.2v-23.97Z",
    "M445.34,95.37h-8.08v-2.5h18.87v2.5h-8.08v21.47h-2.71v-21.47Z",
    "M484.12,92.7h2.53l10.93,24.15h-2.91l-2.81-6.34h-13.05l-2.84,6.34h-2.77l10.93-24.15ZM490.8,108.08l-5.45-12.23-5.48,12.23h10.93Z",
    "M519.43,92.87h2.54l15.1,19.21v-19.21h2.64v23.97h-2.16l-15.48-19.66v19.66h-2.64v-23.97Z",
    "M562.56,104.93v-.07c0-6.78,5.1-12.4,12.12-12.4,4.35,0,6.99,1.51,9.35,3.8l-1.85,1.99c-2.06-1.92-4.25-3.29-7.54-3.29-5.31,0-9.28,4.32-9.28,9.83v.07c0,5.55,3.97,9.9,9.28,9.9,3.29,0,5.45-1.27,7.74-3.46l1.78,1.75c-2.47,2.53-5.27,4.21-9.59,4.21-6.92,0-12.02-5.45-12.02-12.33Z",
    "M613.32,107.36l-9.97-14.49h3.29l8.08,11.99,8.15-11.99h3.15l-9.97,14.45v9.52h-2.74v-9.49Z",
  ],
};

function LogoSVG({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 626.18 140.32"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
    >
      <g>
        <path d={logoPathsD.mark} />
        <g>
          <path d={logoPathsD.wordmark} />
          <g>{logoPathsD.consultancy.map((d, i) => <path key={i} d={d} />)}</g>
        </g>
      </g>
    </svg>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  // useLayoutEffect fires synchronously after DOM update, before browser paint —
  // this beats the browser's own scroll restoration
  useLayoutEffect(() => {
    if (!hash) {
      // 'instant' overrides html { scroll-behavior: smooth } — no animation on load
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const heroAreaRef = useRef(null);
  const [darkNav, setDarkNav] = useState(isHome);
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-based nav theme — dark only on home page over the hero
  useEffect(() => {
    if (!isHome) { setDarkNav(false); return; }
    setDarkNav(true);
    const onScroll = () => {
      if (!heroAreaRef.current) return;
      const bottom = heroAreaRef.current.getBoundingClientRect().bottom;
      setDarkNav(bottom > 64);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Scroll reveal — re-runs when isHome changes so fresh DOM elements are observed
  useEffect(() => {
    if (!isHome) return;

    // Wait one frame for layout to settle after route change / scroll-to-hash
    const raf = requestAnimationFrame(() => {
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

      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Immediately reveal elements already in the viewport on mount
        if (rect.top < window.innerHeight - 48 && rect.bottom > 0) {
          el.classList.add('visible');
        } else {
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    });

    return () => cancelAnimationFrame(raf);
  }, [isHome]);

  function closeMobileMenu() { setMenuOpen(false); }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError(false);
    // Use FormData to avoid JS name-conflict with form.name (returns form's own name attr)
    const body = new URLSearchParams(new FormData(e.target)).toString();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        setFormSent(true);
      })
      .catch(() => setFormError(true));
  }

  return (
    <>
      <ScrollToTop />

      {/* ─── NAV: sticky for the full page ─── */}
      <nav className={darkNav ? 'nav-dark' : 'nav-light'}>
        <div className="container">
          <div className="nav-inner">
            <Link to="/" className="logo" aria-label="Lunar Rails Consultancy">
              <LogoSVG className="logo-svg" />
            </Link>
            <ul className="nav-links">
              <li><Link to="/#about">About</Link></li>
              <li><Link to="/#services">Services</Link></li>
              <li><Link to="/#why-us">Why Us</Link></li>
              <li><Link to="/#company">Company</Link></li>
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
              <Link to="/#contact" className="btn btn-primary" onClick={closeMobileMenu}>Contact Us</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <Link to="/#about"   onClick={closeMobileMenu}>About</Link>
        <Link to="/#services" onClick={closeMobileMenu}>Services</Link>
        <Link to="/#why-us"  onClick={closeMobileMenu}>Why Us</Link>
        <Link to="/#company" onClick={closeMobileMenu}>Company</Link>
        <Link to="/#contact" onClick={closeMobileMenu} className="mobile-menu-cta">Contact Us</Link>
      </div>

      <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/" element={<>

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
            {formSent ? (
              <div className="form-success">
                <div className="form-success-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="10" stroke="#492BFF" strokeWidth="1.5"/>
                    <path d="M7 11l3 3 5-5" stroke="#492BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Message received</h3>
                <p>We will review your enquiry and be in touch shortly.</p>
              </div>
            ) : (
              <form
                className="form-fields"
                name="contact"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                {/* Honeypot — hidden from real users, catches bots */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label>Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
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
                {formError && (
                  <p className="form-error-msg" role="alert">
                    Submission failed. Please try again or email us at{' '}
                    <a href="mailto:info@lunarconsult.io">info@lunarconsult.io</a>.
                  </p>
                )}
                <div>
                  <button type="submit" className="btn btn-primary btn-full">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

        </>} />
      </Routes>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="container">
          {/* Desktop: logo left, nav center, Privacy/Terms right */}
          <div className="footer-top">
            <Link to="/" className="logo" aria-label="Lunar Rails Consultancy">
              <LogoSVG className="logo-svg-footer" style={{ color: '#000000' }} />
            </Link>
            <ul className="footer-nav">
              <li><Link to="/#about">About</Link></li>
              <li><Link to="/#services">Services</Link></li>
              <li><Link to="/#why-us">Why Us</Link></li>
              <li><Link to="/#company">Company</Link></li>
            </ul>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
            </ul>
          </div>

          {/* Mobile: centered logo + all links stacked */}
          <div className="footer-mobile-logo">
            <Link to="/" className="logo" aria-label="Lunar Rails Consultancy">
              <LogoSVG className="logo-svg-footer" style={{ color: '#000000' }} />
            </Link>
          </div>
          <nav className="footer-mobile-nav">
            <Link to="/#about">About</Link>
            <Link to="/#services">Services</Link>
            <Link to="/#why-us">Why Us</Link>
            <Link to="/#company">Company</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
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

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
