export const personal = {
  name: "Aman Gairola",
  initials: "AG",
  location: "Dehradun, India",
  email: "amngairola@gmail.com",
  phone: "+91-9068487652",
  linkedin: "https://www.linkedin.com/in/aman-gairola-8ba2a7244",
  github: "https://github.com/amngairola",
  leetcode: "https://leetcode.com/amngairola",
  resumeUrl: "/AmanGairola_Resume.pdf",
  roles: ["Full Stack Developer", "MERN Specialist", "Software Engineer"],
  tagline:
    "I build fast, scalable web products — from real-time collaborative tools to gamified platforms used by hundreds.",
};

export const about = {
  summary:
    "Computer Science undergrad at Shivalik College of Engineering and a Diploma holder in IT with Distinction. I focus on building production-grade full-stack applications with the MERN stack, real-time systems, and meticulous attention to performance and developer experience.",
  highlight:
    "As a Software Engineering Intern at VerveGen Tech, I shipped 15+ reusable React components, accelerated feature delivery by two weeks, and improved Lighthouse performance by 30 points.",
  values: [
    { title: "Performance First", desc: "Lazy loading, bundle hygiene, sub-200ms experiences." },
    { title: "Clean Architecture", desc: "Modular code, clear boundaries, scalable patterns." },
    { title: "Product Thinking", desc: "Frictionless onboarding and PLG-driven design." },
    { title: "Always Learning", desc: "300+ DSA problems, OSS contributions, new stacks." },
  ],
};

export const skills = [
  {
    category: "Languages",
    items: ["Java", "JavaScript (ES6+)", "TypeScript", "C++", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Redux", "Tailwind CSS", "Material-UI", "Responsive Design"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "Socket.io", "JWT Auth"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "Firebase", "MySQL", "PostgreSQL"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Docker", "Postman", "Vercel", "Render", "CI/CD"],
  },
  {
    category: "Core CS",
    items: ["DSA", "OOP", "System Design", "TDD", "Agile"],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  features: string[];
  challenges: string[];
  github: string;
  live: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Collabb",
    tagline: "Real-Time Collaborative Code Editor",
    description:
      "Production-grade real-time collaborative code editor. Architected for low-latency multi-user synchronization, optimized React rendering, and scalable WebSocket communication.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Monaco Editor"],
    features: [
      "~60% reduction in unnecessary re-renders via React.memo + useMemo + useCallback",
      "<50ms average Socket.io event round-trip latency",
      "10+ concurrent users supported per room",
      "Room lifecycle (join → sync → disconnect → cleanup) completes in <200ms",
      "Debounced Monaco editor handlers prevent event flooding under rapid input",
    ],
    challenges: [
      "Optimized Socket.io event flow — reduced unnecessary broadcasts and network traffic",
      "Eliminated ~60% redundant re-renders during live typing via memoization",
      "Fixed Monaco cursor stability, flickering and input lag under rapid input",
      "Room-based isolated event scoping — prevents global event pollution",
      "Cleaner socket lifecycle — no memory leaks or stale handlers",
      "Roadmap: CRDT/Yjs, live cursors, presence, AI assistant, shared terminal, multi-file",
    ],
    github: "https://github.com/amngairola/code-editor",
    live: "https://collabb.vercel.app",
    featured: true,
  },
  {
    name: "Task Management System",
    tagline: "Full Stack Project Management Platform",
    description:
      "SaaS-inspired full-stack project management platform with role-based access control, analytics dashboard, and performance-first React frontend engineering.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "TanStack Query", "JWT"],
    features: [
      "~45% fewer redundant API calls via TanStack Query caching + background refetch",
      "~70% reduction in live search API calls via 300ms debounced input",
      "6+ routes code-split via React.lazy + Suspense — reduced initial bundle size",
      "Skeleton loaders across all data-heavy views — zero layout shift on data arrival",
      "Dual-role UI (Admin / Member) rendered dynamically from JWT-decoded role claim",
    ],
    challenges: [
      "Multi-role SaaS dashboard with JWT-decoded role rendering & protected routes",
      "TanStack Query for server state — auto invalidation, background sync, SWR",
      "300ms debounced search reducing live API requests ~70%",
      "React.lazy + Suspense route-level code splitting across 6+ views",
      "Reusable library: DataTable, StatCard, TaskBadge, RoleBadge, ProtectedRoute",
      "Secure auth: JWT issue → refresh rotation → HTTP-only cookie → Axios silent re-auth",
    ],
    github: "#",
    live: "https://taskm-amangairola.vercel.app",
  },
  {
    name: "Tracker.io",
    tagline: "Gamified DSA Progress Tracker",
    description:
      "Gamified DSA progress tracker with GitHub-style activity heatmap, hybrid JWT + OAuth 2.0 authentication, client-side memoization, and streak-based engagement.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "OAuth 2.0", "React Context API"],
    features: [
      "~40% reduction in redundant API calls via memoization + DSA sheet response caching",
      "Hybrid auth: JWT (email/password) + Google OAuth 2.0 — dual-path login",
      "HTTP-only cookies + Axios interceptors handle token refresh silently",
      "Lazy-loaded routes + skeleton screens reduce initial TTI significantly",
      "Guest → Authenticated state transition via React Context — zero page reload",
    ],
    challenges: [
      "Client-side memoization + caching cut ~40% redundant API calls on revisit",
      "React Suspense + skeleton screens for progressive content loading",
      "Hybrid JWT access/refresh rotation via custom Axios interceptors + HTTP-only cookies",
      "Seamless Guest → Authenticated transitions via React Context, no reloads",
      "Google OAuth 2.0 alongside email/password — unified session management",
      "GitHub-style heatmap rendering 365-day contribution data",
      "Reusable: StreakCard, HeatmapGrid, ChallengeRow, ProgressBar",
    ],
    github: "https://github.com/amngairola/Trackr.io",
    live: "https://trackr-io.vercel.app",
  },
  {
    name: "Yap",
    tagline: "Real-Time Messaging Platform",
    description:
      "Real-time messaging platform with low-latency WebSocket communication, live presence tracking, optimized media sharing via Cloudinary, and persistent chat history.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Cloudinary", "JWT"],
    features: [
      "Sub-100ms message delivery via Socket.io",
      "Live online/offline presence updates via socket events — zero polling",
      "Cloudinary CDN integration for optimized image delivery",
      "Real-time UI state sync — new messages append without manual refresh",
      "JWT-secured API with HTTP-only cookie session management",
    ],
    challenges: [
      "Responsive chat UI with smooth real-time message append",
      "Live presence system via Socket.io events — zero polling overhead",
      "Conversation list with unread indicators and real-time count updates",
      "Cloudinary media uploads with CDN-optimized delivery",
      "Real-time state updates without UI jank",
      "Reusable: MessageBubble, ConversationItem, PresenceDot, MediaPreview",
    ],
    github: "https://github.com/amngairola/yap",
    live: "https://yapiing.vercel.app",
  },
];

export const experience = [
  {
    role: "Software Engineering Intern",
    company: "VerveGen Tech Pvt Ltd",
    location: "Dehradun, India",
    period: "Jun 2023 – Aug 2023",
    bullets: [
      "Engineered 15+ modular, reusable React.js components with ES6+ and Tailwind CSS, boosting code reusability by 40% and accelerating feature delivery by 2 weeks across multiple sprints.",
      "Optimized front-end performance via strategic refactoring, lazy loading, and bundle size reduction — achieving 25% faster initial page loads and a 30-point Lighthouse score improvement.",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Shivalik College of Engineering, Dehradun",
    period: "Expected May 2026",
    grade: "CGPA 7.0 / 10",
  },
  {
    degree: "Diploma in Information Technology",
    school: "Government Polytechnic Gauchar, Uttarakhand",
    period: "Jun 2020 – May 2023",
    grade: "CGPA 9.0 / 10 (Distinction)",
  },
];

export const achievements = [
  { value: 500, suffix: "+", label: "DSA Problems Solved" },
  { value: 1761, suffix: "", label: "LeetCode Contest Rating" },
  { value: 21, suffix: "", label: "Contests Attended" },
  { value: 9, suffix: ".7%", label: "Top Global Percentile" },
];

export const certifications = [
  {
    title: "Data Structures & Algorithms in Java",
    issuer: "Coursera Specialization",
    desc: "Hands-on implementation of core algorithms and data structures.",
  },
  {
    title: "Diploma in IT — Distinction",
    issuer: "Government Polytechnic Gauchar",
    desc: "Graduated with 9.0 CGPA, top of academic cohort.",
  },
];
