'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useCallback } from 'react';

/* Dynamic import — Three.js cannot run on server */
const LanyardCard = dynamic(() => import('@/components/band/LanyardCard'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%' }} />,
});

/* ── Types ─────────────────────────────────────────────── */
interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  live_url: string;
  github_url: string;
  technologies: string | string[];
  key_features: string | string[];
  image_urls: string[];
}
interface Certificate { id: number; title: string; image_url: string; }
interface TechItem { id: number; name: string; logo_url: string; }
interface Comment { id: number; name: string; comment: string; likes: number; is_pinned: boolean; image_url: string; }

/* ── Config ─────────────────────────────────────────────── */
const SUPABASE_URL = 'https://whlwpkgotnvtyvvxerdo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobHdwa2dvdG52dHl2dnhlcmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNTI4OTgsImV4cCI6MjA1ODcyODg5OH0.ByXan_dBEZRfbGIiRiDGmcvC-5sQ5Yb_lcn5Ys4x0HE';

/* ── Sample data ─────────────────────────────────────────── */
const sampleProjects: Project[] = [
  { id:'1', title:'Portfolio Website', description:'Personal portfolio built with Next.js and Supabase. Features an animated intro screen, physics-based 3D lanyard card, and live comments.', image_url:'', live_url:'', github_url:'', technologies:'Next.js,TypeScript,Tailwind CSS,Three.js,Supabase,Framer Motion', key_features:'3D Physics Card,Animated Intro,Live Comments,Admin Dashboard,Responsive Design', image_urls:[] },
  { id:'2', title:'E-Commerce Dashboard', description:'Modern admin dashboard for managing products, orders, and analytics. Clean dark UI with real-time data visualization and smooth interactions.', image_url:'', live_url:'#', github_url:'#', technologies:'React,TypeScript,Chart.js,Tailwind CSS,REST API', key_features:'Real-time Charts,Product Management,Order Tracking,Dark Mode,Mobile Responsive', image_urls:[] },
  { id:'3', title:'Landing Page UI', description:'High-converting SaaS landing page with glassmorphism design, smooth scroll animations, and interactive pricing cards. Optimized for performance.', image_url:'', live_url:'#', github_url:'', technologies:'HTML,CSS,JavaScript,GSAP,Intersection Observer', key_features:'Animated Hero,Pricing Toggle,Testimonials Slider,Contact Form,SEO Optimized', image_urls:[] },
];
const sampleCerts: Certificate[] = [
  { id:1, title:'Web Development Fundamentals', image_url:'' },
  { id:2, title:'React.js Advanced Concepts', image_url:'' },
  { id:3, title:'UI/UX Design Principles', image_url:'' },
];
const sampleTech: TechItem[] = [
  { id:1, name:'React', logo_url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { id:2, name:'TypeScript', logo_url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { id:3, name:'Next.js', logo_url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { id:4, name:'Tailwind', logo_url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { id:5, name:'Three.js', logo_url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { id:6, name:'Supabase', logo_url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { id:7, name:'Node.js', logo_url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { id:8, name:'Git', logo_url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { id:9, name:'Figma', logo_url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { id:10, name:'JavaScript', logo_url:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
];
const sampleComments: Comment[] = [
  { id:1, name:'Sarah K.', comment:'This portfolio looks absolutely amazing! The 3D card interaction is so smooth.', likes:12, is_pinned:true, image_url:'' },
  { id:2, name:'Ahmad R.', comment:'Clean design and great attention to detail. Loved the intro animation!', likes:7, is_pinned:false, image_url:'' },
  { id:3, name:'Dev Community', comment:'Really impressive work for a fresh grad. The tech stack choices are solid.', likes:4, is_pinned:false, image_url:'' },
];

/* ── Helpers ─────────────────────────────────────────────── */
function parseTech(val: string | string[]) {
  return (Array.isArray(val) ? val : (val || '').split(',')).filter((t) => t.trim());
}
function parseFeats(val: string | string[]) {
  return (Array.isArray(val) ? val : (val || '').split(',')).filter((f) => f.trim());
}

/* ── SVG icons (SVG only — no emoji, no external icon libs) ─ */
const IconCode = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconArrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);
const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconDoc = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconHeart = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconUpload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);
const IconPin = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17H19V13L12 2L5 13V17Z"/>
  </svg>
);
const IconStar = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconAward = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
const IconExternal = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconGithub = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const IconImage = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.15)" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);
const IconTech = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.7)" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

/* ── Main Page ───────────────────────────────────────────── */
export default function Home() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [certs, setCerts] = useState<Certificate[]>(sampleCerts);
  const [tech, setTech] = useState<TechItem[]>(sampleTech);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'techstack'>('projects');
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typeText, setTypeText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  /* typewriter */
  useEffect(() => {
    const texts = ['Junior Programmer', 'fresh Graduate', 'Happy coding!'];
    let i = 0, char = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    function tick() {
      const t = texts[i];
      if (!deleting && char <= t.length) { setTypeText(t.slice(0, char++)); timer = setTimeout(tick, 75); }
      else if (!deleting && char > t.length) { deleting = true; timer = setTimeout(tick, 1500); }
      else if (deleting && char >= 0) { setTypeText(t.slice(0, char--)); timer = setTimeout(tick, 50); }
      else { deleting = false; i = (i + 1) % texts.length; timer = setTimeout(tick, 200); }
    }
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  /* blob parallax */
  useEffect(() => {
    const blobs = ['b1','b2','b3','b4'].map(id => document.getElementById(id));
    let raf: number;
    function update() {
      const s = window.pageYOffset;
      blobs.forEach((b, i) => {
        if (!b) return;
        b.style.transform = `translate(${Math.sin(s/120+i*0.6)*100}px,${Math.cos(s/120+i*0.6)*35}px)`;
      });
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* nav scroll */
  useEffect(() => {
    const ni = navRef.current;
    function onScroll() {
      if (ni) ni.style.backgroundColor = window.scrollY > 20 ? 'rgba(13,13,13,0.88)' : 'rgba(13,13,13,0.5)';
      for (const id of ['home','about','portfolio','contact']) {
        const el = document.getElementById(id); if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 140 && r.bottom >= 140) { setActiveSection(id); break; }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* detail body lock */
  useEffect(() => {
    document.body.style.overflow = detailProject ? 'hidden' : '';
  }, [detailProject]);

  /* escape key */
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setDetailProject(null); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* Supabase */
  useEffect(() => {
    async function load() {
      try {
        const h = { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY };
        const [p, c, t, cm] = await Promise.all([
          fetch(SUPABASE_URL + '/rest/v1/projects?select=*&order=created_at.asc', { headers: h }).then(r => r.json()),
          fetch(SUPABASE_URL + '/rest/v1/certificates?select=*&order=created_at.asc', { headers: h }).then(r => r.json()),
          fetch(SUPABASE_URL + '/rest/v1/tech_stack?select=*&order=created_at.asc', { headers: h }).then(r => r.json()),
          fetch(SUPABASE_URL + '/rest/v1/comments?select=*&order=is_pinned.desc,created_at.desc', { headers: h }).then(r => r.json()),
        ]);
        if (Array.isArray(p) && p.length) setProjects(p);
        if (Array.isArray(c) && c.length) setCerts(c);
        if (Array.isArray(t) && t.length) setTech(t);
        if (Array.isArray(cm) && cm.length) setComments(cm);
      } catch { /* sample data shown */ }
    }
    load();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id); if (!el) return;
    const start = window.scrollY;
    const end = el.getBoundingClientRect().top + window.scrollY - 3;
    const dist = end - start, dur = 1200; let t0: number | null = null;
    const ease = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    function step(ts: number) {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      window.scrollTo({ top: start + dist * ease(p) });
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    setMobileOpen(false);
  }, []);

  const postComment = useCallback(() => {
    if (!commentName.trim() || !commentText.trim()) return;
    const nc: Comment = { id: Date.now(), name: commentName.trim(), comment: commentText.trim(), likes: 0, is_pinned: false, image_url: '' };
    setLocalComments(prev => [nc, ...prev]);
    setCommentName(''); setCommentText('');
  }, [commentName, commentText]);

  const likeComment = useCallback((id: number) => {
    const key = 'liked-' + id;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, '1');
    setComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
    setLocalComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);
  const allComments = [...localComments, ...comments];

  return (
    <>
      {/* BG */}
      <div className="bg-layer">
        <div className="blob blob-1" id="b1" />
        <div className="blob blob-2" id="b2" />
        <div className="blob blob-3" id="b3" />
        <div className="blob blob-4" id="b4" />
        <div className="bg-grid" />
      </div>

      {/* WELCOME */}
      <div id="welcome">
        <div className="welcome-content">
          <div className="welcome-icons">
            <div className="welcome-icon"><IconCode /></div>
            <div className="welcome-icon"><IconUser /></div>
            <div className="welcome-icon"><IconGlobe /></div>
          </div>
          <div className="welcome-text">
            <div className="welcome-row">
              <span className="welcome-word-1">Welcome</span>
              <span className="welcome-word-2">to my</span>
            </div>
            <h1 className="welcome-title">Portfolio Website</h1>
          </div>
          <div className="welcome-capsule">jhner.dev</div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav id="navbar">
        <div className="nav-inner" ref={navRef}>
          <span className="nav-logo">jhner.dev</span>
          <div className="nav-links">
            {['home','about','portfolio','contact'].map(id => (
              <a
                key={id}
                className={`nav-link${activeSection === id ? ' active' : ''}`}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
          <button
            className={`hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
        <div id="mobileMenu" className={mobileOpen ? 'open' : ''}>
          {['home','about','portfolio','contact'].map(id => (
            <a
              key={id}
              className="nav-link"
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      </nav>

      {/* APP */}
      <div id="app">

        {/* HERO */}
        <section id="home">
          {/* 3D LANYARD CARD — right side on desktop, below text on mobile */}
          <div className="hero-3d">
            <LanyardCard />
          </div>

          <div className="hero-text">
            <span className="hero-label">✦ Available for work</span>
            <h1 className="hero-h1 hero-h1-white">Frontend</h1>
            <h1 className="hero-h1 hero-h1-gray">Developer</h1>
            <div className="hero-subtitle">
              <span>{typeText}</span>
              <span className="cursor">_</span>
            </div>
            <p className="hero-desc">
              Building modern, clean, and responsive websites that turn ideas into real digital experiences people actually enjoy using.
            </p>
            <div className="hero-skills">
              <span className="hero-skill">Typescript</span>
              <span className="hero-skill">React.js</span>
              <span className="hero-skill">Tailwind</span>
            </div>
            <div className="hero-footer">
              <span>↓ explore my work below</span>
              <span>↗ open to full-time &amp; freelance opportunities</span>
            </div>
          </div>

          <div className="scroll-indicator">
            <span>Scroll</span>
            <span>↓</span>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="about-inner">
            <div className="about-row">
              <div className="about-left">
                <span className="section-eyebrow">ABOUT ME</span>
                <div className="about-name"><div>Jhner</div></div>
                <p className="about-bio">
                  Fresh graduate with a real passion for frontend development and modern UI design. I focus on building websites that are clean, responsive, and visually sharp so that people have a good time using them. I enjoy turning ideas into interfaces that actually feel good to interact with.
                </p>
                <div className="about-quote">
                  &ldquo;Turning ideas into clean, modern, and meaningful digital experiences.&rdquo;
                </div>
                <div className="about-buttons">
                  <a className="btn-primary" href="https://drive.google.com/file/d/1cFqZ0TY0U0I51K0Tchv8E4sbOv5yAZ9x/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                    <IconDoc /> Download CV
                  </a>
                  <button className="btn-outline" onClick={() => scrollTo('portfolio')}>
                    <IconArrow /> View Projects
                  </button>
                </div>
              </div>
              <div className="about-photo-wrap">
                <div className="about-photo-ring">
                  <div className="about-photo-placeholder">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card" onClick={() => scrollTo('portfolio')} role="button" tabIndex={0}>
                <div className="stat-icon"><IconCode /></div>
                <div className="stat-value">{projects.length}</div>
                <div className="stat-label">PROJECTS</div>
                <div className="stat-arrow"><IconArrow /></div>
              </div>
              <div className="stat-card" onClick={() => scrollTo('portfolio')} role="button" tabIndex={0}>
                <div className="stat-icon"><IconAward /></div>
                <div className="stat-value">{certs.length}</div>
                <div className="stat-label">CERTIFICATES</div>
                <div className="stat-arrow"><IconArrow /></div>
              </div>
              <div className="stat-card" onClick={() => scrollTo('portfolio')} role="button" tabIndex={0}>
                <div className="stat-icon"><IconGlobe /></div>
                <div className="stat-value">{projects.length + certs.length}</div>
                <div className="stat-label">COMPLETED WORKS</div>
                <div className="stat-arrow"><IconArrow /></div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio">
          <div className="section-header">
            <h1 className="section-title">Portfolio <span>Showcase</span></h1>
            <p className="section-sub">Explore my journey through projects, certifications, and technical expertise.</p>
          </div>
          <div className="tabs-row">
            <div className="tabs-wrap">
              {(['projects','certificates','techstack'] as const).map(t => (
                <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
                  {t === 'techstack' ? 'Tech Stack' : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'projects' && (
            <div className="tab-panel active">
              <div className="cards-grid">
                {visibleProjects.map((p, i) => (
                  <div
                    key={p.id}
                    className="project-card"
                    style={{ animation: `fadeSlideUp 0.55s ease ${i * 0.04}s both` }}
                  >
                    <div className="card-img">
                      {p.image_url
                        ? <img className="card-img-inner" src={p.image_url} alt={p.title} loading="lazy" />
                        : <div className="card-img-placeholder"><IconImage /></div>
                      }
                    </div>
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-desc">{p.description}</p>
                    <div className="card-footer">
                      {p.live_url
                        ? <a className="card-live" href={p.live_url} target="_blank" rel="noopener noreferrer">Live Demo <IconArrow size={14} /></a>
                        : <span className="card-no-link">No Link</span>
                      }
                      <button className="card-details-btn" onClick={() => setDetailProject(p)}>
                        Details <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {projects.length > 3 && (
                <div className="see-more-wrap">
                  <button className="see-more-btn" onClick={() => setShowAll(v => !v)}>
                    {showAll ? <IconChevronUp /> : <IconChevronDown />}
                    <span>{showAll ? 'See Less' : 'See More'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="tab-panel active">
              <div className="cards-grid">
                {certs.map((c, i) => (
                  <div key={c.id} className="cert-card" style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.04}s both` }}>
                    <div className="cert-img">
                      {c.image_url
                        ? <img src={c.image_url} alt={c.title} loading="lazy" />
                        : <div className="cert-img-placeholder"><IconAward size={40} /></div>
                      }
                    </div>
                    <p className="cert-title">{c.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'techstack' && (
            <div className="tab-panel active">
              <div className="tech-grid">
                <div className="tech-inner">
                  {tech.map((t, i) => (
                    <div key={t.id} className="tech-item" style={{ animation: `fadeSlideUp 0.4s ease ${i * 0.04}s both` }}>
                      <div className="tech-glow" />
                      {t.logo_url
                        ? <img className="tech-logo" src={t.logo_url} alt={t.name} loading="lazy" />
                        : <div className="tech-logo-placeholder" />
                      }
                      <span className="tech-name">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="contact-header">
            <h1 className="contact-title">Contact <span>Me</span></h1>
            <p className="contact-sub">Have something in mind? Send a message and let&apos;s connect.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-form-card">
              <h2 className="form-title">Send a Message</h2>
              <p className="form-sub">Feel free to reach out if you want to collaborate, discuss ideas, or simply say hello.</p>
              <div className="form-fields">
                <div className="input-wrap">
                  <div className="input-icon"><IconUser /></div>
                  <input className="form-input" type="text" placeholder="Your Name" />
                </div>
                <div className="input-wrap">
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <input className="form-input" type="email" placeholder="Your Email" />
                </div>
                <div className="input-wrap">
                  <div className="textarea-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <textarea className="form-input" rows={5} placeholder="Your Message" style={{ paddingTop: '16px' }} />
                </div>
                <button className="form-btn"><IconSend /> Send Message</button>
              </div>
              <div className="social-divider">
                <p className="social-label">Connect With Me</p>
                <a className="social-featured" href="https://www.linkedin.com/in/rifqimuhammadaliya/" target="_blank" rel="noopener noreferrer">
                  <div className="social-featured-hover" />
                  <div className="social-featured-inner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#c4b5fd">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                    <div><p className="social-name">LinkedIn</p><p className="social-user">rifqimuhammadaliya</p></div>
                  </div>
                  <div className="social-arrow-icon"><IconArrow size={14} /></div>
                </a>
                <div className="social-small-grid">
                  {[
                    { href:'https://www.instagram.com/itsmeikky_12?igsh=ZHFpMTJ1bHQzeDAx', name:'Instagram', user:'@itsmeikky_12', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                    { href:'https://youtube.com/@zettaajah?si=QRjJGD4zCQG8aIHX', name:'Youtube', user:'@zettaajah', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> },
                    { href:'https://github.com/RifqiMuhammadAliya12', name:'Github', user:'@RifqiMuhammadAliya12', icon: <IconGithub size={14} /> },
                    { href:'https://www.tiktok.com/@itsme.ikky_?_r=1&_t=ZS-95yAYr5PHUb', name:'TikTok', user:'@itsme.ikky_', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
                  ].map(s => (
                    <a key={s.name} className="social-small" href={s.href} target="_blank" rel="noopener noreferrer">
                      <div className="social-small-hover" />
                      <div className="social-small-inner">
                        {s.icon}
                        <div><p className="social-name" style={{ fontSize:'13px' }}>{s.name}</p><p className="social-user">{s.user}</p></div>
                      </div>
                      <div className="social-small-arrow"><IconArrow size={12} /></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* COMMENTS */}
            <div className="comments-card">
              <h3 className="comments-title">Comments</h3>
              <p className="comments-sub">Leave your thoughts here</p>
              <div className="comment-form">
                <input className="comment-input" type="text" placeholder="Your Name" value={commentName} onChange={e => setCommentName(e.target.value)} />
                <textarea className="comment-input" rows={4} placeholder="Your Comment" value={commentText} onChange={e => setCommentText(e.target.value)} />
                <label className="upload-label">
                  <IconUpload /> Upload Image
                  <input type="file" accept="image/*" hidden />
                </label>
                <button className="comment-post-btn" onClick={postComment}>Post Comment</button>
              </div>
              <div className="comments-list">
                {allComments.length === 0
                  ? <div style={{ textAlign:'center', padding:'40px', color:'var(--txt3)', fontFamily:'var(--font-mono)', fontSize:'13px' }}>No comments yet.</div>
                  : allComments.map(c => (
                      <div key={c.id} className={`comment-item${c.is_pinned ? ' pinned' : ''}`}>
                        <div className="comment-row">
                          <div className="comment-avatar">{(c.name || '?').charAt(0).toUpperCase()}</div>
                          <div className="comment-body">
                            <div className="comment-name-row">
                              <span className="comment-name">{c.name || 'Anonymous'}</span>
                              {c.is_pinned && <span className="pin-badge"><IconPin /> Pinned</span>}
                            </div>
                            <p className="comment-text">{c.comment}</p>
                            {c.image_url && (
                              <img src={c.image_url} style={{ marginTop:'10px', borderRadius:'10px', width:'100%', maxHeight:'180px', objectFit:'cover', border:'1px solid var(--border)' }} loading="lazy" alt="" />
                            )}
                          </div>
                          <button className="comment-like" onClick={() => likeComment(c.id)}>
                            <IconHeart /><span>{c.likes || 0}</span>
                          </button>
                        </div>
                      </div>
                    ))
                }
              </div>
            </div>
          </div>
          <div className="copyright">© 2026 Jhner — All rights reserved.</div>
        </section>
      </div>

      {/* DETAIL OVERLAY */}
      {detailProject && (
        <div
          id="detail-overlay"
          className="open"
          onClick={(e) => { if (e.target === e.currentTarget) setDetailProject(null); }}
        >
          <div className="detail-bg-grad" />
          <div className="detail-blob-1" />
          <div className="detail-blob-2" />
          <div className="detail-content">
            <div>
              <button className="back-btn" onClick={() => setDetailProject(null)}>
                <IconBack /> Back
              </button>
              <h2 className="detail-title">{detailProject.title}</h2>
              <div className="detail-divider" />
              <p className="detail-desc">{detailProject.description}</p>
              <div className="detail-stats">
                <div className="detail-stat">
                  <div className="detail-stat-icon"><IconTech /></div>
                  <div>
                    <div className="detail-stat-val">{parseTech(detailProject.technologies).length}</div>
                    <div className="detail-stat-label">Technologies</div>
                  </div>
                </div>
                <div className="detail-stat">
                  <div className="detail-stat-icon"><IconStar size={16} /></div>
                  <div>
                    <div className="detail-stat-val">{parseFeats(detailProject.key_features).length}</div>
                    <div className="detail-stat-label">Key Features</div>
                  </div>
                </div>
              </div>
              <div className="detail-links">
                {detailProject.live_url
                  ? <a className="detail-link-btn" href={detailProject.live_url} target="_blank" rel="noopener noreferrer"><IconExternal /> Live Demo</a>
                  : <span className="detail-link-disabled"><IconExternal /> No Link</span>
                }
                {detailProject.github_url
                  ? <a className="detail-link-btn" href={detailProject.github_url} target="_blank" rel="noopener noreferrer"><IconGithub /> Github</a>
                  : <span className="detail-link-disabled">No Link</span>
                }
              </div>
              <div className="detail-tech-label"><IconTech /> Technologies Used</div>
              <div className="detail-tech-tags">
                {parseTech(detailProject.technologies).map(t => (
                  <div key={t} className="detail-tech-tag">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.4)" strokeWidth="2"><rect x="1" y="1" width="22" height="22" rx="2"/></svg>
                    {t.trim()}
                  </div>
                ))}
              </div>
            </div>
            <div className="detail-right">
              <div className="detail-img-wrap">
                {(detailProject.image_urls?.length ? detailProject.image_urls[0] : detailProject.image_url)
                  ? <img className="detail-img" src={detailProject.image_urls?.[0] || detailProject.image_url} alt={detailProject.title} />
                  : <div className="detail-img-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.1)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                }
              </div>
              <div className="detail-features">
                <div className="detail-features-title"><IconStar size={14} /> Key Features</div>
                <ul className="detail-feature-list">
                  {parseFeats(detailProject.key_features).map(f => (
                    <li key={f} className="detail-feature-item">
                      <span className="detail-feature-bullet">•</span>
                      <span>{f.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
