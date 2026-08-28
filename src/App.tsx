import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import {
  Menu, X, Play, Briefcase, Linkedin, Instagram, Twitter,
  Check, ArrowRight, Zap, Target, Bot, Wrench, BarChart3, Home,
  Sparkles, Layers, TrendingUp, ExternalLink, Award
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─────────── Navigation ─────────── */
function Navigation({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 })
    }
  }, [lenisRef])

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Case Studies', id: 'work-samples' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'SaaS', id: 'services' },
    { label: 'Credentials', id: 'credentials' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md border-b border-[#D9D3CD]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display italic text-2xl text-gold">
            Tin.
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id + link.label}
                onClick={() => scrollTo(link.id)}
                className={`font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] transition-colors hover:text-gold ${
                  scrolled ? 'text-dark' : 'text-[#F5F0EB]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="bg-gold text-[#0C0B0B] font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] px-6 py-2.5 rounded-full hover:bg-gold-light transition-colors duration-300"
            >
              Work With Me
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className={scrolled ? 'text-dark' : 'text-[#F5F0EB]'} size={24} />
            ) : (
              <Menu className={scrolled ? 'text-dark' : 'text-[#F5F0EB]'} size={24} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0C0B0B]/98 flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id + link.label + 'mobile'}
              onClick={() => scrollTo(link.id)}
              className="font-body text-lg font-medium uppercase tracking-[0.15em] text-[#F5F0EB] hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="bg-gold text-[#0C0B0B] font-body text-sm font-medium uppercase tracking-[0.08em] px-8 py-3 rounded-full mt-4"
          >
            Work With Me
          </button>
        </div>
      )}
    </>
  )
}

/* ─────────── Hero Section ─────────── */
function HeroSection({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 })
      .to(line1Ref.current, { opacity: 1, y: 0, duration: 0.8 }, 0.15)
      .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.8 }, 0.3)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.45)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
      .to(imgRef.current, { opacity: 1, scale: 1, duration: 1 }, 0.2)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] bg-[#0C0B0B] flex items-end lg:items-center overflow-hidden"
    >
      {/* ── Luxury background layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle noise/grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
          }}
        />
        {/* Floating ambient gold orb — top center */}
        <div
          className="absolute animate-float-orb"
          style={{
            top: '-10%', left: '30%', width: '55%', height: '70%',
            background: 'radial-gradient(ellipse at center, rgba(200,169,126,0.11) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Floating orb — bottom right (photo zone) */}
        <div
          className="absolute animate-float-orb-b"
          style={{
            bottom: '-5%', right: '-5%', width: '60%', height: '75%',
            background: 'radial-gradient(ellipse at 70% 80%, rgba(200,169,126,0.16) 0%, rgba(180,140,90,0.05) 45%, transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
        {/* Deep blue-charcoal counter-glow — top left — adds depth */}
        <div
          className="absolute animate-float-orb-c"
          style={{
            top: '-20%', left: '-10%', width: '55%', height: '65%',
            background: 'radial-gradient(ellipse at center, rgba(38,32,28,0.8) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Thin horizontal shimmer line */}
        <div
          className="absolute left-0 right-0 animate-shimmer-line"
          style={{ top: '38%', height: '1px', opacity: 0.4 }}
        />
        {/* Left-side dark anchor so text always reads clean */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #0C0B0B 28%, rgba(12,11,11,0.55) 48%, transparent 68%)',
          }}
        />
        {/* Bottom vignette — merges hero into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to top, #0C0B0B, transparent)' }}
        />
      </div>

      {/* ── Cutout photo — transparent PNG, right-anchored ── */}
      <div
        ref={imgRef}
        className="opacity-0 scale-105 absolute bottom-0 right-0 pointer-events-none flex items-end justify-end"
        style={{ width: '58%', height: '100%' }}
      >
        <img
          src="/images/hero-laptop.png"
          alt="Tin - GHL Systems Specialist"
          className="h-full w-auto object-contain object-bottom"
          style={{
            filter: 'drop-shadow(30px 0 80px rgba(200,169,126,0.28)) drop-shadow(0 20px 40px rgba(200,169,126,0.15))',
          }}
        />
      </div>

      {/* ── Text overlay ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 w-full py-32 lg:py-0 lg:min-h-[100dvh] flex items-center">
        <div className="max-w-[560px]">
          <div
            ref={labelRef}
            className="opacity-0 translate-y-5 font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold mb-6"
          >
            GHL Systems Specialist • Funnel Strategist • Automation Workflows
          </div>

          <h1 className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[1.03] tracking-[-0.02em]">
            <span
              ref={line1Ref}
              className="opacity-0 translate-y-5 block text-[#F5F0EB]"
            >
              I Build Systems
            </span>
            <span
              ref={line2Ref}
              className="opacity-0 translate-y-5 block text-gold italic"
            >
              That Print Profits.
            </span>
          </h1>

          <p
            ref={subRef}
            className="opacity-0 translate-y-5 font-body text-[#A39E99] text-base lg:text-lg leading-[1.7] max-w-[460px] mt-6"
          >
            Funnels, CRM systems, and automation workflows designed to help businesses streamline
            operations, manage leads efficiently, and create smoother client experiences.
          </p>

          <div
            ref={ctaRef}
            className="opacity-0 translate-y-5 flex flex-wrap items-center gap-4 mt-10"
          >
            <button
              onClick={() => {
                const el = document.getElementById('contact')
                if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 })
              }}
              className="bg-gold text-[#0C0B0B] font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-300 flex items-center gap-2"
            >
              Work With Me <ArrowRight size={14} />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('work-samples')
                if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 })
              }}
              className="text-[#F5F0EB] font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] underline underline-offset-4 hover:text-gold hover:underline-offset-8 transition-all duration-300"
            >
              View Sample Work
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gold rule */}
      <div className="absolute bottom-[10vh] left-6 lg:left-10 w-[40%] h-px bg-gradient-to-r from-gold to-transparent z-10" />
    </section>
  )
}

/* ─────────── Intro Video Section ─────────── */
function IntroVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showUnmuteHint, setShowUnmuteHint] = useState(true)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  useEffect(() => {
    if (!showUnmuteHint) return
    const t = setTimeout(() => setShowUnmuteHint(false), 5000)
    return () => clearTimeout(t)
  }, [showUnmuteHint])

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
      setShowUnmuteHint(false)
    }
  }

  return (
    <section ref={sectionRef} id="intro-video" className="relative bg-[#0C0B0B] py-[clamp(4rem,10vw,8rem)] overflow-hidden">
      {/* Luxury background for intro video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient gold orb left */}
        <div
          className="absolute animate-float-orb-b"
          style={{
            top: '-20%', left: '-10%', width: '50%', height: '140%',
            background: 'radial-gradient(ellipse at 30% 50%, rgba(200,169,126,0.09) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Ambient gold orb right */}
        <div
          className="absolute animate-float-orb"
          style={{
            bottom: '-20%', right: '-10%', width: '50%', height: '140%',
            background: 'radial-gradient(ellipse at 70% 60%, rgba(200,169,126,0.09) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Top shimmer rule */}
        <div className="absolute top-0 left-0 right-0 h-px animate-shimmer-line opacity-50" />
        {/* Bottom shimmer rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px animate-shimmer-line opacity-50" />
      </div>
      <div className="max-w-[900px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="animate-in text-center mb-8">
          <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold">
            Watch Intro
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-[#F5F0EB] leading-[1.15] tracking-[-0.01em] mt-4">
            See How I Turn Systems Into <em className="text-gold">Sales</em>
          </h2>
          <p className="font-body text-[#A39E99] text-sm leading-[1.7] mt-3 max-w-[520px] mx-auto">
            Watch this quick intro to see the systems I build, the results I focus on, and how we can work together.
          </p>
        </div>

        <div className="animate-in relative aspect-video bg-[#0C0B0B] rounded-sm overflow-hidden group cursor-pointer" onClick={togglePlay}>
          <video
  ref={videoRef}
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  poster="/images/video-poster.png"
  src="/intro.mp4"
  onPlay={() => setIsPlaying(true)}
  onPause={() => setIsPlaying(false)}
/>
          {/* Overlay play/pause button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            <div className="w-16 h-16 rounded-full border-2 border-gold bg-[#0C0B0B]/60 flex items-center justify-center backdrop-blur-sm">
              {isPlaying
                ? <span className="text-gold font-body text-xs font-medium uppercase tracking-widest">Pause</span>
                : <Play size={24} className="text-gold ml-1" />
              }
            </div>
          </div>
          {/* Sound toggle button — bottom right */}
          <button
            onClick={toggleMute}
            className="absolute bottom-3 right-3 z-10 flex items-center gap-2 bg-[#0C0B0B]/70 hover:bg-[#0C0B0B]/90 border border-gold/30 hover:border-gold/70 text-gold backdrop-blur-sm px-3 py-1.5 rounded-full transition-all duration-300"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
            <span className="font-body text-[0.65rem] font-medium uppercase tracking-widest">
              {isMuted ? 'Unmute' : 'Mute'}
            </span>
          </button>
          {/* Pulsing unmute hint — fades after 5s */}
          {showUnmuteHint && isMuted && (
            <div className="absolute bottom-12 right-3 animate-bounce pointer-events-none">
              <div className="bg-gold text-[#0C0B0B] font-body text-[0.65rem] font-medium uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                Tap to unmute 🔊
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─────────── About Section ─────────── */
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  return (
    <section ref={sectionRef} id="about" className="bg-cream py-[clamp(4rem,10vw,8rem)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="animate-in">
            <img
              src="/images/behind-systems.png"
              alt="Tin working"
              className="w-full h-auto object-cover rounded-sm"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
            />
            <p className="font-body text-[0.875rem] text-muted-custom mt-3 italic">
              Strategy, systems, and a little <em className="text-gold">magic</em>.
            </p>
          </div>

          {/* About Me */}
          <div className="animate-in">
            <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-custom">
              About Me
            </span>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-dark leading-[1.15] tracking-[-0.01em] mt-4">
              I'm <em className="text-gold">Tin.</em>
            </h2>
            <p className="font-body text-dark font-medium leading-[1.7] mt-4">
              AI automation specialist. GHL systems builder. Funnel strategist.
            </p>
            <p className="font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-3">
              I help coaches, agencies, and service businesses build powerful systems inside GoHighLevel that generate
              more leads, close more sales, and deliver a better customer experience — without the chaos.
            </p>
            <p className="font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-3">
              With 6+ years of experience as a real estate VA, systems builder, and AI automation specialist, I've built everything from full GHL sub-accounts to SaaS dashboards — and I've done it for real clients with real results.
            </p>

            {/* DISC Profile */}
            <div className="mt-8 p-6 bg-[#0C0B0B] rounded-sm">
              <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold">
                DISC Profile
              </span>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] text-[#F5F0EB] leading-[1.2] mt-2">
                Conscientious &amp; Steady
              </h3>
              <p className="font-body text-[0.875rem] text-[#A39E99] leading-[1.7] mt-2">
                My DISC profile reflects how I work: detail-oriented, quality-focused, and systems-driven. I take a methodical approach to every project — I listen first, plan thoroughly, then execute with precision. Clients appreciate my clear communication, organized delivery, and consistent follow-through.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Detail-Oriented', 'Systematic', 'Reliable', 'Quality-Focused', 'Organized'].map((trait) => (
                  <span key={trait} className="bg-gold/10 text-gold text-xs font-body px-3 py-1 rounded-full">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mt-[clamp(4rem,10vw,8rem)]">
        <div className="h-px bg-[#D9D3CD]" />
      </div>
    </section>
  )
}

/* ─────────── Value Pillars ─────────── */
function ValuePillarsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.pillar-card')
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  const pillars = [
    { icon: <Sparkles size={20} />, title: 'GHL Systems Specialist', text: 'Hands-on experience building high-converting funnels and automations inside GoHighLevel.' },
    { icon: <Layers size={20} />, title: 'Systems That Scale', text: 'I design systems that work 24/7 so you can focus on growth while your business runs smoothly.' },
    { icon: <TrendingUp size={20} />, title: 'Results That Matter', text: 'Everything I build is backed by strategy, tested for results, and aligned with your business goals.' },
    { icon: <Target size={20} />, title: 'Strategy First Approach', text: 'Before building any funnel, automation, or workflow, I focus on understanding the business goals, client journey, and operational gaps.' },
  ]

  return (
    <section ref={sectionRef} className="bg-cream pb-[clamp(4rem,10vw,8rem)]">
      <div className="max-w-[680px] mx-auto px-6 lg:px-10 text-center">
        <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-custom">
          Why Work With Me
        </span>
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-dark leading-[1.15] tracking-[-0.01em] mt-4">
          Strategy. Systems.<br />Execution. Results.
        </h2>

        <div className="grid sm:grid-cols-2 gap-8 mt-12 text-left">
          {pillars.map((p, i) => (
            <div key={i} className="pillar-card">
              <div className="text-gold mb-3">{p.icon}</div>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] text-dark leading-[1.2]">
                {p.title}
              </h3>
              <p className="font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-2">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Flowing Grid Canvas ─────────── */
function FlowingGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, cells: any[] = [], mouse = { x: -9999, y: -9999 }, raf = 0

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      w = rect.width
      h = rect.height
      canvas.width = w * window.devicePixelRatio
      canvas.height = h * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      const count = Math.round(w * h / 4500)
      cells = []
      for (let i = 0; i < count; i++) {
        const speed = 0.3
        const angle = Math.random() * Math.PI * 2
        cells.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 18 + Math.random() * 12,
          baseR: 18 + Math.random() * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          speed,
          opacity: 0.03 + Math.random() * 0.04,
          darkness: Math.random(),
        })
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      cells.sort((a, b) => a.darkness - b.darkness)

      for (const c of cells) {
        c.x += c.vx
        c.y += c.vy
        if (c.x < -c.r) c.x = w + c.r
        if (c.x > w + c.r) c.x = -c.r
        if (c.y < -c.r) c.y = h + c.r
        if (c.y > h + c.r) c.y = -c.r

        const d = Math.hypot(mouse.x - c.x, mouse.y - c.y)
        const f = Math.max(0, 1 - d / 180) ** 2
        c.vx -= f * (mouse.x - c.x) * 0.02
        c.vy -= f * (mouse.y - c.y) * 0.02

        const spd = Math.hypot(c.vx, c.vy)
        if (spd > 0) {
          c.vx = (c.vx / spd) * c.speed
          c.vy = (c.vy / spd) * c.speed
        }

        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r)
        grad.addColorStop(0, `rgba(200, 169, 126, ${c.opacity})`)
        grad.addColorStop(1, `rgba(200, 169, 126, ${c.opacity * 0.1})`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  )
}

/* ─────────── Systems Flow Section ─────────── */
function SystemsFlowSection({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  const steps = [
    { num: '01', title: 'Strategize', text: 'We map out the perfect system for your business.' },
    { num: '02', title: 'Build', text: 'I build your funnels, automations, and CRM systems.' },
    { num: '03', title: 'Scale', text: 'You get results, more revenue, and a system that grows with you.' },
  ]

  return (
    <section ref={sectionRef} id="systems-flow" className="relative bg-[#0C0B0B] py-[clamp(5rem,12vw,10rem)] overflow-hidden">
      <FlowingGridCanvas />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="animate-in font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold">
              Behind The Systems
            </span>
            <h2 className="animate-in font-display text-[clamp(2.5rem,6vw,4.5rem)] text-[#F5F0EB] leading-[1.05] tracking-[-0.02em] mt-4">
              Strategize. Build. Scale.
            </h2>
            <p className="animate-in font-body text-[#A39E99] leading-[1.7] max-w-[520px] mt-4">
              Every system I build is customized, tested, and built to scale your business.
            </p>

            <div className="animate-in flex flex-col gap-8 mt-12">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold font-body text-sm font-medium shrink-0">
                    {s.num}
                  </div>
                  <div>
                    <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] text-[#F5F0EB] leading-[1.2]">
                      {s.title}
                    </h3>
                    <p className="font-body text-[0.875rem] text-[#A39E99] leading-[1.7] mt-1">
                      {s.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-in mt-10">
              <button
                onClick={() => {
                  const el = document.getElementById('contact')
                  if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 })
                }}
                className="bg-gold text-[#0C0B0B] font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-300 inline-flex items-center gap-2"
              >
                Work With Me <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Behind systems image */}
          <div className="animate-in">
            <img
              src="/images/workspace-main.png"
              alt="Behind the systems"
              className="w-full h-auto object-cover rounded-sm"
              style={{ boxShadow: '0 0 60px rgba(200, 169, 126, 0.1)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Services Section ─────────── */
function ServicesSection({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  const services = [
    { icon: <Zap size={20} />, title: 'GoHighLevel (GHL) Specialist', primary: true, desc: 'Full GHL setup, configuration, and management. Sub-accounts, pipelines, automations, snapshots, calendars, reputation management — I build GHL ecosystems from scratch or optimize existing ones.', tags: ['GHL Setup', 'Sub-Accounts', 'Pipelines', 'Automations', 'Snapshots', 'White Label'] },
    { icon: <Target size={20} />, title: 'Funnel Strategy & Build', primary: true, desc: 'High-converting funnels from strategy to launch — lead gen, sales, webinar, booking, VSL, application, and more. I don\'t just build pages, I design the entire conversion journey.', tags: ['Lead Funnels', 'Sales Funnels', 'VSL Funnels', 'Booking Funnels', 'Email Sequences'] },
    { icon: <Bot size={20} />, title: 'Automation & AI Integration', primary: true, desc: 'End-to-end workflow automation using GHL, Zapier, Make, and AI tools. I eliminate repetitive tasks, build smart follow-up systems, and integrate AI to make your business respond, nurture, and convert — automatically.', tags: ['Zapier', 'Make.com', 'AI Workflows', 'ChatGPT API', 'Webhooks'] },
    { icon: <Wrench size={20} />, title: 'SaaS Systems Builder', primary: false, desc: 'I\'ve built my own SaaS system — from concept to functional product. I design, build, and launch software-as-a-service tools and internal business systems that solve real operational problems.', tags: ['SaaS Architecture', 'System Design', 'MVP Build', 'Internal Tools'] },
    { icon: <BarChart3 size={20} />, title: 'Bookkeeping & Finance', primary: false, desc: 'QuickBooks Online certified. Clean books, clear reports, organized financials. A reliable add-on for clients who need both tech and financial support under one roof.', tags: ['QuickBooks Online', 'Invoicing', 'P&L Reports', 'Reconciliation'] },
    { icon: <Home size={20} />, title: 'Real Estate & VA Services', primary: false, desc: '6+ years as a real estate VA — CRM management, transaction coordination, drip campaigns, content creation, and full admin support for agents and brokerages.', tags: ['Real Estate CRM', 'Transaction Coordination', 'Drip Campaigns', 'Admin'] },
  ]

  return (
    <section ref={sectionRef} id="services" className="bg-cream-white py-[clamp(5rem,12vw,10rem)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
          {/* Left sticky */}
          <div className="animate-in lg:sticky lg:top-32 lg:self-start">
            <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-custom">
              What I Specialize In
            </span>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-dark leading-[1.15] tracking-[-0.01em] mt-4">
              Services Built for Growth
            </h2>
            <p className="font-body text-muted-custom leading-[1.7] mt-4">
              From funnel strategy to full SaaS builds — every service is designed to help your business scale with systems, not chaos.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('contact')
                if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 })
              }}
              className="bg-gold text-[#0C0B0B] font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-300 inline-flex items-center gap-2 mt-8"
            >
              Book A Discovery Call <ArrowRight size={14} />
            </button>
          </div>

          {/* Right services stack */}
          <div>
            {services.map((s, i) => (
              <div key={i} className="animate-in py-8 border-b border-[#D9D3CD] first:pt-0">
                <div className="flex items-center gap-3">
                  <span className="text-gold">{s.icon}</span>
                  <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] text-dark leading-[1.2]">
                    {s.title}
                  </h3>
                  {s.primary && (
                    <span className="bg-gold/10 text-gold text-[0.625rem] font-body font-medium uppercase tracking-[0.1em] px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  )}
                </div>
                <p className="font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-3">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {s.tags.map((tag, j) => (
                    <span key={j} className="bg-cream text-muted-custom text-xs font-body px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Systems Overview ─────────── */
function SystemsOverviewSection({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  const systems = [
    { num: '01', title: 'Lead Generation Machines', desc: 'Full funnel + GHL automation that captures leads, qualifies them, sends them through a nurture sequence, and books calls — all on autopilot.' },
    { num: '02', title: 'GHL White-Label Systems', desc: 'Complete GoHighLevel setups for agencies and SaaS businesses — white-labeled, sub-account ready, and pre-built with your automation workflows.' },
    { num: '03', title: 'AI-Powered Follow-Up Systems', desc: 'Smart follow-up sequences that use AI to personalize messaging at scale — the right message, to the right lead, at the right time. Zero manual effort.' },
    { num: '04', title: 'Business Operating Systems', desc: 'Full internal systems — from client onboarding to project delivery — built in GHL, Notion, or custom SaaS tools so your entire operation runs from one place.' },
  ]

  return (
    <section ref={sectionRef} className="bg-cream py-[clamp(5rem,12vw,10rem)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
        <span className="animate-in font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-custom">
          Systems I Build
        </span>
        <h2 className="animate-in font-display text-[clamp(1.75rem,4vw,2.75rem)] text-dark leading-[1.15] tracking-[-0.01em] mt-4">
          Four Systems. One Goal. Results.
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mt-12 text-left">
          {systems.map((s, i) => (
            <div key={i} className="animate-in bg-cream-white p-8 rounded-sm shadow-sm">
              <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold">
                {s.num}
              </span>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] text-dark leading-[1.2] mt-3">
                {s.title}
              </h3>
              <p className="font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-3">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="animate-in mt-12">
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 })
            }}
            className="bg-gold text-[#0C0B0B] font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-300 inline-flex items-center gap-2"
          >
            Build My System <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Process Section ─────────── */
function ProcessSection({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  const steps = [
    { num: '01', title: 'Discovery Call', desc: 'We start with a discovery call so I can understand your business, current systems, goals, offers, audience, pain points, and what you need help organizing or building.' },
    { num: '02', title: 'Strategy Call', desc: 'After I have the details, I come back with a practical plan for your funnels, workflows, CRM setup, automations, and priorities so the work is intentional.' },
    { num: '03', title: 'Contract Signing', desc: 'Once you decide to proceed, we confirm scope, deliverables, timeline, payment schedule, downpayment, access requirements, and contract terms.' },
    { num: '04', title: 'Onboarding & Delivery', desc: 'We set expectations, collect assets, organize access, define communication, begin the build, review progress, test everything, and hand off deliverables clearly.' },
  ]

  return (
    <section ref={sectionRef} id="process" className="bg-cream-white py-[clamp(5rem,12vw,10rem)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
        <span className="animate-in font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-custom">
          My Process
        </span>
        <h2 className="animate-in font-display text-[clamp(1.75rem,4vw,2.75rem)] text-dark leading-[1.15] tracking-[-0.01em] mt-4">
          A Clear Path From First Call to Final Delivery
        </h2>
        <p className="animate-in font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-4 max-w-[600px] mx-auto">
          A clear working process so you know exactly what happens from our first conversation to final delivery.
        </p>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-6 mt-12">
          {steps.map((s, i) => (
            <div key={i} className="animate-in flex flex-col items-center text-center max-w-[260px] flex-1 relative">
              {i > 0 && (
                <div className="hidden lg:block absolute left-[-50%] top-5 w-full h-px border-t border-dashed border-[#D9D3CD]" />
              )}
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold font-body text-sm font-medium bg-cream-white relative z-10">
                {s.num}
              </div>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] text-dark leading-[1.2] mt-4">
                {s.title}
              </h3>
              <p className="font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-2">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="animate-in flex flex-wrap items-center justify-center gap-4 mt-12">
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 })
            }}
            className="bg-gold text-[#0C0B0B] font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-300 inline-flex items-center gap-2"
          >
            Start With A Discovery Call <ArrowRight size={14} />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('work-samples')
              if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 })
            }}
            className="text-dark font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] underline underline-offset-4 hover:underline-offset-8 transition-all duration-300"
          >
            View Sample Work
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Work Sample Modal ─────────── */
interface WorkItem {
  title: string
  desc: string
  cat: string
  img: string
  blurb: string
  result: string
  isVideo?: boolean
  video?: string
}

function WorkSampleModal({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0C0B0B]/90 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 bg-cream-white max-w-[900px] w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modalIn 0.3s ease' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0C0B0B]/10 hover:bg-[#0C0B0B]/20 flex items-center justify-center transition-colors"
        >
          <X size={18} className="text-dark" />
        </button>

        {/* Image / Video */}
<div className="aspect-video bg-[#0C0B0B] overflow-hidden">
 {item.isVideo && item.video ? (
  <video
    className="w-full h-full object-contain bg-black"
    controls
    playsInline
    preload="metadata"
  >
    <source src={item.video} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
) : (
  <img
    src={item.img}
    alt={item.title}
    className="w-full h-full object-cover"
  />
)}
</div>

        {/* Content */}
        <div className="p-8 lg:p-12">
          <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold">
            {item.cat}
          </span>
          <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] text-dark leading-[1.2] mt-2">
            {item.title}
          </h3>
          <p className="font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-4">
            {item.blurb}
          </p>
          <div className="mt-6 p-4 bg-cream rounded-sm border-l-2 border-gold">
            <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold">
              Result
            </span>
            <p className="font-body text-[0.875rem] text-dark leading-[1.7] mt-1 font-medium">
              {item.result}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ─────────── Work Samples Section ─────────── */
function WorkSamplesSection({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('All')
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [filter])

  const categories = ['All', 'GHL Systems', 'Funnels', 'Websites', 'SaaS Tools', 'Social Media', 'Automation', 'Walkthrough']

  // ── EDIT WORK SAMPLES HERE ──
  // To add/replace a screenshot: update the `img` field with the path to your image in /public/images/
  // To update text: edit the title, desc, blurb, and result fields below
  const works: WorkItem[] = [
    // GHL Systems (3 samples)
    {
      title: 'Full GHL Sub-Account Setup',
      desc: 'Complete GoHighLevel sub-account build from scratch',
      cat: 'GHL Systems',
      img: '/images/work-ghl-setup.png', // REPLACE: add your GHL setup screenshot to /public/images/
      blurb: 'A full GoHighLevel sub-account setup I built for a coaching client — including custom pipelines, automation workflows, calendar integrations, reputation management, and a branded dashboard. Everything was configured from scratch to match the client\'s exact sales process.',
      result: 'The client went from manually tracking leads in spreadsheets to a fully automated CRM system. Follow-up time dropped by 80% and they closed 3 new clients within the first two weeks of launch.',
    },
    {
      title: 'Pipeline & CRM Configuration',
      desc: 'Custom sales pipeline and CRM workflow setup',
      cat: 'GHL Systems',
      img: '/images/work-crm-pipeline.png', // REPLACE: add your CRM pipeline screenshot to /public/images/
      blurb: 'A fully configured CRM pipeline build for a real estate investor — custom stages, tags, smart lists, opportunity tracking, and automated task reminders. The pipeline was designed to mirror their exact deal flow from first contact to closing.',
      result: 'The client could finally see every deal\'s status at a glance. Their team\'s response time improved significantly and deal tracking became consistent across the organization.',
    },
    {
      title: 'AI Lead Follow-Up System',
      desc: 'Automated AI-powered lead nurture & follow-up',
      cat: 'GHL Systems',
      img: '/images/work-ai-followup.png', // REPLACE: add your AI follow-up screenshot to /public/images/
      blurb: 'An AI-powered lead follow-up system built inside GoHighLevel for a service business. The system uses AI conversation bots to respond to new leads instantly, qualify them with smart questions, and automatically book discovery calls — all without any manual effort.',
      result: 'Lead response time dropped from hours to under 60 seconds. The client saw a 40% increase in booked calls and was able to remove manual follow-up from their team\'s daily tasks entirely.',
    },
    // Funnels (3 samples)
    {
      title: 'Sales Funnel',
      desc: 'High-converting sales funnel with email sequence',
      cat: 'Funnels',
      img: '/images/sales-funnel.png', // REPLACE: add your sales funnel screenshot to /public/images/
      blurb: 'A complete sales funnel I built for a Chiropractor — landing page, opt-in, thank you page, email nurture sequence (7-email series), and a sales page with order form. The entire buyer journey was mapped, written, and built inside GoHighLevel.',
      result: 'The funnel launched with a 32% opt-in rate on cold traffic and converted 8% of leads into paid clients within the first 30 days.',
    },
    {
      title: 'Booking Funnel',
      desc: 'Streamlined appointment booking funnel',
      cat: 'Funnels',
      img: '/images/Booking-Funnel.png', // REPLACE: add your booking funnel screenshot to /public/images/
      blurb: 'A booking funnel built for a health and wellness practitioner — designed to pre-qualify leads before they book a consultation. The funnel includes a short application form, confirmation page, automated reminder sequences, and a no-show recovery workflow.',
      result: 'The client\'s no-show rate dropped from 40% to under 15%. Consultation quality improved because leads arrived pre-qualified and prepared for the call.',
    },
    {
      title: 'Lead Generation Funnel',
      desc: 'Lead gen funnel for a business coach',
      cat: 'Funnels',
      img: '/images/lead-funnel.jpg', // REPLACE: add your lead gen funnel screenshot to /public/images/
      blurb: 'A lead generation funnel I created for a life coach offering a free resource — opt-in page, thank you page with video, lead magnet delivery automation, and a 5-day email nurture sequence. Designed to attract qualified leads and move them toward a discovery call.',
      result: 'The funnel helped the coach build her email list by 300+ leads in the first 60 days and generated consistent discovery call bookings without any paid ads.',
    },
    // Websites (3 samples)
    {
      title: 'Real Estate Website',
      desc: 'Full real estate agent website — Sample 1',
      cat: 'Websites',
      img: '/images/re-website.png', // REPLACE: add your real estate website screenshot to /public/images/
      blurb: 'A full real estate agent website I built for a top-producing realtor — property search integration, lead capture forms, neighborhood guides, testimonials section, and a CRM-connected contact form. Built to convert visitors into seller and buyer leads.',
      result: 'The agent saw a 60% increase in website-generated inquiries within the first month. The site became the primary source of warm leads for their team.',
    },
    {
      title: 'Retail Website',
      desc: 'Reatil real estate website — Sample 2',
      cat: 'Websites',
      img: '/images/tech-website.png', // REPLACE: add your second real estate website screenshot to /public/images/
      blurb: 'A full branding project for a client in California. From websites, to logos & full branding kit to place them as top business in their field',
      result: 'Clients gained more traffic, equiuvalent to more sales with our full on branding & marketing strategy',
    },
    {
      title: 'Health & Wellness Website',
      desc: 'Health and wellness practitioner website',
      cat: 'Websites',
      img: '/images/hc-website.png', // REPLACE: add your health & wellness website screenshot to /public/images/
      blurb: 'A health and wellness website I built for a holistic health practitioner — services pages, practitioner bio, blog, booking integration, and a lead magnet opt-in. Designed to establish trust, highlight expertise, and convert visitors into consultation bookings.',
      result: 'The practitioner finally had a professional online presence that matched the quality of their services. Consultation bookings increased within the first month of launch.',
    },
    // SaaS Tools (3 samples)
    {
      title: "Tin's Income System Dashboard",
      desc: 'My own SaaS system — built from scratch',
      cat: 'SaaS Tools',
      img: '/images/tios-saas.png', // REPLACE: add your TIS dashboard screenshot to /public/images/
      blurb: "This is my own SaaS product — Tin's Income System. A business dashboard I designed and built from the ground up to help me track income, manage clients, and monitor business performance. Built with a focus on simplicity and daily usability.",
      result: "Using my own system helped me stay organized, track every project, and identify which services were generating the most revenue — giving me the data to grow strategically.",
    },
    {
      title: 'Client Content Calendar',
      desc: 'Custom content calendar built for a client',
      cat: 'SaaS Tools',
      img: '/images/calendar-saas.png', // REPLACE: add your content calendar screenshot to /public/images/
      blurb: 'A custom content calendar I created for a client — built to manage their monthly content planning, social media scheduling, and campaign tracking. Designed to be easy to update weekly and give the client full visibility over their content pipeline.',
      result: "The client's content consistency improved immediately. They went from posting sporadically to publishing on a consistent schedule, which helped grow their social media presence over 90 days.",
    },
    {
      title: 'Task Tracker App',
      desc: 'Custom task tracking application',
      cat: 'SaaS Tools',
      img: '/images/task-saas.png', // REPLACE: add your budget tracker screenshot to /public/images/
      blurb: 'A task tracker app I built — featuring task organization, priority tracking, due date management, progress statuses, and daily productivity summaries. Designed to help users stay organized, manage responsibilities clearly, and see what needs attention without relying on messy notes or scattered spreadsheets.',
      result: 'The app helped me and my client organize active projects, track pending tasks, and stay on top of deadlines in one place. A practical productivity tool built to make daily planning and follow-through easier.',
    },
    // Social Media (3 samples)
    {
      title: 'Realtor Social Media Posts',
      desc: 'Branded social media content for a realtor',
      cat: 'Social Media',
      img: '/images/neel-website.png', // REPLACE: add your social media post screenshot to /public/images/
      blurb: 'A set of branded social media graphics I created for a real estate agent — market update posts, listing announcements, and brand awareness content. Designed to be visually consistent, professional, and optimized for Instagram and Facebook.',
      result: 'The agent\'s social media engagement increased after switching to consistent branded content. Their posts started generating profile visits and direct message inquiries from potential buyers and sellers.',
    },
    {
      title: 'Real Estate Buyer Tip Post',
      desc: 'Educational buyer tip content series',
      cat: 'Social Media',
      img: '/images/tip-website.png', // REPLACE: add your buyer tip post screenshot to /public/images/
      blurb: 'An educational "buyer tip" content series I designed for a real estate agent — carousel posts covering the home-buying process, common mistakes, and market advice. Designed to position the agent as a trusted local expert.',
      result: 'The educational series performed better than any other content the agent had posted. Multiple posts were shared by followers and generated inbound inquiries from first-time buyers.',
    },
    {
      title: 'Real Estate Market Update Post',
      desc: 'Monthly market report social content',
      cat: 'Social Media',
      img: '/images/buy-website.png', // REPLACE: add your market update post screenshot to /public/images/
      blurb: 'Monthly market report posts I designed for a real estate team — data-driven, visually clean, and formatted for maximum readability on mobile. Each post summarized key market stats and included a call-to-action to connect with the team.',
      result: 'The consistent market updates helped establish the team as the go-to local market authority. Their profile followers grew and they regularly received messages from people referencing their market posts.',
    },
   
    // Automation Walkthrough Videos 
    {
  title: 'Health Care Professional Client Walkthrough Video',
  desc: 'Video walkthrough of a complete GHL build',
  cat: 'Walkthrough',
  img: '/images/healthcare-walkthrough.png',
  isVideo: true,
  video: '/videos/healthcare-walkthrough.mp4',
  blurb: 'A full video walkthrough I recorded to demonstrate how I deliver systems to clients.',
  result: 'Clients who watch the walkthrough before onboarding arrive better prepared.',
},

{
  title: 'Medical Spa Client Walkthrough Video',
  desc: 'Video walkthrough of a complete GHL build',
  cat: 'Walkthrough',
  img: '/images/medspa-walkthrough.png',
  isVideo: true,
  video: '/videos/medspa-walkthrough.mp4',
  blurb: 'A full video walkthrough I recorded to demonstrate how I deliver systems to clients.',
  result: 'Clients who watch the walkthrough before onboarding arrive better prepared.',
},
  ]

  const filtered = filter === 'All' ? works : works.filter(w => w.cat === filter)

  return (
    <section ref={sectionRef} id="work-samples" className="bg-cream py-[clamp(5rem,12vw,10rem)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
        <span className="animate-in font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-custom">
          Work Samples
        </span>
        <h2 className="animate-in font-display text-[clamp(1.75rem,4vw,2.75rem)] text-dark leading-[1.15] tracking-[-0.01em] mt-4">
          A Curated Look at My Work
        </h2>
        <p className="animate-in font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-4 max-w-[600px] mx-auto">
          A curated look at sample systems, funnels, websites, automations, and creative assets I build. Click any sample to view the larger preview and project notes.
        </p>

        {/* Filter tabs */}
        <div className="animate-in flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-body text-xs font-medium px-4 py-2 rounded-full transition-colors duration-300 ${
                filter === cat
                  ? 'bg-gold text-[#0C0B0B]'
                  : 'bg-cream-white text-muted-custom hover:bg-gold hover:text-[#0C0B0B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-left">
          {filtered.map((w, i) => (
            <div
              key={i}
              className="animate-in group cursor-pointer"
              onClick={() => setSelectedItem(w)}
            >
              <div className="overflow-hidden rounded-sm relative">
                {w.isVideo && w.video ? (
  <video
    className="w-full aspect-[4/3] object-cover"
    muted
    playsInline
    preload="metadata"
  >
    <source src={w.video} type="video/mp4" />
  </video>
) : (
  <img
    src={w.img}
    alt={w.title}
    className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-400"
  />
)}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0C0B0B]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-gold font-body text-xs font-medium uppercase tracking-[0.1em]">
                    <ExternalLink size={14} /> View Details
                  </div>
                </div>
                {w.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center bg-[#0C0B0B]/50">
                      <Play size={18} className="text-gold ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <span className="font-body text-[0.625rem] font-medium uppercase tracking-[0.1em] text-gold">{w.cat}</span>
                <h4 className="font-body text-dark font-medium mt-0.5">{w.title}</h4>
                <p className="font-body text-[0.875rem] text-muted-custom">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="animate-in mt-12">
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 })
            }}
            className="bg-gold text-[#0C0B0B] font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-300 inline-flex items-center gap-2"
          >
            Ask About A Similar Build <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <WorkSampleModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  )
}

/* ─────────── Stats & Tech Stack ─────────── */
function StatsTechSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  const stats = [
    { value: 'Philippines', label: 'Based In', sub: 'Working globally · Async-friendly' },
    { value: '6+ Years', label: 'Experience', sub: 'VA · GHL · Funnels · Bookkeeping' },
    { value: 'Open', label: 'Availability', sub: 'New projects & retainers' },
    { value: 'PHT (UTC+8)', label: 'Timezone', sub: 'Flexible for US/AU/EU clients' },
  ]

  const techStack = [
    { name: 'GoHighLevel', cat: 'CRM + funnels' },
    { name: 'n8n', cat: 'workflow automation' },
    { name: 'Zapier', cat: 'integrations' },
    { name: 'HubSpot', cat: 'CRM systems' },
    { name: 'WordPress', cat: 'websites' },
    { name: 'Wix', cat: 'responsive web design' },
    { name: 'Systeme.io', cat: 'funnels' },
    { name: 'ChatGPT', cat: 'AI workflows' },
    { name: 'Claude', cat: 'AI assistance' },
    { name: 'NotebookLM', cat: 'research + organization' },
    { name: 'Claude Code', cat: 'AI coding workflows' },
    { name: 'Figma', cat: 'UI/UX design' },
    { name: 'VS Code', cat: 'web editing' },
    { name: 'Supabase', cat: 'database' },
    { name: 'Vercel', cat: 'deployment' },
    { name: 'Netlify', cat: 'hosting' },
    { name: 'Canva', cat: 'creative assets' },
    { name: 'Google Workspace', cat: 'operations' },
  ]

  return (
    <section ref={sectionRef} id="tech-stack" className="bg-[#0C0B0B] py-[clamp(5rem,12vw,10rem)] relative overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[clamp(8rem,15vw,14rem)] text-transparent leading-none tracking-[-0.02em]" style={{ WebkitTextStroke: '2px rgba(200, 169, 126, 0.06)' }}>
          SYSTEMS
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-gold/20">
          {stats.map((s, i) => (
            <div key={i} className="animate-in text-center">
              <div className="font-display text-[clamp(1.5rem,3vw,2rem)] text-gold leading-[1.05]">
                {s.value}
              </div>
              <div className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-[#A39E99] mt-2">
                {s.label}
              </div>
              <div className="font-body text-[0.875rem] text-[#A39E99] mt-1">
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="text-center mt-16">
          <span className="animate-in font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold">
            My Tech Stack
          </span>
          <h2 className="animate-in font-display text-[clamp(1.75rem,4vw,2.75rem)] text-[#F5F0EB] leading-[1.15] tracking-[-0.01em] mt-4">
            Platforms I Use to Build, Organize, Automate, and Launch
          </h2>
          <p className="animate-in font-body text-[0.875rem] text-[#A39E99] leading-[1.7] mt-4">
            Platforms I use to build, organize, automate, and launch business systems.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 mt-12 text-left">
            {techStack.map((t, i) => (
              <div key={i} className="animate-in">
                <div className="font-body text-[#F5F0EB] font-medium text-sm">{t.name}</div>
                <div className="font-body text-[0.75rem] text-[#A39E99]">{t.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Credentials Section ─────────── */
function CredentialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const [selectedCert, setSelectedCert] = useState<{
    title: string
    img: string
  } | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  // ── EDIT CERTIFICATIONS HERE ──
  // Replace placeholder image paths once you have your cert screenshots
  const certs = [
  {
    title: 'QuickBooks Certification',
    desc: 'Training in bookkeeping foundations, financial organization, reconciliation, reporting, and business account structure.',
    img: '/images/quickbooks.png',
    placeholder: false,
  },

  {
    title: 'GoHighLevel Certification',
    desc: 'Training and hands-on learning in GHL systems, CRM setup, funnels, pipelines, automations, calendars, and workflows.',
    img: '/images/GHL.png',
    placeholder: false,
  },
]

  return (
    <section ref={sectionRef} id="credentials" className="bg-cream py-[clamp(5rem,12vw,10rem)]">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center">
        <span className="animate-in font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-custom">
          Credentials
        </span>
        <h2 className="animate-in font-display text-[clamp(1.75rem,4vw,2.75rem)] text-dark leading-[1.15] tracking-[-0.01em] mt-4">
          Certifications & Continuous Learning
        </h2>
        <p className="animate-in font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-4 max-w-[600px] mx-auto">
          I believe credibility is built through practice, continuous learning, and staying resourceful. I may not claim to know everything, but I actively keep learning, improving, and using the right tools, training, and resources to deliver better work for every project.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {certs.map((c, i) => (
            <div key={i} className="animate-in bg-cream-white p-8 rounded-sm shadow-sm text-left flex flex-col">
              {/* Certification badge placeholder */}
              <div className="aspect-[4/3] bg-[#F5F0EB] rounded-sm overflow-hidden mb-6 border border-[#D9D3CD]">
  {c.img ? (
    <img
  src={c.img}
  alt={c.title}
  onClick={() =>
    setSelectedCert({
      title: c.title,
      img: c.img,
    })
  }
  className="w-full h-full object-contain cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
/>
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Award size={32} className="text-gold opacity-40" />
      <p className="font-body text-[0.75rem] text-muted-custom mt-2 text-center px-4">
        Certificate image coming soon
      </p>
    </div>
  )}
</div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-[clamp(1.125rem,2vw,1.25rem)] text-dark leading-[1.2]">
                  {c.title}
                </h3>
              </div>
              <p className="font-body text-[0.875rem] text-muted-custom leading-[1.7] flex-1">
                {c.desc}
              </p>
              <div className="mt-4 pt-4 border-t border-[#D9D3CD] flex items-center gap-1.5">
                <Check size={14} className="text-gold" />
                <span className="font-body text-xs text-gold font-medium">Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedCert && (
  <div
    className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
    onClick={() => setSelectedCert(null)}
  >
    <div
      className="relative max-w-5xl w-full max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setSelectedCert(null)}
        className="absolute -top-10 right-0 text-white text-sm uppercase tracking-wider hover:text-gold"
      >
        Close ✕
      </button>

      <img
        src={selectedCert.img}
        alt={selectedCert.title}
        className="w-full max-h-[85vh] object-contain"
      />
    </div>
  </div>
)}
    </section>
  )
}

/* ─────────── Pricing Section ─────────── */
function PricingSection({
  lenisRef,
}: {
  lenisRef: React.MutableRefObject<Lenis | null>
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState('VA Packages')

  useEffect(() => {
    if (!sectionRef.current) return

    const els = sectionRef.current.querySelectorAll('.animate-in')

    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  const tabs = [
    'VA Packages',
    'Funnels + GHL',
    'Funnels',
    'Bookkeeping',
    'Website',
  ]

  const pricingData = {
    /* ─────────────────────────────
       VA PACKAGES
    ───────────────────────────── */
    'VA Packages': [
      {
        emoji: '🌱',
        name: 'Starter',
        subtitle: 'Essentials',
        price: '$650',
        period: 'per month · up to 20 hrs/mo',
        features: [
          'Email & calendar management',
          'Data entry & file organization',
          'Social media scheduling (2 platforms)',
          'Basic CRM management',
          'Weekly progress reports',
          'Response within 24 hours',
        ],
        footer: '3-month minimum · Best for focused execution',
        featured: false,
      },

      {
        emoji: '🚀',
        name: 'Growth',
        subtitle: 'Operator',
        price: '$1,500',
        period: 'per week · up to 40 hrs/week',
        features: [
          'Everything in Essentials',
          'CRM management & lead follow-up',
          'Content creation + email marketing',
          'Social media management (3 platforms)',
          'Drip campaign setup & management',
          'Basic GHL support',
          'AI-powered workflow optimization',
          'Daily check-ins & reporting',
        ],
        footer:
          '3-month minimum · Best for growing service businesses',
        featured: true,
      },

      {
        emoji: '👑',
        name: 'Premium',
        subtitle: 'Systems Partner',
        price: '$2,500',
        period: 'per month · systems + priority',
        features: [
          'Everything in Operator',
          'GHL setup & management',
          'Funnel building (1 per quarter)',
          'Advanced automation setup',
          'AI integration across workflows',
          'Basic bookkeeping support',
          'Priority response within 4 hours',
          'Monthly strategy review call',
        ],
        footer:
          '3-month minimum · Best for high-growth businesses',
        featured: false,
      },
    ],

    /* ─────────────────────────────
       FUNNELS + GHL
    ───────────────────────────── */
    'Funnels + GHL': [
      {
        emoji: '🔧',
        name: 'Monthly Retainer',
        subtitle: 'Ongoing GHL Support',
        price: '$300',
        period: 'per month',
        features: [
          'Basic GHL maintenance',
          'Small workflow updates',
          'Pipeline adjustments',
          'Form & calendar updates',
          'Basic troubleshooting',
          'Monthly system review',
        ],
        footer:
          'Best for businesses that already have GHL and need ongoing support',
        featured: false,
      },

      {
        emoji: '🌱',
        name: 'Starter',
        subtitle: 'GHL Foundation',
        price: '$600',
        period: 'starting investment',
        features: [
          'Basic GoHighLevel setup',
          'CRM configuration',
          '1 pipeline setup',
          'Calendar integration',
          'Forms & basic workflows',
          'Basic lead notifications',
        ],
        footer:
          'Best for getting the core GHL system organized and operational',
        featured: false,
      },

      {
        emoji: '🚀',
        name: 'Growth',
        subtitle: 'Funnels + Automation',
        price: '$1,500',
        period: 'starting investment',
        features: [
          'Everything in Starter',
          'Custom funnel build',
          'Lead capture setup',
          'CRM pipeline automation',
          'Email & SMS follow-up',
          'Appointment reminders',
          'Lead nurture workflows',
          'Testing & optimization',
        ],
        footer:
          'Best for businesses ready to automate lead generation and follow-up',
        featured: true,
      },

      {
        emoji: '👑',
        name: 'Premium',
        subtitle: 'Advanced GHL System',
        price: '$2,500',
        period: 'starting investment',
        features: [
          'Everything in Growth',
          'Advanced GHL configuration',
          'Multiple automation workflows',
          'AI-assisted follow-up',
          'Conversation bots',
          'Lead qualification system',
          'Advanced pipeline logic',
          'Custom integrations',
          'Full system testing & handoff',
        ],
        footer:
          'Best for businesses needing a complete automated sales ecosystem',
        featured: false,
      },
    ],

    /* ─────────────────────────────
       FUNNELS
    ───────────────────────────── */
    Funnels: [
      {
        emoji: '🌱',
        name: 'Starter',
        subtitle: 'Essential Funnel',
        price: '$500',
        period: 'starting investment',
        features: [
          'Funnel strategy',
          'Landing page',
          'Lead capture form',
          'Thank-you page',
          'Mobile optimization',
          'Basic tracking setup',
          'Launch testing',
        ],
        footer:
          'Best for a simple, focused lead-generation or booking funnel',
        featured: false,
      },

      {
        emoji: '🚀',
        name: 'Growth',
        subtitle: 'Funnel + Automation',
        price: '$1,500',
        period: 'starting investment',
        features: [
          'Everything in Starter',
          'Multi-step funnel',
          'Email nurture sequence',
          'SMS follow-up automation',
          'Lead tagging & segmentation',
          'Appointment reminders',
          'CRM integration',
          'Conversion optimization',
        ],
        footer:
          'Best for businesses wanting the funnel and follow-up system working together',
        featured: true,
      },

      {
        emoji: '👑',
        name: 'Premium',
        subtitle: 'AI Conversion System',
        price: '$2,500',
        period: 'starting investment',
        features: [
          'Everything in Growth',
          'Advanced funnel architecture',
          'AI conversation bot',
          'Automated lead qualification',
          'Conditional workflows',
          'Advanced email & SMS sequences',
          'Custom integrations',
          'CRM pipeline automation',
          'Full testing & optimization',
        ],
        footer:
          'Best for advanced funnels that qualify, nurture, and convert automatically',
        featured: false,
      },
    ],

    /* ─────────────────────────────
       BOOKKEEPING
    ───────────────────────────── */
    Bookkeeping: [
      {
        emoji: '📘',
        name: 'Starter',
        subtitle: 'Bookkeeping Essentials',
        price: '$300',
        period: 'per month',
        features: [
          'Transaction categorization',
          'Bank reconciliation',
          'Basic financial organization',
          'Monthly bookkeeping review',
          'Profit & loss report',
          'Organized account records',
        ],
        footer:
          'Best for small businesses needing clean and organized monthly books',
        featured: false,
      },

      {
        emoji: '📊',
        name: 'Growth',
        subtitle: 'Ongoing Financial Support',
        price: '$600',
        period: 'per month',
        features: [
          'Everything in Starter',
          'Multiple account reconciliation',
          'Invoice tracking',
          'Accounts receivable support',
          'Expense monitoring',
          'Monthly financial reports',
          'Bookkeeping cleanup & organization',
          'Priority monthly support',
        ],
        footer:
          'Best for growing businesses with more active financial operations',
        featured: true,
      },
    ],

    /* ─────────────────────────────
       WEBSITE
    ───────────────────────────── */
    Website: [
      {
        emoji: '🌐',
        name: 'Starter',
        subtitle: '4-Page Website',
        price: '$500',
        period: 'starting investment',
        features: [
          'Up to 4 pages',
          'Responsive website design',
          'Mobile optimization',
          'Contact form setup',
          'Basic SEO structure',
          'Social links integration',
          'Basic performance optimization',
        ],
        footer:
          'Best for service businesses needing a clean professional online presence',
        featured: false,
      },

      {
        emoji: '🚀',
        name: 'Growth',
        subtitle: 'Business Website',
        price: '$1,200',
        period: 'starting investment',
        features: [
          'Everything in Starter',
          'Up to 8 pages',
          'Custom page layouts',
          'Lead capture forms',
          'CRM or email integration',
          'Enhanced mobile optimization',
          'On-page SEO setup',
          'Website speed optimization',
          'Analytics integration',
        ],
        footer:
          'Best for businesses that need a stronger website built to generate leads',
        featured: true,
      },

      {
        emoji: '👑',
        name: 'Premium',
        subtitle: 'Website + Automation',
        price: '$2,000',
        period: 'starting investment',
        features: [
          'Everything in Growth',
          'Up to 12 pages',
          'Advanced custom layouts',
          'Lead generation integration',
          'CRM connection',
          'Automated form follow-up',
          'Booking or calendar integration',
          'Advanced SEO foundation',
          'Conversion optimization',
          'Custom integrations',
          'Full testing & launch support',
        ],
        footer:
          'Best for businesses needing a complete website and lead-generation system',
        featured: false,
      },
    ],
  }

  const packages =
    pricingData[tab as keyof typeof pricingData] || pricingData['VA Packages']

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="bg-cream-white py-[clamp(5rem,12vw,10rem)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">

        {/* Heading */}
        <span className="animate-in font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-custom">
          Investment
        </span>

        <h2 className="animate-in font-display text-[clamp(1.75rem,4vw,2.75rem)] text-dark leading-[1.15] tracking-[-0.01em] mt-4">
          Transparent Pricing
        </h2>

        <p className="animate-in font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-4 max-w-[600px] mx-auto">
          Choose the level of support that fits your project. Custom scopes
          and flexible support are also available.
        </p>

        {/* Tabs */}
        <div className="animate-in flex flex-wrap justify-center gap-2 mt-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-body text-xs font-medium px-4 py-2 rounded-full transition-colors duration-300 ${
                tab === t
                  ? 'bg-gold text-[#0C0B0B]'
                  : 'bg-cream text-muted-custom hover:bg-gold hover:text-[#0C0B0B]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div
          className={`grid gap-6 mt-12 text-left ${
            packages.length === 4
              ? 'md:grid-cols-2 xl:grid-cols-4'
              : packages.length === 2
              ? 'md:grid-cols-2 max-w-[800px] mx-auto'
              : 'lg:grid-cols-3'
          }`}
        >
          {packages.map((p, i) => (
            <div
              key={`${tab}-${i}`}
              className={`animate-in bg-cream p-8 rounded-sm ${
                p.featured ? 'border-2 border-gold' : ''
              }`}
            >
              <div className="text-2xl">{p.emoji}</div>

              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] text-dark leading-[1.2] mt-3">
                {p.name}
              </h3>

              <p className="font-body text-[0.875rem] text-muted-custom">
                {p.subtitle}
              </p>

              <div className="font-display text-[clamp(2rem,4vw,3rem)] text-dark leading-[1.05] mt-4">
                {p.price}
              </div>

              <p className="font-body text-xs text-muted-custom">
                {p.period}
              </p>

              <ul className="mt-6 space-y-2">
                {p.features.map((f, j) => (
                  <li
                    key={j}
                    className="font-body text-[0.875rem] text-muted-custom flex items-start gap-2"
                  >
                    <Check
                      size={14}
                      className="text-gold mt-0.5 shrink-0"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <p className="font-body text-xs text-muted-custom mt-6 pt-4 border-t border-[#D9D3CD]">
                {p.footer}
              </p>

              <button
                onClick={() => {
                  const el = document.getElementById('contact')

                  if (el && lenisRef.current) {
                    lenisRef.current.scrollTo(el, {
                      offset: -80,
                    })
                  }
                }}
                className={`w-full mt-6 font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] px-6 py-3 rounded-full transition-colors duration-300 ${
                  p.featured
                    ? 'bg-gold text-[#0C0B0B] hover:bg-gold-light'
                    : 'border border-gold text-dark hover:bg-gold hover:text-[#0C0B0B]'
                }`}
              >
                Book a Discovery Call
              </button>
            </div>
          ))}
        </div>

        {/* Hourly / Custom Work */}
        <div className="animate-in mt-10 max-w-[700px] mx-auto bg-cream p-6 rounded-sm border border-[#D9D3CD]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-left">
              <h3 className="font-display text-lg text-dark">
                Custom & Flexible Support
              </h3>

              <p className="font-body text-[0.875rem] text-muted-custom mt-1">
                Need help outside of a package? Flexible hourly support is
                available for custom projects, updates, troubleshooting, or
                ongoing assistance.
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="font-display text-3xl text-dark">
                $15
              </div>

              <p className="font-body text-xs text-muted-custom">
                per hour
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Disclaimer */}
        <p className="animate-in font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-8 max-w-[700px] mx-auto">
          Prices shown are starting investments and may vary based on project
          scope, complexity, integrations, content requirements, and timeline.
          A discovery call is recommended before starting so the final scope
          and investment can be confirmed.
        </p>
      </div>
    </section>
  )
}

/* ─────────── Differentiators Section ─────────── */
function DifferentiatorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  const items = [
    { num: '01', title: 'I Think in Systems', desc: "I don't just complete tasks — I design the system behind them. Every funnel, automation, and GHL build I deliver is engineered for scale, not just function." },
    { num: '02', title: 'AI Is My Co-Pilot', desc: 'I integrate AI into every workflow I build. Clients get faster delivery, smarter automations, and AI-powered follow-up that works 24/7 — at no extra cost.' },
    { num: '03', title: "I've Built My Own SaaS", desc: "I don't just talk about systems — I've built one. That gives me a level of technical depth that most VAs and even some developers simply don't have." },
    { num: '04', title: '6 Years, Zero Fluff', desc: "Half a decade of real client work — real estate, marketing, admin, GHL, funnels. I've done the reps. I show up, deliver, and make your business better every single week." },
  ]

  return (
    <section ref={sectionRef} className="bg-cream py-[clamp(5rem,12vw,10rem)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
        <span className="animate-in font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-custom">
          Why Tin
        </span>
        <h2 className="animate-in font-display text-[clamp(1.75rem,4vw,2.75rem)] text-dark leading-[1.15] tracking-[-0.01em] mt-4">
          What Makes Me Different
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mt-12 text-left">
          {items.map((item, i) => (
            <div key={i} className="animate-in bg-cream-white p-8 rounded-sm">
              <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold">
                {item.num}
              </span>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] text-dark leading-[1.2] mt-3">
                {item.title}
              </h3>
              <p className="font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-3">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Approach Section ─────────── */
function ApproachSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  const pillars = [
    { label: 'COMMUNICATION', title: 'Clear Collaboration', desc: 'I prioritize responsiveness, organization, and structured communication throughout every project.' },
    { label: 'SYSTEMS THINKING', title: 'Workflow-Focused', desc: 'Every funnel, automation, and CRM workflow is designed with long-term usability and business efficiency in mind.' },
    { label: 'IMPLEMENTATION', title: 'Practical Execution', desc: 'Focused on implementation and operational support rather than overcomplicated systems or unrealistic promises.' },
  ]

  return (
    <section ref={sectionRef} className="bg-cream-white py-[clamp(5rem,12vw,10rem)]">
      <div className="max-w-[680px] mx-auto px-6 lg:px-10 text-center">
        <span className="animate-in font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-custom">
          Approach
        </span>
        <h2 className="animate-in font-display text-[clamp(1.75rem,4vw,2.75rem)] text-dark leading-[1.15] tracking-[-0.01em] mt-4">
          Practical, Organized & Systems-Focused
        </h2>
        <p className="animate-in font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-4">
          My approach focuses on building practical systems that improve workflows, support business operations, and create a smoother experience for both businesses and their clients.
        </p>

        <div className="flex flex-col lg:flex-row gap-8 mt-12 text-left">
          {pillars.map((p, i) => (
            <div key={i} className="animate-in flex-1">
              <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold">
                {p.label}
              </span>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] text-dark leading-[1.2] mt-3">
                {p.title}
              </h3>
              <p className="font-body text-[0.875rem] text-muted-custom leading-[1.7] mt-2">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Contact Section ─────────── */
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    )
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="bg-[#0C0B0B] py-[clamp(5rem,12vw,10rem)]">
      <div className="max-w-[680px] mx-auto px-6 lg:px-10 text-center">
        <div className="animate-in flex justify-center">
          <Briefcase size={28} className="text-gold" />
        </div>
        <span className="animate-in block font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-gold mt-4">
          Open to New Projects & Retainers
        </span>
        <h2 className="animate-in font-display text-[clamp(2.5rem,6vw,4rem)] text-[#F5F0EB] leading-[1.05] tracking-[-0.02em] mt-4">
          Ready To Talk?
        </h2>
        <h3 className="animate-in font-display text-[clamp(1.5rem,3vw,2rem)] text-gold leading-[1.15] mt-3">
          Let's Start With A Discovery Call.
        </h3>
        <p className="animate-in font-body text-[#A39E99] leading-[1.7] mt-4 max-w-[560px] mx-auto">
          If you need GHL built right, funnels that actually convert, automation that saves you hours, or a
          simple SaaS system built from scratch — send the inquiry here.
        </p>

        {/* Form */}
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  className="animate-in mt-12 space-y-6 text-left"
>
  <input type="hidden" name="form-name" value="contact" />

  {/* Spam protection */}
  <p className="hidden">
    <label>
      Don’t fill this out:
      <input name="bot-field" />
    </label>
  </p>

  <input
    type="text"
    name="name"
    placeholder="Your name"
    required
    className="w-full bg-transparent border-b border-[#A39E99]/30 text-[#F5F0EB] placeholder:text-[#A39E99] focus:border-gold focus:outline-none transition-colors py-3 font-body"
  />

  <input
    type="email"
    name="email"
    placeholder="Your email"
    required
    className="w-full bg-transparent border-b border-[#A39E99]/30 text-[#F5F0EB] placeholder:text-[#A39E99] focus:border-gold focus:outline-none transition-colors py-3 font-body"
  />

  <select
    name="service"
    required
    className="w-full bg-transparent border-b border-[#A39E99]/30 text-[#A39E99] focus:border-gold focus:outline-none transition-colors py-3 font-body appearance-none cursor-pointer"
    defaultValue=""
  >
    <option value="" disabled>What do you need?</option>
    <option value="ghl">GHL Setup / Management</option>
    <option value="funnel">Funnel Build</option>
    <option value="automation">Automation / AI Workflow</option>
    <option value="saas">Custom SaaS / CRM Tool</option>
    <option value="bookkeeping">Bookkeeping</option>
    <option value="website">Website</option>
    <option value="va">VA Services</option>
  </select>

  <select
    name="budget"
    required
    className="w-full bg-transparent border-b border-[#A39E99]/30 text-[#A39E99] focus:border-gold focus:outline-none transition-colors py-3 font-body appearance-none cursor-pointer"
    defaultValue=""
  >
    <option value="" disabled>Estimated budget</option>
    <option value="300-650">$300–$650</option>
    <option value="650-1500">$650–$1,500</option>
    <option value="1500-2500">$1,500–$2,500</option>
    <option value="2500+">$2,500+</option>
  </select>

  <textarea
    name="message"
    placeholder="Tell me about your project..."
    rows={4}
    required
    className="w-full bg-transparent border-b border-[#A39E99]/30 text-[#F5F0EB] placeholder:text-[#A39E99] focus:border-gold focus:outline-none transition-colors py-3 font-body resize-none"
  />

  <div className="text-center pt-4">
    <button
      type="submit"
      className="bg-gold text-[#0C0B0B] font-body text-[0.8125rem] font-medium uppercase tracking-[0.08em] px-10 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-300"
    >
      Email My Inquiry
    </button>
  </div>
</form>
      </div>
    </section>
  )
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="bg-[#0C0B0B] border-t border-[#A39E99]/10 py-12">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
        <span className="font-display italic text-2xl text-gold">Tin.</span>
        <p className="font-body text-[0.875rem] text-[#A39E99] mt-4">
          GHL Systems Specialist • Funnel Strategist • Automation Workflows • SaaS Builder • Philippines
        </p>
        <div className="flex items-center justify-center gap-6 mt-6">
          <a href="#" className="text-[#A39E99] hover:text-gold transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-[#A39E99] hover:text-gold transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-[#A39E99] hover:text-gold transition-colors">
            <Twitter size={20} />
          </a>
        </div>
        <p className="font-body text-xs text-[#A39E99] mt-8">
          &copy; 2025 Tin. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

/* ─────────── App ─────────── */
function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <div className="relative">
      <Navigation lenisRef={lenisRef} />
      <HeroSection lenisRef={lenisRef} />
      <IntroVideoSection />
      <AboutSection />
      <ValuePillarsSection />
      <SystemsFlowSection lenisRef={lenisRef} />
      <ServicesSection lenisRef={lenisRef} />
      <SystemsOverviewSection lenisRef={lenisRef} />
      <ProcessSection lenisRef={lenisRef} />
      <WorkSamplesSection lenisRef={lenisRef} />
      <StatsTechSection />
      <CredentialsSection />
      <PricingSection lenisRef={lenisRef} />
      <DifferentiatorsSection />
      <ApproachSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
