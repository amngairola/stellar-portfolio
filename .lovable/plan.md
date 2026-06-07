## Goal

Mirror the Karigari-style live browser preview (auto-rotating iframe inside a macOS browser frame) and add a similar live preview to each project card.

## 1. New shared component: `BrowserMockup`

Create `src/components/portfolio/BrowserMockup.tsx`:

- macOS-style chrome: 3 traffic-light dots + URL pill in title bar.
- Body: `aspect-[16/10]`, renders one or more `<iframe>`s stacked absolutely with opacity crossfade (700ms).
- Props:
  - `sites: { url: string; src: string; label: string }[]`
  - `interval?: number` (default 5000) — only auto-rotates when `sites.length > 1`.
  - `showLabelBadge?: boolean` (default true).
- Iframes use `loading="lazy"`, `pointer-events: none`, `title={label}`.
- Styling matches existing portfolio design tokens (`border-border`, `bg-card`, `glass`, `shadow-glow`, gradient blur halo behind), so it visually fits the dark/neon theme — no changes to design system.

## 2. Hero — add rotating preview on the right

Edit `src/components/portfolio/Hero.tsx`:

- Wrap existing hero content in a `lg:grid-cols-12` grid.
  - Left column `lg:col-span-7`: current intro (badge, name, TypingText, tagline, location, buttons, stats) — unchanged content.
  - Right column `lg:col-span-5`: `<BrowserMockup sites={heroSites} />` cycling through all 4 projects' live URLs every 5s.
- Add a small floating "Live preview" pill (similar to Karigari's "Avg. delivery 7 days" chip) showing the current project name.
- On mobile (`<lg`), the preview stacks below intro and remains visible.

`heroSites` derived from `projects` in `src/data/portfolio.ts` (name → label, live → src/url) — no data file changes needed.

## 3. Per-project preview inside `Projects.tsx`

Edit `src/components/portfolio/Projects.tsx`:

- Replace the existing right-side 2-column grid (Key Features + Challenges) layout slightly:
  - Top of right column (`lg:col-span-7`): add a `<BrowserMockup sites={[{ url, src: project.live, label: project.name }]} />` (single-site, no rotation) showing that project live.
  - Below it: keep the existing Key Features + Challenges cards exactly as they are (same styling, same content, same spacing rhythm).
- No changes to project data, tags, buttons, or animations.

## 4. Notes / constraints

- Iframes embed the live Vercel URLs already in `portfolio.ts`. Some sites may set `X-Frame-Options: DENY` and fail to render — in that case the frame shows blank. We'll keep `loading="lazy"` and a subtle background so blank states look intentional. If any project blocks embedding, we can later swap in a static screenshot.
- No design system, token, color, font, or animation changes. Only adds the new component + grid wrappers.
- No new dependencies.

## Files

- Add: `src/components/portfolio/BrowserMockup.tsx`
- Edit: `src/components/portfolio/Hero.tsx`
- Edit: `src/components/portfolio/Projects.tsx`
