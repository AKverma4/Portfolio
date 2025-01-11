/*
  # Fix Projects RLS Policies

  1. Changes
    - Update project policies to allow proper creation and management
    - Add explicit policies for all CRUD operations
    - Fix user_id handling in policies

  2. Security
    - Ensure users can only manage their own projects
    - Maintain public read access for all projects
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON projects;
DROP POLICY IF EXISTS "Users can manage own projects" ON projects;

-- Create comprehensive policies for project management
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);