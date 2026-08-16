import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  read_time: number | null;
  created_at: string;
};

export type BlogDetail = BlogSummary & {
  content: string | null;
  cover_image: string | null;
};

export const slugify = (c: string) => c.toLowerCase().replace(/\s+/g, "-");

export const blogKeys = {
  all: ["blogs"] as const,
  list: () => [...blogKeys.all, "list"] as const,
  detail: (slug: string) => [...blogKeys.all, "detail", slug] as const,
};

const LIST_SELECT =
  "id,title,slug,category,excerpt,read_time,created_at";

const fetchBlogList = async (): Promise<BlogSummary[]> => {
  const { data, error } = await supabase
    .from("blogs")
    .select(LIST_SELECT)
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as BlogSummary[] | null) ?? [];
};

const fetchBlogDetail = async (
  slug: string
): Promise<BlogDetail | null> => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return (data as BlogDetail | null) ?? null;
};

export const useBlogList = () =>
  useQuery<BlogSummary[]>({
    queryKey: blogKeys.list(),
    queryFn: fetchBlogList,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

export const useBlogDetail = (slug: string | undefined) =>
  useQuery<BlogDetail | null>({
    queryKey: blogKeys.detail(slug ?? ""),
    queryFn: () => fetchBlogDetail(slug!),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

export const prefetchBlogList = (queryClient: import("@tanstack/react-query").QueryClient) => {
  void queryClient.prefetchQuery({
    queryKey: blogKeys.list(),
    queryFn: fetchBlogList,
    staleTime: 5 * 60 * 1000,
  });
};

export const prefetchBlogDetail = (
  queryClient: import("@tanstack/react-query").QueryClient,
  slug: string
) => {
  void queryClient.prefetchQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => fetchBlogDetail(slug),
    staleTime: 10 * 60 * 1000,
  });
};
