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
    "I don't chase trendy tech — I solve problems with thoughtful engineering. Currently deep in full-stack JavaScript, always learning what's underneath it — systems, data, and the trade-offs.",
  
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
      "C",
      "C++",
      "Python",
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
      "React Query",
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
      "Redis",
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
    name: "Collabb",
    tagline: "Real-Time Collaborative Code Editor with AI-Assisted Analysis",
    description:
      "A real-time collaborative code editor where multiple developers can work in shared rooms with live code synchronization. Integrated Gemini-powered features for code explanation, time/space complexity analysis, and bug detection.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Monaco Editor",
      "Gemini",
      "Redis",
      "Vercel",
      "Render",
    ],
    features: [
      "Real-time multi-user code editing with room-based Socket.io communication",
      "AI-assisted code explanation, complexity analysis, and bug detection using Gemini",
      "Redis pub/sub enables Socket.io communication across multiple server instances for horizontal scaling",
      "~60% reduction in unnecessary React re-renders through memoization",
    ],
    challenges: [
      "Designed Redis-backed Socket.io architecture to support horizontal server scaling",
      "Separated AI code analysis from real-time collaboration through dedicated Express controllers",
      "Optimized real-time event handling to reduce unnecessary broadcasts and network traffic",
    ],
    github: "https://github.com/amngairola/code-editor",
    live: "https://collabb.vercel.app",
  },

  {
    name: "Tracker.io",
    tagline: "DSA Practice & Progress-Tracking Platform",
    description:
      "A DSA practice platform that helps developers stay consistent by creating custom problem sheets, receiving 2 random problems daily, and tracking their solving progress through streaks and a GitHub-style activity heatmap.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Google OAuth",
      "React Query",
    ],
    features: [
      "Custom DSA sheet builder for creating personalized problem sets",
      "Daily challenge engine delivering 2 random problems every day",
      "Progress tracking with streaks and 365-day activity heatmap",
      "JWT + Google OAuth authentication with HTTP-only cookies",
      "~40% reduction in redundant API calls through client-side caching",
    ],
    challenges: [
      "Designed data models for custom DSA sheets, daily challenges, and independent progress tracking",
      "Implemented JWT authentication with HTTP-only cookies and Axios interceptors",
      "Built 365-day activity heatmap and streak calculation system",
      "Implemented client-side caching and progressive loading with React Query",
    ],
    github: "https://github.com/amngairola/Trackr.io",
    live: "https://trackr-io.vercel.app",
  },

  {
    name: "Yap",
    tagline: "Scalable Real-Time Messaging Platform",
    description:
      "A real-time messaging platform supporting instant messaging, online presence, media sharing, and multi-server communication using Socket.io and Redis.",
    stack: [
      "React",
      "React Query",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Redis",
      "Cloudinary",
      "JWT",
    ],
    features: [
      "Real-time messaging and online presence using Socket.io",
      "Redis-backed Socket.io architecture for horizontal server scaling",
      "React Query caching for efficient message and conversation management",
      "Cloudinary integration for media uploads and CDN delivery",
      "JWT authentication with HTTP-only cookies",
    ],
    challenges: [
      "Implemented Redis pub/sub to synchronize Socket.io events across server instances",
      "Designed message caching and invalidation to keep API data and real-time events synchronized",
      "Built real-time presence and unread message updates without polling",
    ],
    github: "https://github.com/amngairola/yap",
    live: "https://yapiing.vercel.app",
  },

  {
    name: "QuickDrop",
    tagline: "On-Demand Local Delivery & Ride Booking Platform",
    description:
      "A full-stack booking platform for local rides and delivery services with automated fare calculation, real-time booking updates, authentication, and an admin dashboard for operational monitoring.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "Supabase Auth",
      "Supabase Postgres",
      "Supabase Realtime",
      "Google OAuth",
      "Vercel",
    ],
    features: [
      "Google OAuth authentication with persistent sessions",
      "Distance-based automated fare calculation",
      "Real-time booking updates using Supabase Realtime",
      "Role-based admin dashboard with revenue and booking analytics",
    ],
    challenges: [
      "Implemented real-time booking synchronization using Supabase Realtime",
      "Built role-based authorization and protected admin routes",
      "Designed distance-based pricing logic for automated fare calculation",
      "Used React Query for caching and optimistic updates",
    ],
    github: "https://github.com/amngairola/admin-dashboard-Quick-drop",
    live: "https://rebaaar.vercel.app",
    featured: true,
  },

  {
    name: "Task Management System",
    tagline: "Full-Stack Project Management Platform",
    description:
      "A full-stack project management platform with role-based access control, task management, analytics, and a performance-optimized React frontend.",
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
      "~45% fewer redundant API calls through TanStack Query caching",
      "~70% reduction in search API calls using debouncing",
      "Route-level code splitting with React.lazy and Suspense",
      "Role-based UI and protected routes using JWT claims",
    ],
    challenges: [
      "Implemented role-based authentication and protected routes",
      "Used TanStack Query for server-state management, caching, and background synchronization",
      "Implemented debounced search to reduce unnecessary API requests",
      "Added route-level code splitting for improved frontend performance",
    ],
    github: "https://github.com/amngairola/taskManager",
    live: "https://taskm-amangairola.vercel.app",
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
