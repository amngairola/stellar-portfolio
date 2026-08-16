export const personal = {
  name: "Aman Gairola",
  initials: "AG",
  location: "Dehradun, India",
  email: "amngairola@gmail.com",
  phone: "+91-9068487652",
  linkedin: "https://www.linkedin.com/in/aman-gairola-8ba2a7244",
  github: "https://github.com/amngairola",
  leetcode: "https://leetcode.com/u/amangairola/",
  resumeUrl:
    "https://drive.google.com/file/d/1FgC_hTxQFHcDLgBMljTvcKrmz5mJ6i_Q/view?usp=sharing",
 roles: [
  "Full Stack Developer",
  "I Think in Products, Not Just Code",
  "Turning Ideas Into Interfaces",
  "Software Engineer Who Ships",
],
  tagline:
    "I solve product problems with thoughtful engineerin",
  x: "Aman Gairola",
  xUrl: "https://x.com/amanngairola",
};

export const about = {
  summary:
    "I don't chase trendy tech — I solve problems with thoughtful engineering. Currently deep in full-stack JavaScript, always learning what's underneath it — systems, data, and the trade-offs that don't show up in a tutorial.",
  
  highlight:
    "As a Software Engineering Intern, I built a reusable component system that cut feature delivery time by two weeks and improved Lighthouse scores by 30 points.\n\nSince then, I've built and shipped 5+ systems end-to-end — from a real-time collaborative code editor to a hyperlocal delivery platform with live booking sync — handling data models, Socket.io, auth, deployment, and CI/CD along the way.\n\nI'm strongest in full-stack JavaScript, but I'm most interested in what happens underneath the stack: how systems are structured, how data moves between them, and where they break under real usage.",
  stats: [
    { value: "5+", label: "Production apps shipped" },
    { value: "300+", label: "DSA problems solved" },
    { value: "1761", label: "LeetCode rating" },
    { value: "+30pt", label: "Lighthouse improvement" },
  ],
  values: [
     {
      title: "Performance is a feature",
      desc: "Speed is part of the product, not a final optimization. Efficient rendering, lean bundles, caching, and fast APIs belong in the architecture from day one.",
    },
    {
      title: "Build for the next version",
      desc: "I avoid solving today's problem in a way that creates tomorrow's rewrite. Data models and system boundaries should leave room for more features, users, and load.",
    },
    {
      title: "Engineering serves the product",
      desc: "Good engineering starts with understanding what the product needs: clear user flows, useful abstractions, and the simplest system that solves the actual problem.",
    },
    {
      title: "Learn from the internals",
      desc: "I don't just want to use a technology, I want to understand what's underneath it. I explore runtimes, databases, networking, and system design to keep getting better.",
    },
  ],
};

export const skills = [
  {
    category: "Languages",
    items: [
      "Java",
      "JavaScript (ES6+)",
      "TypeScript",
      "C++",
      "SQL",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "Redux",
      "Tailwind CSS",
      "Material-UI",
      "Responsive Design",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets",
      "Socket.io",
      "JWT Auth",
    ],
  },
  {
    category: "Databases",
    items: ["MongoDB", "Firebase", "MySQL", "PostgreSQL" ,"supabase"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Docker", "Postman", "Vercel", "Render", "CI/CD"],
  },
  {
    category: "Core CS",
    items: ["DSA", "OOP", "System Design","Computer Networks", "TDD", "Agile"],
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
    name: "QuickDrop",
    tagline: "On-Demand Local Delivery & Ride Booking Platform",
    description:
      "A full-stack location-based booking platform that lets users instantly book local rides and delivery services. Features real-time booking management, distance-based fare estimation, live status tracking, Google Authentication, and a dedicated admin dashboard for operational monitoring.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "Framer Motion",
      "Recharts",
      "Supabase Auth",
      "Supabase Postgres",
      "Supabase Realtime",
      "Google OAuth",
      "Vercel",
    ],
    features: [
      "Google OAuth authentication with persistent sessions",
      "Distance-based automated fare estimation & live status tracking",
      "Role-based admin dashboard with revenue analytics and booking trends",
      "Real-time booking notifications and live dashboard sync via Supabase Realtime",
    ],
    challenges: [
      "Implemented Supabase Realtime subscriptions for instant booking updates without page refresh",
      "Built secure role-based admin authorization using database-driven route protection",
      "Designed distance-based pricing engine for automated fare calculation",
      "Integrated Google OAuth with Supabase Auth for secure, persistent user sessions",
      "Used React Query for caching, optimistic updates, and efficient API state management",
    ],
    github: "https://github.com/amngairola/admin-dashboard-Quick-drop",
    live: "https://rebaaar.vercel.app",
    featured: true,
  },
  {
    name: "Task Management System",
    tagline: "Full Stack Project Management Platform",
    description:
      "SaaS-inspired full-stack project management platform with role-based access control, analytics dashboard, and performance-first React frontend engineering.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "TanStack Query",
      "JWT",
    ],
    features: [
      "~45% fewer redundant API calls via TanStack Query caching + background refetch",
      "~70% reduction in live search API calls via 300ms debounced input",
      "6+ routes code-split via React.lazy + Suspense",
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
    name: "Collabb",
    tagline: "Real-Time Collaborative Code Editor",
    description:
      "Production-grade real-time collaborative code editor. Architected for low-latency multi-user synchronization, optimized React rendering, and scalable WebSocket communication.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Monaco Editor",
    ],
    features: [
      "~60% reduction in unnecessary re-renders via React.memo + useMemo + useCallback",
      "<50ms average Socket.io event round-trip latency",
      "10+ concurrent users supported per room",
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
  },
  {
    name: "Tracker.io",
    tagline: "Gamified DSA Progress Tracker",
    description:
      "Gamified DSA progress tracker with GitHub-style activity heatmap, hybrid JWT + OAuth 2.0 authentication, client-side memoization, and streak-based engagement.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "OAuth 2.0",
      "React Context API",
    ],
    features: [
      "~40% reduction in redundant API calls via memoization + caching",
      "Hybrid auth: JWT (email/password) + Google OAuth 2.0",
      "HTTP-only cookies + Axios interceptors handle token refresh silently",
      "GitHub-style activity heatmap with streak-based engagement",
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
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Cloudinary",
      "JWT",
    ],
    features: [
      "Sub-100ms message delivery via Socket.io",
      "Live online/offline presence updates via socket events — zero polling",
      "Cloudinary CDN integration for optimized image delivery",
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
    role: "Software Engineering Intern — Frontend",
    company: "VerveGen Tech Pvt Ltd",
    location: "Dehradun, India",
    period: "Jun 2023 – Aug 2023",
    bullets: [
      "Engineered 15+ modular React.js components using ES6+, custom hooks, and Tailwind CSS — improving code reusability by 40% and cutting feature delivery time by 2 weeks across sprints.",
      "Optimised frontend performance through lazy loading, code splitting, and bundle size reduction — achieving 25% faster initial load times and a 30-point Lighthouse score improvement.",
      "Architected a shared component library adopted across 3 product modules, standardising UI patterns and reducing design inconsistency.",
      "Collaborated with designers to translate Figma mockups into pixel-perfect, responsive interfaces with cross-browser compatibility.",
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
