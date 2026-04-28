import { useEffect, useState } from "react";

export const TypingText = ({ words, speed = 90, pause = 1400 }: { words: string[]; speed?: number; pause?: number }) => {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    if (!del && text === current) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setI(v => v + 1);
      return;
    }
    const t = setTimeout(() => {
      setText(prev => (del ? prev.slice(0, -1) : current.slice(0, prev.length + 1)));
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);

  return <span className="cursor-blink gradient-text font-display">{text}</span>;
};
