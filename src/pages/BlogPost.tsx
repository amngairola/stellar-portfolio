import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { useBlogDetail, useBlogList, slugify, type BlogSummary } from "@/hooks/useBlogs";

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
        className="h-full bg-primary transition-[width] duration-100"
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
  const { data: post, isLoading } = useBlogDetail(slug);
  const { data: allPosts } = useBlogList();

  const related = useMemo(() => {
    if (!post || !allPosts) return [];
    return allPosts
      .filter((p) => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  }, [post, allPosts]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (isLoading && post === undefined) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Skeleton />
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container py-40 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-8">This story may have moved or isn't published yet.</p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to journal
          </Link>
        </div>
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

      {/* Full-bleed cover */}
      <header className="relative w-full h-[52vh] min-h-[380px] md:min-h-[440px] overflow-hidden">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background" />
        <div className="relative h-full container flex flex-col justify-end pb-12 md:pb-16">
          <Link
            to={`/blogs/${slugify(post.category)}`}
            className="inline-flex items-center gap-2 self-start mb-5 px-3 py-1 rounded-full bg-background/60 backdrop-blur-md border border-border font-mono text-xs uppercase tracking-widest text-primary hover:border-primary/60 transition"
          >
            {post.category}
          </Link>
          <h1
            className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-[1.08] max-w-3xl"
            style={{ textShadow: "0 4px 24px hsl(var(--background) / 0.6)" }}
          >
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-5 text-sm text-muted-foreground">
            <span>{formatDate(post.created_at)}</span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.read_time ?? 5} min read
            </span>
          </div>
          <Link
            to="/blogs"
            className="mt-6 inline-flex items-center gap-2 self-start text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All writing
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-[700px] px-6 py-16 md:py-24">
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
              {related.map((r: BlogSummary) => (
                <Link
                  key={r.id}
                  to={`/blogs/${slugify(r.category)}/${r.slug}`}
                  className="group"
                >
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
    </div>
  );
};

export default BlogPost;
