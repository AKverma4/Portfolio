/*
  # Fix Posts RLS Policies

  1. Changes
    - Update post policies to allow proper creation and management
    - Add explicit policies for all CRUD operations
    - Fix user_id handling in policies

  2. Security
    - Ensure users can only manage their own posts
    - Maintain public read access for published posts only
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Users can manage own posts" ON posts;

-- Create comprehensive policies for post management
CREATE POLICY "Anyone can view published posts"
  ON posts FOR SELECT
  USING (published = true);

CREATE POLICY "Users can view their own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);