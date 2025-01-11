/*
  # Fix Profile RLS Policies

  1. Changes
    - Update profile policies to allow proper creation and management
    - Add policy for users to insert their own profile
    - Modify existing policies for better security

  2. Security
    - Ensure users can only manage their own profiles
    - Maintain public read access for profiles
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create comprehensive policies for profile management
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = id);