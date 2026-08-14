/*
# Add partial index for published blog posts

1. Purpose
   The /blogs page filters on `published = true` and orders by `created_at DESC`.
   A partial index makes the query use an index-only scan.

2. Changes
   - Create partial index `blogs_published_created_at_idx` on `blogs (published, created_at DESC)`
     WHERE `published = true`.
*/

CREATE INDEX IF NOT EXISTS blogs_published_created_at_idx
  ON blogs (published, created_at DESC)
  WHERE published = true;