import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from './data';
import { Project } from './types';
import {
  FileText,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  Award,
  Calendar,
  Home,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Cloud,
  Search,
  Network,
  Server,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Modular Sub-Components
import { SkillsGrid } from './components/SkillsGrid';
import { ArchitectureRenderer } from './components/ArchitectureRenderer';
import { CreativeShayari } from './components/CreativeShayari';
import { ContactScheduler } from './components/ContactScheduler';
import { ResumeView } from './components/ResumeView';

type TabId = 'home' | 'skills' | 'projects' | 'resume' | 'poetry' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projectSearch, setProjectSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState('All');

  const projectFilters = ['All', 'Cloud', 'MLOps', 'AI', 'DevOps', 'Web'];
  const filteredProjects = PORTFOLIO_DATA.githubProjects.filter((project) => {
    const searchable = `${project.title} ${project.description} ${project.technologies.join(' ')}`.toLowerCase();
    const matchesSearch = searchable.includes(projectSearch.toLowerCase());
    const filterTerms: Record<string, string[]> = {
      Cloud: ['gcp', 'gke', 'cloud', 'kubernetes'],
      MLOps: ['mlops', 'mlflow', 'kserve', 'vertex ai'],
      AI: ['ai', 'ollama', 'genai', 'rag', 'gemini'],
      DevOps: ['devops', 'terraform', 'jenkins', 'ansible', 'sre'],
      Web: ['react', 'typescript', 'frontend', 'web ui', 'portfolio']
    };
    const matchesFilter = projectFilter === 'All' || filterTerms[projectFilter]?.some(term => searchable.includes(term));
    return matchesSearch && matchesFilter;
  });

  // Typing effect taglines loop
  const taglines = [
    "Cloud Platform Architect",
    "Kubernetes & GitOps Architect",
    "MLOps & AI Infrastructure Architect",
    "DevSecOps & Reliability Strategist",
    "Hands-on Engineering Leader"
  ];

  useEffect(() => {
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const handleTyping = () => {
      const currentWord = taglines[currentWordIndex];
      if (isDeleting) {
        setTypingText(currentWord.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 40;
      } else {
        setTypingText(currentWord.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1500; // pause at end of word
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % taglines.length;
        typingSpeed = 400; // pause before next word
      }

      setTimeout(handleTyping, typingSpeed);
    };

    const timer = setTimeout(handleTyping, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update theme classes on HTML or body node for standard dark/light classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    // Scroll smoothly to top when tab updates
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Portfolio', icon: <Home className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Award className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Github className="w-4 h-4" /> },
    { id: 'resume', label: 'Resume', icon: <FileText className="w-4 h-4" /> },
    { id: 'poetry', label: 'Poetry', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Calendar className="w-4 h-4" /> }
  ];

  return (
    <div className={`app-shell min-h-screen font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Dynamic Header / Navigation bar */}
      <header className="sticky top-3 z-40 px-3 no-print transition-colors">
        <div className="nav-shell max-w-5xl mx-auto px-3 md:px-4 h-14 flex items-center justify-between rounded-2xl border border-white/50 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/20">
          
          {/* Logo / Brand Name */}
          <button 
            onClick={() => handleTabChange('home')}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 dark:from-emerald-400 dark:to-cyan-400 text-white dark:text-zinc-950 flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/20">
              AR
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider block leading-none">Akhilesh Ranjan</span>
              <span className="text-[9px] opacity-60 font-medium">Cloud Platform & MLOps Architect</span>
            </div>
          </button>

          {/* Desktop Navigation links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabChange(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-emerald-950/25 dark:text-emerald-400 font-bold'
                      : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Toolbar controls (Theme, Mobile toggle) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              id="theme-switcher-btn"
              className="p-2 rounded-lg border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer"
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden max-w-5xl mx-auto mt-2 bg-white/95 dark:bg-zinc-950/95 border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-xl px-4 py-4 flex flex-col gap-2 overflow-hidden"
            >
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-emerald-950/20 dark:text-emerald-400 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Workspace content */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'home' && (
              <div className="flex flex-col gap-16" id="portfolio-home-tab">
                {/* Hero section */}
                <section className="hero-grid grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-8 md:py-14">
                  <div className="lg:col-span-7 flex flex-col gap-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-indigo-50 text-indigo-600 dark:bg-emerald-950/20 dark:text-emerald-400 border dark:border-emerald-900/30 self-start">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      <span>Available for Cloud Consulting</span>
                    </span>

                    <div className="flex flex-col gap-2">
                      <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-[-0.045em] leading-[1.02]">
                        I design platforms<br />that teams can <span className="text-gradient">trust and scale.</span>
                      </h1>
                      <div className="h-8 md:h-10 text-sm md:text-lg font-semibold font-mono text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                        <span>{PORTFOLIO_DATA.name} · </span>
                        <span className="text-indigo-600 dark:text-emerald-400 border-r-2 border-indigo-600 dark:border-emerald-400 pr-1 animate-pulse">
                          {typingText}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                      {PORTFOLIO_DATA.aboutMe}
                    </p>

                    {/* Hero CTAs */}
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      <button
                        onClick={() => handleTabChange('resume')}
                        id="hero-download-resume-btn"
                        className="px-5 py-2 bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-bold rounded-lg shadow-sm hover:scale-102 transition-transform cursor-pointer"
                      >
                        Download Resume / PDF
                      </button>
                      <button
                        onClick={() => handleTabChange('projects')}
                        id="hero-view-projects-btn"
                        className="px-5 py-2 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        View Projects
                      </button>
                      <button
                        onClick={() => handleTabChange('contact')}
                        id="hero-book-call-btn"
                        className="px-5 py-2 bg-indigo-600 text-white dark:bg-emerald-500 dark:text-zinc-950 text-xs font-bold rounded-lg shadow-xs hover:scale-102 transition-transform cursor-pointer"
                      >
                        Book 1:1 Call
                      </button>
                    </div>
                  </div>

                  {/* Interactive architecture console */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="architecture-console relative w-full max-w-md rounded-[2rem] border border-slate-200/70 dark:border-white/10 p-5 md:p-6 overflow-hidden shadow-2xl">
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="status-dot" />
                          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-slate-500 dark:text-zinc-400">platform topology</span>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-500">HEALTHY</span>
                      </div>
                      <div className="relative h-64 mt-3">
                        <div className="topology-line line-a" /><div className="topology-line line-b" /><div className="topology-line line-c" />
                        <div className="topology-node node-cloud"><Cloud className="w-5 h-5" /><span>GCP</span></div>
                        <div className="topology-node node-platform"><Network className="w-5 h-5" /><span>GKE Platform</span></div>
                        <div className="topology-node node-service"><Server className="w-4 h-4" /><span>Services</span></div>
                        <div className="topology-node node-data"><Database className="w-4 h-4" /><span>Data / ML</span></div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 relative z-10">
                        {['99.99% SLO', 'GitOps sync', 'Policy pass'].map(item => <span key={item} className="rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 px-2 py-2 text-center text-[9px] font-mono">{item}</span>)}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Architecture capability pillars */}
                <section className="flex flex-col gap-6 border-t border-slate-100 dark:border-zinc-900 pt-10" id="architecture-capabilities">
                  <div className="flex flex-col gap-1 max-w-3xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                      Architecture Leadership
                    </span>
                    <h2 className="text-lg md:text-xl font-bold tracking-tight">From business requirements to governed, operable platforms</h2>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                      Architecture grounded in implementation: explicit trade-offs, reusable standards, secure defaults, operational readiness, and measurable platform outcomes.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PORTFOLIO_DATA.architectureCapabilities.slice(0, 3).map((capability, index) => (
                      <motion.div
                        key={capability.title}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="p-5 bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 rounded-2xl hover:border-indigo-200 dark:hover:border-emerald-900 hover:shadow-lg transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-emerald-950/30 dark:text-emerald-400 flex items-center justify-center text-xs font-black mb-3">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-sm font-bold">{capability.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-2">{capability.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Animated live statistics */}
                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-4" id="portfolio-stats">
                  {PORTFOLIO_DATA.stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ y: -3 }}
                      className="p-4 bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 rounded-xl text-center flex flex-col justify-center hover:border-indigo-200 dark:hover:border-emerald-900 hover:shadow-md transition-colors"
                    >
                      <span className="text-base md:text-lg font-black text-indigo-600 dark:text-emerald-400">
                        {stat.value}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 mt-1 leading-none">
                        {stat.subtext}
                      </span>
                    </motion.div>
                  ))}
                </section>

                {/* One clear CTA to the rest of the site */}
                <section className="rounded-3xl bg-slate-900 dark:bg-zinc-900 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 border border-slate-800 dark:border-zinc-800">
                  <div className="max-w-xl">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Explore the full profile</span>
                    <h2 className="text-xl md:text-2xl font-heading font-bold mt-2">Choose the detail you need.</h2>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">Review the complete skills inventory and certifications, browse public implementations, or open the ATS-ready resume.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button onClick={() => handleTabChange('skills')} className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-emerald-50">Skills</button>
                    <button onClick={() => handleTabChange('projects')} className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/15">Projects</button>
                    <button onClick={() => handleTabChange('resume')} className="px-4 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-bold hover:bg-emerald-400">Resume</button>
                  </div>
                </section>
              </div>
            )}

            {/* Other tabs rendering */}
            {activeTab === 'skills' && (
              <div className="flex flex-col gap-10" id="skills-view">
                <div className="flex flex-col gap-3 max-w-3xl">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                    Complete Capability Portfolio
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Architecture depth backed by hands-on engineering</h1>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                    Cloud architecture, platform engineering, Kubernetes, DevSecOps, SRE, MLOps, GenAI, automation, data systems, and technical leadership—supported by enterprise experience and public implementation projects.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-emerald-950/30 dark:text-emerald-400">{PORTFOLIO_DATA.skillCategories.length} capability domains</span>
                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 dark:bg-zinc-900 dark:text-zinc-300">{PORTFOLIO_DATA.skillCategories.reduce((total, category) => total + category.items.length, 0)} named skills</span>
                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 dark:bg-zinc-900 dark:text-zinc-300">{PORTFOLIO_DATA.githubProjects.length} public projects</span>
                  </div>
                </div>

                {/* My Tech Journey */}
                <section className="flex flex-col gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                    My Tech Journey
                  </span>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed whitespace-pre-line max-w-3xl">
                    {PORTFOLIO_DATA.aboutJourney}
                  </p>
                </section>

                {/* Certifications showcase */}
                <section className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                      Verified Certifications & Skill Badges
                    </span>
                    <h2 className="text-lg font-bold mt-1">Proof, not just a list of tools</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href={PORTFOLIO_DATA.credly} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1 hover:underline">
                      Credly profile <ExternalLink className="w-3 h-3" />
                    </a>
                    <a href={PORTFOLIO_DATA.googleSkills} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1 hover:underline">
                      Google Cloud Skills profile <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" id="certifications-grid">
                    {PORTFOLIO_DATA.certifications.map((cert, index) => (
                      <a
                        key={index}
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 rounded-xl hover:border-slate-300 dark:hover:border-zinc-800 transition-colors flex items-center justify-between text-xs"
                        referrerPolicy="no-referrer"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            {cert.imageUrl && <img src={cert.imageUrl} alt="" className="w-8 h-8 object-contain shrink-0" loading="lazy" />}
                            <span className="font-bold text-slate-800 dark:text-zinc-200 block line-clamp-2">{cert.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{cert.issuer}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </a>
                    ))}
                  </div>
                </section>

                <section className="flex flex-col gap-5">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Architecture capability pillars</span>
                    <h2 className="text-lg font-bold mt-1">What I design, standardize, and govern</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PORTFOLIO_DATA.architectureCapabilities.map((capability) => (
                      <div key={capability.title} className="p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900">
                        <h3 className="text-sm font-bold">{capability.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-2">{capability.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="flex flex-col gap-5">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Technical inventory</span>
                    <h2 className="text-lg font-bold mt-1">Tools, platforms, and engineering practices</h2>
                  </div>
                  <SkillsGrid categories={PORTFOLIO_DATA.skillCategories} isDarkTheme={isDarkMode} />
                </section>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="flex flex-col gap-8" id="github-projects-view">
                <div className="flex flex-col gap-2 max-w-3xl">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                    Open-source portfolio
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Selected GitHub Projects</h1>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                    A curated set of public projects spanning GCP platform engineering, Terraform, Ansible, CI/CD automation, MLOps, and AI interview practice.
                  </p>
                  <a href={PORTFOLIO_DATA.github} target="_blank" rel="noreferrer" className="w-fit text-xs font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1.5 hover:underline">
                    View the complete GitHub profile <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Flagship deep-dive projects with architecture schematics */}
                <section className="flex flex-col gap-5" id="featured-projects">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                      Flagship Projects & Architectures
                    </span>
                    <h2 className="text-lg font-bold">Production-grade solutions with live design schematics</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="projects-grid">
                    {PORTFOLIO_DATA.projects.map((proj) => (
                      <div
                        key={proj.id}
                        id={`project-card-${proj.id}`}
                        onClick={() => setActiveProject(proj)}
                        className="bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer duration-300"
                      >
                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-slate-400 dark:text-zinc-500">
                            {proj.category}
                          </span>
                          <h3 className="text-sm font-bold mt-1 mb-2 leading-tight hover:text-indigo-600 dark:hover:text-emerald-400">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                            {proj.subtitle}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t pt-3 border-slate-50 dark:border-zinc-850">
                          <div className="flex flex-wrap gap-1">
                            {proj.tools.slice(0, 2).map((t) => (
                              <span key={t} className="text-[9px] font-mono bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-0.5">
                            <span>Details</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex flex-col gap-1 max-w-3xl border-t border-slate-100 dark:border-zinc-900 pt-8">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                    Open-source portfolio
                  </span>
                  <h2 className="text-lg font-bold">All public GitHub projects</h2>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-2xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 sticky top-20 z-20 backdrop-blur-xl">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input value={projectSearch} onChange={(event) => setProjectSearch(event.target.value)} placeholder="Search projects, tools, or outcomes…" className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-transparent focus:border-indigo-500 dark:focus:border-emerald-500 outline-none text-xs" />
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0">
                    {projectFilters.map(filter => (
                      <button key={filter} onClick={() => setProjectFilter(filter)} className={`px-3 py-2 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${projectFilter === filter ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-zinc-950' : 'hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500'}`}>{filter}</button>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] font-mono text-slate-400">Showing {filteredProjects.length} of {PORTFOLIO_DATA.githubProjects.length} projects</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProjects.map((project) => (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-5 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 dark:hover:border-emerald-800 transition-all"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <Github className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
                          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-emerald-400" />
                        </div>
                        <h2 className="font-bold mt-4 group-hover:text-indigo-600 dark:group-hover:text-emerald-400">{project.title}</h2>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-2">{project.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((technology) => (
                          <span key={technology} className="text-[9px] font-mono px-2 py-1 rounded-full bg-slate-100 dark:bg-zinc-800">{technology}</span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
                {filteredProjects.length === 0 && <div className="py-16 text-center border border-dashed border-slate-300 dark:border-zinc-800 rounded-3xl"><Search className="w-8 h-8 mx-auto text-slate-300 mb-3" /><p className="text-sm font-bold">No matching projects</p><button onClick={() => { setProjectSearch(''); setProjectFilter('All'); }} className="text-xs text-indigo-600 dark:text-emerald-400 mt-2 hover:underline">Clear filters</button></div>}
              </div>
            )}

            {activeTab === 'poetry' && (
              <div className="flex flex-col gap-6" id="poetry-tab">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                    The Code & The Couplet
                  </span>
                  <h2 className="text-xl font-bold">Hindi Shayari, Spoken-Word stage performances, and creative expressions</h2>
                </div>
                <CreativeShayari poetryList={PORTFOLIO_DATA.poetryList} instagramUrl={PORTFOLIO_DATA.poetryInstagram} />
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="flex flex-col gap-6" id="resume-tab">
                <ResumeView data={PORTFOLIO_DATA} />
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="flex flex-col gap-6" id="contact-tab">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                    Get In Touch
                  </span>
                  <h2 className="text-xl font-bold">Schedule mentoring sessions, webinars, or consulting calls</h2>
                </div>
                <ContactScheduler
                  email={PORTFOLIO_DATA.email}
                  topmateUrl={PORTFOLIO_DATA.topmate}
                  coffeeUrl={PORTFOLIO_DATA.buymeacoffee}
                />

                {/* Recommendations pointer (LinkedIn is login-walled, so link out rather than fabricate quotes) */}
                <section className="rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                      Recommendations
                    </span>
                    <h3 className="text-sm font-bold mt-1">Read recommendations from colleagues and managers on LinkedIn</h3>
                  </div>
                  <a href={PORTFOLIO_DATA.linkedinRecommendations} target="_blank" rel="noreferrer" className="w-fit shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#0A66C2] text-white text-[10px] font-bold hover:bg-[#004182] transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                    View recommendations on LinkedIn
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </section>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer copyright */}
      <footer className="border-t border-slate-200/60 dark:border-zinc-900 no-print transition-colors py-8 text-center text-[10px] text-slate-400 dark:text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span>© 2026 {PORTFOLIO_DATA.name}</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-3">
            <a href={PORTFOLIO_DATA.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" referrerPolicy="no-referrer">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={PORTFOLIO_DATA.github} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" referrerPolicy="no-referrer">
              <Github className="w-4 h-4" />
            </a>
            <a href={PORTFOLIO_DATA.instagram} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" referrerPolicy="no-referrer">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={PORTFOLIO_DATA.credly} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" aria-label="Verified certifications on Credly">
              <Award className="w-4 h-4" />
            </a>
            <a href={PORTFOLIO_DATA.googleSkills} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" aria-label="Google Cloud Skills profile">
              <Cloud className="w-4 h-4" />
            </a>
            <a href={PORTFOLIO_DATA.youtube} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" referrerPolicy="no-referrer">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Detailed Project Overlay Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print"
            id="project-detail-modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white dark:bg-zinc-950 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 border dark:border-zinc-800 relative flex flex-col gap-6 shadow-2xl text-slate-800 dark:text-zinc-200"
            >
              {/* Close Button */}
              <button
                id="close-project-modal-btn"
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-full"
              >
                <X className="w-5 h-5 text-slate-500 dark:text-zinc-400" />
              </button>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">
                  {activeProject.category} Case Study
                </span>
                <h2 className="text-lg md:text-xl font-extrabold mt-1 tracking-tight">
                  {activeProject.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">{activeProject.subtitle}</p>
              </div>

              {/* Grid content detailing everything */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left side texts */}
                <div className="flex flex-col gap-4">
                  {/* Problem statement */}
                  <div className="p-3.5 bg-red-50/20 dark:bg-red-950/5 border border-red-100/30 dark:border-red-900/20 rounded-xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-500 block mb-1">
                      Problem Statement
                    </span>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>

                  {/* Approach */}
                  <div className="p-3.5 bg-indigo-50/25 dark:bg-zinc-950/20 border dark:border-zinc-900 rounded-xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-500 dark:text-emerald-400 block mb-1">
                      Implementation Approach
                    </span>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {activeProject.approach}
                    </p>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="p-3.5 bg-amber-50/15 dark:bg-zinc-950/20 border dark:border-zinc-900 rounded-xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500 block mb-1">
                      Challenges & Solution
                    </span>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {activeProject.challenges}
                    </p>
                  </div>
                </div>

                {/* Right side diagrams & metrics */}
                <div className="flex flex-col gap-4">
                  {/* Interactive architecture visualizer (if architectureId exists) */}
                  {activeProject.architectureId && (
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-2 pl-1">
                        Deployment Architecture Schema
                      </span>
                      {PORTFOLIO_DATA.architectures.find(a => a.id === activeProject.architectureId) ? (
                        <ArchitectureRenderer 
                          diagram={PORTFOLIO_DATA.architectures.find(a => a.id === activeProject.architectureId)!} 
                        />
                      ) : null}
                    </div>
                  )}

                  {/* Measurable Results */}
                  <div className="p-4 bg-emerald-50/20 dark:bg-emerald-950/5 border border-emerald-100/30 dark:border-emerald-900/20 rounded-xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500 block mb-2">
                      Measurable Business Outcomes
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {activeProject.results.map((r, i) => (
                        <div key={i} className="text-xs leading-relaxed flex items-start gap-2 text-slate-600 dark:text-zinc-400">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between border-t pt-4 border-slate-100 dark:border-zinc-900 mt-2">
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tools.map((t) => (
                    <span key={t} className="text-[10px] font-mono bg-slate-100 dark:bg-zinc-900 px-2.5 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-4 py-1.5 text-xs font-bold rounded-lg border dark:border-zinc-800"
                  >
                    Close Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
