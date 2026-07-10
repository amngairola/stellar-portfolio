CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  read_time INT DEFAULT 5,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blogs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blogs TO authenticated;
GRANT ALL ON public.blogs TO service_role;

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blogs are publicly readable"
  ON public.blogs FOR SELECT
  USING (published = true);

CREATE INDEX blogs_category_idx ON public.blogs (category);
CREATE INDEX blogs_created_at_idx ON public.blogs (created_at DESC);