import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Car from './Car'
import Stat from './Stat'
import { STATS } from '../data/stats'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['WELCOME', 'ITZFIZZ']
const DASH_PERIOD = 120 // px, keep in sync with .road-dashes in index.css
const SCROLL_LENGTH = '+=300%' // pinned scroll distance = 3x viewport height

const setCount = (el, n) => {
  el.textContent = String(Math.round(n))
}

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const $ = (sel) => gsap.utils.toArray(sel, el)

    const letters = $('[data-letter]')
    const headline = el.querySelector('[data-headline]')
    const hint = el.querySelector('[data-hint]')
    const stats = $('[data-stat]')
    const counters = $('[data-count]')
    const shifts = $('[data-shift]')
    const carIntro = el.querySelector('[data-car-intro]')
    const carScroll = el.querySelector('[data-car-scroll]')
    const dashes = el.querySelector('[data-dashes]')

    const mm = gsap.matchMedia()

    // Reduced motion: no animation, just show the final content
    mm.add('(prefers-reduced-motion: reduce)', () => {
      counters.forEach((c) => setCount(c, Number(c.dataset.count)))
    })

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 1024px)',
      },
      (ctx) => {
        if (!ctx.conditions.motion) return
        const { desktop } = ctx.conditions

        /* ---------- 1. Intro (time-based, plays once on load) ---------- */
        counters.forEach((c) => setCount(c, 0))

        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro
          .fromTo(
            letters,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.045 },
          )
          .fromTo(
            carIntro,
            { y: '55vh', opacity: 0 },
            { y: 0, opacity: 1, duration: 1.6, ease: 'power4.out' },
            0.3,
          )
          .fromTo(
            stats,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.2 },
            0.9,
          )
          .fromTo(hint, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 2)

        counters.forEach((c, i) => {
          const state = { v: 0 }
          intro.to(
            state,
            {
              v: Number(c.dataset.count),
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => setCount(c, state.v),
            },
            0.9 + i * 0.2,
          )
        })

        /* ---------- 2. Scroll-driven (progress-based, scrubbed) ---------- */
        // scrub: 1.2 = the timeline "chases" the scrollbar over 1.2s,
        // which gives the interpolated, inertial feel instead of 1:1 jitter.
        const scroll = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: SCROLL_LENGTH,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        })

        // Car: weaves left/right, banks into each turn, and grows as it "approaches"
        scroll
          .to(
            carScroll,
            {
              keyframes: {
                x: ['0vw', '-8vw', '8vw', '0vw'],
                rotation: [0, -7, 7, 0],
                easeEach: 'sine.inOut',
              },
              duration: 1,
            },
            0,
          )
          .to(carScroll, { y: '20vh', scale: 1.5, duration: 1, ease: 'power1.inOut' }, 0)

        // Road: dashes slide down in a seamless loop (transform only, no repaint)
        const setDashY = gsap.quickSetter(dashes, 'y', 'px')
        const road = { d: 0 }
        scroll.to(
          road,
          {
            d: DASH_PERIOD * 16,
            duration: 1,
            onUpdate: () => setDashY(road.d % DASH_PERIOD),
          },
          0,
        )

        // Headline: letters spread apart as you drive
        const mid = (letters.length - 1) / 2
        scroll
          .to(letters, { x: (i) => (i - mid) * 7, duration: 1 }, 0)
          .to(headline, { y: '-6vh', duration: 1 }, 0)
          .to(hint, { opacity: 0, duration: 0.08 }, 0)

        // Stats: parallax drift (desktop only, where they sit beside the road)
        if (desktop) {
          shifts.forEach((s) => {
            scroll.to(s, { y: Number(s.dataset.shift), duration: 1 }, 0)
          })
        }
      },
      el,
    )

    return () => mm.revert()
  }, [])

  return (
    <div ref={root} className="relative h-screen w-full overflow-hidden bg-fog">
      {/* Road */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 overflow-hidden bg-asphalt"
        style={{ width: 'var(--road)' }}
      >
        <div className="absolute inset-y-0 left-3 w-1 bg-lane/70" />
        <div className="absolute inset-y-0 right-3 w-1 bg-lane/70" />
        <div
          data-dashes
          className="road-dashes absolute left-1/2 w-1.5 -translate-x-1/2 will-change-transform"
          style={{ top: -DASH_PERIOD, height: `calc(100% + ${DASH_PERIOD * 2}px)` }}
        />
      </div>

      {/* Headline: difference blend keeps it readable on both the light page and the dark road */}
      <h1
        data-headline
        aria-label="Welcome Itzfizz"
        className="absolute inset-x-0 top-[9vh] z-20 flex flex-wrap justify-center gap-x-[1.6em] px-4 font-display text-[clamp(1.1rem,3.4vw,3rem)] font-bold text-white mix-blend-difference"
      >
        {WORDS.map((word) => (
          <span key={word} aria-hidden className="flex">
            {[...word].map((ch, i) => (
              <span
                key={i}
                data-letter
                className="inline-block mr-[0.4em] last:mr-0 will-change-transform"
              >
                {ch}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <p
        data-hint
        className="absolute inset-x-0 top-[17vh] z-10 text-center text-sm text-ink/60 lg:top-[19vh]"
      >
        Scroll to drive
      </p>

      {/* Car: outer wrapper = intro, inner = scroll (separate elements, no GSAP conflicts) */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] z-10 -translate-x-1/2 -translate-y-1/2 lg:top-1/2">
        <div data-car-intro className="will-change-transform">
          <div
            data-car-scroll
            className="w-[clamp(84px,11vw,150px)] will-change-transform"
          >
            <Car />
          </div>
        </div>
      </div>

      {/* Stats: 2x2 under the car on mobile, split either side of the road on desktop */}
      <div className="absolute inset-x-0 bottom-[6vh] z-10 grid grid-cols-2 gap-x-6 gap-y-8 px-6 lg:inset-y-0 lg:bottom-auto lg:grid-cols-[1fr_var(--road)_1fr] lg:items-center lg:gap-x-0 lg:px-[6vw]">
        <div className="contents lg:flex lg:flex-col lg:items-start lg:gap-[14vh]">
          {STATS.slice(0, 2).map((s) => (
            <Stat key={s.value} {...s} />
          ))}
        </div>
        <div className="hidden lg:block" aria-hidden />
        <div className="contents lg:flex lg:flex-col lg:items-end lg:gap-[14vh]">
          {STATS.slice(2).map((s) => (
            <Stat key={s.value} {...s} align="right" />
          ))}
        </div>
      </div>
    </div>
  )
}
