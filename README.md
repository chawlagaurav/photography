# Dream Box Photography & Films

A cinematic, editorial website for **Dream Box Photography & Films** (Charlston Dsouza, Bandra, Mumbai) — a premium redesign built with Next.js, Tailwind, Framer Motion, GSAP and Lenis.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Structure

```
src/
  app/
    layout.tsx            Fonts, metadata, JSON-LD, global chrome (loader, cursor, nav, footer)
    page.tsx              Homepage — sections 01–08
    about/page.tsx        The studio
    stories/[slug]/       Dynamic story/gallery pages (SSG) + per-story metadata
    sitemap.ts robots.ts manifest.ts   SEO plumbing
    globals.css           Design tokens, grain, cursor, reduced-motion rules
  components/
    sections/   Hero, EditorialStatement, SelectedStories, Collage, Services, Studio, Testimonials, Contact
    layout/     Nav (animated menu), Footer
    motion/     Reveal / RevealText / Stagger, ParallaxImage (clip-mask + parallax)
    ui/         Cursor (magnetic "VIEW STORY"), Magnetic button, Loader (intro), Marquee
    providers/  SmoothScroll (Lenis + cursor context)
  lib/
    content.ts  ⭐ Single source of truth — business info, stories, services, testimonials, images
    hooks.ts    useReducedMotion / useFinePointer
    cursor-context.ts
```

## Swapping in real photographs

**All imagery is referenced through `src/lib/content.ts`.** Replace the `src`
URLs there (`heroImages`, each `story.cover` / `story.gallery`, `services`,
`collage`) with real Dream Box assets — nothing else needs to change. Add a
real wedding film by setting a story's `film` field to a YouTube video id.

Current images are high-quality curated **placeholders** only.

## Authentic client data (from dreamboxphotography.in)

Owner Charlston Dsouza (with Ashwin & Nidhi), Bandra West address, phones
`9930535212` / `7506319011`, email, socials, and the five verbatim
testimonials are all real. The WhatsApp CTA uses the verified primary number
(`+91 9930535212`). The enquiry form composes a prefilled WhatsApp message — no
backend required.

## Motion & accessibility

- `prefers-reduced-motion` disables Lenis, parallax, reveals and the intro.
- The custom cursor and magnetic effects run on fine pointers only (desktop).
- The intro loader shows once per session and has a visible **Skip**.
- Semantic headings, image alt text, LocalBusiness/ProfessionalService JSON-LD,
  Open Graph, sitemap and robots are all in place.
```
