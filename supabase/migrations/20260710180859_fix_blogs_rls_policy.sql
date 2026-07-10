/*
# Fix blogs RLS policy — grant SELECT to anon role

## Problem
The existing SELECT policy targets the `public` role. The Supabase
anon-key client authenticates as the `anon` role, not `public`.
This means every query from the frontend returns zero rows silently,
even when published rows exist in the table.

## Change
Drop the broken policy and replace it with one that targets
`anon, authenticated`, so both unauthenticated visitors and
signed-in users can read published posts.

## No data is affected — schema-only change.
*/

DROP POLICY IF EXISTS "Published blogs are publicly readable" ON blogs;

CREATE POLICY "Published blogs are publicly readable"
ON blogs FOR SELECT
TO anon, authenticated
USING (published = true);
