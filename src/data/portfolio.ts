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
    name: "Tracker.io",
    tagline: "Gamified DSA Progress Tracker",
    description:
      "A full-stack productivity platform with a Product-Led Growth architecture — frictionless Guest Mode, Google OAuth, and a GitHub-style activity heatmap that turns coding practice into a streak game.",
    stack: ["MERN", "OAuth 2.0", "JWT", "React Context", "Axios"],
    features: [
      "Frictionless Guest Mode for instant dashboard access",
      "Google OAuth 2.0 one-click authentication",
      "GitHub-style activity heatmap with custom streak algorithm",
      "Seamless guest → authenticated transitions, no reloads",
    ],
    challenges: [
      "Hybrid JWT auth with automatic Access/Refresh token rotation",
      "Custom Axios interceptors + HTTP-Only secure cookies",
      "Eliminated unexpected logouts and ensured persistent sessions",
    ],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    name: "Collabb",
    tagline: "Real-Time Collaborative Code Editor",
    description:
      "A collaborative coding platform supporting 50+ concurrent users with sub-200ms real-time synchronization, room-based workspaces, and a scalable Node.js backend.",
    stack: ["React.js", "Node.js", "Socket.io", "Express", "WebSockets"],
    features: [
      "50+ concurrent users with real-time code sync",
      "Sub-200ms latency for multi-user editing",
      "Room-based workspaces with dynamic participant tracking",
      "99.9% uptime via health monitoring & load balancing",
    ],
    challenges: [
      "Conflict resolution algorithms for concurrent edits",
      "Scalable WebSocket session management",
      "Secure workspace creation across distributed sessions",
    ],
    github: "#",
    live: "#",
  },
  {
    name: "Folyo",
    tagline: "Full-Stack Blog Platform",
    description:
      "A scalable MERN blog platform with role-based access control, 20+ REST endpoints, and an automated CI/CD pipeline that cut deployment time by 83%.",
    stack: ["MERN", "JWT", "RBAC", "GitHub Actions", "REST"],
    features: [
      "20+ RESTful endpoints with full CRUD & validation",
      "Role-based access control for admin dashboards",
      "Granular permissions for content moderation",
      "Zero-downtime deploys via GitHub Actions",
    ],
    challenges: [
      "Designed RBAC + JWT middleware from scratch",
      "Cut deployments from 30 → under 5 minutes",
      "Comprehensive input validation & error handling",
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
  { value: 300, suffix: "+", label: "LeetCode Problems Solved", href: "https://leetcode.com/" },
  { value: 50, suffix: "+", label: "GeeksforGeeks Accepted Solutions", href: "https://auth.geeksforgeeks.org/" },
  { value: 15, suffix: "+", label: "Production React Components" },
  { value: 30, suffix: "+", label: "Lighthouse Score Improvement" },
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
