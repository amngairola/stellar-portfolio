export type SkillNode = {
  name: string;
  /** 0–100 proficiency, drives the progress bar under each node */
  progress: number;
  /** highlight = strongest / most-used nodes */
  highlight?: boolean;
};

export type SkillCategory = {
  key: string;
  label: string;
  blurb: string;
  /** each inner array is one row/level of the tree, rendered top → bottom */
  levels: SkillNode[][];
};

export const skillCategories: SkillCategory[] = [
  {
    key: "languages",
    label: "Programming Languages",
    blurb: "Core languages I build and solve problems with.",
    levels: [
      [{ name: "Java", progress: 85, highlight: true }],
      [
        { name: "JavaScript (ES6+)", progress: 92, highlight: true },
        { name: "TypeScript", progress: 82 },
      ],
      [
        { name: "C++", progress: 78 },
        { name: "Python", progress: 75, highlight: true },
        { name: "C", progress: 70 },
      ],
      [
        { name: "SQL", progress: 72 },
        { name: "HTML5 / CSS3", progress: 90, highlight: true },
      ],
    ],
  },
  {
    key: "dsa",
    label: "DSA",
    blurb: "500+ problems solved — patterns I reach for in contests.",
    levels: [
      [{ name: "Arrays", progress: 95, highlight: true }],
      [
        { name: "Two Pointers", progress: 88, highlight: true },
        { name: "Stack", progress: 80 },
      ],
      [
        { name: "Linked List", progress: 82 },
        { name: "Binary Search", progress: 90, highlight: true },
        { name: "Sliding Window", progress: 84 },
      ],
      [{ name: "Trees", progress: 78 }],
      [
        { name: "Tries", progress: 62 },
        { name: "Heap", progress: 70 },
        { name: "Backtracking", progress: 68 },
      ],
      [
        { name: "Graphs", progress: 74 },
        { name: "DSU", progress: 60 },
        { name: "Dynamic Programming", progress: 72 },
      ],
    ],
  },
  {
    key: "frontend",
    label: "Frontend",
    blurb: "Production-grade UI engineering and performance work.",
    levels: [
      [{ name: "React.js", progress: 94, highlight: true }],
      [
        { name: "Redux", progress: 84, highlight: true },
        { name: "Tailwind CSS", progress: 92, highlight: true },
      ],
      [
        { name: "React Query", progress: 86, highlight: true },
        { name: "Material UI", progress: 76 },
      ],
      [
        { name: "Responsive Design", progress: 90 },
        { name: "Performance Optimization", progress: 82 },
      ],
    ],
  },
  {
    key: "backend",
    label: "Backend",
    blurb: "APIs, real-time systems, and auth flows.",
    levels: [
      [{ name: "Node.js", progress: 88, highlight: true }],
      [
        { name: "Express.js", progress: 86, highlight: true },
        { name: "REST APIs", progress: 88 },
      ],
      [
        { name: "WebSockets / Socket.io", progress: 80 },
        { name: "Redis", progress: 78, highlight: true },
      ],
      [
        { name: "JWT Auth", progress: 84 },
        { name: "MongoDB", progress: 82 },
      ],
      [
        { name: "PostgreSQL", progress: 70 },
      ],
    ],
  },
  {
    key: "genai",
    label: "GenAI",
    blurb: "Building with models — currently exploring deeper.",
    levels: [
      [{ name: "LLM APIs", progress: 74, highlight: true }],
      [
        { name: "Prompt Engineering", progress: 78, highlight: true },
        { name: "LangChain", progress: 58 },
      ],
      [
        { name: "Vector Databases", progress: 52 },
        { name: "RAG Pipelines", progress: 55 },
      ],
    ],
  },
  {
    key: "devops",
    label: "DevOps",
    blurb: "Shipping, automating, and keeping things live.",
    levels: [
      [{ name: "Git / GitHub", progress: 92, highlight: true }],
      [
        { name: "Docker", progress: 60 },
        { name: "CI/CD (GitHub Actions)", progress: 62 },
      ],
      [
        { name: "Vercel", progress: 88, highlight: true },
        { name: "Render", progress: 72 },
      ],
    ],
  },
];
