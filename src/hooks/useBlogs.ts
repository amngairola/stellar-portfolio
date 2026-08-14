import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  cover_image: string | null;
  read_time: number | null;
  created_at: string;
};

export type BlogDetail = BlogSummary & {
  content: string | null;
};

export const slugify = (c: string) => c.toLowerCase().replace(/\s+/g, "-");

export const blogKeys = {
  all: ["blogs"] as const,
  list: () => [...blogKeys.all, "list"] as const,
  detail: (slug: string) => [...blogKeys.all, "detail", slug] as const,
};

export const useBlogList = () =>
  useQuery<BlogSummary[]>({
    queryKey: blogKeys.list(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id,title,slug,category,excerpt,cover_image,read_time,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as BlogSummary[] | null) ?? [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

export const useBlogDetail = (slug: string | undefined) =>
  useQuery<BlogDetail | null>({
    queryKey: blogKeys.detail(slug ?? ""),
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return (data as BlogDetail | null) ?? null;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
