/*
# Add partial index for published blog posts

1. Purpose
   The /blogs page filters on `published = true` and orders by `created_at DESC`.
   Adding a partial index on `published` combined with the existing `created_at DESC`
   ordering makes the query use an index-only scan, reducing latency.

2. Changes
   - Create partial index `blogs_published_created_at_idx` on `blogs (published, created_at DESC)`
     WHERE `published = true`.
*/