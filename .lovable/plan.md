## Overview

Re-theme the portfolio to a premium, non-generic dark palette, restructure the single scroll into 5 chapter pages with animated navigation, and expand the photography gallery with 6 new Uttarakhand shots. All existing resume/project/blog content and functionality stays intact.

---

## 1. New color system

Replace the current cyan (`187 92%`) + violet (`270 91%`) gradient system with a warm, intentional palette. Proposed default (final tokens confirmed at implementation):

- Background: deep espresso-ink `hsl(30 8% 7%)` (warm, not #000)
- Surface: `hsl(30 8% 10%)`
- Surface elevated: `hsl(30 8% 13%)`
- Border: `hsl(30 8% 18%)`
- Muted text: `hsl(35 10% 65%)`
- Foreground: warm off-white `hsl(35 20% 92%)` (no pure #fff)
- Accent (primary): warm amber/ochre `hsl(35 75% 58%)`
- Accent hover/glow: `hsl(35 85% 68%)`
- No secondary purple — the old `--secondary` becomes a muted warm tone used only for chips.

Changes:
- Rewrite `:root` and `.dark` tokens in `src/index.css`; retire `--primary-glow` gradient into a subtle amber-only gradient (`linear-gradient(135deg, accent, accent-hover)`).
- Soften `--shadow-glow` (drop the neon halo, use a low-opacity warm shadow).
- Sweep components for any hardcoded blue/purple/cyan classes or inline colors and retint. Prose editorial and code block colors updated to the new accent.
- Light mode preserved but re-tinted to a cream/paper base with the same amber accent, so the toggle still works.

## 2. Component libraries

- Continue using shadcn/ui components already installed; the retheme happens entirely via CSS variables and `tailwind.config.ts` — no visual "default shadcn" leftovers.
- Add one Aceternity/Magic-UI style effect on Hero only (spotlight + animated gradient border on the browser mockup), reimplemented locally with the amber accent (no library neon defaults). One additional subtle "shine on hover" card treatment on the Projects list. Everything else stays as-is.

## 3. Page structure — 5 chapter pages

Break `src/pages/Index.tsx` into 5 routed pages using existing section components:

```text
/                → Home (Hero) + About
/work            → Skills + Projects + CompetitiveProgramming (LeetCode)
/journey         → Experience + Education + Achievements + Freelance
/lens            → Photography (expanded gallery)
/contact         → Contact + Footer socials
```

Routing:
- `src/App.tsx`: add the 5 routes, keep existing `/blogs*` routes and `NotFound`.
- `Navbar.tsx`: replace section-scroll buttons with `NavLink`s to the 5 pages + Blogs. Active state uses amber underline. Mobile menu updated accordingly.
- New `ChapterLayout` wrapper: renders `<Navbar/>`, `<Outlet/>` inside an `AnimatePresence` fade/slide transition (framer-motion is already available via shadcn deps; if not, install it), plus the floating next-page pill and page indicator.
- Floating pill (bottom-right, fixed): shows next chapter name — e.g. on `/work` → `Journey →`. On `/contact` wraps to `Home →`. Uses accent color, pill-shaped, subtle shadow.
- Page indicator: small `3 / 5` counter with 5 dots to the left of the pill; current dot filled amber.
- Keyboard: `ArrowRight` / `ArrowLeft` navigate between chapters. Touch swipe (left/right) on mobile via a lightweight pointer handler. Skipped inside inputs and the blog reader.
- Blogs pages keep their own layout but the Navbar still shows.

## 4. Hobbies (Lens) page — expanded gallery

- Keep the current cinematic carousel as the hero of the page.
- Add a new masonry/staggered grid below it with all 12 photos (6 existing + 6 new Uttarakhand URLs), styled as shadcn `Card`s with rounded corners, hover lift, and staggered fade-in on scroll.
- Short intro copy tying it to Uttarakhand/where I'm from ("Frames from home — Uttarakhand and beyond").
- Lightbox remains functional for both carousel and grid.

## 5. General

- Audit and retint every gradient, glow, ring, and border referencing the old cyan/violet in: `Hero`, `Projects`, `Freelance`, `Achievements`, `CompetitiveProgramming`, `About`, `BrowserMockup`, `Photography`, blog pages.
- Animations kept but re-tinted: no default neon glow.
- Update `index.html` theme-color meta to the new background hex.

---

## Technical notes

- Framer Motion for page transitions and pill/indicator animations. If not already installed, add `framer-motion`.
- No database, no auth, no content changes. Resume URL, blog table, Supabase client untouched.
- `useReveal` hook reused for grid stagger; ChapterLayout mounts once so scroll reveals still fire per route via a `key={pathname}` on the motion wrapper.
- Accessibility: pill has `aria-label`, dots have `aria-current`, keyboard nav ignores modifier keys and typing contexts.

## Out of scope

- No copy/content rewrites beyond the tiny Lens intro line.
- No changes to Supabase schema, blogs, or SEO JSON-LD beyond retinting.
