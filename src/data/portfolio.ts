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
    name: "Collabb V2",
    tagline: "Real-Time Collaborative Code Editor",
    description:
      "Production-oriented real-time collaborative code editor focused on low-latency multi-user coding, frontend performance, and scalable event-driven architecture — inspired by Google Docs, Replit Multiplayer, and VS Code Live Share.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Monaco Editor"],
    features: [
      "Room-based collaboration for isolated real-time synchronization",
      "Optimized Socket.io event flow to cut network traffic and sync delays",
      "Monaco Editor tuning for smoother editing and stable cursors",
      "React.memo, useMemo, useCallback to eliminate re-renders in active sessions",
      "Scalable session lifecycle: join, disconnect, reconnect, room cleanup",
    ],
    challenges: [
      "Real-time systems engineering & WebSocket architecture",
      "Frontend performance optimization under rapid typing",
      "Roadmap: CRDT/Yjs, live cursors, presence, AI assistant, shared terminal",
    ],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    name: "Task Management System",
    tagline: "Full Stack Project Management Platform",
    description:
      "A modern SaaS-inspired task and project management platform for collaborative team workflows, with role-based dashboards for admins and team members, project analytics, and production-grade React architecture.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "TanStack Query", "JWT"],
    features: [
      "Responsive SaaS dashboards with role-based UI rendering",
      "TanStack Query caching, background refetch & auto invalidation",
      "React Suspense + lazy loading + skeleton loaders for perceived speed",
      "Debounced search and reusable API layer for task discovery",
      "Protected routes with JWT auth & role-based authorization",
    ],
    challenges: [
      "Designed scalable, reusable component architecture",
      "Reduced redundant API calls via intelligent server-state management",
      "Suspense-based code splitting for leaner bundles",
    ],
    github: "#",
    live: "#",
  },
  {
    name: "Tracker.io",
    tagline: "Gamified DSA Progress Tracker",
    description:
      "A gamified learning platform that helps users track DSA progress, maintain coding consistency, and visualize growth through structured challenge tracking, hybrid auth, and performance-first React engineering.",
    stack: ["MERN", "JWT", "OAuth 2.0", "React Context API"],
    features: [
      "Client-side memoization & caching cut redundant API calls",
      "Route-based code splitting with React Suspense & lazy loading",
      "Reusable dashboard components for analytics & progress",
      "Skeleton loading states for improved perceived performance",
      "Seamless Guest → Authenticated transitions via React Context",
    ],
    challenges: [
      "Hybrid JWT with refresh token rotation & HTTP-Only cookies",
      "Axios interceptors for secure session persistence",
      "OAuth integration with stable, reload-free auth flow",
    ],
    github: "#",
    live: "#",
  },
  {
    name: "Yap",
    tagline: "Real-Time Messaging Platform",
    description:
      "A real-time messaging application delivering low-latency communication with live presence tracking, media sharing via Cloudinary, and secure JWT-based authentication.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Cloudinary"],
    features: [
      "Real-time messaging with live online/offline presence",
      "Persistent chat history & responsive chat UI",
      "Media upload & sharing through Cloudinary integration",
      "Smooth conversation workflows & reusable chat components",
      "Secure JWT authentication & session handling",
    ],
    challenges: [
      "WebSocket communication & real-time event handling",
      "Frontend state synchronization without blocking the UI",
      "Scalable messaging architecture & low-latency UX",
    ],
    github: "#",
    live: "#",
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
