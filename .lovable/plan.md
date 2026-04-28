
# Aman Gairola — Premium Developer Portfolio

A modern, single-page portfolio that positions Aman as a strong Full Stack / Software Engineer candidate. Dark-first design with a neon accent (electric cyan + violet), respecting the visitor's system theme preference, with a manual toggle.

## Visual Direction

- **Palette:** Deep slate background (`#0A0F1C`), elevated surfaces (`#0F172A`), neon cyan primary (`#22D3EE`), violet secondary (`#A855F7`), soft white text. Light mode mirrors with off-white + same accents.
- **Typography:** Space Grotesk for headings (geometric, modern), Inter for body, JetBrains Mono for code/labels.
- **Motion:** Scroll reveals (fade + slide up), section parallax, animated gradient blobs in hero, typing effect for the role line, animated counters, hover lift on cards, subtle glow on accent buttons.
- **Cursor effect:** Soft spotlight that follows the cursor in hero and project cards (disabled on touch devices).
- **Micro-details:** Faint grid/noise texture, gradient borders on featured cards, neon ring on focused inputs.

## Sections (single page, sticky navbar)

**Sticky Navbar** — logo "AG", links (About, Skills, Projects, Experience, Achievements, Contact), theme toggle, "Resume" button. Smooth scroll, active-section highlight, mobile hamburger.

**1. Hero**
- Name: Aman Gairola
- Typing headline cycling: "Full Stack Developer", "MERN Specialist", "Software Engineer"
- One-liner: "I build fast, scalable web products — from real-time collaborative tools to gamified platforms used by hundreds."
- Quick meta row: Dehradun, India · Open to opportunities · B.Tech CSE '26
- CTAs: **View Projects** (primary neon), **Download Resume** (outline), **Contact Me** (ghost)
- Floating stat chips: "300+ LeetCode" · "3 Full-Stack Projects" · "Sub-200ms realtime latency"
- Animated gradient blobs + grid backdrop

**2. About**
- Rewritten professional summary: CSE undergrad at Shivalik College of Engineering (CGPA 7.0), Diploma in IT with Distinction (CGPA 9.0). Full-stack engineer focused on the MERN stack, real-time systems, and clean DX. Ex-intern at VerveGen Tech where shipped components cut delivery time by 2 weeks and lifted Lighthouse by 30 points.
- Side column: "What I value" (Performance, Clean Architecture, Product Thinking, Continuous Learning).

**3. Skills** — categorized animated cards with icons (lucide + simple-icons via CDN-free SVG):
- Languages: Java, JavaScript (ES6+), TypeScript, C++, SQL, HTML5, CSS3
- Frontend: React.js, Redux, Tailwind CSS, Material-UI, Responsive Design
- Backend: Node.js, Express.js, REST APIs, WebSockets, Socket.io, JWT
- Databases: MongoDB, Firebase, MySQL, PostgreSQL
- Tools: Git, GitHub, Docker, Postman, Vercel, Render, CI/CD
- Core CS: DSA, OOP, System Design, TDD, Agile

Each category is a glass card with a gradient border, icon grid, and a subtle hover tilt.

**4. Projects** (most prominent — 3 large feature cards, "strongest first")
1. **Tracker.io** — Gamified DSA Progress Tracker (MERN, OAuth 2.0, JWT)
2. **Collabb** — Real-Time Collaborative Code Editor (React, Node, Socket.io)
3. **Folyo** — Full-Stack Blog Platform (MERN, JWT, GitHub Actions)

Each card shows: name, one-line tagline, description, tech badges, "Key Features" bullets, "Challenges Solved" bullets, **Live Demo** + **GitHub** buttons, hover spotlight.

**5. Experience** — vertical timeline
- Software Engineering Intern · VerveGen Tech Pvt Ltd · Jun–Aug 2023 · Dehradun
  - Bullets from resume with metric highlights (40% reusability, 25% faster loads, +30 Lighthouse).

**6. Achievements** — animated counter grid + cards
- 300+ LeetCode problems solved (counter)
- 50+ GeeksforGeeks accepted solutions (counter)
- Coursera DSA in Java specialization (badge)
- Academic: Diploma Distinction 9.0 CGPA (badge)
- Buttons linking to LeetCode + GitHub profiles

**7. Contact**
- Left: heading "Let's build something great." + email, location, LinkedIn link (https://www.linkedin.com/in/aman-gairola-8ba2a7244), GitHub link, Resume download.
- Right: contact form (Name, Email, Message). On submit, opens visitor's mail client via `mailto:amngairola@gmail.com` with prefilled subject + body. No backend.

**Footer:** "Built by Aman Gairola · © 2026" + social icons + back-to-top.

## Advanced Features

- Sticky navbar with scroll-spy active link
- Smooth scrolling between anchors
- Scroll-reveal via IntersectionObserver
- Typing effect in hero
- Animated counters (achievements)
- Subtle cursor spotlight (hero + project cards, desktop only)
- Theme: respects system preference on first load, manual toggle persists in localStorage
- SEO: meta title, description, Open Graph + Twitter card tags, semantic landmarks, JSON-LD Person schema
- Performance: single page, Vite-bundled, lazy section reveals, no heavy libraries beyond what's already in the project

## Technical Notes

- **Stack:** React 18 + Vite + Tailwind + TypeScript (existing project setup).
- **Design tokens:** Update `src/index.css` (HSL custom properties for both `:root` and `.dark`) and `tailwind.config.ts` to add neon accents, fonts, and keyframes (typing, blob float, marquee, glow).
- **Theme:** Lightweight ThemeProvider; on mount read `prefers-color-scheme` if no stored value, toggle adds/removes `.dark` on `<html>`.
- **Routing:** Single-page sections under `/`, anchor IDs for scroll. `Index.tsx` becomes the portfolio composition.
- **Components:** `Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Achievements`, `Contact`, `Footer`, plus `ThemeToggle`, `SectionHeading`, `ProjectCard`, `SkillCategory`, `Counter`, `TypingText`, `CursorSpotlight`.
- **Resume file:** Placed at `public/AmanGairola_Resume.pdf` so the Download button serves the actual file.
- **Fonts:** Loaded via Google Fonts in `index.html` (Inter, Space Grotesk, JetBrains Mono).
- **Icons:** `lucide-react` (already available) + inline SVGs for tech logos to avoid extra deps.
- **Project links:** GitHub/Live buttons currently point to `#` placeholders — you'll share the real URLs and they'll be wired in (or you can edit `projects.ts` directly).

## What I'll Need From You After Approval

- The actual GitHub repo URL and live demo URL for Tracker.io, Collabb, and Folyo (or I'll leave `#` placeholders you can replace).
- Confirm the resume PDF filename to expose for download (will use the uploaded one).
