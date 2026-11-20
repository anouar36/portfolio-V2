'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Progressive enhancement: the server-rendered page stays visible without JS. */
export function PortfolioChoreography() {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || !progress.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      let disposed = false;
      let refreshFrame = 0;
      const entrances: { element: HTMLElement; tween: gsap.core.Tween }[] = [];
      const refresh = () => {
        if (disposed || refreshFrame) return;
        refreshFrame = requestAnimationFrame(() => {
          refreshFrame = 0;
          ScrollTrigger.refresh();
        });
      };

      const groups = [
        '.capabilities > div', '.about .polaroid, .about .about-copy > h2, .about .idea-note',
        '.skills', '.journey > .paper', '.projects', '.studio > div', '.philosophy',
        '.personal-editorial', '.contact-copy', '.contact-workspace', '.contact-inline',
      ];

      groups.forEach(selector => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((element, index) => {
          // Content already in view remains in place, including hash-link targets.
          if (element.getBoundingClientRect().top < window.innerHeight * 0.94) return;
          const tween = gsap.fromTo(element, { y: 22, opacity: 0.4 }, {
            y: 0, opacity: 1, duration: 0.7, delay: Math.min(index * 0.08, 0.24),
            ease: 'power2.out', clearProps: 'transform,opacity',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          });
          entrances.push({ element, tween });
        });
      });

      gsap.fromTo(progress.current, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.2, invalidateOnRefresh: true },
      });

      // Keyboard navigation must never wait for an entrance animation.
      const finishFocused = (event: FocusEvent) => {
        if (!(event.target instanceof Node)) return;
        entrances.forEach(({ element, tween }) => {
          if (element.contains(event.target as Node)) {
            tween.progress(1);
            tween.scrollTrigger?.kill();
          }
        });
      };
      main.addEventListener('focusin', finishFocused);
      main.addEventListener('load', refresh, true);
      const resizeObserver = new ResizeObserver(refresh);
      resizeObserver.observe(main);
      void document.fonts.ready.then(refresh);
      refresh();

      return () => {
        disposed = true;
        cancelAnimationFrame(refreshFrame);
        resizeObserver.disconnect();
        main.removeEventListener('focusin', finishFocused);
        main.removeEventListener('load', refresh, true);
      };
    });

    return () => media.revert();
  }, []);

  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
