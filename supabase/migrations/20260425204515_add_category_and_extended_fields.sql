/*
  # Add category and extended fields for multi-niche support

  1. Modified Tables
    - `song_requests`
      - `category` (text) - Song category: education, parenting, birthday, friends, other
      - `education_data` (jsonb) - Education-specific form fields
      - `parenting_data` (jsonb) - Parenting-specific form fields
      - `friends_data` (jsonb) - Friends-specific form fields
      - `other_data` (jsonb) - Other category form fields
      - `style_prompt_data` (jsonb) - Style prompt fields: energy, voice, mood, tempo, sound character
      - `lyrics_prompt` (text) - Generated lyrics prompt
      - `style_prompt` (text) - Generated musical style prompt
      - `words_to_avoid` (text) - Words or topics to avoid
      - `desired_duration` (text) - Desired song duration

  2. Important Notes
    - All new columns have safe defaults so existing rows remain valid
    - Existing birthday/gifts flow continues to work unmodified
    - New categories store their specific data in JSONB columns
    - Prompt fields are stored for admin reference
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'category'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN category text NOT NULL DEFAULT 'birthday';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'education_data'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN education_data jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'parenting_data'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN parenting_data jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'friends_data'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN friends_data jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'other_data'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN other_data jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'style_prompt_data'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN style_prompt_data jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'lyrics_prompt'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN lyrics_prompt text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'style_prompt'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN style_prompt text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'words_to_avoid'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN words_to_avoid text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'desired_duration'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN desired_duration text DEFAULT '';
  END IF;
END $$;
