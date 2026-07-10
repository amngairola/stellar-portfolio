import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Clock, Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";

type Blog = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  cover_image: string | null;
  read_time: number | null;
  created_at: string;
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Engineering: "Deep dives on architecture, performance, and the craft of shipping.",
  React: "Patterns, pitfalls, and everything I've learned building interfaces.",
  Career: "Notes on growing, interviewing, and staying human as a developer.",
  Design: "How things look, how they feel, and why that matters.",
  Life: "Everything outside the terminal.",
};

const slugify = (c: string) => c.toLowerCase().replace(/\s+/g, "-");

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const Skeleton = () => (
  <div className="container py-32 space-y-16 animate-pulse">
    <div className="grid lg:grid-cols-5 gap-10">
      <div className="lg:col-span-3 aspect-[16/10] rounded-2xl bg-muted" />
      <div className="lg:col-span-2 space-y-4">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-14 bg-muted rounded" />
        <div className="h-14 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-2/3" />
      </div>
    </div>
    <div className="grid md:grid-cols-6 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`space-y-3 ${i % 2 === 0 ? "md:col-span-4" : "md:col-span-2"}`}>
          <div className="aspect-video bg-muted rounded-xl" />
          <div className="h-6 bg-muted rounded w-4/5" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      ))}
    </div>
  </div>
);

const EmptyState = ({ category }: { category?: string }) => (
  <div className="container py-40 text-center reveal in-view">
    <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-primary/10 border border-primary/20 flex items-center justify-center mb-8 shadow-glow">
      <Newspaper className="w-10 h-10 text-primary" />
    </div>
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
      {category ? `Nothing in ${category} — yet.` : "The presses are warming up."}
    </h2>
    <p className="text-muted-foreground max-w-md mx-auto mb-8">
      I'm drafting something worth your time. Check back soon, or read what's already published.
    </p>
    <Link
      to="/blogs"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition"
    >
      Back to all posts <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

const useReveal = (dep: unknown) => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in-view)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
};

const CategoryPills = ({
  categories,
  active,
}: {
  categories: string[];
  active: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (el && containerRef.current) {
      const parent = containerRef.current.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setIndicator({ left: r.left - parent.left, width: r.width, opacity: 1 });
    }
  }, [active, categories.join("|")]);

  return (
    <div className="border-b border-border sticky top-16 md:top-20 z-30 bg-background/80 backdrop-blur-xl">
      <div className="container">
        <div
          ref={containerRef}
          className="relative flex gap-1 overflow-x-auto no-scrollbar py-3"
        >
          {categories.map((c) => {
            const to = c === "All" ? "/blogs" : `/blogs/${slugify(c)}`;
            const isActive = active === c;
            return (
              <Link
                key={c}
                to={to}
                data-cat={c}
                className={`relative px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </Link>
            );
          })}
          <div
            className="absolute bottom-0 h-[2px] bg-gradient-primary rounded-full transition-all duration-500 ease-out"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.opacity,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const FeaturedPost = ({ post }: { post: Blog }) => (
  <Link
    to={`/blogs/${slugify(post.category)}/${post.slug}`}
    className="reveal group container grid lg:grid-cols-5 gap-8 lg:gap-14 items-center pt-16 md:pt-24 pb-16"
  >
    <div className="lg:col-span-3 relative overflow-hidden rounded-2xl aspect-[16/10] bg-muted">
      {post.cover_image ? (
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full bg-gradient-primary/20" />
      )}
      <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
      <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border font-mono text-xs uppercase tracking-widest text-primary">
        Featured
      </div>
    </div>
    <div className="lg:col-span-2 space-y-5">
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">{post.category}</span>
        <span>·</span>
        <span>{formatDate(post.created_at)}</span>
      </div>
      <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight group-hover:text-primary transition-colors">
        {post.title}
      </h1>
      {post.excerpt && (
        <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
      )}
      <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4" /> {post.read_time ?? 5} min read
        </span>
        <span className="inline-flex items-center gap-1 text-primary font-medium">
          Read story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </Link>
);

const AsymmetricGrid = ({ posts }: { posts: Blog[] }) => {
  // Repeating asymmetric pattern via col-span variations
  const patterns = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4", "md:col-span-3", "md:col-span-3"];
  return (
    <div className="container pb-32">
      <div className="grid md:grid-cols-6 gap-8 md:gap-10">
        {posts.map((post, i) => {
          const span = patterns[i % patterns.length];
          const isWide = span.includes("col-span-4") || span.includes("col-span-3");
          return (
            <Link
              key={post.id}
              to={`/blogs/${slugify(post.category)}/${post.slug}`}
              className={`reveal group ${span}`}
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <div
                className={`relative overflow-hidden rounded-xl bg-muted mb-5 ${
                  isWide ? "aspect-[16/9]" : "aspect-[4/5]"
                }`}
              >
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-primary/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                <span className="text-primary">{post.category}</span>
                <span>·</span>
                <span>{formatDate(post.created_at)}</span>
                <span>·</span>
                <span>{post.read_time ?? 5} min</span>
              </div>
              <h3
                className={`font-display font-bold leading-tight tracking-tight group-hover:text-primary transition-colors ${
                  isWide ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                }`}
              >
                {post.title}
              </h3>
              {post.excerpt && isWide && (
                <p className="mt-3 text-muted-foreground line-clamp-2">{post.excerpt}</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const CategoryHeader = ({ category, count }: { category: string; count: number }) => (
  <div className="container pt-32 md:pt-40 pb-10 reveal">
    <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">
      Category · {count} {count === 1 ? "post" : "posts"}
    </div>
    <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 gradient-text inline-block">
      {category}
    </h1>
    <p className="max-w-xl text-lg text-muted-foreground">
      {CATEGORY_DESCRIPTIONS[category] ?? `Everything I've written under ${category}.`}
    </p>
  </div>
);

const AllHeader = () => (
  <div className="container pt-32 md:pt-40 pb-6 reveal">
    <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">
      The Journal
    </div>
    <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1] mb-6">
      Notes from <span className="gradient-text">the build</span>.
    </h1>
    <p className="max-w-xl text-lg text-muted-foreground">
      Long-form writing on engineering, design, and the parts of the craft that don't fit in a tweet.
    </p>
  </div>
);

const Blogs = () => {
  const { category: categoryParam } = useParams();
  const [posts, setPosts] = useState<Blog[] | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase
      .from("blogs")
      .select("id,title,slug,category,excerpt,cover_image,read_time,created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) console.error(error);
        setPosts((data as Blog[] | null) ?? []);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    if (!posts) return ["All"];
    return ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  }, [posts]);

  const activeCategory = useMemo(() => {
    if (!categoryParam) return "All";
    return categories.find((c) => slugify(c) === categoryParam) ?? categoryParam;
  }, [categoryParam, categories]);

  const filtered = useMemo(() => {
    if (!posts) return null;
    if (activeCategory === "All") return posts;
    return posts.filter((p) => slugify(p.category) === slugify(activeCategory));
  }, [posts, activeCategory]);

  useReveal(filtered);

  const featured = filtered?.[0];
  const rest = filtered?.slice(1) ?? [];

  const title = activeCategory === "All"
    ? "Journal — Aman Gairola"
    : `${activeCategory} — Journal · Aman Gairola`;
  const desc = activeCategory === "All"
    ? "Long-form writing on engineering, design, and the craft of shipping software."
    : (CATEGORY_DESCRIPTIONS[activeCategory] ?? `Posts in ${activeCategory}.`);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
      </Helmet>
      <Navbar />
      <main>
        {posts === null ? (
          <Skeleton />
        ) : (
          <>
            {activeCategory === "All" ? (
              <AllHeader />
            ) : (
              <CategoryHeader category={activeCategory} count={filtered?.length ?? 0} />
            )}
            <CategoryPills categories={categories} active={activeCategory} />
            {filtered && filtered.length === 0 ? (
              <EmptyState category={activeCategory === "All" ? undefined : activeCategory} />
            ) : (
              <>
                {featured && <FeaturedPost post={featured} />}
                {rest.length > 0 && <AsymmetricGrid posts={rest} />}
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;