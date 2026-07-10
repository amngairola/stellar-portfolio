import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";

type Blog = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  read_time: number | null;
  created_at: string;
};

const slugify = (c: string) => c.toLowerCase().replace(/\s+/g, "-");

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent">
      <div
        className="h-full bg-gradient-primary transition-[width] duration-100 shadow-glow"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const Skeleton = () => (
  <div className="animate-pulse">
    <div className="w-full h-[60vh] bg-muted" />
    <div className="max-w-[680px] mx-auto px-6 py-16 space-y-4">
      <div className="h-4 w-32 bg-muted rounded" />
      <div className="h-12 bg-muted rounded" />
      <div className="h-12 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded mt-8" />
      <div className="h-4 bg-muted rounded" />
      <div className="h-4 bg-muted rounded w-5/6" />
    </div>
  </div>
);

const BlogPost = () => {
  const { category, slug } = useParams();
  const [post, setPost] = useState<Blog | null | undefined>(undefined);
  const [related, setRelated] = useState<Blog[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (!mounted) return;
      setPost((data as Blog | null) ?? null);
      if (data) {
        const { data: more } = await supabase
          .from("blogs")
          .select("id,title,slug,category,excerpt,cover_image,read_time,created_at,content")
          .eq("published", true)
          .eq("category", (data as Blog).category)
          .neq("id", (data as Blog).id)
          .order("created_at", { ascending: false })
          .limit(3);
        if (mounted) setRelated((more as Blog[] | null) ?? []);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (post === undefined) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Skeleton />
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container py-40 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-8">This story may have moved or isn't published yet.</p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow"
          >
            <ArrowLeft className="w-4 h-4" /> Back to journal
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const url = typeof window !== "undefined" ? window.location.href : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? "",
    image: post.cover_image ?? undefined,
    datePublished: post.created_at,
    author: { "@type": "Person", name: "Aman Gairola", url: "https://amangairola.vercel.app" },
    mainEntityOfPage: url,
    articleSection: post.category,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{post.title} — Aman Gairola</title>
        <meta name="description" content={post.excerpt ?? post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt ?? ""} />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <ReadingProgress />
      <Navbar />

      {/* Full-bleed cover */}
      <header className="relative w-full h-[70vh] min-h-[520px] overflow-hidden">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-primary/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background" />
        <div className="relative h-full container flex flex-col justify-end pb-16 md:pb-24">
          <Link
            to={`/blogs/${slugify(post.category)}`}
            className="inline-flex items-center gap-2 self-start mb-6 px-3 py-1 rounded-full bg-background/60 backdrop-blur-md border border-border font-mono text-xs uppercase tracking-widest text-primary hover:border-primary/60 transition"
          >
            {post.category}
          </Link>
          <h1
            className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] max-w-4xl"
            style={{ textShadow: "0 4px 24px hsl(var(--background) / 0.6)" }}
          >
            {post.title}
          </h1>
          <div className="mt-8 flex items-center gap-5 text-sm text-muted-foreground">
            <span>{formatDate(post.created_at)}</span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.read_time ?? 5} min read
            </span>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-[680px] px-6 py-20 md:py-28">
        {post.excerpt && (
          <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-light mb-14 pb-14 border-b border-border">
            {post.excerpt}
          </p>
        )}
        <div className="prose-editorial">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content ?? ""}
          </ReactMarkdown>
        </div>
      </article>

      <section className="border-t border-border">
        <div className="container py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-2">
                More from
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl">{post.category}</h2>
            </div>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back to journal
            </Link>
          </div>
          {related.length === 0 ? (
            <p className="text-muted-foreground">This is the only story in {post.category} — for now.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blogs/${slugify(r.category)}/${r.slug}`}
                  className="group"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted mb-4">
                    {r.cover_image && (
                      <img
                        src={r.cover_image}
                        alt={r.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-xl leading-snug group-hover:text-primary transition-colors">
                    {r.title}
                  </h3>
                  <div className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {r.read_time ?? 5} min
                    <ArrowRight className="w-3 h-3 ml-auto transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;