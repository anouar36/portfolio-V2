'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from '../app/data';

type Phase = 'hero' | 'entering' | 'case' | 'switching' | 'arriving' | 'leaving';
const cases = projects.slice(0, 3);

/** Deliberately illustrative previews, built from local UI rather than third-party case films. */
function ProjectPreview({ index }: { index: number }) {
  if (index === 0) return <div className="lp-preview lp-stayzi">
    <div className="lp-browser"><span /><span /><span /><small>stayzi / hospitality, thoughtfully connected</small></div>
    <div className="lp-preview-nav"><b>stayzi<span>®</span></b><span>The platform &nbsp; · &nbsp; Experiences</span><i>Get in touch</i></div>
    <div className="lp-stayzi-content"><div><span className="lp-preview-kicker">A BETTER WAY TO HOST</span><h3>Great stays.<br /><em>Less friction.</em></h3><p>Bring your hospitality experience<br />together, in one place.</p><span className="lp-preview-cta">Discover the experience</span><div className="lp-preview-chips"><span>Booking</span><span>Operations</span><span>Guest experience</span></div></div><div className="lp-stayzi-art"><div className="lp-arch lp-arch-back" /><div className="lp-arch lp-arch-front" /><div className="lp-reservation"><span className="lp-reservation-icon">✓</span><div><b>A warm welcome.</b><small>Every detail, taken care of.</small></div></div><div className="lp-orbit" /></div></div>
    <div className="lp-preview-foot"><span>Designed around the guest.</span><span>INTERFACE STUDY</span></div>
  </div>;
  if (index === 1) return <div className="lp-preview lp-commerce">
    <div className="lp-browser"><span /><span /><span /><small>digital goods / independent storefront concept</small></div>
    <div className="lp-preview-nav"><b>good<span>stuff.</span></b><span>Collection &nbsp; · &nbsp; Our story</span><i>Bag (0)</i></div>
    <div className="lp-commerce-heading"><span className="lp-preview-kicker">MADE FOR YOUR NEXT IDEA</span><h3>Small things.<br /><em>Big possibilities.</em></h3><span className="lp-shop-sticker">Made<br />to create.</span></div>
    <div className="lp-products"><div><div className="lp-product lp-product-one"><span>studio<br /><b>notes.</b></span></div><p>Creative toolkit <b>01</b></p></div><div><div className="lp-product lp-product-two"><span className="lp-product-disc" /></div><p>Shape collection <b>02</b></p></div><div><div className="lp-product lp-product-three"><span>Aa</span></div><p>Type essentials <b>03</b></p></div></div>
    <div className="lp-preview-foot"><span>Thoughtfully selected. Digitally delivered.</span><span>STOREFRONT CONCEPT</span></div>
  </div>;
  return <div className="lp-preview lp-supplier">
    <div className="lp-browser"><span /><span /><span /><small>supplier / research workspace concept</small></div>
    <div className="lp-research-layout"><aside><b>s<span>·</span></b><span className="lp-sidebar-active">◫</span><span>⌕</span><span>▤</span><span>⚙</span></aside><div className="lp-research-main"><div className="lp-research-top"><span>WORKSPACE / RESEARCH</span><span className="lp-avatar">AE</span></div><h3>Find your next<br /><em>business connection.</em></h3><div className="lp-search"><span>⌕ &nbsp; Textile suppliers, Morocco</span><b>Search</b></div><div className="lp-table-toolbar"><span>Sample research results</span><b>Export .xlsx</b></div><div className="lp-results"><div className="lp-table-head"><span>BUSINESS</span><span>CITY</span><span>SOURCE</span></div>{['Textile supplier', 'Wholesale studio', 'Fabric distributor'].map((name, i) => <div key={name}><span><i />{name}</span><span>{['Casablanca', 'Fès', 'Rabat'][i]}</span><span className="lp-source">Public listing</span></div>)}</div><div className="lp-research-note">Organized sources. Clear information. Useful exports.</div></div></div>
  </div>;
}

function DeveloperScreen() {
  return <div className="lp-code-screen" aria-hidden="true"><div className="lp-browser"><span /><span /><span /><small>anouar / build-something-meaningful.tsx</small></div><div className="lp-code-body"><span className="lp-code-line">01 &nbsp; <i>const</i> developer = {'{'}</span><span className="lp-code-line">02 &nbsp; &nbsp; name: <b>'Anouar'</b>,</span><span className="lp-code-line">03 &nbsp; &nbsp; focus: <b>'Useful experiences'</b>,</span><span className="lp-code-line">04 &nbsp; &nbsp; mindset: <b>'Always curious'</b></span><span className="lp-code-line">05 &nbsp; {'}'};</span><div className="lp-code-message"><span>FROM IDEA TO INTERFACE</span><strong>Let’s build<br />something good<span>.</span></strong><small>Explore selected work <i className="lp-caret" /></small></div></div></div>;
}

export function LaptopExperience() {
  const stage = useRef<HTMLElement>(null);
  const portfolioButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const badge = useRef<HTMLButtonElement>(null);
  const phaseRef = useRef<Phase>('hero');
  const indexRef = useRef(0);
  const reducedRef = useRef(false);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const wheelLock = useRef(0);
  const released = useRef(false);
  const leftStage = useRef(false);
  const focusAfterTransition = useRef<'portfolio' | 'next' | null>(null);
  const [phase, setPhase] = useState<Phase>('hero');
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const inCase = !['hero', 'leaving'].includes(phase);
  const settled = phase === 'case';
  const isLastCase = index === cases.length - 1;
  const busy = phase !== 'hero' && phase !== 'case';

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);
  const later = useCallback((fn: () => void, delay: number) => {
    const timer = setTimeout(() => { timers.current.delete(timer); fn(); }, reducedRef.current ? 0 : delay);
    timers.current.add(timer);
  }, []);
  const updatePhase = useCallback((value: Phase) => { phaseRef.current = value; setPhase(value); }, []);

  const goHome = useCallback(() => {
    if (phaseRef.current === 'hero' || phaseRef.current === 'leaving') return;
    clearTimers();
    focusAfterTransition.current = 'portfolio';
    updatePhase('leaving');
    later(() => {
      updatePhase('hero');
    }, 1100);
  }, [clearTimers, later, updatePhase]);

  const enter = useCallback(() => {
    if (phaseRef.current !== 'hero') return;
    released.current = false;
    indexRef.current = 0;
    setIndex(0);
    focusAfterTransition.current = 'next';
    updatePhase('entering');
    later(() => {
      wheelLock.current = Date.now() + 600;
      updatePhase('case');
    }, 1850);
  }, [later, updatePhase]);

  const jumpTo = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    released.current = true;
    leftStage.current = false;
    focusAfterTransition.current = null;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reducedRef.current ? 'instant' : 'smooth', block: 'start' });
  }, []);

  const changeCase = useCallback((direction: number) => {
    if (phaseRef.current === 'hero') { if (direction > 0) enter(); return; }
    if (phaseRef.current !== 'case') return;
    if (direction < 0 && indexRef.current === 0) { goHome(); return; }
    // The gallery is a passage into the portfolio, not an infinite carousel.
    // All forward inputs share this exit, including wheel, touch and keyboard.
    if (direction > 0 && indexRef.current === cases.length - 1) { jumpTo('about'); return; }
    updatePhase('switching');
    later(() => {
      indexRef.current += direction;
      setIndex(indexRef.current);
      updatePhase('arriving');
      later(() => updatePhase('case'), 620);
    }, 320);
  }, [enter, goHome, jumpTo, later, updatePhase]);

  const actions = useRef({ enter, changeCase, goHome });
  actions.current = { enter, changeCase, goHome };

  // Focus only after React has enabled the destination control, and never steal
  // focus from someone who has already chosen to leave the studio.
  useEffect(() => {
    if (phase !== 'hero' && phase !== 'case') return;
    const destination = focusAfterTransition.current;
    focusAfterTransition.current = null;
    const top = stage.current?.getBoundingClientRect().top;
    if (!destination || top === undefined || top < -8 || top > 40 || released.current) return;
    (destination === 'next' ? nextButton : portfolioButton).current?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => {
      reducedRef.current = preference.matches;
      setReduced(preference.matches);
      if (preference.matches) {
        clearTimers();
        updatePhase(['hero', 'leaving'].includes(phaseRef.current) ? 'hero' : 'case');
      }
    };
    syncPreference();
    preference.addEventListener('change', syncPreference);
    let visible = true;
    const syncVisibility = () => setInView(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncVisibility(); }, { threshold: 0.15 });
    observer.observe(root);
    document.addEventListener('visibilitychange', syncVisibility);
    const atStage = () => {
      const bounds = root.getBoundingClientRect();
      return !released.current && bounds.top >= -8 && bounds.top < 40;
    };
    const onScroll = () => {
      const bounds = root.getBoundingClientRect();
      if (bounds.bottom < innerHeight * 0.8) leftStage.current = true;
      if (leftStage.current && bounds.top >= -8 && bounds.top < 40) released.current = false;
    };
    let wheelTravel = 0;
    let lastWheel = 0;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || !atStage() || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      if (phaseRef.current === 'hero' && event.deltaY <= 0) return;
      event.preventDefault();
      if (Date.now() < wheelLock.current) { wheelTravel = 0; return; }
      if (!['hero', 'case'].includes(phaseRef.current)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (Date.now() - lastWheel > 180 || Math.sign(delta) !== Math.sign(wheelTravel)) wheelTravel = 0;
      lastWheel = Date.now();
      wheelTravel += delta;
      if (Math.abs(wheelTravel) < 24) return;
      wheelTravel = 0;
      wheelLock.current = Date.now() + 1200;
      actions.current.changeCase(event.deltaY > 0 ? 1 : -1);
    };
    const key = (event: KeyboardEvent) => {
      if (!atStage() || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'Escape') { actions.current.goHome(); return; }
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable=true]') || ([' ', 'Enter'].includes(event.key) && target.closest('button, a'))) return;
      if (['ArrowDown', 'PageDown', ' ', 'ArrowRight'].includes(event.key)) { event.preventDefault(); actions.current.changeCase(1); }
      if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); actions.current.changeCase(-1); }
    };
    let touch: { x: number; y: number } | null = null;
    const touchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || (event.target as HTMLElement).closest('a, button:not(.lp-screen-hit)')) { touch = null; return; }
      touch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    };
    const touchMove = (event: TouchEvent) => {
      if (!touch || event.touches.length !== 1 || !atStage()) return;
      const dy = touch.y - event.touches[0].clientY;
      const dx = touch.x - event.touches[0].clientX;
      if (phaseRef.current !== 'hero' || dy > 10 || Math.abs(dx) > 10) event.preventDefault();
    };
    const touchEnd = (event: TouchEvent) => {
      if (!touch || !atStage() || !event.changedTouches.length) return;
      const dx = touch.x - event.changedTouches[0].clientX, dy = touch.y - event.changedTouches[0].clientY;
      touch = null;
      const distance = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (Math.abs(distance) >= 40) actions.current.changeCase(distance > 0 ? 1 : -1);
    };
    root.addEventListener('wheel', wheel, { passive: false });
    root.addEventListener('touchstart', touchStart, { passive: true });
    root.addEventListener('touchmove', touchMove, { passive: false });
    root.addEventListener('touchend', touchEnd);
    window.addEventListener('keydown', key);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimers(); observer.disconnect();
      preference.removeEventListener('change', syncPreference);
      document.removeEventListener('visibilitychange', syncVisibility);
      root.removeEventListener('wheel', wheel); root.removeEventListener('touchstart', touchStart);
      root.removeEventListener('touchmove', touchMove); root.removeEventListener('touchend', touchEnd);
      window.removeEventListener('keydown', key); window.removeEventListener('scroll', onScroll);
    };
  }, [clearTimers, updatePhase]);

  const swingBadge = () => {
    if (reduced || motionPaused || phaseRef.current !== 'hero') return;
    badge.current?.animate([
      { transform: 'rotate(0deg)' }, { transform: 'rotate(-7deg)' },
      { transform: 'rotate(4deg)' }, { transform: 'rotate(-2deg)' }, { transform: 'rotate(0deg)' },
    ], { duration: 1400, easing: 'ease-out', composite: 'add' });
  };

  return <section ref={stage} id="home" className="laptop-experience" aria-label="Anouar's interactive portfolio studio"
    data-scene={inCase ? 'case' : 'hero'} data-phase={phase} data-motion-paused={motionPaused || reduced || !inView} aria-busy={busy}>
    <div className="lp-grid" aria-hidden="true" /><div className="lp-warmth" aria-hidden="true" />
    <nav className="lp-navigation" aria-label="Studio navigation"><div><button className="lp-tag" onClick={goHome}>my studio</button><button ref={portfolioButton} className="lp-tag" onClick={enter} disabled={busy} aria-pressed={inCase}>portfolio</button></div><button className="lp-monogram" aria-label="Anouar Ech-Charai, back to studio" onClick={goHome}>a<span>e.</span></button><div><button className="lp-tag lp-about-link" onClick={() => jumpTo('about')}>about me</button><button className="lp-tag lp-contact-link" onClick={() => jumpTo('contact')}>let’s talk</button></div></nav>
    <div className="lp-hero-heading"><span className="lp-overline">ANOUAR ECH-CHARAI · FULL STACK DEVELOPER & DESIGNER</span><h1 id="hero-title">ANOUAR<span>.</span></h1><span className="lp-script">code with a creative soul.</span></div>
    <div className="lp-portrait"><img src="/assets/anouar-developer-hero.webp" width={1254} height={1254} alt="Anouar in a paper collage of creative tools and golden brushstrokes" fetchPriority="high" /></div>
    <div className="lp-studio-note"><span className="lp-note-mark">✳</span><p>A little curiosity.<br />A lot of possibilities.</p><span>BASED IN MOROCCO<br />BUILDING FOR THE WEB.</span></div>
    <div className="lp-lanyard" inert={inCase}><div className="lp-strap"><span>ANOUAR ECH-CHARAI / CREATIVE DEVELOPER /</span></div><div className="lp-clip" /><button ref={badge} className="lp-badge" onPointerEnter={swingBadge} onClick={swingBadge} aria-label="Swing Anouar's developer card"><div className="lp-badge-top"><strong>DEVELOPER<br />CARD</strong><span>2026</span></div><p className="lp-badge-role">CODE / DESIGN / CURIOSITY</p><img src="/assets/anouar-portrait.webp" alt="" width={92} height={112} /><dl><div><dt>NAME</dt><dd>ANOUAR E.</dd></div><div><dt>BASED IN</dt><dd>MOROCCO</dd></div><div><dt>GITHUB</dt><dd>@ANOUAR36</dd></div></dl><span className="lp-badge-barcode" aria-hidden="true" /></button></div>
    <div className="lp-laptop-position"><div className="lp-laptop"><div className="lp-display"><span className="lp-webcam" /><div className="lp-screen"><div className="lp-developer-display"><DeveloperScreen /></div><div className="lp-project-display" aria-hidden={!inCase}><div key={index} className="lp-project-frame"><ProjectPreview index={index} /></div></div><div className="lp-screen-flash" key={`${index}-${inCase}`} /><button className="lp-screen-hit" aria-label={isLastCase ? 'Continue to About Me' : 'Show next project'} onClick={() => changeCase(1)} disabled={!settled} tabIndex={settled ? 0 : -1} /></div><span className="lp-laptop-label">MADE WITH CODE & CARE</span></div><div className="lp-laptop-base"><span /></div><div className="lp-laptop-shadow" /></div></div>
    <div className="lp-case-interface" inert={!inCase} aria-hidden={!inCase}><article className="lp-ticket" key={`ticket-${index}`}><span className="lp-ticket-hole" /><span className="lp-ticket-hole" /><span className="lp-ticket-hole" /><span className="lp-ticket-hole" /><span className="lp-ticket-label">SELECTED WORK</span><h2>{cases[index].label}</h2><div className="lp-ticket-row">{cases[index].type}</div><div className="lp-ticket-row">{cases[index].tags.join(' / ')}</div><span className="lp-ticket-number">{String(index + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}</span></article><div className="lp-case-description" key={`description-${index}`}><span className="lp-case-key">THE IDEA</span><p>{cases[index].description}</p><span className="lp-preview-disclaimer">Illustrative interface preview</span><button onClick={() => jumpTo('projects')} className="lp-details-link">Read the project notes</button></div><div className="lp-case-navigation"><button className="lp-case-button" onClick={() => changeCase(-1)} disabled={busy}><span aria-hidden="true">‹</span>{index === 0 ? 'back to studio' : 'previous project'}</button><div className="lp-case-pagination" aria-hidden="true">{cases.map((project, i) => <span key={project.label} data-active={i === index} />)}</div><button ref={nextButton} className="lp-case-button lp-case-next" onClick={() => changeCase(1)} disabled={busy}><span aria-hidden="true">›</span>{isLastCase ? 'continue to about' : 'next project'}</button></div></div>
    <div className="lp-hero-bottom" inert={inCase}><div className="lp-hero-caption"><span>THOUGHTFUL DESIGN. USEFUL CODE.</span><p>Ideas become experiences.</p></div><button className="lp-scroll-hint" onClick={enter} disabled={busy}><i aria-hidden="true" />scroll into the work</button></div>
    <div className="lp-utilities"><button aria-pressed={motionPaused} onClick={() => setMotionPaused(value => !value)}>{motionPaused ? 'Resume ambient motion' : 'Pause ambient motion'}</button><button onClick={() => jumpTo('about')}>Explore the full portfolio</button></div>
    <p className="lp-sr-only" role="status" aria-live="polite">{phase === 'case' ? `Project ${index + 1} of ${cases.length}: ${cases[index].title}. ${isLastCase ? 'Scroll down or select continue to about to leave the gallery.' : 'Use arrow keys or the next and previous buttons.'}` : phase === 'hero' ? 'Studio view. Select portfolio to explore projects.' : ''}</p>
  </section>;
}
