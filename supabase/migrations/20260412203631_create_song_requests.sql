/*
  # Create song_requests table

  ## Summary
  This migration creates the core table for storing personalized song requests from families.

  ## New Tables

  ### `song_requests`
  Stores all data submitted through the BondiSongs request wizard.

  **Columns:**
  - `id` (uuid, primary key) — Unique identifier
  - `child_name` (text) — Name of the child the song is for
  - `nickname` (text, optional) — Nickname or pet name
  - `age_or_birthday` (text) — Age or birthday date
  - `name_in_song` (boolean) — Whether the child's name should appear in the lyrics
  - `occasion` (text) — Occasion type: birthday, birth, sleep, special, other
  - `interests` (text[]) — Array of interests/hobbies
  - `memory_text` (text) — Personal anecdote or memory
  - `important_people` (text) — Names and roles of family members to include
  - `music_style` (text) — Style: fun, sweet, sleep, acoustic, other
  - `adult_name` (text) — Name of the person ordering
  - `whatsapp` (text) — WhatsApp contact number
  - `email` (text, optional) — Email address
  - `status` (text) — Request status: pending, in_progress, preview_ready, delivered
  - `private_link` (text, optional) — Private preview/delivery link
  - `created_at` (timestamptz) — Submission timestamp

  ## Security
  - RLS enabled
  - Public INSERT allowed so anonymous users can submit requests
  - No public SELECT (admin only)
*/

CREATE TABLE IF NOT EXISTS song_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_name text NOT NULL,
  nickname text DEFAULT '',
  age_or_birthday text DEFAULT '',
  name_in_song boolean DEFAULT true,
  occasion text NOT NULL DEFAULT 'birthday',
  interests text[] DEFAULT '{}',
  memory_text text DEFAULT '',
  important_people text DEFAULT '',
  music_style text DEFAULT 'fun',
  adult_name text NOT NULL,
  whatsapp text NOT NULL,
  email text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  private_link text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE song_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a song request"
  ON song_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
