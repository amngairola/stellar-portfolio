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
  <div className="container py-32 reveal in-view">
    <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center mb-6">
      <Newspaper className="w-5 h-5 text-muted-foreground" />
    </div>
    <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
      {category ? `Nothing in ${category} — yet.` : "The presses are warming up."}
    </h2>
    <p className="text-muted-foreground max-w-md mb-8">
      I'm drafting something worth your time. Check back soon, or read what's already published.
    </p>
    <Link
      to="/blogs"
      className="inline-flex items-center gap-2 text-sm text-primary link-underline"
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
            className="absolute bottom-0 h-[2px] bg-primary rounded-full transition-all duration-500 ease-out"
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
    className="reveal group container grid lg:grid-cols-5 gap-8 lg:gap-14 items-center pt-12 md:pt-16 pb-12 border-b border-border"
  >
    <div className="lg:col-span-3 relative overflow-hidden rounded-xl aspect-[16/10] bg-muted">
      {post.cover_image ? (
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full bg-muted" />
      )}
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Featured
      </div>
    </div>
    <div className="lg:col-span-2 space-y-4">
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">{post.category}</span>
        <span>·</span>
        <span>{formatDate(post.created_at)}</span>
      </div>
      <h2 className="font-display font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight group-hover:text-primary transition-colors">
        {post.title}
      </h2>
      {post.excerpt && (
        <p className="text-base text-muted-foreground leading-relaxed">{post.excerpt}</p>
      )}
      <div className="flex items-center gap-4 pt-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4" /> {post.read_time ?? 5} min read
        </span>
        <span className="inline-flex items-center gap-1 text-primary">
          Read story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </Link>
);

const AsymmetricGrid = ({ posts }: { posts: Blog[] }) => {
  return (
    <div className="container pb-28">
      <div className="divide-y divide-border">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            to={`/blogs/${slugify(post.category)}/${post.slug}`}
            className="reveal group flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-8"
            style={{ transitionDelay: `${(i % 4) * 60}ms` }}
          >
            <div className="md:w-44 shrink-0 flex md:flex-col flex-wrap items-center md:items-start gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              <span className="text-primary">{post.category}</span>
              <span>{formatDate(post.created_at)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.read_time ?? 5} min
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-xl md:text-2xl leading-snug tracking-tight group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-2 text-muted-foreground leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </div>
            <ArrowRight className="hidden md:block w-4 h-4 mt-2 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
};

const CategoryHeader = ({ category, count }: { category: string; count: number }) => (
  <div className="container pt-28 md:pt-32 pb-8 reveal">
    <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
      Category · {count} {count === 1 ? "post" : "posts"}
    </div>
    <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
      {category}
    </h1>
    <p className="max-w-xl text-base md:text-lg text-muted-foreground">
      {CATEGORY_DESCRIPTIONS[category] ?? `Everything I've written under ${category}.`}
    </p>
  </div>
);

const AllHeader = () => (
  <div className="container pt-28 md:pt-32 pb-6 reveal">
    <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
      Writing
    </div>
    <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.05] mb-4">
      Notes from the build.
    </h1>
    <p className="max-w-xl text-base md:text-lg text-muted-foreground">
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
        console.log("[Blogs] supabase response:", { data, error });
        if (error) console.error("[Blogs] fetch error:", error);
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