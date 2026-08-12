const KEYWORDS = [
  "MERN Stack",
  "MERN",
  "Full-Stack",
  "Full Stack",
  "Real-Time",
  "Real Time",
  "Realtime",
  "React.js",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Socket.IO",
  "WebSocket",
  "WebSockets",
  "WebRTC",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Redux Toolkit",
  "Redux",
  "REST API",
  "JWT",
  "OAuth",
  "Docker",
  "AWS",
  "Vercel",
  "Lighthouse",
  "Cloudinary",
  "Supabase",
  "Firebase",
  "GraphQL",
  "Zustand",
  "Prisma",
  "SQL",
  "NoSQL",
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const PATTERN = new RegExp(
  `(${KEYWORDS.sort((a, b) => b.length - a.length).map(escape).join("|")})`,
  "gi",
);

/** Renders text with key tech keywords subtly highlighted (theme-aware). */
export const Keywords = ({ text }: { text: string }) => {
  const parts = text.split(PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="kw">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};